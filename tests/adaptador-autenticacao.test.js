// Testes do padrão Adapter aplicado à autenticação (docs/padroes/padroes-de-projeto.md, PP-01).
// Parte 1: o adaptador traduz a API e os erros do Supabase para a interface ServicoAutenticacao.
// Parte 2: as rotas funcionam com qualquer implementação da interface, sem Supabase algum.
// Requisitos: RF-01, RF-02, RF-03 | Regras: RN-03.

const { test, describe, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const src = path.join(__dirname, '..', 'src');
const {
  ServicoAutenticacao,
  MOTIVOS_FALHA_AUTENTICACAO: MOTIVOS,
} = require(path.join(src, 'servicos', 'servico-autenticacao.js'));
const { AdaptadorSupabaseAuth } = require(path.join(src, 'servicos', 'adaptador-supabase-auth.js'));
const app = require(path.join(src, 'server.js'));

// Cliente do Supabase falso: registra as chamadas e devolve o erro (ou os dados) configurado por método.
function supabaseFalso(erros = {}, chamadas = [], dados = {}) {
  const responder = (metodo) => async (...args) => {
    chamadas.push([metodo, ...args]);
    return { data: dados[metodo] || {}, error: erros[metodo] || null };
  };
  return {
    auth: {
      signUp: responder('signUp'),
      signInWithPassword: responder('signInWithPassword'),
      resetPasswordForEmail: responder('resetPasswordForEmail'),
      setSession: responder('setSession'),
      updateUser: responder('updateUser'),
    },
  };
}

describe('AdaptadorSupabaseAuth — tradução da API do Supabase', () => {
  test('ServicoAutenticacao é abstrata', () => {
    assert.throws(() => new ServicoAutenticacao(), TypeError);
  });

  test('cadastrar() repassa os dados no formato do Supabase', async () => {
    const chamadas = [];
    const servico = new AdaptadorSupabaseAuth(supabaseFalso({}, chamadas));
    const resultado = await servico.cadastrar({
      nome: 'Ana Souza',
      email: 'ana@estudante.ufla.br',
      senha: 'senhaSegura1',
      urlConfirmacao: 'http://app/login/index.html',
    });
    assert.deepEqual(resultado, { sucesso: true });
    const [, dados] = chamadas[0];
    assert.equal(dados.password, 'senhaSegura1');
    assert.equal(dados.options.emailRedirectTo, 'http://app/login/index.html');
    assert.equal(dados.options.data.display_name, 'Ana Souza');
  });

  test('e-mail repetido é reconhecido pelo código do erro, mesmo com outra mensagem', async () => {
    for (const code of ['user_already_exists', 'email_exists']) {
      const servico = new AdaptadorSupabaseAuth(
        supabaseFalso({ signUp: { code, message: 'Mensagem alterada pelo provedor' } })
      );
      const resultado = await servico.cadastrar({ nome: 'Ana', email: 'a@ufla.br', senha: 'x' });
      assert.equal(resultado.motivo, MOTIVOS.EMAIL_JA_CADASTRADO, code);
    }
  });

  test('e-mail já confirmado é reconhecido pelo usuário fictício sem identidades (Confirm email ativo)', async () => {
    const usuarioFicticio = { user: { id: 'x', identities: [] }, session: null };
    const servico = new AdaptadorSupabaseAuth(supabaseFalso({}, [], { signUp: usuarioFicticio }));
    const resultado = await servico.cadastrar({ nome: 'Ana', email: 'a@ufla.br', senha: 'x' });
    assert.equal(resultado.motivo, MOTIVOS.EMAIL_JA_CADASTRADO);

    const usuarioNovo = { user: { id: 'y', identities: [{ provider: 'email' }] }, session: null };
    const outro = new AdaptadorSupabaseAuth(supabaseFalso({}, [], { signUp: usuarioNovo }));
    assert.deepEqual(await outro.cadastrar({ nome: 'Bia', email: 'b@ufla.br', senha: 'x' }), { sucesso: true });
  });

  test('conta não confirmada é reconhecida pelo código do erro (RN-03)', async () => {
    const servico = new AdaptadorSupabaseAuth(
      supabaseFalso({ signInWithPassword: { code: 'email_not_confirmed', message: 'Outro texto' } })
    );
    const resultado = await servico.entrar({ email: 'a@ufla.br', senha: 'x' });
    assert.equal(resultado.motivo, MOTIVOS.EMAIL_NAO_CONFIRMADO);
  });

  test('demais erros de login viram CREDENCIAIS_INVALIDAS', async () => {
    const servico = new AdaptadorSupabaseAuth(
      supabaseFalso({ signInWithPassword: { code: 'invalid_credentials', message: 'Invalid login credentials' } })
    );
    const resultado = await servico.entrar({ email: 'a@ufla.br', senha: 'errada' });
    assert.equal(resultado.motivo, MOTIVOS.CREDENCIAIS_INVALIDAS);
  });

  test('falha de comunicação com o provedor no login retorna ERRO_SERVICO (T-06 / CT-06)', async () => {
    const servico = new AdaptadorSupabaseAuth(
      supabaseFalso({ signInWithPassword: { status: 503, message: 'FetchError: Failed to fetch' } })
    );
    const resultado = await servico.entrar({ email: 'a@ufla.br', senha: 'senha' });
    assert.equal(resultado.motivo, MOTIVOS.ERRO_SERVICO);
  });

  test('redefinirSenha() com token inválido não tenta atualizar a senha', async () => {
    const chamadas = [];
    const servico = new AdaptadorSupabaseAuth(
      supabaseFalso({ setSession: { code: 'bad_jwt', message: 'invalid JWT' } }, chamadas)
    );
    const resultado = await servico.redefinirSenha({ tokenAcesso: 't', novaSenha: 'novaSenha1' });
    assert.equal(resultado.motivo, MOTIVOS.TOKEN_INVALIDO);
    assert.deepEqual(chamadas.map(([metodo]) => metodo), ['setSession']);
  });

  test('redefinirSenha() usa o token de acesso quando não há token de renovação', async () => {
    const chamadas = [];
    const servico = new AdaptadorSupabaseAuth(supabaseFalso({}, chamadas));
    const resultado = await servico.redefinirSenha({ tokenAcesso: 't', novaSenha: 'novaSenha1' });
    assert.deepEqual(resultado, { sucesso: true });
    assert.deepEqual(chamadas[0][1], { access_token: 't', refresh_token: 't' });
    assert.deepEqual(chamadas[1][1], { password: 'novaSenha1' });
  });
});

// Implementação em memória da interface: substitui o Supabase inteiro nas rotas.
class ServicoAutenticacaoEmMemoria extends ServicoAutenticacao {
  constructor() {
    super();
    this.contas = new Map(); // email -> { senha, confirmada }
    this.tokensValidos = new Set(['token-valido']);
  }

  async cadastrar({ email, senha }) {
    if (this.contas.has(email)) return { sucesso: false, motivo: MOTIVOS.EMAIL_JA_CADASTRADO, detalhe: '' };
    this.contas.set(email, { senha, confirmada: false });
    return { sucesso: true };
  }

  async entrar({ email, senha }) {
    const conta = this.contas.get(email);
    if (!conta || conta.senha !== senha) {
      return { sucesso: false, motivo: MOTIVOS.CREDENCIAIS_INVALIDAS, detalhe: '' };
    }
    if (!conta.confirmada) return { sucesso: false, motivo: MOTIVOS.EMAIL_NAO_CONFIRMADO, detalhe: '' };
    return { sucesso: true };
  }

  async solicitarRecuperacaoSenha() {
    return { sucesso: true };
  }

  async redefinirSenha({ tokenAcesso }) {
    if (!this.tokensValidos.has(tokenAcesso)) return { sucesso: false, motivo: MOTIVOS.TOKEN_INVALIDO, detalhe: '' };
    return { sucesso: true };
  }
}

describe('Rotas de autenticação com outra implementação da interface (sem Supabase)', () => {
  let server;
  let base;
  let servico;

  async function post(rota, corpo) {
    const resp = await fetch(`${base}${rota}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corpo),
    });
    return { status: resp.status, dados: await resp.json() };
  }

  const ana = { nome: 'Ana Souza', email: 'ana@estudante.ufla.br', senha: 'senhaSegura1' };

  before(() => {
    delete process.env.DOMINIOS_INSTITUCIONAIS;
    delete app.locals.supabase;
    server = app.listen(0);
    base = `http://localhost:${server.address().port}`;
  });

  after(() => {
    delete app.locals.servicoAutenticacao;
    server.close();
  });

  beforeEach(() => {
    servico = new ServicoAutenticacaoEmMemoria();
    app.locals.servicoAutenticacao = servico;
  });

  test('cadastro e e-mail repetido (RF-01, US-02)', async () => {
    assert.equal((await post('/api/cadastro', ana)).status, 201);
    assert.equal((await post('/api/cadastro', ana)).status, 409);
  });

  test('login antes e depois da confirmação do e-mail (RF-02, RN-03)', async () => {
    await post('/api/cadastro', ana);
    assert.equal((await post('/api/login', ana)).status, 403);

    servico.contas.get(ana.email).confirmada = true;
    const { status, dados } = await post('/api/login', ana);
    assert.equal(status, 200);
    assert.equal(dados.redirecionar, '/materiais.html');
  });

  test('senha errada recebe mensagem genérica (US-01, critério 2)', async () => {
    await post('/api/cadastro', ana);
    const { status, dados } = await post('/api/login', { ...ana, senha: 'outraSenha9' });
    assert.equal(status, 401);
    assert.equal(dados.erro, 'E-mail ou senha incorretos.');
  });

  test('redefinição de senha com token inválido e válido (RF-03)', async () => {
    const invalido = await post('/api/salvar-nova-senha', { token_acesso: 'x', nova_senha: 'novaSenha1' });
    assert.equal(invalido.status, 401);
    const valido = await post('/api/salvar-nova-senha', { token_acesso: 'token-valido', nova_senha: 'novaSenha1' });
    assert.equal(valido.status, 200);
  });
});

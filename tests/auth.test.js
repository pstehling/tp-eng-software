// Testes de integração do fluxo "Cadastro, verificação e login"
// (docs/modelagem/modelagem.md, seção 4.1) — RF-01, RF-02, RF-03, RN-01, RN-03.
// O Supabase é substituído por um cliente falso injetado em app.locals.supabase,
// para que os testes não dependam de rede nem de credenciais.

const { test, describe, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const app = require(path.join(__dirname, '..', 'src', 'server.js'));

let server;
let base;
let chamadas;

function supabaseFalso({ signUpErro = null, loginErro = null } = {}) {
  return {
    auth: {
      signUp: async (dados) => {
        chamadas.push(['signUp', dados]);
        return { data: {}, error: signUpErro };
      },
      signInWithPassword: async (dados) => {
        chamadas.push(['signInWithPassword', dados]);
        return { data: {}, error: loginErro };
      },
      resetPasswordForEmail: async (email, opcoes) => {
        chamadas.push(['resetPasswordForEmail', email, opcoes]);
        return { error: null };
      },
    },
  };
}

async function post(rota, corpo) {
  const resp = await fetch(`${base}${rota}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(corpo),
  });
  return { status: resp.status, dados: await resp.json() };
}

describe('Fluxo de autenticação', () => {
  before(() => {
    delete process.env.DOMINIOS_INSTITUCIONAIS;
    server = app.listen(0);
    base = `http://localhost:${server.address().port}`;
  });

  after(() => server.close());

  beforeEach(() => {
    chamadas = [];
    app.locals.supabase = supabaseFalso();
  });

  test('cadastro com e-mail não institucional é barrado antes do Supabase (RN-01)', async () => {
    const { status, dados } = await post('/api/cadastro', { nome: 'Ana', email: 'ana@gmail.com', senha: 'senhaSegura1' });
    assert.equal(status, 400);
    assert.equal(dados.sucesso, false);
    assert.equal(chamadas.length, 0, 'não deve chamar o serviço de autenticação');
  });

  test('cadastro válido cria a conta pendente de verificação (201)', async () => {
    const { status, dados } = await post('/api/cadastro', { nome: 'Ana Souza', email: 'ana@estudante.ufla.br', senha: 'senhaSegura1' });
    assert.equal(status, 201);
    assert.match(dados.mensagem, /Verifique seu e-mail/);
    assert.equal(chamadas[0][0], 'signUp');
  });

  test('e-mail já cadastrado retorna 409 (US-02, critério 2)', async () => {
    app.locals.supabase = supabaseFalso({ signUpErro: { message: 'User already registered' } });
    const { status } = await post('/api/cadastro', { nome: 'Ana Souza', email: 'ana@estudante.ufla.br', senha: 'senhaSegura1' });
    assert.equal(status, 409);
  });

  test('login de conta não verificada é bloqueado (RN-03)', async () => {
    app.locals.supabase = supabaseFalso({ loginErro: { message: 'Email not confirmed' } });
    const { status } = await post('/api/login', { email: 'ana@estudante.ufla.br', senha: 'senhaSegura1' });
    assert.equal(status, 403);
  });

  test('credenciais incorretas retornam mensagem genérica (US-01, critério 2)', async () => {
    app.locals.supabase = supabaseFalso({ loginErro: { message: 'Invalid login credentials' } });
    const { status, dados } = await post('/api/login', { email: 'ana@estudante.ufla.br', senha: 'errada123' });
    assert.equal(status, 401);
    assert.equal(dados.erro, 'E-mail ou senha incorretos.');
  });

  test('login válido redireciona o usuário (US-01, critério 1)', async () => {
    const { status, dados } = await post('/api/login', { email: 'ana@estudante.ufla.br', senha: 'senhaSegura1' });
    assert.equal(status, 200);
    assert.equal(dados.sucesso, true);
    assert.ok(dados.redirecionar);
  });

  test('recuperação de senha envia link para a página correta (RF-03)', async () => {
    const { status } = await post('/api/recuperar-senha', { email: 'ana@estudante.ufla.br' });
    assert.equal(status, 200);
    assert.match(chamadas[0][2].redirectTo, /\/recuperar-senha\/index\.html$/);
  });

  test('nova senha fora da regra é rejeitada antes do Supabase', async () => {
    const { status } = await post('/api/salvar-nova-senha', { token_acesso: 'x', nova_senha: 'curta' });
    assert.equal(status, 400);
    assert.equal(chamadas.length, 0);
  });
});

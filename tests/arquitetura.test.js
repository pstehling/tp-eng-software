// Testes da organização arquitetural (docs/arquitetura/arquitetura.md, Sprint 6).
// Parte 1: comunicação entre as partes — frontend estático e API na mesma origem (DA-02),
//          verificação de saúde (/api/status) e tratamento centralizado de erros (DA-05).
// Parte 2: a camada de rotas é independente da montagem da aplicação: pode ser usada em
//          outro app Express, recebendo o serviço de autenticação por parâmetro (DA-01).

const { test, describe, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const express = require(path.join(__dirname, '..', 'src', 'node_modules', 'express'));

const src = path.join(__dirname, '..', 'src');
const app = require(path.join(src, 'server.js'));
const { criarRotasAutenticacao } = require(path.join(src, 'rotas', 'autenticacao.js'));
const {
  ServicoAutenticacao,
  MOTIVOS_FALHA_AUTENTICACAO: MOTIVOS,
} = require(path.join(src, 'servicos', 'servico-autenticacao.js'));

// Serviço de autenticação mínimo: aceita qualquer login, ou lança erro se pedido.
class ServicoFalso extends ServicoAutenticacao {
  constructor({ lancarErro = false } = {}) {
    super();
    this.lancarErro = lancarErro;
  }

  async entrar({ senha }) {
    if (this.lancarErro) throw new Error('falha inesperada do provedor');
    if (senha === 'errada') return { sucesso: false, motivo: MOTIVOS.CREDENCIAIS_INVALIDAS, detalhe: '' };
    return { sucesso: true };
  }
}

function iniciar(aplicacao) {
  const server = aplicacao.listen(0);
  return { server, base: `http://localhost:${server.address().port}` };
}

async function postJson(base, rota, corpo) {
  const resp = await fetch(`${base}${rota}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(corpo),
  });
  return { status: resp.status, dados: await resp.json() };
}

describe('Comunicação entre frontend, API e serviço externo (app montado)', () => {
  let server;
  let base;

  before(() => {
    delete app.locals.supabase;
    ({ server, base } = iniciar(app));
  });

  after(() => {
    delete app.locals.servicoAutenticacao;
    server.close();
  });

  beforeEach(() => {
    delete app.locals.servicoAutenticacao;
  });

  test('o mesmo servidor entrega as páginas do frontend (DA-02)', async () => {
    for (const pagina of ['/', '/login/index.html', '/cadastro/index.html', '/recuperar-senha/index.html']) {
      const resp = await fetch(`${base}${pagina}`);
      assert.equal(resp.status, 200, pagina);
      assert.match(resp.headers.get('content-type'), /text\/html/, pagina);
    }
  });

  test('/api/status informa se o serviço de autenticação está configurado, sem expor chaves', async () => {
    app.locals.servicoAutenticacao = new ServicoFalso();
    const resp = await fetch(`${base}/api/status`);
    const dados = await resp.json();
    assert.equal(dados.status, 'ok');
    assert.equal(dados.servicos.autenticacao, 'configurado');
    assert.doesNotMatch(JSON.stringify(dados), /supabase\.co|eyJ/);
  });

  test('rota inexistente da API responde 404 em JSON (DA-05)', async () => {
    const resp = await fetch(`${base}/api/nao-existe`);
    assert.equal(resp.status, 404);
    assert.equal((await resp.json()).sucesso, false);
  });

  test('erro inesperado no serviço vira 500 genérico e o servidor continua no ar (DA-05)', async () => {
    app.locals.servicoAutenticacao = new ServicoFalso({ lancarErro: true });
    const original = console.error;
    console.error = () => {}; // o erro é registrado no log de propósito; silencia no teste
    try {
      const { status, dados } = await postJson(base, '/api/login', { email: 'a@ufla.br', senha: 'x' });
      assert.equal(status, 500);
      assert.doesNotMatch(dados.erro, /falha inesperada/);
    } finally {
      console.error = original;
    }

    const resp = await fetch(`${base}/api/status`);
    assert.equal(resp.status, 200);
  });
});

describe('Camada de rotas independente da montagem da aplicação', () => {
  test('as rotas de autenticação funcionam em outro app Express com o serviço passado por parâmetro', async () => {
    const outroApp = express();
    outroApp.use(express.json());
    outroApp.use('/api', criarRotasAutenticacao({
      obterServicoAutenticacao: () => new ServicoFalso(),
      urlAplicacao: 'http://exemplo',
    }));
    const { server, base } = iniciar(outroApp);

    try {
      assert.equal((await postJson(base, '/api/login', { email: 'a@ufla.br', senha: 'certa' })).status, 200);
      assert.equal((await postJson(base, '/api/login', { email: 'a@ufla.br', senha: 'errada' })).status, 401);
    } finally {
      server.close();
    }
  });

  test('sem serviço configurado, as rotas respondem 503', async () => {
    const outroApp = express();
    outroApp.use(express.json());
    outroApp.use('/api', criarRotasAutenticacao({ obterServicoAutenticacao: () => null, urlAplicacao: '' }));
    const { server, base } = iniciar(outroApp);

    try {
      assert.equal((await postJson(base, '/api/login', { email: 'a@ufla.br', senha: 'x' })).status, 503);
    } finally {
      server.close();
    }
  });
});

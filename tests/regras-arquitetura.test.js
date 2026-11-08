// Testes de regras de arquitetura (docs/arquitetura/arquitetura.md, seção 3.2) — no estilo
// do ArchUnit citado em aula: em vez de testar comportamento, verificam as DEPENDÊNCIAS
// entre camadas lendo os `require` de cada arquivo. Se alguém (pessoa ou IA) criar um
// atalho que fure uma fronteira, o teste falha antes de o código chegar à main.

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const SRC = path.join(__dirname, '..', 'src');

// Arquivos .js de um diretório de src/ (recursivo), com caminho relativo a src/
function arquivosJs(dir) {
  const base = path.join(SRC, dir);
  return fs.readdirSync(base, { withFileTypes: true }).flatMap((item) => {
    const relativo = path.join(dir, item.name);
    if (item.isDirectory()) return arquivosJs(relativo);
    return item.name.endsWith('.js') ? [relativo] : [];
  });
}

function ler(relativo) {
  return fs.readFileSync(path.join(SRC, relativo), 'utf8');
}

// Módulos importados por um arquivo, como escritos no require (ex.: '../models', 'express')
function dependencias(relativo) {
  return [...ler(relativo).matchAll(/require\(\s*['"]([^'"]+)['"]\s*\)/g)].map((m) => m[1]);
}

// Caminho de destino de uma dependência local, relativo a src/ (ex.: 'rotas/autenticacao.js' → 'models')
function destinoLocal(relativo, dependencia) {
  if (!dependencia.startsWith('.')) return null;
  return path.relative(SRC, path.resolve(path.dirname(path.join(SRC, relativo)), dependencia));
}

function camadaDe(destino) {
  return destino.split(path.sep)[0].replace(/\.js$/, '');
}

function camadasImportadas(relativo) {
  return dependencias(relativo)
    .map((d) => destinoLocal(relativo, d))
    .filter(Boolean)
    .map(camadaDe);
}

const BACKEND = ['server.js', 'app.js', 'config.js', ...arquivosJs('rotas'), ...arquivosJs('servicos'), ...arquivosJs('models')];

describe('Regras de dependência entre camadas', () => {
  test('controle positivo: o analisador enxerga as dependências reais', () => {
    // Garante que os testes abaixo não passam por engano (analisador que não acha nada)
    assert.deepEqual(camadasImportadas(path.join('rotas', 'autenticacao.js')).sort(), ['models', 'servicos']);
    assert.ok(dependencias('app.js').includes('@supabase/supabase-js'));
  });

  test('domínio (models/) não depende de nenhuma outra camada nem de biblioteca externa', () => {
    for (const arquivo of arquivosJs('models')) {
      const externas = dependencias(arquivo).filter((d) => !d.startsWith('.'));
      assert.deepEqual(externas, [], `${arquivo} importa ${externas}`);
      const outras = camadasImportadas(arquivo).filter((c) => c !== 'models');
      assert.deepEqual(outras, [], `${arquivo} importa a camada ${outras}`);
    }
  });

  test('serviços (servicos/) não conhecem HTTP nem as rotas', () => {
    for (const arquivo of arquivosJs('servicos')) {
      assert.ok(!dependencias(arquivo).includes('express'), `${arquivo} importa express`);
      const proibidas = camadasImportadas(arquivo).filter((c) => ['rotas', 'app', 'server'].includes(c));
      assert.deepEqual(proibidas, [], `${arquivo} importa ${proibidas}`);
    }
  });

  test('rotas não conhecem o Supabase nem o adaptador: só a interface ServicoAutenticacao (PP-01)', () => {
    for (const arquivo of arquivosJs('rotas')) {
      const deps = dependencias(arquivo);
      assert.ok(!deps.some((d) => d.includes('supabase')), `${arquivo} importa o Supabase`);
      const destinos = deps.map((d) => destinoLocal(arquivo, d)).filter(Boolean);
      assert.ok(!destinos.some((d) => d.includes('adaptador')), `${arquivo} importa o adaptador`);
      assert.ok(!destinos.includes('app') && !destinos.includes('config'), `${arquivo} importa app.js ou config.js`);
    }
  });

  test('só app.js (raiz de composição) cria o cliente do Supabase e escolhe o adaptador', () => {
    const quemImportaSdk = BACKEND.filter((a) => dependencias(a).includes('@supabase/supabase-js'));
    assert.deepEqual(quemImportaSdk, ['app.js']);
    const quemImportaAdaptador = BACKEND.filter((a) =>
      dependencias(a).some((d) => d.includes('adaptador-supabase-auth')) && !a.startsWith('servicos'));
    assert.deepEqual(quemImportaAdaptador, ['app.js']);
  });

  test('variáveis de ambiente só são lidas em config.js (exceção documentada: RN-01 em models/usuario.js)', () => {
    const excecoes = [path.join('models', 'usuario.js')];
    const leitores = BACKEND.filter((a) => /process\.env|dotenv/.test(ler(a)) && !excecoes.includes(a));
    assert.deepEqual(leitores, ['config.js']);
  });
});

describe('Fronteira entre cliente e servidor', () => {
  const frontend = arquivosJs('public').concat(
    fs.readdirSync(path.join(SRC, 'public'), { recursive: true })
      .filter((f) => f.endsWith('.html'))
      .map((f) => path.join('public', f))
  );

  test('o frontend nunca fala com o Supabase nem contém chaves: só conversa com a API (/api)', () => {
    assert.ok(frontend.length > 0);
    for (const arquivo of frontend) {
      const conteudo = ler(arquivo);
      assert.doesNotMatch(conteudo, /supabase|SUPABASE_|eyJhbGci/i, arquivo);
      for (const [, url] of conteudo.matchAll(/fetch\(\s*['"`]([^'"`]+)['"`]/g)) {
        assert.match(url, /^\/api\//, `${arquivo} chama ${url}`);
      }
    }
  });
});

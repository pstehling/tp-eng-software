// Teste de exemplo (CT-00) — comprova que a estrutura inicial da Sprint 1
// está executável. Substitua/expanda com os casos de teste reais do projeto
// a partir da Sprint 7 (ver docs/testes/plano-de-testes.md).

const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

test('GET /api/status responde com status ok', async () => {
  const app = require(path.join(__dirname, '..', 'src', 'server.js'));
  const server = app.listen(0);
  const { port } = server.address();

  try {
    const resp = await fetch(`http://localhost:${port}/api/status`);
    const data = await resp.json();

    assert.equal(resp.status, 200);
    assert.equal(data.status, 'ok');
  } finally {
    server.close();
  }
});

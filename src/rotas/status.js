// Camada de apresentação (API HTTP) — verificação de execução da aplicação.
// Usada pelo CT-00 (tests/status.test.js) e como verificação de saúde no ambiente
// publicado (docs/arquitetura/arquitetura.md, seção 7).
const express = require('express');

function criarRotasStatus({ obterServicoAutenticacao }) {
  const rotas = express.Router();

  rotas.get('/status', (req, res) => {
    res.json({
      status: 'ok',
      mensagem: 'Aplicação While(estuda) em execução.',
      // Indica se o serviço externo de autenticação está configurado (sem expor chaves)
      servicos: {
        autenticacao: obterServicoAutenticacao() ? 'configurado' : 'nao_configurado',
      },
    });
  });

  return rotas;
}

module.exports = { criarRotasStatus };

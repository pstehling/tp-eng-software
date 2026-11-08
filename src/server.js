// Ponto de entrada do backend: sobe o servidor HTTP.
// A aplicação (rotas, serviços e frontend) é montada em app.js — ver
// docs/arquitetura/arquitetura.md.
const app = require('./app');
const config = require('./config');

// Só sobe o servidor quando o arquivo é executado diretamente (`npm start`),
// não quando é importado pelos testes em tests/.
if (require.main === module) {
  app.listen(config.porta, () => {
    console.log(`Aplicação disponível em ${config.urlAplicacao}`);
  });
}

// Os testes em tests/ importam a aplicação por este arquivo.
module.exports = app;

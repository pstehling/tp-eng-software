// Ponto único de importação dos modelos de domínio (ver docs/modelagem/modelagem.md, seção 6).
module.exports = {
  ...require('./usuario'),
  ...require('./questao'),
  ...require('./conversa'),
  ...require('./materiais'),
};

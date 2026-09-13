// Estrutura inicial da aplicação web — Sprint 1.
// Substitua/expanda esta estrutura pelo backend real do projeto,
// mantendo a documentação de execução em src/README.md atualizada.

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Exemplo de endpoint associado a um requisito (substitua pelo fluxo real).
// Relacione sempre o endpoint a um requisito e a uma Issue no README/documentação.
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    mensagem: 'Estrutura inicial executada. Implemente aqui o comportamento real do projeto.',
  });
});

// Só sobe o servidor quando o arquivo é executado diretamente (`npm start`),
// não quando é importado (ex.: pelos testes em tests/).
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Aplicação disponível em http://localhost:${PORT}`);
  });
}

module.exports = app;

# Testes

Este diretório contém os testes automatizados da aplicação (Node.js + `node:test`,
o executor de testes nativo do Node — não requer dependências extras).

## Como executar

```bash
cd src
npm test
```

Isso executa `node --test ../tests/*.test.js`, que roda todos os arquivos `*.test.js`
deste diretório.

A partir da Sprint 7, documente aqui:

- como instalar dependências de teste (caso o grupo troque de framework, ex. Jest/Vitest/Mocha);
- comando de execução;
- relação entre arquivos de teste e casos `CT-XX`;
- saída ou relatório esperado;
- limitações quando um teste precisar ser manual.

## Exemplo de mapeamento

| Caso | Arquivo de teste | Requisito |
|---|---|---|
| `CT-00` | `tests/status.test.js` | Estrutura inicial (Sprint 1) |
| `CT-01` | `tests/[PREENCHER].test.js` | `RF-01` |

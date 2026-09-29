# Testes

Este diretório contém os testes automatizados da aplicação (Node.js + `node:test`,
o executor de testes nativo do Node — não requer dependências extras).

## Como executar

```bash
cd src
npm install
npm test
```

Isso executa `node --test ../tests/*.test.js`, que roda todos os arquivos `*.test.js`
deste diretório. Os testes **não** precisam do `.env` nem de acesso à internet: o Supabase
é substituído por um cliente falso em `tests/auth.test.js`.

## Mapeamento

| Arquivo de teste | O que verifica | Requisitos / modelo |
|---|---|---|
| `tests/status.test.js` | A aplicação sobe e `GET /api/status` responde `200` (CT-00). | Estrutura inicial (Sprint 1) |
| `tests/models.test.js` | Regras dos modelos de domínio: cadastro e e-mail institucional, estados da conta, permissões, filtro e correção de questões, progresso, conversa com IA e validação de upload. | RF-01 a RF-11, RN-01 a RN-05, RNF-04 — diagrama de classes, 4.4 e 4.5 da modelagem |
| `tests/auth.test.js` | Fluxo de cadastro, e-mail repetido, conta pendente, login e recuperação de senha pela API. | RF-01, RF-02, RF-03, RN-01, RN-03 — diagrama 4.1 da modelagem |

A partir da Sprint 7, os casos de teste formais (`CT-XX`) serão documentados em
`docs/testes/plano-de-testes.md` e relacionados a estes arquivos.

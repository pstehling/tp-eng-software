# Testes automatizados

Este diretório contém a suíte completa de testes automatizados da aplicação While(estuda) (Node.js + `node:test`, o executor nativo do Node — não requer Jest, Mocha nem dependências adicionais).

Na **Sprint 7**, os testes foram estruturados e formalizados conforme o plano em [`docs/testes/plano-de-testes.md`](../docs/testes/plano-de-testes.md), cobrindo 60 testes em 13 suítes com 100% de aprovação.

## Como executar

Na raiz do repositório:

```bash
npm run instalar   # instala as dependências em src/
npm test           # executa os 60 testes automatizados
```

Ou dentro do diretório `src/`:

```bash
cd src
npm install
npm test
```

Os testes **não** necessitam de `.env` configurado nem de rede externa: o Supabase é simulado por dublês em memória nos testes de rota (`tests/auth.test.js`) e pela interface `ServicoAutenticacao` (`tests/adaptador-autenticacao.test.js`).

## Mapeamento de arquivos × Casos de teste (`CT-01` a `CT-15`)

| Arquivo de teste | Casos de teste cobertos | O que verifica | Requisitos / Decisões |
|---|:---:|---|---|
| `tests/auth.test.js` | `CT-01`, `CT-02`, `CT-03`, `CT-04`, `CT-05`, `CT-06`, `CT-07`, `CT-08`, `CT-10` | Fluxo completo de cadastro, e-mail repetido, bloqueio de conta não verificada, login com credenciais inválidas, tolerância a falha do provedor (T-06) e recuperação de senha. | `RF-01`, `RF-02`, `RF-03`, `RN-01`, `RN-03`, `R-01` |
| `tests/adaptador-autenticacao.test.js` | `CT-03`, `CT-05`, `CT-06`, `CT-09` | Padrão Adapter (`PP-01`): tradução de códigos de erro estáveis do Supabase, usuário fictício sem identidades, diferenciação de credenciais inválidas vs falha de comunicação (`T-06`), e independência das rotas em relação ao provedor. | `RF-01`, `RF-02`, `RF-03`, `RN-03`, `R-01` |
| `tests/models.test.js` | `CT-01`, `CT-04`, `CT-15` | Regras puras de domínio: cadastro, estados de conta (`Usuario`/`TokenVerificacao`), permissões (`RN-02`), filtro, correção e progresso de `Questao` (`RF-07` a `RF-09`), histórico de `ConversaIA` (`RF-10`) e regras de upload de `Materiais` (`RF-11`, `RNF-04`, `RN-04`). | `RN-01` a `RN-05`, `RF-07` a `RF-11`, `RNF-04` |
| `tests/arquitetura.test.js` | `CT-11`, `CT-14` | Integração arquitetural (`DA-01`, `DA-02`, `DA-04`, `DA-05`): frontend estático servido pela mesma origem, integridade de `/api/status`, resposta 404 em JSON e captura centralizada de exceções (500 sem crash). | `DA-01`, `DA-02`, `DA-04`, `DA-05` |
| `tests/regras-arquitetura.test.js` | `CT-12`, `CT-13` | Regras de dependência estrutural entre camadas (estilo ArchUnit, `DA-06`): isolamento do domínio, serviços sem HTTP, rotas sem SDK do Supabase, leitura de variáveis apenas em `config.js` e frontend sem chaves. | `DA-01` a `DA-06`, `R-02`, `R-06` |
| `tests/status.test.js` | `CT-11` | Verificação do servidor inicial e resposta 200 de `/api/status`. | `RNF-02`, `DA-04` |

---

## Evidências de execução

- [`docs/evidencias/sprint-07-testes-antes.txt`](../docs/evidencias/sprint-07-testes-antes.txt): execução dos 58 testes anteriores antes da correção de T-06.
- [`docs/evidencias/sprint-07-testes-depois.txt`](../docs/evidencias/sprint-07-testes-depois.txt): execução completa dos 60 testes aprovados da Sprint 7.

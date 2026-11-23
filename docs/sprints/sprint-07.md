# Sprint 7 — Estratégia de testes e primeira execução verificável

## 1. Identificação

- **Número:** 7
- **Período:** 09/11/2026 a 16/11/2026
- **Data limite:** 16/11/2026
- **Pontuação:** 2,5 pontos
- **Tag da entrega:** `sprint-07`
- **Link da tag:** [https://github.com/pstehling/tp-eng-software/releases/tag/sprint-07](https://github.com/pstehling/tp-eng-software/releases/tag/sprint-07)
- **Link do GitHub Project:** [https://github.com/users/pstehling/projects/2](https://github.com/users/pstehling/projects/2)
- **Link da aplicação publicada:** Ainda não publicada — aplicação roda localmente (`npm start` → `http://localhost:3000`). Publicação prevista para sprints futuras (T-10).
- **Responsável por conferir este arquivo:** `@gabrielrooocha`

---

## 2. Objetivo específico da sprint

**Pergunta que esta sprint deve responder:** *Quais riscos e funcionalidades serão testados, como e com quais resultados iniciais?*

- **Objetivo planejado:** Planejar e iniciar a execução dos testes da aplicação, relacionando requisitos, riscos, casos de teste e resultados; definir escopo, níveis e tipos de teste; identificar riscos prioritários; especificar casos de teste completos com critérios de aprovação/reprovação; atualizar matriz de rastreabilidade, backlog e critérios de aceitação; e implementar/executar os primeiros testes automatizados em fluxo prioritário com identificação e correção de defeito.
- **Resultado efetivamente alcançado:** Elaborado e entregue o plano formal em [`docs/testes/plano-de-testes.md`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/testes/plano-de-testes.md) contendo 15 casos de teste estruturados (CT-01 a CT-15), 6 riscos arquiteturais prioritários mapeados (R-01 a R-06), critérios rigorosos de aprovação/reprovação e estratégia de níveis (unidade, integração, sistema, arquitetura). Criado [`docs/testes/evidencias-testes.md`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/testes/evidencias-testes.md) consolidando a primeira execução verificável. Identificado e corrigido o defeito [T-06 (#22)](https://github.com/pstehling/tp-eng-software/issues/22): falhas de comunicação/rede do provedor de autenticação eram mascaradas como erro 401 de credenciais inválidas; o `AdaptadorSupabaseAuth` e a rota `/api/login` foram corrigidos para emitir HTTP 503 (`ERRO_SERVICO`), cobertos por novos testes unitários e de integração. A suíte passou de 58 para 60 testes automatizados, todos aprovados com zero falhas (`60 passed, 0 failed` em ~800 ms). Critérios de aceitação refinados em `docs/requisitos/requisitos.md`, backlog atualizado em `docs/backlog-produto.md` e rastreabilidade sincronizada em `docs/rastreabilidade.md`.

---

## 3. Diferença em relação à sprint anterior

- **O que é novo nesta sprint:**
  - Plano formal de testes ([`docs/testes/plano-de-testes.md`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/testes/plano-de-testes.md)) com escopo, pirâmide de testes (unidade, integração, arquitetural, sistema), 6 riscos arquiteturais mitigados, 15 casos de teste completos (CT-01 a CT-15), matriz requisito–teste e critérios de aprovação/reprovação.
  - Relatório de evidências de testes ([`docs/testes/evidencias-testes.md`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/testes/evidencias-testes.md)).
  - Correção e reteste do defeito crítico T-06 ([Issue #22](https://github.com/pstehling/tp-eng-software/issues/22)).
  - Dois novos testes automatizados em [`tests/adaptador-autenticacao.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/adaptador-autenticacao.test.js) e [`tests/auth.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/auth.test.js).
  - Logs brutos de execução versionados em [`docs/evidencias/sprint-07-testes-antes.txt`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/evidencias/sprint-07-testes-antes.txt) e [`docs/evidencias/sprint-07-testes-depois.txt`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/evidencias/sprint-07-testes-depois.txt).
  - Criação do documento de autoavaliação em [`rubrica/autoavaliacao-entregas.md`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/rubrica/autoavaliacao-entregas.md) (Apêndice A).

- **O que foi apenas atualizado:**
  - [`docs/requisitos/requisitos.md`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/requisitos/requisitos.md): refinamento dos critérios de aceitação de US-01 (tratamento HTTP 503) e US-02 (validação de domínio 400), e histórico de revisões da Sprint 7.
  - [`docs/backlog-produto.md`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/backlog-produto.md): registro da tarefa T-12 (Issue #30), conclusão do defeito T-06 (Issue #22), atualização do Sprint Backlog e histórico da Sprint 7.
  - [`docs/rastreabilidade.md`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/rastreabilidade.md): associação formal de cada requisito (RF-01 a RF-11, RNF-01 a RNF-04) aos casos de teste CT-01 a CT-15 e aos arquivos de teste em `tests/`.
  - [`tests/README.md`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/README.md): tabela de mapeamento entre arquivos de teste e casos CT-01..CT-15; instruções atualizadas de execução.
  - [`README.md`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/README.md): referência atualizada à suíte com 60 testes automatizados e link para o plano de testes.

- **Por que as alterações foram necessárias:**
  - A Sprint 7 do regulamento exige a formalização da estratégia de testes e a primeira execução verificável em fluxo prioritário. O defeito T-06, pendente desde a Sprint 5, foi reproduzido, corrigido e retestado para garantir que falhas de rede do provedor externo recebam HTTP 503 em vez de mascarar como erro 401 de senha errada. A documentação anterior foi atualizada para manter a rastreabilidade bidirecional exigida pela disciplina.

---

## 4. Sprint Backlog (Scrum e gestão do trabalho — 0,50 ponto)

### Tabela de itens da sprint

| Issue | Item | Responsável | Critério de aceitação | Estado |
|---|---|---|---|---|
| [#30](https://github.com/pstehling/tp-eng-software/issues/30) | `T-12` — Planejar e executar estratégia de testes da aplicação | `@gabrielrooocha` | `docs/testes/plano-de-testes.md` completo com escopo, níveis, riscos, CT-01 a CT-15, critérios e rastreabilidade; execução documentada; evidências registradas | **Concluído** |
| [#22](https://github.com/pstehling/tp-eng-software/issues/22) | `T-06` — Diferenciar falha de comunicação de credenciais inválidas no login | `@gabrielrooocha` | Retornar HTTP 503 com mensagem adequada quando houver falha de rede/serviço externo; testes unitários e de integração validando o comportamento | **Concluído** |

### Acompanhamento do Scrum

- **GitHub Project:** [Projeto TP Engenharia de Software](https://github.com/users/pstehling/projects/2) (Quadro Kanban com itens T-12 e T-06 concluídos na Sprint 7).
- **Processo adotado:** Práticas ágeis com priorização orientada a riscos (R-01 a R-06). Foco no fluxo de maior valor e maior risco (Autenticação/Contas).
- **Impedimentos:** Nenhum. A execução da suíte nativa `node:test` dispensou dependências pesadas e roda de forma determinística e veloz.
- **Mudanças de escopo:** Nenhuma. Foco mantido no planejamento e na primeira execução verificável da suíte.

---

## 5. Artefato central da disciplina — 0,75 ponto

- **Arquivo principal:** [`docs/testes/plano-de-testes.md`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/testes/plano-de-testes.md)
- **Conteúdo produzido:**
  - Definição formal de escopo, objetivos, níveis (unidade, integração, arquitetura, sistema) e tipos de teste (funcional, segurança, tolerância a falhas).
  - Identificação de 6 riscos prioritários derivados da arquitetura (`R-01` a `R-06`).
  - Especificação detalhada de 15 casos de teste (`CT-01` a `CT-15`) contendo identificador, requisitos vinculados, pré-condições, passos, dados de teste e resultados esperados.
  - Matriz de rastreabilidade entre requisitos funcionais/não funcionais e casos de teste.
  - Critérios formais de aprovação e reprovação da suíte de testes.
  - Relatório complementar em [`docs/testes/evidencias-testes.md`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/testes/evidencias-testes.md).
- **Relação com o conteúdo da disciplina:** Aplicação direta do Capítulo 8 (*Testes*) da bibliografia da disciplina (Engenharia de Software Moderna), contemplando pirâmide de testes, testes de regressão, testes de integração de API e testes de tolerância a falhas.

### Checklist do atendimento ao artefato central

- [x] Objetivo, escopo, tipos e níveis de teste definidos (Seções 1 e 2 de `plano-de-testes.md`).
- [x] Funcionalidades e riscos prioritários identificados (Seção 3 de `plano-de-testes.md`, mitigando riscos arquiteturais R-01 a R-06).
- [x] Casos com identificador, pré-condição, dados, passos e resultado esperado (Seção 4 de `plano-de-testes.md`, CT-01 a CT-15).
- [x] Matriz de rastreabilidade entre requisitos e testes (Seção 5 de `plano-de-testes.md` e `docs/rastreabilidade.md`).
- [x] Critérios para aprovação ou reprovação dos testes estabelecidos (Seção 7 de `plano-de-testes.md`).
- [x] Primeiros resultados registrados com evidência legível (Seção 6 de `plano-de-testes.md`, `docs/testes/evidencias-testes.md` e saídas brutas em `docs/evidencias/`).
- [x] Código de testes em `tests/` executável via `npm test` (13 arquivos de suíte, 60 testes passando).
- [x] Defeitos registrados e ao menos uma correção com reteste comprovado (defeito T-06 / Issue #22 corrigido e validado via CT-06).

### Tabela de artefatos produzidos/atualizados

| Artefato criado/atualizado | Link na tag da sprint | O que mudou |
|---|---|---|
| `docs/testes/plano-de-testes.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/testes/plano-de-testes.md) | **Criado:** escopo, níveis, tipos, 6 riscos prioritários, 15 casos de teste (CT-01 a CT-15), matriz de rastreabilidade e critérios de aprovação |
| `docs/testes/evidencias-testes.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/testes/evidencias-testes.md) | **Criado:** relatório detalhado da primeira execução de testes, análise de cobertura e ciclo de correção e reteste do defeito T-06 |
| `rubrica/autoavaliacao-entregas.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-07/rubrica/autoavaliacao-entregas.md) | **Criado:** autoavaliação contínua das entregas e evolução do grupo (Apêndice A) |
| `docs/requisitos/requisitos.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/requisitos/requisitos.md) | Refinamento dos critérios de aceitação de US-01 (tratamento HTTP 503) e US-02 (validação de domínio 400), e histórico de revisões |
| `docs/backlog-produto.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/backlog-produto.md) | Registro da tarefa T-12 (Issue #30), conclusão do defeito T-06 (Issue #22), atualização do Sprint Backlog e histórico da Sprint 7 |
| `docs/rastreabilidade.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/rastreabilidade.md) | Mapeamento completo entre requisitos (RF-01 a RF-11, RNF-01 a RNF-04), casos CT-01 a CT-15 e arquivos de teste em `tests/` |
| `tests/README.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/README.md) | Atualização da estrutura de testes, mapeamento com CT-01..CT-15 e instruções de execução |
| `docs/evidencias/sprint-07-testes-antes.txt` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/evidencias/sprint-07-testes-antes.txt) | Saída legível da execução antes da correção do defeito T-06 (58 testes aprovados) |
| `docs/evidencias/sprint-07-testes-depois.txt` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/evidencias/sprint-07-testes-depois.txt) | Saída legível da execução após correção e novos testes do defeito T-06 (60 testes aprovados) |
| `README.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-07/README.md) | Referência atualizada à suíte com 60 testes automatizados e link para o plano de testes |
| `docs/evidencias/sprint-07-testes-defeito-ct06.txt` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/evidencias/sprint-07-testes-defeito-ct06.txt) | Suíte atual executada contra o código anterior à correção: os 2 testes do CT-06 reprovam (`401 !== 503`), comprovando o defeito T-06 |

---

## 6. Artefatos anteriores atualizados

| Arquivo | Alteração | Motivo | Commit |
|---|---|---|---|
| `docs/requisitos/requisitos.md` | Refinamento dos critérios de aceitação de US-01 (HTTP 503 em falha de serviço) e US-02 (validação de e-mail 400) | Alinhar os critérios de aceitação à especificação dos testes e à correção do defeito T-06 | [`f505890`](https://github.com/pstehling/tp-eng-software/commit/f505890) |
| `docs/backlog-produto.md` | Registro de T-12 (Issue #30), conclusão de T-06 (Issue #22), atualização da sprint corrente e histórico | Refletir o encerramento do defeito e a execução da estratégia de testes no backlog | [`f505890`](https://github.com/pstehling/tp-eng-software/commit/f505890) |
| `docs/rastreabilidade.md` | Mapeamento completo entre requisitos funcionais e não funcionais e os casos CT-01 a CT-15 | Garantir rastreabilidade bidirecional entre requisitos, testes e evidências | [`f505890`](https://github.com/pstehling/tp-eng-software/commit/f505890) |
| `tests/README.md` | Tabela de rastreamento de testes automatizados com CT-01 a CT-15 e guia de execução | Documentar como cada caso do plano formal é verificado pela suíte de código | [`f505890`](https://github.com/pstehling/tp-eng-software/commit/f505890) |
| `README.md` | Referência atualizada para 60 testes passando e links para o plano de testes | Manter o arquivo de entrada do repositório fiel ao estado do software | [`f505890`](https://github.com/pstehling/tp-eng-software/commit/f505890) |

---

## 7. Incremento da aplicação web — 0,75 ponto

### Funcionalidades e estruturas criadas ou evoluídas

1. **Estratégia e automação do fluxo prioritário de Autenticação e Gestão de Contas (RF-01, RF-02, RF-03, RN-01, RN-02, RN-04, RNF-02):**
   - Foram executados e validados todos os testes automatizados de unidade e integração cobrindo cadastro com validação de formato e e-mail institucional UFLA (`@estudante.ufla.br` e `@ufla.br`), login com credenciais válidas e inválidas, e fluxo de recuperação de senha.
2. **Correção do defeito crítico T-06 ([Issue #22](https://github.com/pstehling/tp-eng-software/issues/22)):**
   - **Problema diagnosticado:** No [`src/servicos/adaptador-supabase-auth.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/servicos/adaptador-supabase-auth.js), qualquer falha retornada pela biblioteca de autenticação era convertida genericamente em `MOTIVOS.CREDENCIAS_INVALIDAS`, e em [`src/rotas/autenticacao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/rotas/autenticacao.js) retornava HTTP 401. Quando o serviço ou conexão externa falhava, o usuário recebia aviso incorreto de senha errada.
   - **Solução implementada:** Criada checagem específica de credenciais inválidas (`invalid_credentials`, `invalid_grant`). Para outros erros (falha de rede, timeout, serviço fora do ar), o adaptador retorna `falha(MOTIVOS.ERRO_SERVICO, error.message)`. Na rota `/api/login`, o código HTTP emitido passou a ser `503 Service Unavailable`, com mensagem informativa (`Serviço de autenticação temporariamente indisponível. Tente novamente mais tarde.`).
3. **Novos testes automatizados adicionados:**
   - [`tests/adaptador-autenticacao.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/adaptador-autenticacao.test.js): teste unitário verificando retorno de `ERRO_SERVICO` em falha inesperada/queda de conexão do provedor.
   - [`tests/auth.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/auth.test.js): teste de integração verificando resposta HTTP 503 na rota `/api/login` diante de indisponibilidade de serviço.
4. **Resultados e integridade:**
   - A suíte passou de 58 para **60 testes automatizados**, mantendo 100% de aprovação (0 regressões) em 13 arquivos de teste.

### Como executar e verificar

```bash
# Na raiz do repositório:
npm run instalar
npm test
```

Para verificar o relatório detalhado e a saída bruta:
- Execução bruta: `docs/evidencias/sprint-07-testes-depois.txt`
- Relatório de evidências: `docs/testes/evidencias-testes.md`

### Tabela de vínculo Requisito/Issue × Código × Evidência

| Requisito/Issue | Código ou protótipo | Evidência de execução |
|---|---|---|
| RF-01, RF-02, RF-03 / [#1](https://github.com/pstehling/tp-eng-software/issues/1), [#2](https://github.com/pstehling/tp-eng-software/issues/2), [#30](https://github.com/pstehling/tp-eng-software/issues/30) | [`src/rotas/autenticacao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/rotas/autenticacao.js), [`src/servicos/adaptador-supabase-auth.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/servicos/adaptador-supabase-auth.js) | [`tests/auth.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/auth.test.js), [`tests/adaptador-autenticacao.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/adaptador-autenticacao.test.js), [`docs/evidencias/sprint-07-testes-depois.txt`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/evidencias/sprint-07-testes-depois.txt) |
| RN-04, RNF-02 / [Issue #22 (T-06)](https://github.com/pstehling/tp-eng-software/issues/22) | Tratamento de `ERRO_SERVICO` (HTTP 503) em `src/rotas/autenticacao.js` e `src/servicos/adaptador-supabase-auth.js` | CT-06 aprovado com 2 novos testes automatizados; [evidência antes](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/evidencias/sprint-07-testes-antes.txt) e [evidência depois](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/evidencias/sprint-07-testes-depois.txt) |
| RNF-01 a RNF-04 / [Issue #30 (T-12)](https://github.com/pstehling/tp-eng-software/issues/30) | [`tests/regras-arquitetura.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/regras-arquitetura.test.js), [`tests/arquitetura.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/arquitetura.test.js) | 13 testes de arquitetura e conformidade aprovados |

---

## 8. Rastreabilidade — 0,50 ponto

### Tabela de rastreabilidade (Item × Issue/Requisito × Artefato × Evidência)

| Item | Issue/Requisito | Artefato ou código | Commit/Teste/Evidência |
|---|---|---|---|
| CT-01 | RF-01, RN-01 / [#2](https://github.com/pstehling/tp-eng-software/issues/2) | [`src/models/usuario.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/models/usuario.js), [`src/rotas/autenticacao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/rotas/autenticacao.js) | [`tests/auth.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/auth.test.js#L58), [`tests/models.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/models.test.js#L14) |
| CT-02 | RF-01, RF-03 / [#2](https://github.com/pstehling/tp-eng-software/issues/2) | [`src/rotas/autenticacao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/rotas/autenticacao.js) | [`tests/auth.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/auth.test.js#L65) |
| CT-03 | RF-01, US-02 / [#2](https://github.com/pstehling/tp-eng-software/issues/2) | [`src/rotas/autenticacao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/rotas/autenticacao.js) | [`tests/auth.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/auth.test.js#L72), [`tests/adaptador-autenticacao.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/adaptador-autenticacao.test.js#L56) |
| CT-04 | RF-02, RN-03 / [#1](https://github.com/pstehling/tp-eng-software/issues/1) | [`src/models/usuario.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/models/usuario.js), [`src/rotas/autenticacao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/rotas/autenticacao.js) | [`tests/auth.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/auth.test.js#L78), [`tests/models.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/models.test.js#L26) |
| CT-05 | RF-02, US-01 / [#1](https://github.com/pstehling/tp-eng-software/issues/1) | [`src/rotas/autenticacao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/rotas/autenticacao.js) | [`tests/auth.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/auth.test.js#L84), [`tests/adaptador-autenticacao.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/adaptador-autenticacao.test.js#L85) |
| CT-06 | RF-02, R-01 / [#22](https://github.com/pstehling/tp-eng-software/issues/22) | [`src/servicos/adaptador-supabase-auth.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/servicos/adaptador-supabase-auth.js), [`src/rotas/autenticacao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/rotas/autenticacao.js) | [`tests/adaptador-autenticacao.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/adaptador-autenticacao.test.js#L93), [`tests/auth.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/auth.test.js#L91) |
| CT-07 | RF-02, US-01 / [#1](https://github.com/pstehling/tp-eng-software/issues/1) | [`src/rotas/autenticacao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/rotas/autenticacao.js) | [`tests/auth.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/auth.test.js#L101) |
| CT-08 | RF-03, US-02 / [#2](https://github.com/pstehling/tp-eng-software/issues/2) | [`src/rotas/autenticacao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/rotas/autenticacao.js) | [`tests/auth.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/auth.test.js#L108) |
| CT-09 | RF-03 / [#2](https://github.com/pstehling/tp-eng-software/issues/2) | [`src/servicos/adaptador-supabase-auth.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/servicos/adaptador-supabase-auth.js) | [`tests/adaptador-autenticacao.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/adaptador-autenticacao.test.js#L102) |
| CT-10 | RF-01, RF-03, RNF-02 / [#2](https://github.com/pstehling/tp-eng-software/issues/2) | [`src/rotas/autenticacao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/rotas/autenticacao.js) | [`tests/auth.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/auth.test.js#L114) |
| CT-11 | DA-04, RNF-02 / [#30](https://github.com/pstehling/tp-eng-software/issues/30) | [`src/rotas/status.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/rotas/status.js) | [`tests/status.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/status.test.js#L9), [`tests/arquitetura.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/arquitetura.test.js#L38) |
| CT-12 | DA-01 a DA-06, R-06 / [#30](https://github.com/pstehling/tp-eng-software/issues/30) | [`src/models/`](https://github.com/pstehling/tp-eng-software/tree/sprint-07/src/models), [`src/servicos/`](https://github.com/pstehling/tp-eng-software/tree/sprint-07/src/servicos), [`src/rotas/`](https://github.com/pstehling/tp-eng-software/tree/sprint-07/src/rotas) | [`tests/regras-arquitetura.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/regras-arquitetura.test.js#L104) |
| CT-13 | DA-04, RN-05, RNF-02 / [#30](https://github.com/pstehling/tp-eng-software/issues/30) | [`src/public/`](https://github.com/pstehling/tp-eng-software/tree/sprint-07/src/public) | [`tests/regras-arquitetura.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/regras-arquitetura.test.js#L136) |
| CT-14 | DA-05 / [#30](https://github.com/pstehling/tp-eng-software/issues/30) | [`src/app.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/app.js) | [`tests/arquitetura.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/arquitetura.test.js#L46) |
| CT-15 | RF-07 a RF-11, RN-01 a RN-05, RNF-04 / [#6](https://github.com/pstehling/tp-eng-software/issues/6) a [#10](https://github.com/pstehling/tp-eng-software/issues/10) | [`src/models/questao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/models/questao.js), [`src/models/materiais.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/models/materiais.js), [`src/models/conversa.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/models/conversa.js) | [`tests/models.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/models.test.js#L37) |

---

## 9. Evidências de colaboração

| Integrante | Issues/atividades | Commits ou PRs relevantes |
|---|---|---|
| `@gabrielrooocha` | Elaboração do plano de testes (`CT-01` a `CT-15`), correção do defeito T-06 (Issue #22), criação dos testes de tolerância a falhas e documentação da Sprint 7 | [`f505890`](https://github.com/pstehling/tp-eng-software/commit/f505890), [`55b2c25`](https://github.com/pstehling/tp-eng-software/commit/55b2c25) |
| `@pstehling` | Revisão técnica da rastreabilidade requisito–teste, validação da suíte em ambiente local, atualização de backlog e autoavaliação de rubrica | Revisão de PRs, gestão do Scrum e controle da tag `sprint-07` |
| `@gabrielcarvalho28` | Revisão dos casos de teste de requisitos de domínio (`RF-07` a `RF-11`) e critérios de aceitação | Revisão dos artefatos em `docs/requisitos/requisitos.md` |
| `@joaovitormv` | Validação de integração do backend de autenticação com o adaptador do Supabase | Apoio na especificação dos testes de login e recuperação de senha |
| `@IsadoraRB-dge` | Revisão e verificação dos critérios de aceitação de cadastro e estados de conta | Apoio na validação de regras de domínio de `Usuario` |

---

## 10. Reuniões e acompanhamento

| Data | Participantes | Decisões | Encaminhamentos |
|---|---|---|---|
| 11/11/2026 | `@gabrielrooocha`, `@pstehling`, `@joaovitormv` | Adotar a pirâmide de testes do cap. 8 com executor nativo `node:test` (sem dependências externas) para assegurar portabilidade | Estruturar os casos de teste `CT-01` a `CT-15` em `docs/testes/plano-de-testes.md` |
| 14/11/2026 | `@gabrielrooocha`, `@pstehling` | Priorizar a correção do defeito T-06 (falha de rede reportando erro 401 incorretamente) como incremento da Sprint 7 | Implementar resposta HTTP 503 (`ERRO_SERVICO`) no adaptador e rotas; adicionar testes unitários e de integração |
| 16/11/2026 | Todos os integrantes | Validação da execução completa da suíte (60 testes aprovados, zero regressões); fechamento da Sprint 7 e preparação da tag | Criar a tag `sprint-07`, atualizar a documentação e preparar a Sprint 8 (testes de carga e acessibilidade) |

---

## 11. Revisão do incremento

- **O que foi concluído:** Apresentação da estratégia global de testes; formalização de 15 casos de teste (`CT-01` a `CT-15`); execução documentada de 60 testes automatizados cobrindo regras de negócio, limites e arquitetura; e demonstração prática do ciclo de detecção, registro, correção e reteste do defeito T-06.
- **O que não foi concluído:** Execução de testes de carga simulada de concorrência (`RNF-03`) e auditoria automatizada de acessibilidade/desempenho Lighthouse (`RNF-01`).
- **Demonstração realizada:** Execução completa da suíte com `npm test` na raiz do projeto (60 testes em 13 suítes, 100% de aprovação em menos de 1 segundo).
- **Feedback recebido:** Ajustada a especificação de resposta da API para separar expressamente erros do cliente (401 - credenciais erradas) de erros de infraestrutura externa (503 - serviço fora do ar).
- **Ajustes necessários:** Alocar os testes não funcionais (carga e Lighthouse) para a Sprint 8, que consolidará e estabilizará a aplicação.

---

## 12. Dificuldades e riscos

- **Dificuldade encontrada:** A biblioteca de autenticação externa gerava erros com formatos heterogêneos de mensagem em inglês. Para tornar a API confiável e o teste determinístico, foi necessário inspecionar os códigos internos (`invalid_credentials`, `invalid_grant`) e isolar as falhas de rede no `AdaptadorSupabaseAuth`.
- **Riscos tratados:**
  - `R-01` (Indisponibilidade do provedor): mitigado pelo defeito T-06 corrigido e coberto pelos testes `CT-06`.
  - `R-02` (Exposição de segredos): mitigado pelo endpoint `/api/status` e testes `CT-11` e `CT-13`.
  - `R-03` (Acesso de contas não verificadas): mitigado pelo bloqueio 403 coberto por `CT-04`.
  - `R-06` (Erosão arquitetural): mitigado por 13 testes de dependência de camadas em `CT-12` e `CT-13`.

---

## 13. Pendências para a próxima sprint (Sprint 8)

1. **Consolidação e estabilização:** Execução e ampliação de testes para os fluxos secundários (`RF-04` a `RF-11`).
2. **Testes não funcionais:** Configurar análise de acessibilidade e boas práticas via Lighthouse (`RNF-01`) e simulação de carga sob concorrência (`RNF-03`).
3. **Fechamento e débitos:** Avaliar avanço dos débitos arquiteturais T-08 (proteção de rotas com JWT) e T-09 (persistência de questões).
4. **Relatório final consolidado:** Elaborar `docs/testes/evidencias-testes.md` consolidando a validação final da Sprint 8.

---

## 14. Checklist da entrega

- [x] Artefato central presente (`docs/testes/plano-de-testes.md` completo e fundamentado)
- [x] Backlog e quadro atualizados (GitHub Project e `docs/backlog-produto.md`)
- [x] Incremento executável ou demonstrável (60 testes automatizados, fluxo prioritário e defeito corrigido)
- [x] Links para Issues e commits
- [x] Evidências de todos os integrantes
- [x] Documentação anterior atualizada (`requisitos.md`, `backlog-produto.md`, `rastreabilidade.md`, `README.md`)
- [x] Estrutura mínima de diretórios e arquivos respeitada (inclusive `rubrica/autoavaliacao-entregas.md`)
- [x] Tag criada (`sprint-07`)
- [ ] Link permanente enviado no UFLA Virtual (a ser enviado pelo aluno no portal acadêmico)

---

## 15. Links enviados no UFLA Virtual

- **Tag `sprint-07`:** [https://github.com/pstehling/tp-eng-software/releases/tag/sprint-07](https://github.com/pstehling/tp-eng-software/releases/tag/sprint-07)
- **Este arquivo na tag:** [https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/sprints/sprint-07.md](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/sprints/sprint-07.md)
- **Aplicação:** Local (`http://localhost:3000`). Publicação prevista na Sprint 8 / Entrega final.
- **Observação adicional:** Primeira execução verificável entregue com 60 testes automatizados aprovados (0 falhas) e correção comprovada do defeito T-06 (Issue #22).

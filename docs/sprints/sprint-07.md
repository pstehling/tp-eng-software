# Sprint 7 — Estratégia de testes e primeira execução verificável

- **Data de entrega:** 16/11/2026
- **Pontuação:** 2,5 pontos
- **Tag obrigatória:** `sprint-07`
- **Responsável por conferir este arquivo:** `@gabrielrooocha`

## 1. Pergunta que esta sprint deve responder

**Quais riscos e funcionalidades serão testados, como e com quais resultados iniciais?**

## 2. Objetivo e resultado da sprint

**Objetivo planejado:** Planejar e iniciar a execução dos testes da aplicação, relacionando requisitos, riscos, casos de teste e resultados; definir escopo, níveis e tipos de teste; identificar riscos prioritários; especificar casos de teste completos com critérios de aprovação/reprovação; atualizar matriz de rastreabilidade, backlog e critérios de aceitação; e implementar/executar os primeiros testes automatizados em fluxo prioritário com identificação e correção de defeito.

**Resultado efetivamente alcançado:** Elaborado e entregue o plano formal em [`docs/testes/plano-de-testes.md`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/testes/plano-de-testes.md) contendo 15 casos de teste estruturados (CT-01 a CT-15), 6 riscos arquiteturais prioritários mapeados (R-01 a R-06), critérios rigorosos de aprovação/reprovação e estratégia de níveis (unidade, integração, sistema, arquitetura). Criado [`docs/testes/evidencias-testes.md`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/testes/evidencias-testes.md) consolidando a primeira execução verificável. Identificado e corrigido o defeito [T-06 (#22)](https://github.com/pstehling/tp-eng-software/issues/22): falhas de comunicação/rede do provedor de autenticação eram mascaradas como erro 401 de credenciais inválidas; o `AdaptadorSupabaseAuth` e a rota `/api/login` foram corrigidos para emitir HTTP 503 (`ERRO_SERVICO`), cobertos por novos testes unitários e de integração. A suíte passou de 58 para 60 testes automatizados, todos aprovados com zero falhas (`60 passed, 0 failed` em 235 ms). Critérios de aceitação refinados em `docs/requisitos/requisitos.md`, backlog atualizado em `docs/backlog-produto.md` e rastreabilidade sincronizada em `docs/rastreabilidade.md`.

## 3. Checklist do artefato central — 0,75 ponto

**Entrega esperada:** `docs/testes/plano-de-testes.md`, casos de teste completos, critérios de aprovação e matriz requisito–teste.

- [x] Objetivo, escopo, tipos e níveis de teste definidos (Seções 1 e 2 de `plano-de-testes.md`).
- [x] Funcionalidades e riscos prioritários identificados (Seção 3 de `plano-de-testes.md`, mitigando riscos arquiteturais R-01 a R-06).
- [x] Casos com identificador, pré-condição, dados, passos e resultado esperado (Seção 4 de `plano-de-testes.md`, CT-01 a CT-15).
- [x] Matriz de rastreabilidade entre requisitos e testes (Seção 5 de `plano-de-testes.md` e `docs/rastreabilidade.md`).
- [x] Critérios para aprovação ou reprovação dos testes estabelecidos (Seção 7 de `plano-de-testes.md`).
- [x] Primeiros resultados registrados com evidência legível (Seção 6 de `plano-de-testes.md`, `docs/testes/evidencias-testes.md` e saídas brutas em `docs/evidencias/`).
- [x] Código de testes em `tests/` executável via `npm test` (13 arquivos de suíte, 60 testes passando).
- [x] Defeitos registrados e ao menos uma correção com reteste comprovado (defeito T-06 / Issue #22 corrigido e validado via CT-06).

### Links dos artefatos

| Artefato criado/atualizado | Link na tag da sprint | O que mudou |
|---|---|---|
| `docs/testes/plano-de-testes.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/testes/plano-de-testes.md) | **Criado:** escopo, níveis, tipos, 6 riscos prioritários, 15 casos de teste (CT-01 a CT-15), matriz de rastreabilidade e critérios de aprovação |
| `docs/testes/evidencias-testes.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/testes/evidencias-testes.md) | **Criado:** relatório detalhado da primeira execução de testes, análise de cobertura e ciclo de correção e reteste do defeito T-06 |
| `docs/requisitos/requisitos.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/requisitos/requisitos.md) | Refinamento dos critérios de aceitação de US-01 (tratamento HTTP 503) e US-02 (validação de domínio 400), e histórico de revisões |
| `docs/backlog-produto.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/backlog-produto.md) | Registro da tarefa T-12 (Issue #30), conclusão do defeito T-06 (Issue #22), atualização do Sprint Backlog e histórico da Sprint 7 |
| `docs/rastreabilidade.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/rastreabilidade.md) | Mapeamento completo entre requisitos (RF-01 a RF-11, RNF-01 a RNF-04), casos CT-01 a CT-15 e arquivos de teste em `tests/` |
| `tests/README.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/README.md) | Atualização da estrutura de testes, mapeamento com CT-01..CT-15 e instruções de execução |
| `docs/evidencias/sprint-07-testes-antes.txt` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/evidencias/sprint-07-testes-antes.txt) | Saída legível da execução antes da correção do defeito T-06 (58 testes aprovados) |
| `docs/evidencias/sprint-07-testes-depois.txt` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/evidencias/sprint-07-testes-depois.txt) | Saída legível da execução após correção e novos testes do defeito T-06 (60 testes aprovados) |
| `README.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-07/README.md) | Referência atualizada à suíte com 60 testes automatizados e link para o plano de testes |

## 4. Incremento da aplicação web — 0,75 ponto

**Incremento mínimo esperado:** Testes executados para ao menos um fluxo prioritário, saída/relatório preservado e defeitos registrados como Issues.

### O que foi implementado ou evoluído

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

| Requisito/Issue | Código ou protótipo | Evidência de execução |
|---|---|---|
| RF-01, RF-02, RF-03 / [#1](https://github.com/pstehling/tp-eng-software/issues/1), [#2](https://github.com/pstehling/tp-eng-software/issues/2), [#30](https://github.com/pstehling/tp-eng-software/issues/30) | [`src/rotas/autenticacao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/rotas/autenticacao.js), [`src/servicos/adaptador-supabase-auth.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/servicos/adaptador-supabase-auth.js) | [`tests/auth.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/auth.test.js), [`tests/adaptador-autenticacao.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/adaptador-autenticacao.test.js), [`docs/evidencias/sprint-07-testes-depois.txt`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/evidencias/sprint-07-testes-depois.txt) |
| RN-04, RNF-02 / [Issue #22 (T-06)](https://github.com/pstehling/tp-eng-software/issues/22) | Tratamento de `ERRO_SERVICO` (HTTP 503) em `src/rotas/autenticacao.js` e `src/servicos/adaptador-supabase-auth.js` | CT-06 aprovado com 2 novos testes automatizados; [evidência antes](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/evidencias/sprint-07-testes-antes.txt) e [evidência depois](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/evidencias/sprint-07-testes-depois.txt) |
| RNF-01 a RNF-04 / [Issue #30 (T-12)](https://github.com/pstehling/tp-eng-software/issues/30) | [`tests/regras-arquitetura.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/regras-arquitetura.test.js), [`tests/arquitetura.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/arquitetura.test.js) | 13 testes de arquitetura e conformidade aprovados |

## 5. Scrum e gestão do trabalho — 0,50 ponto

### Sprint Backlog

| Issue | Descrição | Responsável | Critério de aceitação/conclusão | Situação |
|---|---|---|---|---|
| [#30](https://github.com/pstehling/tp-eng-software/issues/30) | T-12 — Planejar e executar estratégia de testes da aplicação | `@gabrielrooocha` | `docs/testes/plano-de-testes.md` completo com escopo, níveis, riscos, CT-01 a CT-15, critérios e rastreabilidade; execução documentada; evidências registradas | Concluída |
| [#22](https://github.com/pstehling/tp-eng-software/issues/22) | T-06 — Diferenciar falha de comunicação de credenciais inválidas no login | `@gabrielrooocha` | Retornar HTTP 503 com mensagem adequada quando houver falha de rede/serviço externo; testes unitários e de integração validando o comportamento | Concluída |

### Acompanhamento

- **GitHub Project:** [Projeto TP Engenharia de Software](https://github.com/users/pstehling/projects/1) (Quadro Kanban com itens T-12 e T-06 concluídos na Sprint 7).
- **Reuniões/decisões:** Estratégia de testes alinhada com o modelo arquitetural de três camadas da Sprint 6; decisão de utilizar o `node:test` nativo sem bibliotecas de terceiros para garantir portabilidade e execução determinística.
- **Impedimentos:** Nenhum. Execução local via Node.js test runner nativo rápida e confiável (235 ms).
- **Mudanças de escopo:** Nenhuma. Foco mantido na estratégia de testes e execução do fluxo prioritário de autenticação e contas.

## 6. GitHub, documentação e rastreabilidade — 0,50 ponto

| Tipo de evidência | Link | O que comprova |
|---|---|---|
| Issue | [#30](https://github.com/pstehling/tp-eng-software/issues/30) | Tarefa T-12 (Estratégia e plano de testes) |
| Issue | [#22](https://github.com/pstehling/tp-eng-software/issues/22) | Defeito T-06 (Diferenciação de falha de comunicação e credenciais inválidas) |
| Commit | [`feat(testes): planeja e executa testes da Sprint 7 e corrige defeito T-06`](https://github.com/pstehling/tp-eng-software/commits/sprint-07) | Implementação dos artefatos de teste, correção do defeito T-06 e atualização documental |
| Código/arquivo | [`src/servicos/adaptador-supabase-auth.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/servicos/adaptador-supabase-auth.js), [`src/rotas/autenticacao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/rotas/autenticacao.js) | Correção da identificação de falhas de comunicação e resposta HTTP 503 |
| Testes automatizados | [`tests/adaptador-autenticacao.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/adaptador-autenticacao.test.js), [`tests/auth.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/auth.test.js) | Casos automatizados cobrindo o defeito corrigido |
| Relatórios de evidência | [`docs/testes/evidencias-testes.md`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/testes/evidencias-testes.md), [`docs/evidencias/sprint-07-testes-depois.txt`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/evidencias/sprint-07-testes-depois.txt) | Saída legível e consolidada da execução de 60 testes automatizados aprovados |

### Rastreabilidade resumida

| Requisito | Issue | Artefato/modelo/decisão | Código | Teste/evidência |
|---|---|---|---|---|
| `RF-01` | [#1](https://github.com/pstehling/tp-eng-software/issues/1), [#30](https://github.com/pstehling/tp-eng-software/issues/30) | `docs/testes/plano-de-testes.md` (CT-01, CT-02) | [`src/rotas/autenticacao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/rotas/autenticacao.js) | [`tests/auth.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/auth.test.js) |
| `RF-02` | [#1](https://github.com/pstehling/tp-eng-software/issues/1), [#22](https://github.com/pstehling/tp-eng-software/issues/22), [#30](https://github.com/pstehling/tp-eng-software/issues/30) | `docs/testes/plano-de-testes.md` (CT-04, CT-05, CT-06) | [`src/rotas/autenticacao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/rotas/autenticacao.js), [`src/servicos/adaptador-supabase-auth.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/servicos/adaptador-supabase-auth.js) | [`tests/auth.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/auth.test.js), [`tests/adaptador-autenticacao.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/adaptador-autenticacao.test.js) |
| `RF-03` | [#2](https://github.com/pstehling/tp-eng-software/issues/2), [#30](https://github.com/pstehling/tp-eng-software/issues/30) | `docs/testes/plano-de-testes.md` (CT-07, CT-08) | [`src/rotas/autenticacao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/rotas/autenticacao.js) | [`tests/auth.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/auth.test.js) |
| `RF-04` a `RF-10` | [#4](https://github.com/pstehling/tp-eng-software/issues/4) a [#10](https://github.com/pstehling/tp-eng-software/issues/10) | `docs/testes/plano-de-testes.md` (CT-10, CT-11, CT-13) | [`src/models/questao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/models/questao.js), [`src/models/materiais.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/models/materiais.js) | [`tests/models.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/models.test.js) |
| `RNF-01` | [#3](https://github.com/pstehling/tp-eng-software/issues/3) | `docs/testes/plano-de-testes.md` (CT-14) | [`src/public/`](https://github.com/pstehling/tp-eng-software/tree/sprint-07/src/public) | [`tests/arquitetura.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/arquitetura.test.js) (estrutural); Lighthouse planejado para a Sprint 8 |
| `RNF-02` | [#1](https://github.com/pstehling/tp-eng-software/issues/1), [#24](https://github.com/pstehling/tp-eng-software/issues/24) | `docs/testes/plano-de-testes.md` (CT-15) | [`src/config.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/config.js), [`src/servicos/`](https://github.com/pstehling/tp-eng-software/tree/sprint-07/src/servicos) | [`tests/regras-arquitetura.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/regras-arquitetura.test.js); JWT em rotas privadas pendente (T-08) |
| `RNF-04` | [#10](https://github.com/pstehling/tp-eng-software/issues/10) | `docs/testes/plano-de-testes.md` (CT-13) | [`src/models/materiais.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/src/models/materiais.js) | [`tests/models.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-07/tests/models.test.js) |

## 7. Revisão do incremento

- **O que foi demonstrado:** Apresentação da estratégia global de testes, formalização de 15 casos de teste (CT-01 a CT-15), execução documentada de 60 testes automatizados cobrindo regras de negócio, limites e arquitetura, e demonstração prática do ciclo de detecção, registro, correção e reteste do defeito T-06.
- **Critérios atendidos:** Todos os critérios de aceitação da Sprint 7 foram atendidos com rigor, incluindo todos os artefatos obrigatórios, rastreabilidade bidirecional e evidências no repositório.
- **Itens não concluídos:** Execução de testes de carga (RNF-03) e auditoria automatizada de desempenho Lighthouse (RNF-01).
- **Motivo das pendências:** Conforme as diretrizes da disciplina, a Sprint 7 é dedicada ao planejamento e primeira execução verificável em fluxo prioritário; a consolidação, ampliação de cobertura para fluxos secundários e testes não funcionais finais competem à Sprint 8.
- **Feedback recebido e ajustes:** Ajustada a especificação de resposta da API para separar expressamente erros do cliente (401 - credenciais erradas) de erros de infraestrutura externa (503 - serviço fora do ar).

## 8. Retrospectiva e próxima sprint

- **Funcionou bem:** A escolha do test runner nativo `node:test` e testes em portas dinâmicas (`0`), permitindo que a suíte inteira execute em menos de 300 ms de forma determinística e sem dependências pesadas de terceiros.
- **Precisa melhorar:** Ampliar a automação de testes ponta a ponta no navegador e testes de carga simulada de concorrência.
- **Ação concreta para a próxima sprint (Sprint 8):** Consolidar a suíte na Sprint 8, automatizar os casos CT-03, CT-09 e CT-12, configurar análise de desempenho Lighthouse e medição de carga com métricas consolidadas.

## 9. O que não será considerado suficiente

- Listar tipos de teste sem aplicá-los.
- Casos sem resultado esperado.
- Declarar que todos passaram sem evidência.

## 10. Links enviados no UFLA Virtual

- **Tag `sprint-07`:** [https://github.com/pstehling/tp-eng-software/releases/tag/sprint-07](https://github.com/pstehling/tp-eng-software/releases/tag/sprint-07)
- **Este arquivo na tag:** [https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/sprints/sprint-07.md](https://github.com/pstehling/tp-eng-software/blob/sprint-07/docs/sprints/sprint-07.md)
- **Observação adicional:** Primeira execução verificável entregue com 60 testes automatizados aprovados e correção comprovada do defeito T-06 (Issue #22).

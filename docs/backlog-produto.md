# Product Backlog

> O backlog operacional deve ser mantido no **GitHub Project**, por meio de Issues. Este documento explica a convenção adotada e apresenta uma visão rastreável dos itens.
>
> **Última atualização:** Sprint 6 — 08/11/2026.

## 1. Link do GitHub Project

[`https://github.com/users/pstehling/projects/2`](https://github.com/users/pstehling/projects/2)

As 10 issues iniciais foram criadas no repositório [`github.com/pstehling/tp-eng-software`](https://github.com/pstehling/tp-eng-software) (Issue 01 a Issue 10 = `#1` a `#10`). **Pendência restante:** confirmar que todas as 10 issues foram efetivamente adicionadas ao quadro do Project acima (criar a issue no repositório não a adiciona automaticamente ao Project).

## 2. Campos obrigatórios no Project

Cada item deve possuir, no mínimo:

- título claro;
- tipo (`user-story`, `task`, `bug`, `documentation`, `test` etc.);
- prioridade;
- responsável;
- sprint;
- status;
- critério de aceitação ou conclusão;
- requisito relacionado, quando aplicável.

Os estados utilizados no quadro são: **A fazer**, **Em andamento**, **Em revisão** e **Concluído** (conforme exigido no regulamento do trabalho, seção 6.2).

## 3. Estratégia de priorização

A priorização adotada pelo grupo combina três critérios, nesta ordem:

1. **Valor para o usuário**  funcionalidades que resolvem diretamente a dor central do problema (dispersão de material e falta de banco de questões organizado) recebem prioridade **Alta**: cadastro/login (RF-01 a RF-03), listagem e banco de questões (RF-06 a RF-09) e organização de materiais (RF-11).
2. **Dependência técnica**  itens que bloqueiam outros entram antes na sequência: autenticação (RF-02/RF-03) precisa existir antes de perfil (RF-05) e antes de qualquer tela que exija usuário logado (RF-04, RF-06 em diante); o povoamento do banco de questões (RF-08) precisa vir antes da resolução de questões (RF-09) ter conteúdo para exibir.
3. **Risco e complexidade**  funcionalidades que dependem de serviços externos ou de maior incerteza técnica (chat com IA RF-10) recebem prioridade **Média** e ficam posicionadas depois do núcleo de estudo (questões e materiais), para não travar o cronograma caso a integração externa apresente problemas.

Essa ordem é a mesma refletida na coluna "Prioridade" de `docs/requisitos/requisitos.md` e na divisão por sprint das issues do grupo (Sprint 1: autenticação; Sprint 2: núcleo de navegação e banco de questões; Sprint 3: questão, IA e materiais).

## 4. Visão resumida do backlog

| ID | Link da Issue | Tipo | Descrição curta | Prioridade | Requisito | Sprint | Responsáveis previstos | Estado final |
|---|---|---|---|---|---|---|---|---|
| `T-01` | — | Tarefa técnica | Estruturar esqueleto executável da aplicação (Node.js/Express, endpoint `/api/status`, páginas estáticas iniciais) | Alta | — | 1 | Grupo | **Concluído** (verificado localmente em 14/09/2026 — ver seção 4 de `docs/sprints/sprint-01.md`) |
| `US-01` | [`#1`](https://github.com/pstehling/tp-eng-software/issues/1) | História | Tela de Login | Alta | RF-02, RNF-02 | 1 | @gabrielrooocha, @joaovitormv | **Implementado** ([PR #15](https://github.com/pstehling/tp-eng-software/pull/15); regras de domínio e testes na Sprint 3) |
| `US-02` | [`#2`](https://github.com/pstehling/tp-eng-software/issues/2) | História | Tela de Autenticação (cadastro e verificação de conta) | Alta | RF-01, RF-03, RNF-02 | 1 | @joaovitormv, @IsadoraRB-dge | **Implementado** ([PR #15](https://github.com/pstehling/tp-eng-software/pull/15); regras de domínio e testes na Sprint 3) |
| `US-03` | [`#3`](https://github.com/pstehling/tp-eng-software/issues/3) | História | Tela Inicial do Usuário | Alta | RF-04, RNF-01, RNF-03 | 2 | @gabrielrooocha, @pstehling | Planejado |
| `US-04` | [`#4`](https://github.com/pstehling/tp-eng-software/issues/4) | História | Tela de Perfil | Média | RF-05, RNF-02 | 2 | @IsadoraRB-dge, @gabrielrooocha | Planejado |
| `US-05` | [`#5`](https://github.com/pstehling/tp-eng-software/issues/5) | História | Tela de Matéria | Alta | RF-06, RNF-03 | 2 | @gabrielcarvalho28, @pstehling | Planejado |
| `US-06` | [`#6`](https://github.com/pstehling/tp-eng-software/issues/6) | História | Tela de Banco de Questões | Alta | RF-07, RNF-03 | 2 | @IsadoraRB-dge, @gabrielrooocha | Planejado |
| `US-07` | [`#7`](https://github.com/pstehling/tp-eng-software/issues/7) | História | Povoar Banco de Questões | Alta | RF-08, RNF-02 | 2 | @pstehling, @gabrielcarvalho28 | Planejado |
| `US-08` | [`#8`](https://github.com/pstehling/tp-eng-software/issues/8) | História | Tela de Questão (correção e explicação) | Alta | RF-09, RF-10, RNF-01 | 3 | @joaovitormv, @gabrielrooocha | Planejado |
| `US-09` | [`#9`](https://github.com/pstehling/tp-eng-software/issues/9) | História | Tela de Conversa com a IA | Média | RF-10, RNF-03 | 3 | @IsadoraRB-dge, @joaovitormv | Planejado |
| `US-10` | [`#10`](https://github.com/pstehling/tp-eng-software/issues/10) | História | Organização de Materiais Próprios | Alta | RF-11, RNF-01, RNF-04 | 3 | @pstehling, @gabrielcarvalho28 | Planejado |
| `T-02` | — | Tarefa técnica | Implementar os modelos de domínio do diagrama de classes (`src/models/`) com testes automatizados | Alta | RF-01 a RF-11, RN-01 a RN-05 | 3 | Grupo | **Concluído** (33 testes aprovados — ver `docs/sprints/sprint-03.md`) |
| `T-03` | — | Tarefa técnica | Integrar `Usuario` ao fluxo de cadastro/login e corrigir dependências e rotas do fluxo de autenticação | Alta | RF-01, RF-02, RF-03, RN-01 | 3 | Grupo | **Concluído** |
| `T-04` | — | Documentação | Versionar arquivos-fonte (`.mmd`) e imagens (`.png`) dos diagramas em `docs/modelagem/imagens/` | Média | — | 3 | Grupo | **Concluído** |
| `T-05` | `[PREENCHER — #XX]` | Tarefa técnica | Aplicar o padrão Adapter à autenticação: isolar o Supabase Auth atrás de `ServicoAutenticacao`, identificar erros por código e validar com testes (PP-01, DP-AUT) | Alta | RF-01, RF-02, RF-03, RN-03 | 5 | `[PREENCHER]` | **Concluído** (45 testes aprovados — ver `docs/padroes/padroes-de-projeto.md`) |
| `T-06` | `[PREENCHER — #XX]` | Débito técnico | Diferenciar falha de comunicação com o provedor de "credenciais inválidas" no login (hoje ambas respondem `401`); a mudança fica restrita a `AdaptadorSupabaseAuth` | Baixa | RF-02 | — | `[PREENCHER]` | Planejado |
| `T-07` | `[PREENCHER — #XX]` | Tarefa técnica | Documentar a arquitetura (`docs/arquitetura/arquitetura.md`) e reorganizar o backend em camadas: `config.js`, `app.js`, `rotas/` e `server.js` só para iniciar; tratamento centralizado de erros; testes automatizados das regras de dependência entre camadas; execução a partir da raiz | Alta | RNF-01 a RNF-04 | 6 | `[PREENCHER]` | **Concluído** (58 testes aprovados — ver `docs/arquitetura/arquitetura.md`, seção 11) |
| `T-08` | `[PREENCHER — #XX]` | Débito técnico (arquitetural) | Proteger rotas privadas com o JWT do Supabase (RNF-02): o login deve devolver a sessão, o frontend deve enviá-la e um middleware em `src/rotas/` deve responder `401` sem token válido | Alta | RNF-02, RF-02, RN-04 | 7 | `[PREENCHER]` | Planejado (risco R-03) |
| `T-09` | `[PREENCHER — #XX]` | Débito técnico (arquitetural) | Implementar a persistência de questões, respostas e materiais no PostgreSQL e no Storage do Supabase (DA-07), atrás de uma interface em `src/servicos/` | Alta | RF-04 a RF-11 | — | `[PREENCHER]` | Planejado (risco R-04) |
| `T-10` | `[PREENCHER — #XX]` | Tarefa técnica | Publicar a aplicação no Render (DA-08), configurar `APP_URL` e as URLs de redirecionamento no Supabase | Média | — | — | `[PREENCHER]` | Planejado (risco R-05) |
| `T-11` | `[PREENCHER — #XX]` | Débito técnico (segurança) | Retirar `src/.env` do versionamento e gerar novas chaves no Supabase (as atuais estão no histórico do git desde o commit `aeaabd1`) | Alta | RNF-02 | 7 | `[PREENCHER]` | Planejado (risco R-02) |

Isso totaliza **21 itens** (11 tarefas técnicas/documentação/débito + 10 histórias). Os itens T-02 a T-04 surgiram durante a modelagem da Sprint 3; T-05 e T-06, na Sprint 5; T-07 a T-11, na análise arquitetural da Sprint 6 (riscos R-02 a R-05 em `docs/arquitetura/arquitetura.md`).

### 4.1 Itens priorizados para a sprint corrente (Sprint 6)

| Item | Motivo da prioridade | Situação |
|---|---|---|
| `T-07` — arquitetura e reorganização do backend | Entrega central da Sprint 6 | Concluído |
| `T-11` — retirar `src/.env` do git e gerar novas chaves | Prioridade Alta: as chaves já estão expostas no histórico (R-02) | Planejado para a Sprint 7 |
| `T-08` — proteger rotas privadas com JWT | Prioridade Alta: RNF-02 não atendido; precisa existir antes de dados pessoais (R-03) | Planejado para a Sprint 7 |

Prioridades de T-06 e T-08 a T-11 definidas pelo Scrum Master em 09/11/2026, pendentes de validação do grupo ([ata](reunioes/2026-11-09-decisoes-sprint-06.md)).

## 5. Definition of Ready

Um item está pronto para entrar em uma sprint quando:

- [x] possui descrição compreensível;
- [x] tem valor ou objetivo identificável;
- [x] possui critério de aceitação/conclusão;
- [x] dependências principais foram registradas;
- [x] foi estimado de acordo com a convenção do grupo.

## 6. Definition of Done

Um item está concluído quando:

- [ ] atende aos critérios de aceitação;
- [ ] foi revisado por outro integrante (Pull Request);
- [ ] está integrado à branch `main`;
- [ ] possui testes/evidências quando aplicável;
- [ ] atualizou a documentação afetada;
- [ ] está relacionado ao arquivo da sprint correspondente.

## 7. Histórico de refinamento

| Sprint | Itens criados/divididos/removidos | Motivo | Evidência |
|---|---|---|---|
| Sprint 1 | Backlog inicial estruturado com 1 tarefa técnica (T-01) e as 10 histórias de usuário (US-01 a US-10), mapeadas a partir dos requisitos funcionais levantados. | Consolidar o levantamento de requisitos do grupo em itens rastreáveis e priorizados, conforme exigido pelo regulamento (mínimo de dez itens). | |
| Sprint 2 | Nenhum item novo criado; backlog revisado para confirmar consistência entre requisitos (RF/RNF) e histórias já previstas. As 10 issues iniciais (US-01 a US-10) foram criadas no GitHub como `#1` a `#10`. | Os requisitos funcionais e não funcionais foram detalhados e formalizados em `docs/requisitos/requisitos.md` nesta sprint, sem alterar o escopo das histórias já previstas na Sprint 1; as issues foram migradas do material de apoio para o GitHub para tornar o backlog rastreável. | `docs/requisitos/requisitos.md`, [issues #1–#10](https://github.com/pstehling/tp-eng-software/issues) |
| Sprint 3 | Criadas as tarefas T-02 a T-04; US-01 e US-02 passaram a "Implementado". | A modelagem mostrou que a documentação citava `src/models/` e `tests/models.test.js`, que ainda não existiam, e que o fluxo de autenticação precisava de ajustes (dependências ausentes no `package.json`, rota de recuperação de senha divergente entre frontend e backend). | `docs/modelagem/modelagem.md`, [PR #15](https://github.com/pstehling/tp-eng-software/pull/15) |
| Sprint 5 | Criadas a tarefa T-05 (concluída) e o débito técnico T-06. | A análise de padrões encontrou as rotas de autenticação acopladas ao SDK do Supabase e dependentes do texto das mensagens de erro (T-05). Ao aplicar o Adapter, verificou-se que uma falha de rede no login é respondida como credenciais inválidas; o comportamento foi mantido para não alterar o contrato nesta sprint e registrado como T-06. | `docs/padroes/padroes-de-projeto.md`, `docs/projeto/decisoes-de-projeto.md` (DP-AUT) |
| Sprint 6 | Criadas a tarefa T-07 (concluída) e os débitos T-08 a T-11. | A documentação da arquitetura confrontou os RNF com o código: a proteção de rotas por JWT (RNF-02) não existe (T-08), a persistência de questões e materiais não está definida (T-09), a aplicação não está publicada (T-10) e as chaves do Supabase estão versionadas (T-11). Em 09/11/2026, os itens foram priorizados (segurança primeiro) e as tecnologias de T-09 e T-10 foram escolhidas. | `docs/arquitetura/arquitetura.md` (seções 5, 7 e 9), [ata de 09/11/2026](reunioes/2026-11-09-decisoes-sprint-06.md) |

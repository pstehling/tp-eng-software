# Sprint 6 — Arquitetura e organização global da aplicação

- **Data de entrega:** 09/11/2026
- **Pontuação:** 2,5 pontos
- **Tag obrigatória:** `sprint-06`
- **Responsável por conferir este arquivo:** @pstehling

## 1. Pergunta que esta sprint deve responder

**Como as partes principais da aplicação são organizadas, comunicam-se, executam e são implantadas?**

## 2. Objetivo e resultado da sprint

**Objetivo planejado:** documentar a organização global da aplicação (componentes, comunicação, tecnologias, decisões e implantação), relacionar os requisitos não funcionais às decisões e deixar o código organizado de acordo com essa arquitetura.

**Resultado efetivamente alcançado:** criado `docs/arquitetura/arquitetura.md` com diagramas de contexto, de componentes e de implantação, contrato da API, seis decisões arquiteturais implementadas em formato ADR (DA-01 a DA-06) e duas decididas para as próximas sprints (DA-07, persistência no Supabase; DA-08, publicação no Render), avaliação dos estilos do cap. 7 (camadas, MVC, microsserviços, filas, pub/sub, pipes e filtros, P2P), relação RNF × decisões e riscos. O servidor, que estava inteiro em `src/server.js`, foi reorganizado em cliente/servidor de três camadas com MVC Web no servidor (`config.js`, `app.js`, `rotas/`, `servicos/`, `models/`), e as regras de dependência entre camadas passaram a ser verificadas por testes automatizados (DA-06). Ganhou tratamento centralizado de erros, que impede que uma exceção derrube o servidor, e passou a poder ser executado a partir da raiz do repositório. Os 45 testes anteriores passam sem alteração; 6 novos verificam a comunicação entre as partes e 7 verificam as regras de dependência (58/58). A análise também revelou que a proteção de rotas privadas por JWT (RNF-02) ainda não existe; ela foi registrada como débito T-08.

## 3. Checklist do artefato central — 0,75 ponto

**Entrega esperada:** `docs/arquitetura/arquitetura.md`, diagramas, componentes, responsabilidades, tecnologias, decisões e implantação.

- [x] Estilo arquitetural justificado (seção 1 e DA-01, com os critérios do cap. 7).
- [x] Componentes ligados a diretórios/serviços reais (seções 4 e 10).
- [x] Comunicação e dependências explicadas (seções 3 e 4; regras de dependência testadas na seção 3.2).
- [x] Requisitos não funcionais relacionados a decisões arquiteturais (seção 7).
- [ ] Execução local e, quando possível, ambiente publicado documentados — execução local documentada (seção 8); **a aplicação ainda não está publicada** (T-10).

### Links dos artefatos

| Artefato criado/atualizado | Link na tag da sprint | O que mudou |
|---|---|---|
| `docs/arquitetura/arquitetura.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-06/docs/arquitetura/arquitetura.md) | Criado: o que é caro mudar, estilo (cliente/servidor, três camadas, MVC Web), diagramas de contexto/componentes/implantação, regras de dependência, API, DA-01 a DA-06, estilos do cap. 7 não adotados, RNF × decisões, riscos, correspondência com o código, antes/depois |
| `docs/requisitos/requisitos.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-06/docs/requisitos/requisitos.md) | Nova seção 4.1: relação de cada RNF com a arquitetura e situação verificada (texto dos RNF inalterado) |
| `docs/projeto/decisoes-de-projeto.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-06/docs/projeto/decisoes-de-projeto.md) | Decomposição com os novos módulos e linha de antes/depois da reorganização |
| `docs/modelagem/modelagem.md` e `imagens/03-sequencia-cadastro-login.mmd` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-06/docs/modelagem/modelagem.md) | Participante do backend renomeado para `rotas/autenticacao.js`; correspondência modelo × código e histórico atualizados |
| `docs/padroes/padroes-de-projeto.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-06/docs/padroes/padroes-de-projeto.md) | Links do `server.js` fixados no commit da Sprint 5 e apontando para a nova localização |
| `docs/backlog-produto.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-06/docs/backlog-produto.md) | T-07 (concluído), débitos T-08 a T-11, itens da sprint corrente e histórico |
| `docs/rastreabilidade.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-06/docs/rastreabilidade.md) | RF-01 a RF-03 e RNF ligados às decisões DA-01 a DA-04 e aos novos módulos |
| `README.md`, `src/README.md`, `tests/README.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-06/README.md) | Resumo da arquitetura, tecnologias, execução pela raiz, nova estrutura de `src/` e novo arquivo de teste |

## 4. Incremento da aplicação web — 0,75 ponto

**Incremento mínimo esperado:** Código organizado conforme a arquitetura, comunicação funcional entre partes e configuração de execução/dependências.

### O que foi implementado ou evoluído

Reorganização do backend conforme a arquitetura documentada (DA-01, DA-04, DA-05, DA-06):

- [`src/config.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/src/config.js): único ponto de leitura das variáveis de ambiente.
- [`src/app.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/src/app.js): montagem da aplicação — frontend estático, criação do Supabase e do adaptador, registro das rotas, `404` em JSON e tratamento centralizado de erros.
- [`src/rotas/autenticacao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/src/rotas/autenticacao.js) e [`src/rotas/status.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/src/rotas/status.js): controladoras (MVC Web); recebem o serviço por parâmetro.
- [`tests/regras-arquitetura.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/tests/regras-arquitetura.test.js): testes das regras de dependência entre camadas (no estilo ArchUnit). Comprovou-se que falham quando um atalho é introduzido (rota importando o Supabase, página chamando o Supabase direto).
- [`src/server.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/src/server.js): só inicia o servidor (antes: [178 linhas com tudo](https://github.com/pstehling/tp-eng-software/blob/53f0ae07dcdf9502837b602c08c7687af18d127d/src/server.js)).
- [`package.json`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/package.json) na raiz: `npm run instalar`, `npm start` e `npm test` funcionam fora de `src/`.

Comportamento demonstrável: cadastro, login e recuperação de senha funcionam como antes (contrato HTTP e `src/public/` inalterados). `GET /api/status` passou a informar se a autenticação está configurada. Uma rota `/api` inexistente responde `404` em JSON. Uma exceção inesperada em um serviço responde `500` e o servidor continua no ar; na versão anterior, o processo terminava com código 1.

### Como executar e verificar

```bash
# na raiz do repositório
npm run instalar
cp src/.env.example src/.env   # preencher SUPABASE_URL e SUPABASE_ANON_KEY
npm test                       # 58 testes: 45 anteriores (inalterados) + 6 de comunicação + 7 de regras de arquitetura
npm start                      # http://localhost:3000
# verificação: http://localhost:3000/api/status → "autenticacao": "configurado"
```

| Requisito/Issue | Código ou protótipo | Evidência de execução |
|---|---|---|
| RNF-01 a RNF-04 / `[#23 — T-07]` | [`src/app.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/src/app.js), [`src/rotas/`](https://github.com/pstehling/tp-eng-software/tree/sprint-06/src/rotas), [`src/config.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/src/config.js) | [antes: 45/45](https://github.com/pstehling/tp-eng-software/blob/sprint-06/docs/evidencias/sprint-06-testes-antes.txt), [depois: 58/58](https://github.com/pstehling/tp-eng-software/blob/sprint-06/docs/evidencias/sprint-06-testes-depois.txt), [`tests/arquitetura.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/tests/arquitetura.test.js) |
| RF-01, RF-02, RF-03 / [#1](https://github.com/pstehling/tp-eng-software/issues/1), [#2](https://github.com/pstehling/tp-eng-software/issues/2) | [`src/rotas/autenticacao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/src/rotas/autenticacao.js) | [`tests/auth.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/tests/auth.test.js) e [`tests/adaptador-autenticacao.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/tests/adaptador-autenticacao.test.js) passando sem alteração |

## 5. Scrum e gestão do trabalho — 0,50 ponto

### Sprint Backlog

| Issue | Descrição | Responsável | Critério de aceitação/conclusão | Situação |
|---|---|---|---|---|
| `[#23]` | T-07 — Documentar a arquitetura e reorganizar o backend em camadas | `[PREENCHER]` | `arquitetura.md` com todos os itens do regulamento; cada componente do diagrama ligado a um arquivo real; testes anteriores passando sem alteração | Concluída |
| `[#24]` | T-08 — Proteger rotas privadas com JWT (RNF-02) | `[PREENCHER]` | Rota privada sem token recebe `401`; com token válido responde normalmente; teste de integração cobrindo os dois casos | Pendente — prioridade Alta, Sprint 7 |
| `[#25]` | T-09 — Definir e implementar a persistência de questões e materiais | `[PREENCHER]` | Tecnologia registrada como decisão em `docs/arquitetura/arquitetura.md` (DA-07); interface de serviço criada, com implementação em memória para os testes | Pendente — prioridade Alta, PostgreSQL do Supabase (DA-07) |
| `[#26]` | T-10 — Publicar a aplicação | `[PREENCHER]` | URL pública responde `/api/status` com `"autenticacao": "configurado"`; cadastro, confirmação e login funcionam nela; URL registrada no `README.md` | Pendente — prioridade Média, Render (DA-08) |
| `[#27]` | T-11 — Retirar `src/.env` do git e gerar novas chaves | `[PREENCHER]` | `git rm --cached src/.env` enviado; chaves novas geradas e distribuídas fora do GitHub; aplicação funcionando com elas | Pendente — prioridade Alta, Sprint 7 |

### Acompanhamento

- **GitHub Project:** `[link filtrado ou visão da sprint]`
- **Reuniões/decisões:** [decisões de encerramento da Sprint 6 (09/11/2026)](https://github.com/pstehling/tp-eng-software/blob/sprint-06/docs/reunioes/2026-11-09-decisoes-sprint-06.md) — priorização de T-06 e T-08 a T-11, persistência (DA-07) e hospedagem (DA-08). Registro feito pelo Scrum Master, sem reunião do grupo, pendente de validação na Sprint 7.
- **Impedimentos:** `[PREENCHER]`
- **Mudanças de escopo:** T-08 a T-11 foram identificados durante a sprint e registrados no backlog, sem implementação; T-11 e T-08 foram priorizados para a Sprint 7.

## 6. GitHub, documentação e rastreabilidade — 0,50 ponto

| Tipo de evidência | Link | O que comprova |
|---|---|---|
| Issue | `[link]` | Tarefa T-07 (arquitetura e reorganização) |
| Pull Request | `[link]` | Revisão e integração da branch `sprint-06` |
| Commit | `[link]` | Reorganização do backend e documentação da arquitetura |
| Código/arquivo | [`src/app.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/src/app.js), [`src/rotas/`](https://github.com/pstehling/tp-eng-software/tree/sprint-06/src/rotas) · [antes (`server.js` em `53f0ae0`)](https://github.com/pstehling/tp-eng-software/blob/53f0ae07dcdf9502837b602c08c7687af18d127d/src/server.js) | Código organizado conforme a arquitetura e estado anterior |
| Teste/captura/relatório | [`tests/arquitetura.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/tests/arquitetura.test.js), [`tests/regras-arquitetura.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/tests/regras-arquitetura.test.js), [saída antes](https://github.com/pstehling/tp-eng-software/blob/sprint-06/docs/evidencias/sprint-06-testes-antes.txt), [saída depois](https://github.com/pstehling/tp-eng-software/blob/sprint-06/docs/evidencias/sprint-06-testes-depois.txt) | Comportamento preservado (45/45 → 58/58) e regras de arquitetura verificadas |

### Rastreabilidade resumida

| Requisito | Issue | Artefato/modelo/decisão | Código | Teste/evidência |
|---|---|---|---|---|
| `RF-01` a `RF-03` | [#1](https://github.com/pstehling/tp-eng-software/issues/1), [#2](https://github.com/pstehling/tp-eng-software/issues/2) | DA-03, PP-01, modelagem 4.1 | [`src/rotas/autenticacao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/src/rotas/autenticacao.js) | [`tests/auth.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/tests/auth.test.js) |
| `RNF-01` | [#3](https://github.com/pstehling/tp-eng-software/issues/3) | DA-02 | [`src/public/`](https://github.com/pstehling/tp-eng-software/tree/sprint-06/src/public) | Páginas servidas: [`tests/arquitetura.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/tests/arquitetura.test.js); Lighthouse na Sprint 7 |
| `RNF-02` | [#1](https://github.com/pstehling/tp-eng-software/issues/1), `[#24 — T-08]` | DA-03, DA-04 | [`src/servicos/`](https://github.com/pstehling/tp-eng-software/tree/sprint-06/src/servicos), [`src/config.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/src/config.js) | Hash: Supabase; JWT em rotas privadas: ainda não aplicável (T-08) |
| `RNF-03` | [#6](https://github.com/pstehling/tp-eng-software/issues/6) | DA-01 | [`src/models/questao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/src/models/questao.js) | Ainda não aplicável (listagem não implementada) |
| `RNF-04` | [#10](https://github.com/pstehling/tp-eng-software/issues/10) | Domínio; rota futura em `src/rotas/` | [`src/models/materiais.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/src/models/materiais.js) | [`tests/models.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-06/tests/models.test.js) |

## 7. Revisão do incremento

- **O que foi demonstrado:** `[PREENCHER]`
- **Critérios atendidos:** `[PREENCHER]`
- **Itens não concluídos:** publicação da aplicação (T-10); proteção de rotas por JWT (T-08); regeneração da imagem `03-sequencia-cadastro-login.png` a partir do `.mmd` atualizado `[PREENCHER — confirmar]`.
- **Motivo das pendências:** `[PREENCHER]`
- **Feedback recebido e ajustes:** `[PREENCHER]`

## 8. Retrospectiva e próxima sprint

- **Funcionou bem:** os testes automatizados garantiram que a reorganização do servidor não quebrou nada: os 45 testes anteriores continuaram passando sem alteração, e o total foi para 58.
- **Precisa melhorar:** tarefas foram feitas antes de existir a Issue correspondente, e o trabalho ficou concentrado no fim do prazo.
- **Ação concreta para a próxima sprint:** criar a Issue, com responsável e critério de aceitação, no início da Sprint 7, antes de começar cada tarefa.

## 9. O que não será considerado suficiente

- Somente lista de frameworks.
- Diagrama que não corresponde ao código.
- Confundir arquitetura global com padrão de projeto local.

## 10. Links enviados no UFLA Virtual

- **Tag `sprint-06`:** `[COLAR LINK]`
- **Este arquivo na tag:** `[COLAR LINK]`
- **Observação adicional:** `[quando necessária]`
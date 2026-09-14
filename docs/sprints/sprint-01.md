# Sprint 1 — Problema, visão do produto e organização inicial

- **Data de entrega:** 24/08/2026
- **Pontuação:** 2,5 pontos
- **Tag obrigatória:** `sprint-01`
- **Responsável por conferir este arquivo:** `@pstehling (Scrum Master)`

## 1. Pergunta que esta sprint deve responder

**Qual problema será tratado, quem é afetado e qual produto o grupo pretende desenvolver?**

## 2. Objetivo e resultado da sprint

**Objetivo planejado:** Definir com precisão o problema, estabelecer a visão inicial do produto (While(estuda)) e criar a estrutura mínima de trabalho no GitHub, incluindo backlog inicial e esqueleto executável da aplicação.

**Resultado efetivamente alcançado:** O problema, o público e a proposta de valor foram definidos em detalhe em `docs/visao-geral.md`; o `README.md` foi preenchido com identificação do projeto, integrantes e tecnologias; o backlog inicial com 11 itens (1 tarefa técnica + 10 histórias de usuário) foi estruturado em `docs/backlog-produto.md`; o esqueleto executável da aplicação (Node.js/Express) foi criado e testado em `src/`; o GitHub Project foi criado ([`projects/2`](https://github.com/users/pstehling/projects/2)) e as 10 issues iniciais foram criadas no repositório (`#1` a `#10`); a reunião inicial do grupo foi registrada em `docs/reunioes/reuniao-inicial.md`. **Pendência:** confirmar as issues dentro do quadro do Project e criar a tag `sprint-01` — ver seção 5.

## 3. Checklist do artefato central — 0,75 ponto

**Entrega esperada:** `README.md`, `docs/visao-geral.md`, `docs/backlog-produto.md` e GitHub Project com pelo menos dez itens descritos e priorizados.

- [x] Problema delimitado, com público e contexto identificados.
- [x] Proposta de valor, objetivos e limites iniciais definidos.
- [x] Integrantes e organização de trabalho registrados.
- [x] GitHub Project criado e linkado ([`https://github.com/users/pstehling/projects/2`](https://github.com/users/pstehling/projects/2)).
- [x] Issues iniciais com prioridade, responsável e critério de aceitação (issues [`#1`](https://github.com/pstehling/tp-eng-software/issues/1) a [`#10`](https://github.com/pstehling/tp-eng-software/issues/10), com conteúdo idêntico ao de `while-estuda-backlog-issues.pdf`).

### Links dos artefatos

| Artefato criado/atualizado | Link na tag da sprint | O que mudou |
|---|---|---|
| `README.md` | `[PREENCHER após criar a tag sprint-01]` | Identificação do projeto, integrantes, resumo da solução e tecnologias consideradas. |
| `docs/visao-geral.md` | `[PREENCHER após criar a tag sprint-01]` | Documento completo: problema, público, visão do produto, escopo inicial, restrições/premissas e diferenciais. |
| `docs/backlog-produto.md` | `[PREENCHER após criar a tag sprint-01]` | Backlog inicial com 11 itens priorizados e estratégia de priorização. |
| `src/` (estrutura inicial) | `[PREENCHER após criar a tag sprint-01]` | Esqueleto Node.js/Express com endpoint `/api/status` e páginas estáticas iniciais. |

## 4. Incremento da aplicação web — 0,75 ponto

**Incremento mínimo esperado:** Estrutura inicial em `src/`, instruções de execução e ao menos uma página/estrutura executável ou protótipo navegável.

### O que foi implementado ou evoluído

Foi criado um esqueleto executável da aplicação em Node.js/Express (`src/server.js`), com um endpoint de exemplo (`GET /api/status`) e duas páginas estáticas servidas pelo próprio Express (`src/public/index.html` e `src/public/materiais.html`), com layout e navegação básicos (`style.css`, `script.js`). Esse incremento não implementa ainda nenhum requisito funcional específico (RF-01 a RF-11); ele comprova apenas que o repositório possui, desde a Sprint 1, uma aplicação web executável, conforme o mínimo exigido para esta etapa.

### Como executar e verificar

```bash
cd src
npm install
npm start
# aplicação disponível em http://localhost:3000

# para rodar os testes automatizados:
npm test
```

**Evidência de execução (verificado nesta atualização, 14/09/2026):** `npm test` executa `tests/status.test.js`, que sobe o servidor Express e faz uma requisição real a `GET /api/status`, validando que a resposta é HTTP 200 com `{"status":"ok"}`. Resultado: **1 teste, 1 aprovado, 0 falhas**.

| Requisito/Issue | Código ou protótipo | Evidência de execução |
|---|---|---|
| Estrutura inicial (sem RF específico) | `src/server.js`, `src/public/` | `tests/status.test.js` — 1/1 teste aprovado (execução local em 14/09/2026) |

## 5. Scrum e gestão do trabalho — 0,50 ponto

### Sprint Backlog

| Issue | Descrição | Responsável | Critério de aceitação/conclusão | Situação |
|---|---|---|---|---|
| `T-01` | Estruturar esqueleto executável da aplicação (Express + páginas estáticas + endpoint de status) | Grupo | Aplicação sobe localmente e o endpoint `/api/status` responde 200 | **Concluída** |
| [`#1`](https://github.com/pstehling/tp-eng-software/issues/1) | Tela de Login | @gabrielrooocha, @joaovitormv | Critérios de aceitação na própria issue (idênticos a `while-estuda-backlog-issues.pdf`) | Aberta no GitHub — aguardando desenvolvimento |
| [`#2`](https://github.com/pstehling/tp-eng-software/issues/2) | Tela de Autenticação (cadastro e verificação de conta) | @joaovitormv, @IsadoraRB-dge | Critérios de aceitação na própria issue (idênticos a `while-estuda-backlog-issues.pdf`) | Aberta no GitHub — aguardando desenvolvimento |

### Acompanhamento

- **GitHub Project:** [`https://github.com/users/pstehling/projects/2`](https://github.com/users/pstehling/projects/2)
- **Reuniões/decisões:** [`docs/reunioes/reuniao-inicial.md`](../reunioes/reuniao-inicial.md), com as decisões de definição do problema, visão do produto, escopo, papéis, tecnologias e backlog inicial.
- **Impedimentos:** Nenhum registrado até o momento.
- **Mudanças de escopo:** Nenhuma.

## 6. GitHub, documentação e rastreabilidade — 0,50 ponto

| Tipo de evidência | Link | O que comprova |
|---|---|---|
| Issue | [`#1`](https://github.com/pstehling/tp-eng-software/issues/1) a [`#10`](https://github.com/pstehling/tp-eng-software/issues/10) | As 10 histórias iniciais do backlog, com descrição, critério de aceitação, prioridade e responsáveis. |
| Pull Request | `[PREENCHER]` | — |
| Commit | `[PREENCHER — colar link do(s) commit(s) que criaram os documentos e a estrutura inicial]` | Criação da documentação e da estrutura da aplicação. |
| Código/arquivo | `src/server.js`, `src/public/` | Estrutura inicial executável da aplicação. |
| Teste/captura/relatório | `tests/status.test.js` | Execução local comprovando o endpoint `/api/status` (1/1 teste aprovado). |

### Rastreabilidade resumida

Nesta sprint ainda não há requisitos funcionais formalizados (isso é entregue na Sprint 2), portanto não se aplica uma matriz requisito → issue → código. A partir da Sprint 2, a rastreabilidade completa passa a ser mantida em `docs/rastreabilidade.md`.

## 7. Revisão do incremento

- **O que foi demonstrado:** Documentação de visão e backlog completas; aplicação mínima executável localmente com um endpoint funcional e testado.
- **Critérios atendidos:** Problema delimitado com público e contexto; proposta de valor e escopo inicial definidos; integrantes registrados; estrutura executável presente no repositório.
- **Itens não concluídos:** Criação da tag `sprint-01`.
- **Motivo das pendências:** O grupo concentrou o esforço na documentação, no backlog e na criação das issues/Project; a criação da tag ainda não foi feita.
- **Feedback recebido e ajustes:** `[PREENCHER após a revisão/correção desta sprint]`

## 8. Retrospectiva e próxima sprint

- **Funcionou bem:** `[PREENCHER PELO GRUPO]`
- **Precisa melhorar:** `[PREENCHER PELO GRUPO]`
- **Ação concreta para a próxima sprint:** Criar as tags `sprint-01` e `sprint-02`.

## 9. O que não será considerado suficiente

- Tema genérico sem delimitação do problema.
- Backlog composto apenas por títulos vagos.
- Repositório apenas com documentos, sem estrutura inicial da aplicação.

## 10. Links enviados no UFLA Virtual

- **Tag `sprint-01`:** `[COLAR LINK — tag ainda não criada]`
- **Este arquivo na tag:** `[COLAR LINK]`
- **Observação adicional:** Ver pendências registradas nas seções 3, 5 e 6 deste arquivo antes de criar a tag.

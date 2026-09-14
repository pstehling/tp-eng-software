# Sprint 2 — Requisitos e escopo validável da solução

- **Data de entrega:** 14/09/2026
- **Pontuação:** 2,5 pontos
- **Tag obrigatória:** `sprint-02`
- **Responsável por conferir este arquivo:** `@gabrielcarvalho28 (Requisitos)`

## 1. Pergunta que esta sprint deve responder

**O que o sistema deverá fazer e quais condições verificáveis deverá atender?**

## 2. Objetivo e resultado da sprint

**Objetivo planejado:** Transformar a visão inicial do produto em requisitos claros, priorizados, verificáveis e conectados às funcionalidades da aplicação, incluindo atores, requisitos funcionais e não funcionais, histórias de usuário com critérios de aceitação e definição explícita do que fica fora do escopo.

**Resultado efetivamente alcançado:** `docs/requisitos/requisitos.md` foi elaborado por completo, contendo: 3 atores/perfis (Estudante, Administrador, Serviço de IA), 11 requisitos funcionais (RF-01 a RF-11), 4 requisitos não funcionais verificáveis (RNF-01 a RNF-04), 5 regras de negócio (RN-01 a RN-05), 10 histórias de usuário com critérios de aceitação no formato Dado/Quando/Então (US-01 a US-10) e a seção de itens fora do escopo. O `docs/backlog-produto.md` foi atualizado para refletir os requisitos formalizados, e as 10 issues correspondentes (`#1` a `#10`) foram criadas no GitHub. **Pendência:** o incremento mínimo da aplicação para esta sprint (um fluxo prioritário implementado, ligado a requisitos e critérios de aceitação) ainda não foi realizado — o código presente é apenas o esqueleto herdado da Sprint 1 (ver seção 4).

## 3. Checklist do artefato central — 0,75 ponto

**Entrega esperada:** `docs/requisitos/requisitos.md`, histórias/casos, critérios de aceitação, escopo excluído e backlog refinado.

- [x] Atores/perfis identificados (Estudante, Administrador, Serviço de IA).
- [x] Requisitos funcionais com IDs e prioridade (RF-01 a RF-11).
- [x] Requisitos não funcionais verificáveis (RNF-01 a RNF-04, com condição mensurável).
- [x] Histórias/casos vinculados aos requisitos (US-01 a US-10).
- [x] Critérios de aceitação nas Issues ou em links diretos (issues [`#1`](https://github.com/pstehling/tp-eng-software/issues/1) a [`#10`](https://github.com/pstehling/tp-eng-software/issues/10), com os mesmos critérios de `docs/requisitos/requisitos.md`).

### Links dos artefatos

| Artefato criado/atualizado | Link na tag da sprint | O que mudou |
|---|---|---|
| `docs/requisitos/requisitos.md` | `[PREENCHER após criar a tag sprint-02]` | Documento novo desta sprint: atores, RF, RNF, regras de negócio, histórias de usuário e fora do escopo. |
| `docs/backlog-produto.md` | `[PREENCHER após criar a tag sprint-02]` | Estratégia de priorização detalhada; tabela do backlog vinculada aos RF/RNF formalizados. |
| `docs/visao-geral.md` | `[PREENCHER após criar a tag sprint-02]` | Sem alteração de escopo nesta sprint (compreensão do problema não mudou). |
| `README.md` | `[PREENCHER após criar a tag sprint-02]` | Seção de tecnologias inicialmente consideradas adicionada. |

## 4. Incremento da aplicação web — 0,75 ponto

**Incremento mínimo esperado:** Implementação de pelo menos um fluxo inicial associado a uma funcionalidade prioritária; ou protótipo navegável das funcionalidades prioritárias, quando a implementação ainda depender de decisões técnicas posteriores.

### O que foi implementado ou evoluído

**Este é o principal ponto pendente da Sprint 2.** Até o momento desta atualização, o código em `src/` continua sendo o esqueleto genérico criado na Sprint 1 (endpoint `/api/status` e páginas estáticas `index.html`/`materiais.html`), sem nenhum fluxo ligado diretamente a um requisito prioritário (ex.: cadastro/login — RF-01/RF-02, ou listagem de matérias — RF-06). O regulamento exige, para esta sprint, a implementação de pelo menos um fluxo prioritário **ou** um protótipo navegável das funcionalidades prioritárias com critérios de aceitação demonstráveis.

**Recomendação imediata:** priorizar a implementação (ainda que simplificada, sem persistência real) de um dos fluxos de maior prioridade já detalhados em `docs/requisitos/requisitos.md` — o mais viável no prazo é normalmente a tela de Login (US-01/RF-02) ou a tela de Cadastro (US-02/RF-01), por exemplo como um formulário navegável em `src/public/` com validação básica no frontend, mesmo que a autenticação real (hash de senha, JWT) só seja implementada em sprints futuras.

### Como executar e verificar

```bash
cd src
npm install
npm start
# aplicação disponível em http://localhost:3000
npm test
```

| Requisito/Issue | Código ou protótipo | Evidência de execução |
|---|---|---|
| `RF-XX / Issue XX` | `[PREENCHER — nenhum fluxo prioritário implementado ainda]` | `[PREENCHER]` |

## 5. Scrum e gestão do trabalho — 0,50 ponto

### Sprint Backlog

| Issue | Descrição | Responsável | Critério de aceitação/conclusão | Situação |
|---|---|---|---|---|
| [`#3`](https://github.com/pstehling/tp-eng-software/issues/3) | Tela Inicial do Usuário | @gabrielrooocha, @pstehling | Critérios de aceitação na própria issue | Aberta no GitHub — aguardando desenvolvimento |
| [`#4`](https://github.com/pstehling/tp-eng-software/issues/4) | Tela de Perfil | @IsadoraRB-dge, @gabrielrooocha | Critérios de aceitação na própria issue | Aberta no GitHub — aguardando desenvolvimento |
| [`#5`](https://github.com/pstehling/tp-eng-software/issues/5) | Tela de Matéria | @gabrielcarvalho28, @pstehling | Critérios de aceitação na própria issue | Aberta no GitHub — aguardando desenvolvimento |
| [`#6`](https://github.com/pstehling/tp-eng-software/issues/6) | Tela de Banco de Questões | @IsadoraRB-dge, @gabrielrooocha | Critérios de aceitação na própria issue | Aberta no GitHub — aguardando desenvolvimento |
| [`#7`](https://github.com/pstehling/tp-eng-software/issues/7) | Povoar Banco de Questões | @pstehling, @gabrielcarvalho28 | Critérios de aceitação na própria issue | Aberta no GitHub — aguardando desenvolvimento |

### Acompanhamento

- **GitHub Project:** [`https://github.com/users/pstehling/projects/2`](https://github.com/users/pstehling/projects/2)
- **Reuniões/decisões:** [`docs/reunioes/reuniao-inicial.md`](../reunioes/reuniao-inicial.md) (mesma ata da Sprint 1 — cobre as decisões de requisitos e backlog consolidadas até aqui).
- **Impedimentos:** Nenhum registrado até o momento.
- **Mudanças de escopo:** Nenhuma — a formalização dos requisitos nesta sprint manteve a visão definida na Sprint 1.

## 6. GitHub, documentação e rastreabilidade — 0,50 ponto

| Tipo de evidência | Link | O que comprova |
|---|---|---|
| Issue | [`#1`](https://github.com/pstehling/tp-eng-software/issues/1) a [`#10`](https://github.com/pstehling/tp-eng-software/issues/10) | As 10 histórias do backlog, com critério de aceitação vinculado a cada RF/RNF formalizado nesta sprint. |
| Pull Request | `[PREENCHER]` | — |
| Commit | `[PREENCHER — colar link do commit que adicionou `docs/requisitos/requisitos.md`]` | Criação do artefato central da sprint. |
| Código/arquivo | `docs/requisitos/requisitos.md` | Requisitos funcionais, não funcionais, regras de negócio e histórias de usuário. |
| Teste/captura/relatório | `[PREENCHER quando houver fluxo prioritário implementado — ver pendência da seção 4]` | — |

### Rastreabilidade resumida

| Requisito | Issue | Artefato/modelo/decisão | Código | Teste/evidência |
|---|---|---|---|---|
| `RF-01` a `RF-11` | [`#1`](https://github.com/pstehling/tp-eng-software/issues/1) a [`#10`](https://github.com/pstehling/tp-eng-software/issues/10) | `docs/requisitos/requisitos.md` | `[ainda não implementado]` | `[ainda não aplicável]` |

A partir desta sprint, a matriz completa deve ser consolidada em `docs/rastreabilidade.md` (hoje ainda em formato de exemplo/template).

## 7. Revisão do incremento

- **O que foi demonstrado:** Documento de requisitos completo e verificável (atores, RF, RNF, regras de negócio, histórias com critérios de aceitação, itens fora do escopo).
- **Critérios atendidos:** Todos os itens do checklist da seção 3, exceto o vínculo das issues reais no GitHub.
- **Itens não concluídos:** Incremento da aplicação (nenhum fluxo prioritário implementado ainda).
- **Motivo das pendências:** Priorização do grupo até aqui esteve concentrada na documentação de requisitos e na criação das issues/Project; a implementação de um fluxo de login/cadastro ainda não foi executada.
- **Feedback recebido e ajustes:** `[PREENCHER após a revisão/correção desta sprint]`

## 8. Retrospectiva e próxima sprint

- **Funcionou bem:** `[PREENCHER PELO GRUPO]`
- **Precisa melhorar:** `[PREENCHER PELO GRUPO]` — considerar, por exemplo, iniciar a implementação de código em paralelo à documentação, para não acumular todo o incremento de aplicação para o fim do prazo.
- **Ação concreta para a próxima sprint:** Implementar ao menos o fluxo de Login ou Cadastro (US-01/US-02) como incremento pendente desta sprint, mesmo que atrasado; criar as tags `sprint-01` e `sprint-02`.

## 9. O que não será considerado suficiente

- Repetir a descrição do problema da Sprint 1.
- Listar funcionalidades sem identificadores ou critérios.
- Apresentar telas sem relacioná-las a requisitos.

## 10. Links enviados no UFLA Virtual

- **Tag `sprint-02`:** `[COLAR LINK — tag ainda não criada]`
- **Este arquivo na tag:** `[COLAR LINK]`
- **Observação adicional:** Ver pendências registradas nas seções 3, 4, 5 e 6 deste arquivo antes de criar a tag. Recomenda-se resolver ao menos o incremento da aplicação (seção 4) antes da entrega, dado o peso de 0,75 ponto desse critério.

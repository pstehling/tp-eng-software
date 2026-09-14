# Reunião — Reunião inicial: definição do problema, visão do produto e backlog

- **Data e horário:** `[PREENCHER PELO GRUPO — data e horário reais da reunião]`
- **Participantes:** Pedro Stehling Mendes (@pstehling), Gabriel Soares Carvalho (@gabrielcarvalho28), Isadora Rocha Brito (@IsadoraRB-dge), Joao Vitor Maximiliom Vieira (@joaovitormv), Gabriel Rocha de Almeida (@gabrielrooocha)
- **Sprint:** Sprints 1 e 2 — reunião inicial do grupo, na qual foram tomadas as decisões que sustentam os artefatos de ambas as sprints
- **Objetivo:** Definir o problema a ser tratado, a visão do produto, o escopo inicial, os papéis de cada integrante, as tecnologias consideradas e estruturar o backlog inicial priorizado, servindo de base para o `README.md`, `docs/visao-geral.md`, `docs/backlog-produto.md` e `docs/requisitos/requisitos.md`.

## Decisões

1. **Tema de partida:** o tema geral (uma aplicação de questões) já havia sido definido previamente, fora desta reunião, como o problema a ser trabalhado pelo grupo; não foi, portanto, uma decisão tomada nesta reunião — apenas o ponto de partida para as decisões abaixo.
2. **Nome do produto:** definido como **While(estuda)** (substituindo um nome de trabalho anterior, "EstUFLA"), por ser mais ligado ao domínio de computação e ao hábito de estudo. Registrado em `docs/visao-geral.md` (seção 7 — histórico de mudanças).
3. **Delimitação do problema e público-alvo:** o problema foi delimitado como a dispersão do material de estudo (slides, resumos, listas de exercícios, provas antigas) e a ausência de um banco de questões organizado por matéria/assunto para as disciplinas de computação. O público-alvo definido foi o estudante de Ciência da Computação e Sistemas de Informação da UFLA. Detalhado em `docs/visao-geral.md` (seções 1 e 2).
4. **Proposta de valor e objetivos:** definida a proposta de valor, o objetivo geral e os cinco objetivos específicos do produto (banco de questões categorizado, correção com histórico, organização de materiais em pastas, chat com IA contextualizado e acesso individual seguro). Detalhado em `docs/visao-geral.md` (seção 3).
5. **Escopo inicial (dentro e fora):** definido o que entra no escopo da primeira versão (cadastro/login, perfil, matérias, banco de questões, resolução de questões, povoamento do banco, chat com IA, organização de materiais, aplicação web responsiva) e o que fica de fora (app mobile nativo, integração com sistemas oficiais da UFLA, correção automática de discursivas/código, geração automática de questões por IA, recursos sociais, gamificação, cobrança, modo offline). Detalhado em `docs/visao-geral.md` (seção 4) e em `docs/requisitos/requisitos.md` (seção 7).
6. **Restrições e premissas do projeto:** registradas as restrições de prazo (sprints do semestre 2026/2), equipe de cinco integrantes com outras disciplinas, uso de API externa de IA com cota limitada, hospedagem/banco de dados em plano gratuito, ausência de acesso a sistemas oficiais da UFLA e tratamento de dados pessoais sob a LGPD; e as premissas de acesso dos estudantes à internet, meta de pelo menos 30 questões cadastradas até a Sprint 2 e disponibilidade de colegas de curso para testes de usabilidade. Detalhado em `docs/visao-geral.md` (seção 5).
7. **Papéis e responsabilidades:** definida a responsabilidade principal de cada integrante — Pedro Stehling Mendes como Scrum Master (além de Dev/BD), Gabriel Soares Carvalho em Requisitos (além de Dev), Isadora Rocha Brito e João Vitor Maximiliom Vieira em desenvolvimento backend (com João também em QA), e Gabriel Rocha de Almeida em UI/UX (além de frontend e QA). Registrado em `README.md` (seção "Integrantes").
8. **Tecnologias inicialmente consideradas:** Node.js + Express no backend, HTML/CSS/JavaScript estático no frontend (com possível evolução para um framework), JWT e hash de senha (bcrypt/Argon2) para autenticação, uma API externa de IA para o chat contextualizado, testes com `node:test` e integração contínua via GitHub Actions. Registrado em `README.md` (seção 2).
9. **Estrutura e priorização do backlog inicial:** o backlog foi organizado em 11 itens (1 tarefa técnica de estrutura inicial + 10 histórias de usuário, US-01 a US-10), priorizados combinando valor para o usuário, dependência técnica entre funcionalidades e risco/complexidade (funcionalidades que dependem de serviço externo, como o chat com IA, priorizadas como Média). Detalhado em `docs/backlog-produto.md` (seções 3 e 4).
10. **Requisitos funcionais, não funcionais e regras de negócio:** formalizados 11 requisitos funcionais (RF-01 a RF-11), 4 requisitos não funcionais verificáveis (RNF-01 a RNF-04) e 5 regras de negócio (RN-01 a RN-05), a partir das dores identificadas para estudantes de computação e concurseiros. Detalhado em `docs/requisitos/requisitos.md` (seções 2 a 5).
11. **Histórias de usuário e critérios de aceitação:** escritas as 10 histórias de usuário (US-01 a US-10) no formato Dado/Quando/Então, vinculadas aos requisitos correspondentes. Detalhado em `docs/requisitos/requisitos.md` (seção 6).
12. **Organização no GitHub:** decidido manter o backlog operacional no GitHub Projects; criado o quadro em [`github.com/users/pstehling/projects/2`](https://github.com/users/pstehling/projects/2) e as issues `#1` a `#10`, uma para cada história de usuário, com o mesmo conteúdo (descrição, critério de aceitação, prioridade e responsáveis) já redigido no material de apoio do grupo.

## Tarefas e responsáveis

| Tarefa/Issue | Responsável | Prazo |
|---|---|---|
| Redigir `docs/visao-geral.md` e `README.md` | @pstehling | Sprint 1 |
| Estruturar o backlog inicial (`docs/backlog-produto.md`) | @pstehling, @gabrielcarvalho28 | Sprint 1 |
| Criar o esqueleto executável da aplicação (Node.js/Express) | Grupo | Sprint 1 |
| Elaborar `docs/requisitos/requisitos.md` (atores, RF, RNF, RN, histórias) | @gabrielcarvalho28 | Sprint 2 |
| Criar o GitHub Project e as issues `#1` a `#10` | @pstehling | Sprint 1–2 |
| Desenvolver as histórias de usuário (US-01 a US-10) | Ver responsáveis por issue em `docs/backlog-produto.md`, seção 4 | Sprints 1 a 3 |

## Impedimentos

- Nenhum registrado até o momento.

## Evidências complementares

- [`README.md`](../../README.md)
- [`docs/visao-geral.md`](../visao-geral.md)
- [`docs/backlog-produto.md`](../backlog-produto.md)
- [`docs/requisitos/requisitos.md`](../requisitos/requisitos.md)
- [GitHub Project](https://github.com/users/pstehling/projects/2)
- [Issues #1 a #10](https://github.com/pstehling/tp-eng-software/issues)

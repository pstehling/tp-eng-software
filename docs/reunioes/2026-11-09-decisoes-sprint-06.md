# Reunião — Decisões de encerramento da Sprint 6

- **Data e horário:** 09/11/2026 — registro feito pelo Scrum Master, **sem reunião do grupo**
- **Participantes:** Pedro Stehling Mendes (@pstehling), Scrum Master
- **Sprint:** Sprint 6
- **Objetivo:** priorizar os itens pendentes do backlog surgidos na análise arquitetural (T-06, T-08 a T-11) e tomar as duas decisões arquiteturais que estavam em aberto: onde guardar questões e materiais (T-09) e onde publicar a aplicação (T-10).

> **Situação:** as decisões abaixo foram tomadas pelo Scrum Master para não travar o planejamento da Sprint 7 e **ainda precisam ser validadas pelo grupo** na primeira reunião da Sprint 7. Se o grupo mudar alguma delas, esta ata, `docs/backlog-produto.md` e `docs/arquitetura/arquitetura.md` (DA-07 e DA-08) devem ser atualizados.

## Decisões

1. **Prioridade "segurança primeiro":**

   | Item | Prioridade | Motivo |
   |---|---|---|
   | T-11 — retirar `src/.env` do git e gerar novas chaves | Alta | As chaves reais já estão no histórico do repositório (risco R-02) |
   | T-08 — proteger rotas privadas com JWT | Alta | RNF-02 não atendido; precisa existir antes de qualquer dado pessoal (materiais, RN-04) |
   | T-09 — persistência de questões e materiais | Alta | Bloqueia RF-04 a RF-11 (risco R-04) |
   | T-10 — publicar a aplicação | Média | Necessária para a entrega final, mas não bloqueia o desenvolvimento (risco R-05) |
   | T-06 — diferenciar falha de rede de credencial inválida | Baixa | Afeta só a mensagem de erro em uma situação rara |

   T-11 e T-08 entram na Sprint 7; T-09 e T-10 vêm em seguida.

2. **Persistência (T-09):** questões, respostas e materiais ficarão no **PostgreSQL do próprio projeto Supabase**, e os arquivos de material no **Supabase Storage**. O motivo é não acrescentar um fornecedor novo: as contas já estão no Supabase Auth. O acesso será feito pelo servidor, atrás de uma interface em `src/servicos/`, como na autenticação. Registrado como DA-07 em [`docs/arquitetura/arquitetura.md`](../arquitetura/arquitetura.md).
3. **Hospedagem (T-10):** a aplicação será publicada no **Render**, que tem plano gratuito para servidores Node.js e faz deploy a partir do GitHub. Registrado como DA-08 em [`docs/arquitetura/arquitetura.md`](../arquitetura/arquitetura.md).
4. **Retrospectiva da Sprint 6:** registrada na seção 8 de [`docs/sprints/sprint-06.md`](../sprints/sprint-06.md).

## Tarefas e responsáveis

| Tarefa/Issue | Responsável | Prazo |
|---|---|---|
| Validar com o grupo as decisões 1 a 3 desta ata | @pstehling | Primeira reunião da Sprint 7 |
| T-11 — retirar `src/.env` do git e gerar novas chaves | A definir pelo grupo | Sprint 7 (16/11/2026) |
| T-08 — proteger rotas privadas com JWT | A definir pelo grupo | Sprint 7 (16/11/2026) |
| T-09 — persistência no Supabase (PostgreSQL + Storage) | A definir pelo grupo | Depois de T-08 e T-11 |
| T-10 — publicação no Render | A definir pelo grupo | Antes da entrega final (30/11/2026) |

## Impedimentos

- Nenhum registrado.

## Evidências complementares

- [`docs/backlog-produto.md`](../backlog-produto.md), seção 4
- [`docs/arquitetura/arquitetura.md`](../arquitetura/arquitetura.md), DA-07, DA-08 e seção 9 (riscos)
- [`docs/sprints/sprint-06.md`](../sprints/sprint-06.md)

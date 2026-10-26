# Sprint 5 — Padrões de projeto aplicados ao código

- **Data de entrega:** 26/10/2026
- **Pontuação:** 2,5 pontos
- **Tag obrigatória:** `sprint-05`
- **Responsável por conferir este arquivo:** `[PREENCHER]`

## 1. Pergunta que esta sprint deve responder

**Qual problema concreto e recorrente justifica a aplicação de um padrão?**

## 2. Objetivo e resultado da sprint

**Objetivo planejado:** identificar no código um problema de projeto recorrente e aplicar um padrão pertinente, sem alterar o comportamento já entregue.

**Resultado efetivamente alcançado:** o padrão **Adapter** (PP-01) foi aplicado ao fluxo de autenticação. As rotas de `src/server.js` deixaram de chamar o Supabase diretamente e de comparar o texto em inglês das mensagens de erro; passaram a usar a interface `ServicoAutenticacao`, implementada por `AdaptadorSupabaseAuth`. Os 33 testes anteriores continuam passando sem alteração e 11 novos foram criados (44/44).

## 3. Checklist do artefato central — 0,75 ponto

**Entrega esperada:** `docs/padroes/padroes-de-projeto.md`, padrão selecionado, contexto, participantes, alternativas e evidência no código.

- [x] Problema descrito antes do padrão (seção 1 de `padroes-de-projeto.md`).
- [x] Participantes do padrão mapeados para arquivos reais (seções 2 e 4).
- [x] Alternativas e justificativa registradas, incluindo não usar padrão (seções 5 e 7).
- [x] Benefícios e trade-offs explicados no contexto do projeto (seção 6).
- [x] Testes ou demonstração preservam o comportamento esperado (`tests/auth.test.js` inalterado + `tests/adaptador-autenticacao.test.js`).

### Links dos artefatos

| Artefato criado/atualizado | Link na tag da sprint | O que mudou |
|---|---|---|
| `docs/padroes/padroes-de-projeto.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-05/docs/padroes/padroes-de-projeto.md) | Criado: problema, PP-01 Adapter, diagramas, antes/depois, alternativas, custos e padrões não aplicados |
| `docs/projeto/decisoes-de-projeto.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-05/docs/projeto/decisoes-de-projeto.md) | Decisão DP-AUT (numeração provisória) e linhas de antes/depois |
| `docs/modelagem/modelagem.md` e `imagens/03-sequencia-cadastro-login.mmd` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-05/docs/modelagem/modelagem.md) | Diagrama 4.1 com o participante `AdaptadorSupabaseAuth`; novos itens na seção 6 |
| `docs/backlog-produto.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-05/docs/backlog-produto.md) | Itens T-05 (concluído) e T-06 (débito técnico); histórico da Sprint 5 |
| `docs/rastreabilidade.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-05/docs/rastreabilidade.md) | RF-01 a RF-03 ligados a PP-01/DP-AUT, ao código e aos testes novos |
| `src/README.md`, `tests/README.md` | [link](https://github.com/pstehling/tp-eng-software/blob/sprint-05/src/README.md) | Estrutura com `src/servicos/` e mapeamento do novo arquivo de teste |

## 4. Incremento da aplicação web — 0,75 ponto

**Incremento mínimo esperado:** Implementação ou refatoração de ao menos um padrão pertinente, vinculada a Issue/PR e demonstrável.

### O que foi implementado ou evoluído

Refatoração do backend de autenticação (RF-01, RF-02, RF-03, RN-03) com o padrão Adapter:

- [`src/servicos/servico-autenticacao.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-05/src/servicos/servico-autenticacao.js): interface `ServicoAutenticacao` e motivos de falha do domínio.
- [`src/servicos/adaptador-supabase-auth.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-05/src/servicos/adaptador-supabase-auth.js): adaptador do Supabase Auth; identifica "e-mail já cadastrado" e "conta não verificada" pelo código do erro.
- [`src/server.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-05/src/server.js): as 4 rotas usam a interface por meio de `obterServicoAutenticacao()`.

O comportamento visível ao usuário não muda (mesmos status HTTP e mensagens; nenhum arquivo de `src/public/` foi alterado). O ganho demonstrável é que a RN-03 continua funcionando mesmo se o Supabase alterar o texto da mensagem, e que as rotas podem ser testadas sem o Supabase.

### Como executar e verificar

```bash
cd src
npm install
npm test     # 44 testes: 33 anteriores (inalterados) + 11 do padrão
npm start    # http://localhost:3000 — cadastro, login e recuperação de senha (requer src/.env)
```

| Requisito/Issue | Código ou protótipo | Evidência de execução |
|---|---|---|
| RF-01, RF-02, RF-03, RN-03 / `[#XX — T-05]` | [`src/servicos/`](https://github.com/pstehling/tp-eng-software/tree/sprint-05/src/servicos), [`src/server.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-05/src/server.js) | [antes: 33/33](https://github.com/pstehling/tp-eng-software/blob/sprint-05/docs/evidencias/sprint-05-testes-antes.txt), [depois: 44/44](https://github.com/pstehling/tp-eng-software/blob/sprint-05/docs/evidencias/sprint-05-testes-depois.txt) |

## 5. Scrum e gestão do trabalho — 0,50 ponto

### Sprint Backlog

| Issue | Descrição | Responsável | Critério de aceitação/conclusão | Situação |
|---|---|---|---|---|
| `[#XX]` | T-05 — Aplicar o padrão Adapter à autenticação | `[PREENCHER]` | Rotas sem chamadas diretas ao Supabase; erros identificados por código; testes anteriores sem alteração passando; documentação do padrão | Concluída |
| `[#XX]` | T-06 — Diferenciar falha de comunicação de credenciais inválidas no login | `[PREENCHER]` | `[PREENCHER]` | Pendente (débito registrado) |

### Acompanhamento

- **GitHub Project:** `[link filtrado ou visão da sprint]`
- **Reuniões/decisões:** `[links para docs/reunioes/]`
- **Impedimentos:** `[PREENCHER]`
- **Mudanças de escopo:** `[PREENCHER]` — observação: T-06 foi identificado durante a sprint e registrado no backlog, sem ser implementado.

## 6. GitHub, documentação e rastreabilidade — 0,50 ponto

| Tipo de evidência | Link | O que comprova |
|---|---|---|
| Issue | `[link]` | Tarefa T-05 de implementação e validação do padrão |
| Pull Request | `[link]` | Revisão e integração da branch `sprint-05` |
| Commit | `[link]` | Refatoração com o padrão Adapter |
| Código/arquivo | [`src/servicos/`](https://github.com/pstehling/tp-eng-software/tree/sprint-05/src/servicos) · [antes (`server.js` em `8e34340`)](https://github.com/pstehling/tp-eng-software/blob/8e343400d24fbd62b958910466039cedefdacfa2/src/server.js#L59) | Participantes do padrão e código anterior à mudança |
| Teste/captura/relatório | [`tests/adaptador-autenticacao.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-05/tests/adaptador-autenticacao.test.js), [saída antes](https://github.com/pstehling/tp-eng-software/blob/sprint-05/docs/evidencias/sprint-05-testes-antes.txt), [saída depois](https://github.com/pstehling/tp-eng-software/blob/sprint-05/docs/evidencias/sprint-05-testes-depois.txt) | Comportamento preservado (33/33 → 44/44) |

### Rastreabilidade resumida

| Requisito | Issue | Artefato/modelo/decisão | Código | Teste/evidência |
|---|---|---|---|---|
| `RF-01` | [#2](https://github.com/pstehling/tp-eng-software/issues/2), `[#XX]` | PP-01, DP-AUT, modelagem 4.1 | [`/api/cadastro`](https://github.com/pstehling/tp-eng-software/blob/sprint-05/src/server.js), [adaptador](https://github.com/pstehling/tp-eng-software/blob/sprint-05/src/servicos/adaptador-supabase-auth.js) | [`tests/auth.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-05/tests/auth.test.js), [`tests/adaptador-autenticacao.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-05/tests/adaptador-autenticacao.test.js) |
| `RF-02` / `RN-03` | [#1](https://github.com/pstehling/tp-eng-software/issues/1), `[#XX]` | PP-01, DP-AUT, modelagem 4.1 | [`/api/login`](https://github.com/pstehling/tp-eng-software/blob/sprint-05/src/server.js), [adaptador](https://github.com/pstehling/tp-eng-software/blob/sprint-05/src/servicos/adaptador-supabase-auth.js) | [`tests/auth.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-05/tests/auth.test.js), [`tests/adaptador-autenticacao.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-05/tests/adaptador-autenticacao.test.js) |
| `RF-03` | [#2](https://github.com/pstehling/tp-eng-software/issues/2), `[#XX]` | PP-01, DP-AUT, modelagem 4.1 | [`/api/recuperar-senha` e `/api/salvar-nova-senha`](https://github.com/pstehling/tp-eng-software/blob/sprint-05/src/server.js), [adaptador](https://github.com/pstehling/tp-eng-software/blob/sprint-05/src/servicos/adaptador-supabase-auth.js) | [`tests/auth.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-05/tests/auth.test.js), [`tests/adaptador-autenticacao.test.js`](https://github.com/pstehling/tp-eng-software/blob/sprint-05/tests/adaptador-autenticacao.test.js) |

## 7. Revisão do incremento

- **O que foi demonstrado:** `[PREENCHER]`
- **Critérios atendidos:** `[PREENCHER]`
- **Itens não concluídos:** T-06 (débito técnico registrado); regeneração da imagem `03-sequencia-cadastro-login.png`; teste ponta a ponta com o Supabase real `[PREENCHER — confirmar se foi feito]`.
- **Motivo das pendências:** `[PREENCHER]`
- **Feedback recebido e ajustes:** `[PREENCHER]`

## 8. Retrospectiva e próxima sprint

- **Funcionou bem:** `[PREENCHER]`
- **Precisa melhorar:** `[PREENCHER]`
- **Ação concreta para a próxima sprint:** `[PREENCHER]`

## 9. O que não será considerado suficiente

- Copiar definição teórica de padrão.
- Forçar padrão sem necessidade.
- Apresentar diagrama sem código correspondente.

## 10. Links enviados no UFLA Virtual

- **Tag `sprint-05`:** `[COLAR LINK]`
- **Este arquivo na tag:** `[COLAR LINK]`
- **Observação adicional:** `[quando necessária]`

# Decisões de projeto

> **Artefato central da Sprint 4.** Registre decisões locais de organização do código, responsabilidades, interfaces, modularidade, coesão e acoplamento. Não confunda esta etapa com a arquitetura global da Sprint 6.

## 1. Decomposição da solução

| Módulo/componente local | Responsabilidade | Dependências permitidas | Requisitos relacionados |
|---|---|---|---|
| `[PREENCHER]` | `[PREENCHER]` | `[PREENCHER]` | `RF-XX` |
| `src/servicos/` — `ServicoAutenticacao` e `AdaptadorSupabaseAuth` (Sprint 5) | Operações de conta (cadastrar, entrar, recuperar e redefinir senha) e tradução dos erros do provedor para motivos do domínio | O adaptador depende de `@supabase/supabase-js`; as rotas de `src/server.js` dependem só da interface `ServicoAutenticacao` | `RF-01`, `RF-02`, `RF-03`, `RN-03` |

## 2. Registro de decisões

### DP-01 — `[Título objetivo]`

- **Contexto/problema:** `[Qual dificuldade ou alternativa motivou a decisão?]`
- **Alternativas consideradas:** `[A, B, C]`
- **Decisão:** `[O que foi escolhido?]`
- **Justificativa:** `[Relacione coesão, acoplamento, responsabilidade, simplicidade, testabilidade etc.]`
- **Consequências positivas:** `[PREENCHER]`
- **Trade-offs/riscos:** `[PREENCHER]`
- **Código afetado:** `[link]`
- **Issue/PR/commit:** `[link]`

### DP-AUT — Isolar o provedor de autenticação atrás de uma interface do projeto (Sprint 5)

> Numeração provisória para não sobrescrever o DP-01 da Sprint 4. Renumerar quando as decisões da Sprint 4 forem registradas.

- **Contexto/problema:** as 4 rotas de autenticação de `src/server.js` chamavam diretamente o SDK do Supabase e decidiam o status HTTP comparando o **texto em inglês** das mensagens de erro (`/already registered/i`, `'Email not confirmed'`). A RN-03 (conta não verificada → 403) dependia de uma frase do fornecedor, e os testes precisavam imitar o SDK. Detalhes em [`docs/padroes/padroes-de-projeto.md`](../padroes/padroes-de-projeto.md), seção 1.
- **Alternativas consideradas:** (a) manter as chamadas nas rotas e só trocar `error.message` por `error.code`; (b) funções utilitárias de tradução de erro; (c) Facade; (d) interface do domínio + adaptador (padrão Adapter).
- **Decisão:** (d) — interface `ServicoAutenticacao` com motivos de falha do domínio (`MOTIVOS_FALHA_AUTENTICACAO`) e um adaptador `AdaptadorSupabaseAuth`, que é o único arquivo do backend a conhecer o Supabase. As rotas obtêm o serviço por `obterServicoAutenticacao()`, que aceita injeção em `app.locals.servicoAutenticacao`.
- **Justificativa:** reduz o acoplamento das rotas a detalhes instáveis do fornecedor (Cap. 5, acoplamento ruim/evolutivo); aplica a inversão de dependências ("prefira interfaces a classes") e o ocultamento de informação; dá às rotas uma única responsabilidade (contrato HTTP); torna as rotas testáveis sem o Supabase.
- **Consequências positivas:** erros identificados por `error.code`, estável; mudança de fornecedor restrita a um arquivo; contrato HTTP com o frontend inalterado; 33 testes anteriores continuam passando e 12 novos cobrem o adaptador e as rotas com outra implementação.
- **Trade-offs/riscos:** dois arquivos e uma indireção a mais; a interface é só verificada em tempo de execução (JavaScript); a interface foi desenhada a partir dos fluxos do Supabase; falha de rede no login ainda responde 401 (comportamento anterior mantido).
- **Código afetado:** [`src/servicos/servico-autenticacao.js`](../../src/servicos/servico-autenticacao.js), [`src/servicos/adaptador-supabase-auth.js`](../../src/servicos/adaptador-supabase-auth.js), [`src/server.js`](../../src/server.js), [`tests/adaptador-autenticacao.test.js`](../../tests/adaptador-autenticacao.test.js)
- **Issue/PR/commit:** `[PREENCHER — Issue T-05]` / `[PREENCHER — PR sprint-05]` / `[PREENCHER — commit]`

## 3. Antes e depois

Quando houver refatoração, mostre evidência concreta:

| Aspecto | Antes | Depois | Benefício observado |
|---|---|---|---|
| `[Responsabilidade duplicada]` | `[link/descrição]` | `[link/descrição]` | `[PREENCHER]` |
| Conhecimento do SDK do Supabase (DP-AUT) | 4 rotas com 5 chamadas `supabase.auth.*` — [`server.js` em `8e34340`](https://github.com/pstehling/tp-eng-software/blob/8e343400d24fbd62b958910466039cedefdacfa2/src/server.js#L59) | Só em [`adaptador-supabase-auth.js`](../../src/servicos/adaptador-supabase-auth.js) | Ponto único de mudança; rotas tratam só HTTP |
| Detecção de "conta não verificada" (RN-03) | `error.message === 'Email not confirmed'` — [linha 94](https://github.com/pstehling/tp-eng-software/blob/8e343400d24fbd62b958910466039cedefdacfa2/src/server.js#L94) | `error.code === 'email_not_confirmed'` no adaptador | Regra não quebra se o fornecedor mudar a frase (coberto por teste) |
| Testes das rotas | Precisavam imitar o SDK e suas mensagens | Podem injetar qualquer implementação de `ServicoAutenticacao` | Rotas testáveis sem Supabase |

## 4. Verificação dos princípios

- [ ] Cada módulo possui responsabilidade identificável.
- [ ] Dependências desnecessárias foram reduzidas.
- [ ] Nomes representam o domínio e o comportamento.
- [ ] A decisão aparece no código, não apenas neste documento.
- [ ] O grupo consegue explicar alternativas e consequências.

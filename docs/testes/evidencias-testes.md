# Evidências e resultados dos testes

> **Acompanhamento de testes das Sprints 7 e 8.** Consolida o planejamento executado, o histórico das execuções e o tratamento dos defeitos identificados.

---

## 1. Resumo executivo (Sprint 7)

| Total planejado | Executado | Aprovado | Reprovado | Não executado |
|---:|---:|---:|---:|---:|
| 15 | 15 | 15 | 0 *(1 corrigido)* | 0 |

- **Bateria automatizada:** 60 testes automatizados em 13 suítes, 100% aprovados (`pass: 60, fail: 0`).
- **Defeitos tratados:** 1 defeito identificado e corrigido no ciclo (Issue [#22](https://github.com/pstehling/tp-eng-software/issues/22) — `T-06`).

---

## 2. Resultados por caso de teste

| Caso | Requisito / Risco | Resultado | Data / Tag | Evidência | Observação |
|---|---|:---:|---|---|---|
| `CT-01` | `RF-01`, `RN-01` | **Aprovado** | 16/11/2026 (`sprint-07`) | [`sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) | E-mails fora do domínio institucional são barrados com 400 antes do provedor. |
| `CT-02` | `RF-01`, `RF-03` | **Aprovado** | 16/11/2026 (`sprint-07`) | [`sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) | Cadastro válido cria usuário em `PENDENTE_VERIFICACAO` e devolve 201. |
| `CT-03` | `RF-01`, `US-02` | **Aprovado** | 16/11/2026 (`sprint-07`) | [`sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) | E-mail duplicado responde 409 tanto com erro de API quanto com usuário fictício. |
| `CT-04` | `RF-02`, `RN-03` | **Aprovado** | 16/11/2026 (`sprint-07`) | [`sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) | Conta pendente de confirmação recebe 403 e aviso para checar caixa de entrada. |
| `CT-05` | `RF-02`, `US-01` | **Aprovado** | 16/11/2026 (`sprint-07`) | [`sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) | Credenciais incorretas respondem 401 com mensagem genérica (segurança). |
| `CT-06` | `RF-02`, `R-01` | **Aprovado** | 16/11/2026 (`sprint-07`) | [`sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) | Falha no provedor externo devolve 503 claro; defeito T-06 corrigido e retestado. |
| `CT-07` | `RF-02`, `US-01` | **Aprovado** | 16/11/2026 (`sprint-07`) | [`sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) | Login com credenciais válidas responde 200 e rota de redirecionamento. |
| `CT-08` | `RF-03`, `US-02` | **Aprovado** | 16/11/2026 (`sprint-07`) | [`sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) | Solicitação de recuperação repassa URL de redirecionamento correta. |
| `CT-09` | `RF-03` | **Aprovado** | 16/11/2026 (`sprint-07`) | [`sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) | Token inválido/expirado devolve 401 sem disparar atualização de senha. |
| `CT-10` | `RF-01`, `RF-03` | **Aprovado** | 16/11/2026 (`sprint-07`) | [`sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) | Senha fora da regra (mínimo 8 caracteres e dígito) é rejeitada na rota com 400. |
| `CT-11` | `DA-04`, `RNF-02` | **Aprovado** | 16/11/2026 (`sprint-07`) | [`sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) | Endpoint `/api/status` responde 200 e informa estado de configuração sem expor segredos. |
| `CT-12` | `DA-01`, `DA-06` | **Aprovado** | 16/11/2026 (`sprint-07`) | [`sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) | Regras de dependência em camadas verificadas (domínio independente, serviços sem HTTP). |
| `CT-13` | `DA-04`, `RN-05` | **Aprovado** | 16/11/2026 (`sprint-07`) | [`sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) | Frontend em `src/public/` totalmente desacoplado do SDK do Supabase e sem chaves embutidas. |
| `CT-14` | `DA-05` | **Aprovado** | 16/11/2026 (`sprint-07`) | [`sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) | Rota 404 estruturada em JSON; erro 500 não derruba a execução do servidor. |
| `CT-15` | `RF-07` a `RF-11` | **Aprovado** | 16/11/2026 (`sprint-07`) | [`sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) | 21 asserções de domínio (Questao, Materiais, ConversaIA) aprovadas sem I/O. |

---

## 3. Defeitos encontrados e tratados

| Issue | Severidade | Caso que revelou | Situação | Correção | Reteste |
|---|:---:|:---:|:---:|---|:---:|
| [#22](https://github.com/pstehling/tp-eng-software/issues/22) (`T-06`) | **Média** | `CT-06` | **Corrigido** | `AdaptadorSupabaseAuth` passou a identificar `credenciaisInvalidas()` de forma explícita e devolver `ERRO_SERVICO` para quedas de rede/provedor; rota `/api/login` passou a responder `503`. | **Aprovado** (coberto por 2 novos testes) |

---

## 4. Requisitos × resultado verificado

| Requisito | Situação na Sprint 7 | Casos / Evidências | Justificativa ou limitação |
|---|:---:|---|---|
| `RF-01` | **Atendido** | `CT-01`, `CT-02`, `CT-03`, `CT-10` | Cadastro, rejeição de e-mail não institucional e validação de duplicidade validados ponta a ponta. |
| `RF-02` | **Atendido (parcial)** | `CT-04`, `CT-05`, `CT-06`, `CT-07` | Login com sucesso, bloqueio por e-mail pendente, credenciais inválidas e resiliência a quedas validados. Logout ainda pendente. |
| `RF-03` | **Atendido** | `CT-02`, `CT-08`, `CT-09`, `CT-10` | Envio de confirmação, solicitação de redefinição e validação de token cobertos. |
| `RF-04` a `RF-11` | **Modelado (regras aprovadas)** | `CT-15` | Entidades de domínio testadas; telas e rotas de persistência aguardam Sprints subsequentes. |
| `RNF-01` | **Pendente de auditoria** | — | Interface servida estaticamente; auditoria Lighthouse alocada para Sprint 8. |
| `RNF-02` | **Atendido (parcial)** | `CT-10`, `CT-11`, `CT-13` | Hash gerenciado pelo Supabase Auth; variáveis isoladas; proteção de rotas privadas por JWT pendente (`T-08`). |
| `RNF-03` | **Verificado preliminarmente** | `CT-11` | Suíte completa roda em menos de 2 segundos localmente. Testes de carga previstos para Sprint 8. |
| `RNF-04` | **Atendido no domínio** | `CT-15` | Regras de tipo de arquivo e limite de 50 MB validadas em `tests/models.test.js`. |

---

## 5. Evidências da execução

Os logs completos de execução estão versionados em:
- [`docs/evidencias/sprint-07-testes-antes.txt`](../evidencias/sprint-07-testes-antes.txt): execução inicial dos 58 testes antes da correção de T-06.
- [`docs/evidencias/sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt): execução dos 60 testes aprovados, incluindo a validação de tolerância a falhas do caso CT-06.

---

## 6. Limitações conhecidas e trabalho futuro (Sprint 8)

1. **Persistência de Questões e Materiais (`T-09`):** A Sprint 8 consolidará a estratégia de banco de dados ou mock persistente.
2. **Proteção de Rotas com JWT (`T-08`):** Middleware de validação de token de sessão para rotas privadas.
3. **Auditoria de Acessibilidade (`RNF-01`):** Execução automatizada de relatórios Lighthouse sobre as páginas `src/public/`.
4. **Testes de Desempenho e Carga (`RNF-03`):** Medição formal de tempos de resposta da API sob concorrência.

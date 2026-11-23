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
| [#22](https://github.com/pstehling/tp-eng-software/issues/22) (`T-06`) | **Média** | `CT-06` | **Corrigido** | `AdaptadorSupabaseAuth` passou a identificar `credenciaisInvalidas()` de forma explícita e devolver `ERRO_SERVICO` para quedas de rede/provedor; rota `/api/login` passou a responder `503`. | **Aprovado** (coberto por 2 novos testes). Falha antes da correção: [`sprint-07-testes-defeito-ct06.txt`](../evidencias/sprint-07-testes-defeito-ct06.txt); commit [`f505890`](https://github.com/pstehling/tp-eng-software/commit/f505890). |
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

7. Consolidação final (Sprint 8)

Execução final em 23/11/2026, na branch main (tag sprint-08). Saída completa em docs/evidencias/sprint-08-testes-final.txt.

7.1 Resultados quantificados
Item	Planejado	Executado	Aprovado	Reprovado	Não executado
Casos de teste formais (CT-01 a CT-15)	15	15	15	0	0
Testes automatizados (13 suítes)	60	60	60	0	0
Verificações não funcionais previstas para a Sprint 8	2	0	0	0	2

As 2 verificações não executadas são a auditoria de acessibilidade do RNF-01 (Lighthouse) e o teste de carga do RNF-03. Nenhuma das duas tem ferramenta configurada no projeto, por isso não houve execução e elas não entram como aprovadas.

7.2 Situação final dos requisitos
Requisito	Situação final	Casos / evidência	Justificativa
RF-01	Atendido	CT-01, CT-02, CT-03, CT-10	Cadastro com e-mail institucional, bloqueio de duplicidade e validação de senha aprovados.
RF-02	Parcial	CT-04 a CT-07	Login, bloqueio de conta pendente e falha do provedor (503) aprovados; o logout não foi implementado.
RF-03	Atendido	CT-02, CT-08, CT-09, CT-10	Confirmação de conta, pedido de redefinição e validação de token aprovados.
RF-04, RF-07 a RF-11	Parcial	CT-15	Regras de domínio implementadas e testadas; não há telas nem persistência (T-09 pendente).
RF-05, RF-06	Não atendido	—	Só modelados no diagrama de classes; sem código de tela, rota ou teste específico.
RNF-01	Não verificado	—	Auditoria de acessibilidade não executada.
RNF-02	Parcial	CT-10, CT-11, CT-13	Senhas no Supabase Auth, segredos fora do frontend e .env fora do versionamento (T-11); rotas privadas ainda sem JWT (T-08).
RNF-03	Parcial	CT-11	Suíte completa roda em cerca de 1 s; sem teste de carga.
RNF-04	Parcial	CT-15	Tipo e limite de 50 MB validados no domínio; upload real não implementado.

Resumo dos 15 requisitos (11 RF + 4 RNF): 2 atendidos (RF-01, RF-03), 10 parciais (RF-02, RF-04, RF-07 a RF-11, RNF-02 a RNF-04), 2 não atendidos (RF-05, RF-06) e 1 não verificado (RNF-01).

7.3 Defeitos, correções e retestes
Issue	Defeito	Correção	Reteste	Evidência
#22 (T-06)	Falha de rede no login era respondida como credencial inválida (401)	Commit f505890: adaptador devolve ERRO_SERVICO e a rota responde 503	CT-06 aprovado	falha · correção · final
#27 (T-11)	src/.env com chaves reais versionado desde o commit aeaabd1	Sprint 8: git rm --cached src/.env (o .gitignore já cobria o arquivo)	git ls-files src/.env sem saída; suíte segue 60/60	commits da Sprint 8 · final

Observação sobre o T-11: as chaves antigas continuam no histórico do git. A correção só fica completa quando novas chaves forem geradas no painel do Supabase.

7.4 Limitações da versão final
Logout não implementado (RF-02).
Telas e persistência de questões, progresso, perfil, IA e materiais não implementadas (RF-04 a RF-11, T-09).
Rotas privadas sem verificação de JWT (T-08).
Aplicação não publicada, só executável localmente (T-10).
Auditoria de acessibilidade e teste de carga não executados (RNF-01, RNF-03).
Chaves do Supabase ainda não regeneradas após a remoção do .env (T-11).

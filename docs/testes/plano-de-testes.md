# Plano de testes

> **Artefato central da Sprint 7.** Este documento define a estratégia, o escopo, as prioridades baseadas em riscos, a especificação formal dos casos de teste (`CT-01` a `CT-15`), os critérios de aprovação e o registro das primeiras execuções verificáveis da aplicação While(estuda).

---

## 1. Objetivos e escopo

### 1.1 Objetivo
Planejar e executar os testes da aplicação While(estuda), estabelecendo a rastreabilidade direta entre os requisitos funcionais (`RF-01` a `RF-11`), os requisitos não funcionais (`RNF-01` a `RNF-04`), as regras de negócio (`RN-01` a `RN-05`), os riscos mapeados na arquitetura (`R-01` a `R-06`) e as suítes de teste automatizadas em `tests/`.

### 1.2 O que é testado neste ciclo (escopo)
1. **Fluxo prioritário de ponta a ponta — Autenticação e Gestão de Contas:**
   - Cadastro com validação de e-mail institucional e senha segura (`RF-01`, `RN-01`, `US-02`).
   - Autenticação com bloqueio de contas não verificadas e tratamento de credenciais inválidas (`RF-02`, `RN-03`, `US-01`).
   - Diferenciação entre falha de comunicação/indisponibilidade do provedor externo e erro de credenciais (`RF-02`, risco `R-01`, defeito `T-06` / Issue [#22](https://github.com/pstehling/tp-eng-software/issues/22)).
   - Solicitação de recuperação e redefinição de senha com token temporário (`RF-03`, `US-02`).
2. **Modelos de domínio (`src/models/`):**
   - Regras de negócio de `Usuario`, `Questao`, `ConversaIA` e `Materiais` (`RN-01` a `RN-05`, `RNF-04`).
3. **Regras de dependência e conformidade arquitetural (estilo ArchUnit):**
   - Isolamento do domínio, serviços sem conhecimento de HTTP, rotas desacopladas de bibliotecas de terceiros (padrão Adapter `PP-01`), ponto único de leitura de variáveis de ambiente (`DA-01` a `DA-06`, risco `R-06`).
4. **Integridade operacional da API:**
   - Endpoint de monitoramento `GET /api/status`, tratamento de rotas inexistentes (`404` em JSON) e captura centralizada de exceções (`500` sem interrupção do processo, `DA-05`).

### 1.3 Por que este fluxo é prioritário
O fluxo de autenticação e contas é a porta de entrada da plataforma e pré-requisito mandatório para as áreas restritas e funcionalidades de estudo (`RF-04` em diante). Além disso, é o fluxo com implementação completa em todas as camadas (frontend em `src/public/`, API em `src/rotas/`, regras de domínio em `src/models/` e serviço externo adaptado em `src/servicos/`), onde os maiores riscos operacionais (`R-01` de indisponibilidade e `R-03` de autorização) se concentram.

### 1.4 O que não é testado neste ciclo (e justificativa)
- **Telas e rotas ainda não implementadas (`RF-04` a `RF-11`):** As regras de negócio dessas entidades já são validadas nos testes de unidade de domínio (`tests/models.test.js`), porém a interface gráfica e os controladores REST ainda estão como planejados no backlog (débitos arquiteturais `T-08` e `T-09`).
- **Auditoria visual com Lighthouse (`RNF-01`) e testes de carga distribuída (`RNF-03`):** Alocados para a Sprint 8 (consolidação, ampliação e análise final dos resultados), após a definição da infraestrutura de publicação (`T-10`).

---

## 2. Estratégia de testes

A aplicação adota uma pirâmide de testes enxuta executada com o executor nativo do Node.js (`node:test` e `node:assert/strict`), sem dependências externas de teste, garantindo execução rápida, determinística e independente de internet ou variáveis de ambiente locais.

| Nível / Tipo | Objetivo | Ferramenta / Método | Responsável | Evidência esperada |
|---|---|---|---|---|
| **Unidade (Domínio)** | Validar regras de negócio isoladas das classes e funções de `src/models/` sem I/O ou banco. | `node:test`, `node:assert/strict` em `tests/models.test.js` | @gabrielrooocha | 21 testes aprovados cobrindo `RN-01` a `RN-05`, `RF-07` a `RF-11` e `RNF-04`. |
| **Unidade (Adaptador)** | Validar a tradução de parâmetros e códigos de erro estáveis do Supabase na interface `ServicoAutenticacao` (`PP-01`). | Cliente falso em memória em `tests/adaptador-autenticacao.test.js` | @gabrielrooocha | 9 testes aprovados cobrindo mapeamento de erro, usuário fictício e `T-06`. |
| **Integração (Rotas e API)** | Verificar o comportamento das rotas HTTP (`/api/cadastro`, `/api/login`, `/api/recuperar-senha`, `/api/salvar-nova-senha`, `/api/status`), códigos HTTP e respostas JSON. | Servidor Express efêmero + `fetch` nativo em `tests/auth.test.js` e `tests/status.test.js` | @gabrielrooocha | 10 testes aprovados validando códigos 200, 201, 400, 401, 403, 409 e 503. |
| **Arquitetural (Dependências)** | Garantir que o código respeita as regras de arquitetura em três camadas e não introduz atalhos ou acoplamentos indevidos. | Analisador estático com RegExp/AST em `tests/regras-arquitetura.test.js` e `tests/arquitetura.test.js` | @gabrielrooocha | 13 testes aprovados verificando isolamento do domínio, serviços e frontend. |
| **Sistema / Aceitação** | Validar os fluxos do usuário nas telas HTML/CSS/JS (`src/public/`) comunicando-se com a API montada. | Execução integrada do servidor em porta dinâmica com chamadas simuladas de clientes reais. | @gabrielrooocha | Páginas servidas corretamente, formulários integrados e tratamento de erros visíveis. |

---

## 3. Riscos e prioridades de teste

A priorização dos testes deriva diretamente da matriz de riscos documentada em `docs/arquitetura/arquitetura.md` (seção 9) e dos critérios de valor do backlog:

| Risco / Funcionalidade | Probabilidade | Impacto | Prioridade | Requisitos / Itens | Mitigação verificada |
|---|---|---|:---:|---|---|
| **R-01 — Indisponibilidade ou falha de comunicação com o Supabase** | Média | Alta | **1 (Crítica)** | `RF-02`, `T-06` ([#22](https://github.com/pstehling/tp-eng-software/issues/22)) | Teste automatizado garante que falha de rede/provedor devolve `503` com aviso claro em vez de mascarar como credencial inválida (`401`). |
| **R-02 — Exposição de credenciais e configuração incorreta** | Alta | Alta | **1 (Crítica)** | `RNF-02`, `DA-04`, `T-11` ([#27](https://github.com/pstehling/tp-eng-software/issues/27)) | Endpoint `/api/status` verifica configuração sem vazar dados; frontend auditado para não conter chaves. |
| **R-03 — Acesso de contas não verificadas a recursos restritos** | Alta | Alta | **1 (Crítica)** | `RF-01`, `RF-02`, `RN-03` | Teste assegura resposta `403` quando conta em `PENDENTE_VERIFICACAO` tenta autenticar. |
| **R-06 — Erosão arquitetural e violação de camadas** | Média | Alta | **2 (Alta)** | `DA-01` a `DA-06` | Bateria de testes de arquitetura bloqueia imports proibidos (ex.: frontend chamando SDK direto). |
| **Validação de entradas de domínio (injeção, domínios falsos, senhas fracas)** | Média | Média | **2 (Alta)** | `RF-01`, `RN-01`, `RN-04`, `RNF-04` | Testes de unidade barram e-mails não institucionais e arquivos maiores de 50 MB antes de atingir o servidor/provedor. |

---

## 4. Casos de teste

### CT-01 — Rejeição de cadastro com e-mail não institucional
- **Requisitos:** `RF-01`, `RN-01`, `US-02`
- **Pré-condições:** Servidor ativo com rotas de autenticação montadas.
- **Dados de teste:** `nome`: "Ana Souza", `email`: "ana@gmail.com", `senha`: "SenhaValida1".
- **Passos:**
  1. Enviar requisição `POST /api/cadastro` com os dados informados.
  2. Inspecionar o código de status HTTP retornado.
  3. Inspecionar o corpo da resposta JSON.
- **Resultado esperado:** Código `HTTP 400 Bad Request`; corpo com `sucesso: false` e indicação clara de que o e-mail não pertence aos domínios institucionais aceitos (`ufla.br` ou `estudante.ufla.br`). O serviço externo de autenticação **não** deve ser invocado.
- **Tipo:** Automatizado.
- **Arquivo de automação:** [`tests/auth.test.js`](../../tests/auth.test.js#L58) e [`tests/models.test.js`](../../tests/models.test.js#L14).

---

### CT-02 — Cadastro com sucesso e criação de conta pendente de verificação
- **Requisitos:** `RF-01`, `RF-03`, `RN-01`, `US-02`
- **Pré-condições:** Servidor ativo; e-mail institucional não cadastrado previamente.
- **Dados de teste:** `nome`: "Ana Souza", `email`: "ana@estudante.ufla.br", `senha`: "SenhaValida1".
- **Passos:**
  1. Enviar requisição `POST /api/cadastro` com os dados informados.
  2. Verificar chamada ao método `signUp` do provedor com a URL de redirecionamento configurada.
  3. Inspecionar status HTTP e corpo da resposta.
- **Resultado esperado:** Código `HTTP 201 Created`; corpo com `sucesso: true` e mensagem orientando o usuário a verificar sua caixa de e-mail. A conta é criada no estado `PENDENTE_VERIFICACAO`.
- **Tipo:** Automatizado.
- **Arquivo de automação:** [`tests/auth.test.js`](../../tests/auth.test.js#L65).

---

### CT-03 — Bloqueio de cadastro para e-mail duplicado
- **Requisitos:** `RF-01`, `US-02 (critério 2)`
- **Pré-condições:** Servidor ativo; usuário já existente no provedor de autenticação.
- **Dados de teste:** `nome`: "Ana Souza", `email`: "ana@estudante.ufla.br", `senha`: "SenhaValida1", provedor simulando erro `user_already_exists` ou usuário fictício sem identidades.
- **Passos:**
  1. Enviar requisição `POST /api/cadastro` com o e-mail duplicado.
  2. Inspecionar código HTTP e mensagem de retorno.
- **Resultado esperado:** Código `HTTP 409 Conflict`; corpo com `sucesso: false` e mensagem "Este e-mail já está cadastrado.".
- **Tipo:** Automatizado.
- **Arquivo de automação:** [`tests/auth.test.js`](../../tests/auth.test.js#L72) e [`tests/adaptador-autenticacao.test.js`](../../tests/adaptador-autenticacao.test.js#L56).

---

### CT-04 — Bloqueio de login para conta com e-mail não confirmado
- **Requisitos:** `RF-02`, `RN-03`
- **Pré-condições:** Conta cadastrada no sistema, porém com token de e-mail ainda pendente de confirmação.
- **Dados de teste:** `email`: "ana@estudante.ufla.br", `senha`: "SenhaValida1", provedor retornando código `email_not_confirmed`.
- **Passos:**
  1. Enviar requisição `POST /api/login` com as credenciais.
  2. Inspecionar código HTTP e corpo retornado.
- **Resultado esperado:** Código `HTTP 403 Forbidden`; corpo com `sucesso: false` e mensagem "Conta não verificada. Por favor, confirme seu e-mail antes de acessar.".
- **Tipo:** Automatizado.
- **Arquivo de automação:** [`tests/auth.test.js`](../../tests/auth.test.js#L78) e [`tests/models.test.js`](../../tests/models.test.js#L26).

---

### CT-05 — Login com credenciais incorretas (mensagem genérica)
- **Requisitos:** `RF-02`, `US-01 (critério 2)`
- **Pré-condições:** Servidor ativo; usuário informa senha incorreta ou e-mail inexistente.
- **Dados de teste:** `email`: "ana@estudante.ufla.br", `senha`: "senhaErrada99".
- **Passos:**
  1. Enviar requisição `POST /api/login` com senha incorreta.
  2. Inspecionar código de status HTTP e mensagem de erro.
- **Resultado esperado:** Código `HTTP 401 Unauthorized`; corpo com `sucesso: false` e mensagem genérica "E-mail ou senha incorretos." (sem revelar ao atacante se o erro está no e-mail ou na senha).
- **Tipo:** Automatizado.
- **Arquivo de automação:** [`tests/auth.test.js`](../../tests/auth.test.js#L84) e [`tests/adaptador-autenticacao.test.js`](../../tests/adaptador-autenticacao.test.js#L85).

---

### CT-06 — Login sob falha de comunicação com o provedor (Defeito T-06 / R-01)
- **Requisitos:** `RF-02`, Risco `R-01`, Defeito `T-06` ([#22](https://github.com/pstehling/tp-eng-software/issues/22))
- **Pré-condições:** Servidor ativo; provedor de autenticação indisponível (queda de rede, timeout ou erro 500/503 no Supabase).
- **Dados de teste:** `email`: "ana@estudante.ufla.br", `senha`: "SenhaValida1", provedor gerando erro de transporte HTTP (`FetchError`, status 503).
- **Passos:**
  1. Submeter requisição `POST /api/login`.
  2. Verificar retorno do método `entrar()` em `AdaptadorSupabaseAuth`.
  3. Inspecionar o código de status HTTP e resposta da rota.
- **Resultado esperado:** O adaptador reconhece que o erro **não** é de credenciais inválidas e devolve o motivo estável `ERRO_SERVICO`. A API responde com código `HTTP 503 Service Unavailable` e mensagem informativa de indisponibilidade temporária, **sem** emitir `401` com "E-mail ou senha incorretos".
- **Tipo:** Automatizado.
- **Arquivo de automação:** [`tests/adaptador-autenticacao.test.js`](../../tests/adaptador-autenticacao.test.js#L93) e [`tests/auth.test.js`](../../tests/auth.test.js#L91).

---

### CT-07 — Login bem-sucedido e redirecionamento de tela
- **Requisitos:** `RF-02`, `US-01 (critério 1)`
- **Pré-condições:** Usuário cadastrado e ativo (`confirmado`).
- **Dados de teste:** `email`: "ana@estudante.ufla.br", `senha`: "SenhaValida1".
- **Passos:**
  1. Enviar requisição `POST /api/login` com credenciais corretas.
  2. Inspecionar status HTTP e campo de redirecionamento.
- **Resultado esperado:** Código `HTTP 200 OK`; corpo com `sucesso: true` e atributo `redirecionar: "/materiais.html"`.
- **Tipo:** Automatizado.
- **Arquivo de automação:** [`tests/auth.test.js`](../../tests/auth.test.js#L101).

---

### CT-08 — Solicitação de recuperação de senha com link seguro
- **Requisitos:** `RF-03`, `US-02`
- **Pré-condições:** Servidor ativo; e-mail institucional informado no formulário.
- **Dados de teste:** `email`: "ana@estudante.ufla.br".
- **Passos:**
  1. Enviar requisição `POST /api/recuperar-senha`.
  2. Verificar chamada ao provedor com o parâmetro `redirectTo` apontando para `/recuperar-senha/index.html`.
- **Resultado esperado:** Código `HTTP 200 OK`; corpo com `sucesso: true` e mensagem neutra informando envio caso o e-mail exista na base.
- **Tipo:** Automatizado.
- **Arquivo de automação:** [`tests/auth.test.js`](../../tests/auth.test.js#L108).

---

### CT-09 — Redefinição de senha com token expirado ou inválido
- **Requisitos:** `RF-03`
- **Pré-condições:** Servidor ativo; usuário acessa link de recuperação após expiração do token.
- **Dados de teste:** `token_acesso`: "token_expirado_invalido", `nova_senha`: "NovaSenhaForte1".
- **Passos:**
  1. Enviar requisição `POST /api/salvar-nova-senha` com o token corrompido.
- **Resultado esperado:** Código `HTTP 401 Unauthorized`; corpo com `sucesso: false` e mensagem indicando que o token é inválido ou expirou. O método `updateUser` não é chamado.
- **Tipo:** Automatizado.
- **Arquivo de automação:** [`tests/adaptador-autenticacao.test.js`](../../tests/adaptador-autenticacao.test.js#L102).

---

### CT-10 — Rejeição de nova senha fora dos padrões de segurança
- **Requisitos:** `RF-01`, `RF-03`, `RNF-02`
- **Pré-condições:** Servidor ativo; tentativa de salvar senha com menos de 8 caracteres ou sem dígitos numéricos.
- **Dados de teste:** `token_acesso`: "token_valido", `nova_senha`: "curta".
- **Passos:**
  1. Enviar requisição `POST /api/salvar-nova-senha`.
- **Resultado esperado:** Código `HTTP 400 Bad Request`; lista de erros contendo violação de comprimento mínimo e ausência de número. O serviço externo não é acionado.
- **Tipo:** Automatizado.
- **Arquivo de automação:** [`tests/auth.test.js`](../../tests/auth.test.js#L114).

---

### CT-11 — Verificação de status e integridade da API (`GET /api/status`)
- **Requisitos:** `DA-04`, `RNF-02`
- **Pré-condições:** Aplicação em execução.
- **Dados de teste:** sem corpo de requisição; serviço de autenticação simulado (`ServicoFalso`) injetado em `app.locals` para o cenário "configurado".
- **Dados de teste:** sem corpo de requisição; serviço de autenticação simulado (`ServicoFalso`) injetado em `app.locals` para o cenário "configurado".
- **Passos:**
  1. Executar requisição `GET /api/status`.
  2. Inspecionar status HTTP e propriedades do JSON.
- **Resultado esperado:** Código `HTTP 200 OK`; JSON com `status: "ok"`, `versao: "0.1.0"` e indicador `"autenticacao": "configurado"` (quando variáveis de ambiente presentes) sem expor segredos nem chaves.
- **Tipo:** Automatizado.
- **Arquivo de automação:** [`tests/status.test.js`](../../tests/status.test.js#L9) e [`tests/arquitetura.test.js`](../../tests/arquitetura.test.js#L38).

---

### CT-12 — Verificação das regras de dependência entre camadas (ArchUnit)
- **Requisitos:** `DA-01`, `DA-06`, Risco `R-06`
- **Pré-condições:** Repositório íntegro.
- **Dados de teste:** não se aplica (verificação estática); entrada são os arquivos de `src/models/`, `src/servicos/` e `src/rotas/`.
- **Passos:**
  1. Executar analisador estático sobre `src/models/`, `src/servicos/` e `src/rotas/`.
  2. Checar que `models/` não importa `servicos/`, `rotas/` nem bibliotecas externas.
  3. Checar que `rotas/` não importam SDK do Supabase nem o adaptador concreto (apenas a interface abstrata).
- **Resultado esperado:** Todos os 7 testes de dependência passam com sucesso, garantindo a conformidade da arquitetura em 3 camadas com padrão Adapter.
- **Tipo:** Automatizado.
- **Arquivo de automação:** [`tests/regras-arquitetura.test.js`](../../tests/regras-arquitetura.test.js#L104).

---

### CT-13 — Proteção de segredos e isolamento do frontend
- **Requisitos:** `DA-04`, `DA-06`, `RN-05`, `RNF-02`
- **Pré-condições:** Repositório íntegro.
- **Dados de teste:** não se aplica (verificação estática); entrada são os scripts de `src/public/`; padrões proibidos: `supabase.co`, `createClient`, `supabaseKey`, tokens JWT (`eyJ...`).
- **Passos:**
  1. Inspecionar os scripts de `src/public/` (`script.js`, `login/script.js`, `cadastro/script.js`, etc.).
  2. Assegurar ausência de termos como `createClient`, `supabaseKey`, chaves JWT ou credenciais embutidas.
- **Resultado esperado:** O frontend comunica-se exclusivamente com a API local (`/api/*`), sem nenhuma referência a serviços ou segredos de infraestrutura.
- **Tipo:** Automatizado.
- **Arquivo de automação:** [`tests/regras-arquitetura.test.js`](../../tests/regras-arquitetura.test.js#L136).

---

### CT-14 — Tratamento centralizado de erros e resiliência (DA-05)
- **Requisitos:** `DA-05`
- **Pré-condições:** Aplicação em execução com serviço de autenticação simulado que lança exceção (`ServicoFalso({ lancarErro: true })`).
- **Dados de teste:** `POST /api/login` com `email`: "ana@estudante.ufla.br", `senha`: "SenhaValida1"; `GET /api/rota-inexistente`.
- **Passos:**
  1. Provocar uma exceção síncrona/assíncrona inesperada dentro de um controlador ou serviço.
  2. Enviar requisição para rota inexistente em `/api/rota-inexistente`.
- **Resultado esperado:** A rota inexistente devolve `HTTP 404 Not Found` em formato JSON estruturado; o erro inesperado gera resposta `HTTP 500 Internal Server Error` genérica sem vazar stack trace no cliente e **o processo Node.js permanece ativo no ar**.
- **Tipo:** Automatizado.
- **Arquivo de automação:** [`tests/arquitetura.test.js`](../../tests/arquitetura.test.js#L46).

---

### CT-15 — Regras de domínio de Questões, IA e Upload de Materiais
- **Requisitos:** `RF-07`, `RF-08`, `RF-09`, `RF-10`, `RF-11`, `RN-02`, `RN-04`, `RNF-04`
- **Pré-condições:** Modelos de domínio carregados (sem servidor nem banco).
- **Dados de teste:** upload `application/pdf` de 1 KB na pasta do próprio usuário ("ana"); `image/png` com exatamente 50 MB e com 50 MB + 1 byte; `application/zip` de 10 bytes; `text/plain` enviado por "bruno" na pasta de "ana"; questões de exemplo definidas em `tests/models.test.js`.
- **Passos:**
  1. Executar bateria de testes sobre `Questao.filtrar()`, `Questao.corrigir()`, `Questao.validar()`, `calcularProgresso()`.
  2. Executar validações de `ConversaIA` (manutenção de contexto e limite de histórico).
  3. Executar `validarUpload()` com arquivos PDF/PNG/JPG/TXT até 50 MB, arquivos > 50 MB e formatos não suportados.
  4. Checar restrição de acesso a pastas de outros usuários (`RN-04`).
- **Resultado esperado:** Todas as 21 asserções de domínio passam com sucesso, assegurando que o núcleo de regras está protegido antes da construção visual das telas.
- **Tipo:** Automatizado.
- **Arquivo de automação:** [`tests/models.test.js`](../../tests/models.test.js#L37).

---

## 5. Critérios de aprovação e reprovação

### 5.1 Critérios para Aprovação da Sprint 7
1. **100% de Aprovação no Fluxo Prioritário:** Todos os casos de teste automatizados correspondentes a `RF-01`, `RF-02`, `RF-03`, `RN-01` e `RN-03` devem passar sem erros (`pass 60 / fail 0`).
2. **Defeito T-06 Corrigido e Retestado:** O comportamento de erro de comunicação com o provedor (caso `CT-06`) deve ser aprovado, respondendo `503 Service Unavailable`.
3. **Preservação de Regressão:** Os 58 testes automatizados legados da Sprint 6 devem continuar passando sem regressão.
4. **Respeito às Regras Arquiteturais:** Nenhuma violação das regras de dependência entre camadas (DA-01 a DA-06) permitida.
5. **Rastreabilidade Completa:** Cada caso de teste deve estar associado a pelo menos um requisito e possuir evidência de execução registrada em arquivo legível.

### 5.2 Critérios para Reprovação
- Falha em qualquer caso de teste do fluxo de autenticação.
- Mascaramento de erros de infraestrutura ou rede como credenciais inválidas.
- Falhas não tratadas que causem encerramento inesperado (*crash*) do servidor Node.js.
- Vazamento de credenciais ou chaves secretas no código ou respostas HTTP.

---

## 6. Primeiras execuções da Sprint 7

Execução realizada em **16/11/2026** no commit da branch `sprint-07` com o Node.js v24.18.0:

| Caso | Requisito / Risco | Situação Inicial | Defeito Relacionado | Situação Pós-Correção | Evidência de Execução |
|:---:|:---:|:---:|:---:|:---:|:---:|
| `CT-01` | `RF-01`, `RN-01` | **Aprovado** | N/A | **Aprovado** | [`docs/evidencias/sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) |
| `CT-02` | `RF-01`, `RF-03` | **Aprovado** | N/A | **Aprovado** | [`docs/evidencias/sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) |
| `CT-03` | `RF-01`, `US-02` | **Aprovado** | N/A | **Aprovado** | [`docs/evidencias/sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) |
| `CT-04` | `RF-02`, `RN-03` | **Aprovado** | N/A | **Aprovado** | [`docs/evidencias/sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) |
| `CT-05` | `RF-02`, `US-01` | **Aprovado** | N/A | **Aprovado** | [`docs/evidencias/sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) |
| `CT-06` | `RF-02`, `R-01` | **Reprovado** *(devolvia 401)* | [#22](https://github.com/pstehling/tp-eng-software/issues/22) (`T-06`) | **Aprovado** *(agora devolve 503)* | Falha: [`sprint-07-testes-defeito-ct06.txt`](../evidencias/sprint-07-testes-defeito-ct06.txt) · Correção: [`sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) || `CT-07` | `RF-02`, `US-01` | **Aprovado** | N/A | **Aprovado** | [`docs/evidencias/sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) |
| `CT-08` | `RF-03`, `US-02` | **Aprovado** | N/A | **Aprovado** | [`docs/evidencias/sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) |
| `CT-09` | `RF-03` | **Aprovado** | N/A | **Aprovado** | [`docs/evidencias/sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) |
| `CT-10` | `RF-01`, `RF-03` | **Aprovado** | N/A | **Aprovado** | [`docs/evidencias/sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) |
| `CT-11` | `DA-04`, `RNF-02` | **Aprovado** | N/A | **Aprovado** | [`docs/evidencias/sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) |
| `CT-12` | `DA-01`, `DA-06` | **Aprovado** | N/A | **Aprovado** | [`docs/evidencias/sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) |
| `CT-13` | `DA-04`, `RN-05` | **Aprovado** | N/A | **Aprovado** | [`docs/evidencias/sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) |
| `CT-14` | `DA-05` | **Aprovado** | N/A | **Aprovado** | [`docs/evidencias/sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) |
| `CT-15` | `RF-07` a `RF-11` | **Aprovado** | N/A | **Aprovado** | [`docs/evidencias/sprint-07-testes-depois.txt`](../evidencias/sprint-07-testes-depois.txt) |

**Reprodução do defeito T-06:** os 2 testes do `CT-06` foram executados contra o código anterior à correção (commit `f505890^`) e reprovaram (`58 pass / 2 fail`; `401 !== 503`). Saída completa em [`docs/evidencias/sprint-07-testes-defeito-ct06.txt`](../evidencias/sprint-07-testes-defeito-ct06.txt). Após a correção no commit [`f505890`](https://github.com/pstehling/tp-eng-software/commit/f505890), a suíte fica em `60 pass / 0 fail`.

---

## 7. Comandos de execução

Para instalar as dependências e executar a bateria completa de testes automatizados:

```bash
# 1. Na raiz do repositório
npm run instalar

# 2. Executar todos os testes automatizados
npm test
```

Para executar de dentro do diretório `src/`:

```bash
cd src
npm install
npm test
```

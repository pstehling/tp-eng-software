# Sprint 3 — Modelagem e rastreabilidade dos requisitos

- **Data de entrega:** 28/09/2026
- **Pontuação:** 2,5 pontos
- **Tag obrigatória:** `sprint-03`
- **Responsável por conferir este arquivo:** `@gabrielrooocha`

## 1. Pergunta que esta sprint deve responder

**Como a estrutura e os principais fluxos do sistema são representados?**

## 2. Objetivo e resultado da sprint

**Objetivo planejado:** Representar a estrutura e o comportamento do While(estuda) por meio de modelos coerentes com os requisitos da Sprint 2, ligar cada requisito aos elementos dos modelos e evoluir o código para que a estrutura de dados e ao menos um fluxo modelado correspondam ao que está nos diagramas.

**Resultado efetivamente alcançado:** `docs/modelagem/modelagem.md` foi elaborado com 7 modelos — 1 estrutural (classes/entidades de domínio) e 6 comportamentais (casos de uso, 3 diagramas de sequência, 1 fluxograma de regras e 1 diagrama de estados) —, cada um com descrição das decisões representadas, matriz requisito → modelo e tabela de correspondência modelo → código. O fluxo "Cadastro, verificação e login" foi implementado ([PR #15](https://github.com/pstehling/tp-eng-software/pull/15)) e integrado ao modelo `Usuario`; todas as classes do diagrama foram implementadas em `src/models/` e verificadas por 33 testes automatizados aprovados. Os diagramas também foram versionados como arquivos-fonte e imagens, e a matriz de rastreabilidade, o backlog, os requisitos e o README foram atualizados.

## 3. Checklist do artefato central — 0,75 ponto

**Entrega esperada:** `docs/modelagem/modelagem.md`, ao menos um modelo comportamental e um estrutural, descrições e vínculo com requisitos.

- [x] Modelos legíveis e versionados no repositório (Mermaid no documento + `.mmd` e `.png` em [`docs/modelagem/imagens/`](../modelagem/imagens/)).
- [x] Descrição textual da finalidade e decisões de cada modelo.
- [x] Requisitos ligados aos elementos dos modelos (seção 5 da modelagem e [`docs/rastreabilidade.md`](../rastreabilidade.md)).
- [x] Backlog/requisitos refinados quando a modelagem revelou mudanças (tarefas T-02 a T-04; RF-01/RN-01 e regra de senha esclarecidos).
- [x] Links entre elementos modelados e código existente (seção 6 da modelagem).

### Modelos produzidos

| Modelo | Tipo | Requisitos | Seção | Imagem |
|---|---|---|---|---|
| Casos de uso | Comportamental | RF-01 a RF-11 | 2 | [`01-casos-de-uso.png`](../modelagem/imagens/01-casos-de-uso.png) |
| Classes / entidades de domínio | **Estrutural** | RF-01 a RF-11, RN-01 a RN-05 | 3 | [`02-classes.png`](../modelagem/imagens/02-classes.png) |
| Cadastro, verificação e login | Comportamental (sequência) | RF-01, RF-02, RF-03, RN-01, RN-03, RNF-02 | 4.1 | [`03-sequencia-cadastro-login.png`](../modelagem/imagens/03-sequencia-cadastro-login.png) |
| Resolver questão | Comportamental (sequência) | RF-07, RF-09, RNF-03 | 4.2 | [`04-sequencia-resolver-questao.png`](../modelagem/imagens/04-sequencia-resolver-questao.png) |
| Dúvida com IA | Comportamental (sequência) | RF-10, RN-05 | 4.3 | [`05-sequencia-duvida-ia.png`](../modelagem/imagens/05-sequencia-duvida-ia.png) |
| Regras de upload de materiais | Comportamental (atividade) | RF-11, RN-04, RNF-04 | 4.4 | [`06-atividade-upload.png`](../modelagem/imagens/06-atividade-upload.png) |
| Estados do usuário | Comportamental (estados) | RF-03, RN-03 | 4.5 | [`07-estados-usuario.png`](../modelagem/imagens/07-estados-usuario.png) |

### Links dos artefatos

| Artefato criado/atualizado | Link na tag da sprint | O que mudou |
|---|---|---|
| `docs/modelagem/modelagem.md` | [`blob/sprint-03/docs/modelagem/modelagem.md`](https://github.com/pstehling/tp-eng-software/blob/sprint-03/docs/modelagem/modelagem.md) | Documento novo desta sprint: 7 modelos, descrições, matriz requisito → modelo e correspondência modelo → código. Diagrama 4.1 alinhado à implementação. |
| `docs/modelagem/imagens/` | [`tree/sprint-03/docs/modelagem/imagens`](https://github.com/pstehling/tp-eng-software/tree/sprint-03/docs/modelagem/imagens) | Arquivos-fonte (`.mmd`) e imagens (`.png`) de todos os diagramas. |
| `docs/rastreabilidade.md` | [`blob/sprint-03/docs/rastreabilidade.md`](https://github.com/pstehling/tp-eng-software/blob/sprint-03/docs/rastreabilidade.md) | Matriz preenchida para RF-01 a RF-11 e RNF-01 a RNF-04 (issue, modelo, código, teste e situação). |
| `docs/requisitos/requisitos.md` | [`blob/sprint-03/docs/requisitos/requisitos.md`](https://github.com/pstehling/tp-eng-software/blob/sprint-03/docs/requisitos/requisitos.md) | Situação de RF-01 a RF-03 atualizada; e-mail institucional e regra de senha esclarecidos no histórico. |
| `docs/backlog-produto.md` | [`blob/sprint-03/docs/backlog-produto.md`](https://github.com/pstehling/tp-eng-software/blob/sprint-03/docs/backlog-produto.md) | Tarefas T-02 a T-04 identificadas na modelagem; US-01 e US-02 marcadas como implementadas. |
| `README.md` e `src/README.md` | [`blob/sprint-03/README.md`](https://github.com/pstehling/tp-eng-software/blob/sprint-03/README.md) | Tecnologias atualizadas (Supabase Auth) e instruções de execução com `.env`. |

> Os links acima seguem o padrão `github.com/pstehling/tp-eng-software/blob/sprint-03/<caminho>` e passam a funcionar depois que a tag `sprint-03` for criada e enviada com `git push origin sprint-03`.

## 4. Incremento da aplicação web — 0,75 ponto

**Incremento mínimo esperado:** Evolução de um fluxo modelado, estrutura de dados/classes coerente e evidência de correspondência entre modelo e código.

### O que foi implementado ou evoluído

**Fluxo modelado — Cadastro, verificação e login (diagrama 4.1 e 4.5).** O cadastro, o login e a recuperação de senha foram implementados com o Supabase Auth ([PR #15](https://github.com/pstehling/tp-eng-software/pull/15)): telas em `src/public/cadastro/`, `src/public/login/` e `src/public/recuperar-senha/` e endpoints `/api/cadastro`, `/api/login`, `/api/recuperar-senha` e `/api/salvar-nova-senha` em [`src/server.js`](../../src/server.js). Na sequência, o backend passou a aplicar as regras do modelo antes de chamar o Supabase — `Usuario.validarCadastro()` (e-mail institucional e regra de senha) e `validarSenha()` na redefinição —, exatamente como mostra o diagrama 4.1. Conta não verificada recebe `403`, credenciais inválidas recebem `401` com mensagem genérica e e-mail repetido recebe `409`.

**Estrutura de classes coerente com o modelo estrutural.** Cada classe do diagrama de classes tem uma implementação correspondente em [`src/models/`](../../src/models/), com os mesmos nomes de atributos e métodos:

| Classe do diagrama | Código | Métodos/regras implementados |
|---|---|---|
| `Usuario`, `TokenVerificacao` | [`usuario.js`](../../src/models/usuario.js) | `validarCadastro()`, `podeAutenticar()`, `verificarEmail(token)`, `podeEditarBancoDeQuestoes()`, `estaValido()`, `consumir()` |
| `Materia`, `Topico`, `Questao`, `Alternativa`, `RespostaQuestao` | [`questao.js`](../../src/models/questao.js) | `Questao.filtrar()`, `corrigir()`, `validar()`, `calcularProgresso()` |
| `ConversaIA`, `MensagemIA` | [`conversa.js`](../../src/models/conversa.js) | `adicionar()`, `historicoParaEnvio()` |
| `ItemDoRepositorio` (abstrata), `Pasta`, `Arquivo`, `Anotacao` | [`materiais.js`](../../src/models/materiais.js) | `acessivelPor()`, `validarUpload()` (formato → tamanho → proprietário, como no diagrama 4.4) |

**Ajustes no fluxo de autenticação** feitos ao comparar o código com o modelo: inclusão de `dotenv` e `@supabase/supabase-js` no `package.json` (a aplicação não iniciava após um `npm install` limpo); correção da rota de recuperação de senha (o frontend chamava `/api/recuperar-senha`, mas o backend estava em `/api/recuperar-senha/index.html`) e do link enviado por e-mail; correção dos links "Esqueci minha senha" e "Cadastre-se" da tela de login; restauração do `GET /api/status` usado pelo teste CT-00; e criação do cliente Supabase sob demanda, para que a aplicação e os testes rodem mesmo sem o `.env`.

### Como executar e verificar

```bash
cd src
npm install
cp .env.example .env   # preencher SUPABASE_URL e SUPABASE_ANON_KEY
npm start              # http://localhost:3000 → Entrar / Cadastrar
npm test               # 33 testes: modelos, fluxo de autenticação e status
```

| Requisito/Issue | Código ou protótipo | Evidência de execução |
|---|---|---|
| RF-01, RN-01 / [#2](https://github.com/pstehling/tp-eng-software/issues/2) | [`src/models/usuario.js`](../../src/models/usuario.js), [`src/server.js`](../../src/server.js), [`src/public/cadastro/`](../../src/public/cadastro/) | [`tests/auth.test.js`](../../tests/auth.test.js) e [`tests/models.test.js`](../../tests/models.test.js) — aprovados |
| RF-02, RN-03 / [#1](https://github.com/pstehling/tp-eng-software/issues/1) | [`src/server.js`](../../src/server.js), [`src/public/login/`](../../src/public/login/) | [`tests/auth.test.js`](../../tests/auth.test.js) — aprovados |
| RF-03 / [#2](https://github.com/pstehling/tp-eng-software/issues/2) | [`src/server.js`](../../src/server.js), [`src/public/recuperar-senha/`](../../src/public/recuperar-senha/) | [`tests/auth.test.js`](../../tests/auth.test.js) — aprovados |
| RF-04, RF-07 a RF-11, RN-02, RN-04, RNF-04 | [`src/models/`](../../src/models/) | [`tests/models.test.js`](../../tests/models.test.js) — aprovados |
| Todos acima | — | Saída completa: [`docs/evidencias/sprint-03-testes.txt`](../evidencias/sprint-03-testes.txt) (33 testes, 33 aprovados, 0 falhas) |

## 5. Scrum e gestão do trabalho — 0,50 ponto

### Sprint Backlog

| Issue | Descrição | Responsável | Critério de aceitação/conclusão | Situação |
|---|---|---|---|---|
| — | Elaborar `docs/modelagem/modelagem.md` (modelos, descrições e matrizes) | @gabrielrooocha | Ao menos um modelo estrutural e um comportamental, com descrição e vínculo com requisitos | Concluída ([`e6568f4`](https://github.com/pstehling/tp-eng-software/commit/e6568f4149376cc1b806b544cad4f6cb82fb204e)) |
| [#1](https://github.com/pstehling/tp-eng-software/issues/1) | Tela de Login | @joaovitormv | Critérios da issue | Implementada ([PR #15](https://github.com/pstehling/tp-eng-software/pull/15)) — logout pendente |
| [#2](https://github.com/pstehling/tp-eng-software/issues/2) | Tela de Autenticação (cadastro e verificação de conta) | @joaovitormv | Critérios da issue | Implementada ([PR #15](https://github.com/pstehling/tp-eng-software/pull/15)) |
| `T-02` | Implementar os modelos de domínio (`src/models/`) com testes | Grupo | Classes do diagrama implementadas; testes aprovados | Concluída |
| `T-03` | Integrar `Usuario` ao fluxo de autenticação e corrigir dependências/rotas | Grupo | Fluxo 4.1 do modelo reproduzido pelo código; testes aprovados | Concluída |
| `T-04` | Versionar fontes e imagens dos diagramas | Grupo | `.mmd` e `.png` de todos os diagramas em `docs/modelagem/imagens/` | Concluída |
| [#8](https://github.com/pstehling/tp-eng-software/issues/8) | Tela de Questão | @joaovitormv, @gabrielrooocha | Critérios da issue | Não iniciada (modelada em 4.2) |
| [#9](https://github.com/pstehling/tp-eng-software/issues/9) | Tela de Conversa com a IA | @IsadoraRB-dge, @joaovitormv | Critérios da issue | Não iniciada (modelada em 4.3) |
| [#10](https://github.com/pstehling/tp-eng-software/issues/10) | Organização de Materiais Próprios | @pstehling, @gabrielcarvalho28 | Critérios da issue | Não iniciada (modelada em 4.4) |

### Acompanhamento

- **GitHub Project:** [`https://github.com/users/pstehling/projects/2`](https://github.com/users/pstehling/projects/2)
- **Reuniões/decisões:** Não houve reunião formal nesta sprint. As decisões foram tomadas de forma assíncrona e estão registradas no [PR #15](https://github.com/pstehling/tp-eng-software/pull/15), em `docs/modelagem/modelagem.md` (seções 7 e 8) e no histórico de `docs/requisitos/requisitos.md`. O grupo confirmou as regras de cadastro adotadas na modelagem (e-mail `@ufla.br`/`@estudante.ufla.br` e senha com no mínimo 8 caracteres, letra e número).
- **Impedimentos:** Nenhum registrado.
- **Mudanças de escopo:** Nenhuma. A autenticação passou a usar o Supabase Auth (hash de senha e sessão JWT delegados ao serviço), o que atende ao RNF-02 sem alterar o escopo.

### Evidências de colaboração

| Integrante | Atividades na sprint | Commits ou PRs |
|---|---|---|
| Gabriel Rocha de Almeida (@gabrielrooocha) | Elaboração da modelagem (7 diagramas, descrições e matrizes) | [`e6568f4`](https://github.com/pstehling/tp-eng-software/commit/e6568f4149376cc1b806b544cad4f6cb82fb204e) |
| João Vitor Maximiliom Vieira (@joaovitormv) | Implementação do cadastro, login e recuperação de senha | [`aeaabd1`](https://github.com/pstehling/tp-eng-software/commit/aeaabd13d4cee5bbfd09e58ad7c8888ca1a856ca), [PR #15](https://github.com/pstehling/tp-eng-software/pull/15) |
| Gabriel Soares Carvalho (@gabrielcarvalho28) | Revisão e merge do PR de autenticação | [PR #15](https://github.com/pstehling/tp-eng-software/pull/15) |
| Pedro Stehling Mendes (@pstehling) | Modelos de domínio em `src/models/`, testes, imagens dos diagramas e atualização da documentação da sprint | `[PREENCHER com o link do PR da branch sprint-03]` |
| Isadora Rocha Brito (@IsadoraRB-dge) | `[PREENCHER]` | `[PREENCHER]` |

## 6. GitHub, documentação e rastreabilidade — 0,50 ponto

| Tipo de evidência | Link | O que comprova |
|---|---|---|
| Issue | [#1](https://github.com/pstehling/tp-eng-software/issues/1), [#2](https://github.com/pstehling/tp-eng-software/issues/2) | Histórias implementadas nesta sprint. |
| Pull Request | [PR #15](https://github.com/pstehling/tp-eng-software/pull/15) | Implementação do cadastro, login e recuperação de senha, revisada e mesclada na `main`. |
| Commit | [`e6568f4`](https://github.com/pstehling/tp-eng-software/commit/e6568f4149376cc1b806b544cad4f6cb82fb204e), [`aeaabd1`](https://github.com/pstehling/tp-eng-software/commit/aeaabd13d4cee5bbfd09e58ad7c8888ca1a856ca) | Criação da modelagem e implementação do fluxo de autenticação. |
| Código/arquivo | [`src/models/`](../../src/models/), [`src/server.js`](../../src/server.js) | Classes do modelo estrutural e fluxo modelado. |
| Teste/captura/relatório | [`docs/evidencias/sprint-03-testes.txt`](../evidencias/sprint-03-testes.txt) | 33 testes automatizados aprovados. |

### Rastreabilidade resumida

| Requisito | Issue | Artefato/modelo/decisão | Código | Teste/evidência |
|---|---|---|---|---|
| RF-01 | [#2](https://github.com/pstehling/tp-eng-software/issues/2) | Classes (`Usuario`), 4.1, 4.5 | [`usuario.js`](../../src/models/usuario.js), [`server.js`](../../src/server.js) | [`auth.test.js`](../../tests/auth.test.js), [`models.test.js`](../../tests/models.test.js) |
| RF-02 | [#1](https://github.com/pstehling/tp-eng-software/issues/1) | 4.1 | [`server.js`](../../src/server.js) | [`auth.test.js`](../../tests/auth.test.js) |
| RF-03 | [#2](https://github.com/pstehling/tp-eng-software/issues/2) | `TokenVerificacao`, 4.1, 4.5 | [`usuario.js`](../../src/models/usuario.js), [`server.js`](../../src/server.js) | [`auth.test.js`](../../tests/auth.test.js), [`models.test.js`](../../tests/models.test.js) |
| RF-07, RF-09 | [#6](https://github.com/pstehling/tp-eng-software/issues/6), [#8](https://github.com/pstehling/tp-eng-software/issues/8) | `Questao`, 4.2 | [`questao.js`](../../src/models/questao.js) | [`models.test.js`](../../tests/models.test.js) |
| RF-10 | [#9](https://github.com/pstehling/tp-eng-software/issues/9) | `ConversaIA`, 4.3 | [`conversa.js`](../../src/models/conversa.js) | [`models.test.js`](../../tests/models.test.js) |
| RF-11, RNF-04 | [#10](https://github.com/pstehling/tp-eng-software/issues/10) | `ItemDoRepositorio`, 4.4 | [`materiais.js`](../../src/models/materiais.js) | [`models.test.js`](../../tests/models.test.js) |

A matriz completa, com todos os RF e RNF, está em [`docs/rastreabilidade.md`](../rastreabilidade.md).

## 7. Revisão do incremento

- **O que foi demonstrado:** Os 7 modelos com suas descrições; o fluxo de cadastro → verificação de e-mail → login funcionando na aplicação; a correspondência entre cada classe do diagrama e o código em `src/models/`; e a execução dos 33 testes automatizados.
- **Critérios atendidos:** Todos os itens do checklist da seção 3 e o incremento mínimo da seção 4 (fluxo modelado evoluído, classes coerentes com o modelo estrutural e evidência de correspondência).
- **Itens não concluídos:** Ver seção 8.
- **Motivo das pendências:** Ver seção 8.
- **Feedback recebido e ajustes:** `[PREENCHER após a revisão/correção desta sprint]`

## 8. Retrospectiva e próxima sprint

- **Funcionou bem:** `[PREENCHER PELO GRUPO]`
- **Precisa melhorar:** As telas modeladas em 4.2, 4.3 e 4.4 (questão, IA e materiais — issues #8, #9 e #10) ainda não foram implementadas, e o logout (RF-02) segue pendente; não houve reunião formal na sprint, o que deixou as decisões espalhadas entre PR e documentos; a entrega foi concluída depois da data prevista (28/09).
- **Ação concreta para a próxima sprint:** Fazer ao menos uma reunião registrada em `docs/reunioes/` no início da Sprint 4; registrar as decisões de projeto (persistência das questões e materiais, organização do backend) na Sprint 4 e usar os modelos de `src/models/` como base das próximas telas.

## 9. O que não será considerado suficiente

- Diagramas sem explicação.
- Imagens externas sem versão no repositório.
- Modelo genérico que não corresponde aos requisitos ou ao código.

## 10. Links enviados no UFLA Virtual

- **Tag `sprint-03`:** [`https://github.com/pstehling/tp-eng-software/tree/sprint-03`](https://github.com/pstehling/tp-eng-software/tree/sprint-03)
- **Este arquivo na tag:** [`https://github.com/pstehling/tp-eng-software/blob/sprint-03/docs/sprints/sprint-03.md`](https://github.com/pstehling/tp-eng-software/blob/sprint-03/docs/sprints/sprint-03.md)
- **Observação adicional:** Links pré-preenchidos no padrão do GitHub; passam a funcionar depois que a tag `sprint-03` for criada e enviada (`git push origin sprint-03`).

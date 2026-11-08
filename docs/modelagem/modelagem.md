# Modelagem do sistema

> **Artefato central da Sprint 3.** Os modelos explicam a estrutura e o comportamento da solução e estabelecem a correspondência entre requisitos, regras de negócio e código.

## 1. Modelos selecionados

| Modelo                         | Tipo           | Pergunta que ele ajuda a responder                                                              | Requisitos relacionados                   |
| ------------------------------ | -------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Casos de uso                   | Comportamental | Quem utiliza o sistema e quais funcionalidades cada ator pode executar?                         | RF-01 a RF-11                             |
| Classes / entidades de domínio | Estrutural     | Quais são as entidades do sistema, seus atributos e como elas se relacionam?                    | RF-01 a RF-11, RN-01 a RN-05              |
| Cadastro, verificação e login  | Comportamental | Como ocorre o cadastro, a verificação do e-mail e a autenticação?                               | RF-01, RF-02, RF-03, RN-01, RN-03, RNF-02 |
| Resolver questão               | Comportamental | Como uma questão é filtrada, respondida, corrigida e registrada no histórico?                   | RF-07, RF-09, RNF-03                      |
| Dúvida com IA                  | Comportamental | Como o estudante envia uma dúvida e recebe uma resposta do serviço externo de IA?               | RF-10, RN-05                              |
| Regras de upload de materiais  | Comportamental | Quais arquivos podem ser enviados e quais regras de acesso e armazenamento devem ser aplicadas? | RF-11, RN-04, RNF-04                      |
| Estados do usuário             | Comportamental | Quais estados uma conta pode assumir e como ocorre a transição entre eles?                      | RF-03, RN-03                              |

### 1.1 Arquivos dos diagramas

Os diagramas estão escritos em Mermaid dentro deste documento (renderizados pelo GitHub). Para garantir a leitura fora do GitHub, cada um também está versionado como arquivo-fonte (`.mmd`) e imagem (`.png`) em [`docs/modelagem/imagens/`](imagens/).

| Seção | Diagrama | Arquivo-fonte | Imagem |
|---|---|---|---|
| 2 | Casos de uso | [`01-casos-de-uso.mmd`](imagens/01-casos-de-uso.mmd) | [`01-casos-de-uso.png`](imagens/01-casos-de-uso.png) |
| 3.1 | Classes / entidades de domínio | [`02-classes.mmd`](imagens/02-classes.mmd) | [`02-classes.png`](imagens/02-classes.png) |
| 4.1 | Cadastro, verificação e login | [`03-sequencia-cadastro-login.mmd`](imagens/03-sequencia-cadastro-login.mmd) | [`03-sequencia-cadastro-login.png`](imagens/03-sequencia-cadastro-login.png) |
| 4.2 | Resolver questão | [`04-sequencia-resolver-questao.mmd`](imagens/04-sequencia-resolver-questao.mmd) | [`04-sequencia-resolver-questao.png`](imagens/04-sequencia-resolver-questao.png) |
| 4.3 | Dúvida com IA | [`05-sequencia-duvida-ia.mmd`](imagens/05-sequencia-duvida-ia.mmd) | [`05-sequencia-duvida-ia.png`](imagens/05-sequencia-duvida-ia.png) |
| 4.4 | Regras de upload de materiais | [`06-atividade-upload.mmd`](imagens/06-atividade-upload.mmd) | [`06-atividade-upload.png`](imagens/06-atividade-upload.png) |
| 4.5 | Estados do usuário | [`07-estados-usuario.mmd`](imagens/07-estados-usuario.mmd) | [`07-estados-usuario.png`](imagens/07-estados-usuario.png) |

---

## 2. Modelo de casos de uso

O modelo representa os atores e as funcionalidades disponíveis no sistema.

O `Estudante (ACT-01)` realiza as operações relacionadas à conta, estudo e materiais. O `Administrador (ACT-02)` também possui as funcionalidades de estudante e, adicionalmente, pode cadastrar ou importar questões. O `Serviço de IA (ACT-03)` é um ator externo acionado pelo caso de uso de conversação com a IA.

```mermaid
flowchart LR
    EST([Estudante ACT-01])
    ADM([Administrador ACT-02])
    IA([Serviço de IA ACT-03])

    ADM -. "também é estudante" .-> EST

    subgraph CONTA["Conta"]
        UC1["Cadastrar-se - RF-01"]
        UC2["Verificar e-mail - RF-03"]
        UC3["Entrar / Sair - RF-02"]
        UC4["Recuperar senha - RF-03"]
        UC5["Gerir perfil - RF-05"]
    end

    subgraph ESTUDO["Estudo"]
        UC6["Ver painel inicial - RF-04"]
        UC7["Listar matérias - RF-06"]
        UC8["Buscar e filtrar questões - RF-07"]
        UC9["Resolver questão - RF-09"]
        UC10["Conversar com a IA - RF-10"]
    end

    subgraph MATERIAIS["Materiais"]
        UC11["Organizar pastas, arquivos e anotações - RF-11"]
    end

    subgraph ADMINISTRACAO["Administração"]
        UC12["Cadastrar / importar questões - RF-08"]
    end

    EST --- UC1
    EST --- UC2
    EST --- UC3
    EST --- UC4
    EST --- UC5
    EST --- UC6
    EST --- UC7
    EST --- UC8
    EST --- UC9
    EST --- UC10
    EST --- UC11

    ADM --- UC12

    UC9 -. "extend" .-> UC10
    UC10 --- IA
```

**Descrição e decisões representadas:** o administrador é tratado como um estudante com permissões adicionais, em vez de possuir um conjunto completamente separado de funcionalidades. O serviço de IA permanece como ator externo e é acionado somente pela funcionalidade de conversação com a IA.

---

## 3. Modelo estrutural de classes e entidades

O modelo de classes representa a estrutura lógica do domínio. A persistência ainda é independente de SGBD, conforme definido para a Sprint 3.

### 3.1 Diagrama de classes

```mermaid
classDiagram

    class Usuario {
        +id
        +nome
        +email
        +senhaHash
        +papel : ESTUDANTE|ADMIN
        +status : PENDENTE_VERIFICACAO|ATIVO
        +avatarUrl
        +curso
        +validarCadastro()
        +podeAutenticar()
        +verificarEmail(token)
        +podeEditarBancoDeQuestoes()
    }

    class TokenVerificacao {
        +tipo : VERIFICACAO_EMAIL|RECUPERACAO_SENHA
        +expiraEm
        +usadoEm
        +estaValido()
        +consumir()
    }

    class Materia {
        +id
        +nome
        +descricao
    }

    class Topico {
        +id
        +nome
    }

    class Questao {
        +id
        +enunciado
        +dificuldade : FACIL|MEDIA|DIFICIL
        +alternativaCorretaId
        +explicacao
        +validar()
        +corrigir(usuarioId, alternativaId)
        +filtrar(questoes, filtros)
    }

    class Alternativa {
        +id
        +texto
    }

    class RespostaQuestao {
        +alternativaId
        +correta
        +respondidaEm
    }

    class ItemDoRepositorio {
        <<abstract>>
        +id
        +nome
        +acessivelPor(usuarioId)
    }

    class Pasta

    class Arquivo {
        +tipoMime
        +tamanhoBytes
        +ultimoAcessoEm
    }

    class Anotacao {
        +conteudo
        +ultimoAcessoEm
    }

    class ConversaIA {
        +id
        +contexto
        +adicionar(autor, texto)
        +historicoParaEnvio()
    }

    class MensagemIA {
        +autor : USUARIO|IA
        +texto
        +criadaEm
    }

    Usuario "1" --> "0..*" TokenVerificacao : possui
    Materia "1" *-- "1..*" Topico : contém
    Topico "1" o-- "0..*" Questao : classifica
    Questao "1" *-- "2..*" Alternativa : compõe
    Usuario "1" --> "0..*" RespostaQuestao : registra
    Questao "1" <-- "0..*" RespostaQuestao : responde

    Usuario "1" --> "0..*" ItemDoRepositorio : é dono de
    ItemDoRepositorio <|-- Pasta
    ItemDoRepositorio <|-- Arquivo
    ItemDoRepositorio <|-- Anotacao
    Pasta "0..1" o-- "0..*" ItemDoRepositorio : agrupa

    Usuario "1" --> "0..*" ConversaIA : inicia
    ConversaIA "1" *-- "0..*" MensagemIA : contém
    ConversaIA "0..*" --> "0..1" Questao : contexto
    ConversaIA "0..*" --> "0..1" Materia : contexto
```

**Descrição e decisões representadas:**

* `Usuario` possui o atributo `papel`, permitindo representar estudantes e administradores em uma única entidade.
* `Topico` é uma entidade própria porque as matérias possuem tópicos associados e as questões podem ser filtradas por assunto.
* `RespostaQuestao` é uma entidade própria porque o sistema precisa manter o histórico das respostas e utilizá-lo para representar o progresso de estudos.
* `Pasta`, `Arquivo` e `Anotacao` herdam de `ItemDoRepositorio`, centralizando as regras relacionadas ao proprietário e ao acesso aos materiais.
* `TokenVerificacao` representa tanto a verificação de e-mail quanto a recuperação de senha, diferenciadas pelo atributo `tipo`.
* `ConversaIA` pode manter contexto relacionado a uma questão ou matéria.
* A chave da API de IA não pertence ao modelo de domínio e deve permanecer na configuração do backend.

---

## 4. Modelos comportamentais

### 4.1 Cadastro, verificação e login

O fluxo representa o processo necessário para liberar o acesso às telas privadas do sistema. Na Sprint 3 o diagrama foi **alinhado à implementação** feita no [PR #15](https://github.com/pstehling/tp-eng-software/pull/15): a geração do hash da senha, o envio do e-mail e a validação do token de verificação ficam a cargo do **Supabase Auth**, enquanto as regras de domínio (e-mail institucional e regra de senha) ficam em `Usuario` ([`src/models/usuario.js`](../../src/models/usuario.js)) e são aplicadas pelo backend antes de qualquer chamada externa.

As principais decisões são: utilizar uma mensagem genérica para falhas de login, impedir a autenticação de contas que ainda não verificaram o e-mail e manter hash de senha e sessão (JWT) fora do modelo de domínio.

```mermaid
sequenceDiagram
    actor E as Estudante
    participant UI as Frontend (cadastro/ e login/)
    participant API as Backend (rotas/autenticacao.js)
    participant M as Usuario (models/usuario.js)
    participant AD as AdaptadorSupabaseAuth (servicos/)
    participant AUTH as Supabase Auth

    E->>UI: Preenche nome, e-mail e senha
    UI->>API: POST /api/cadastro
    API->>M: Usuario.validarCadastro()

    alt Dados inválidos ou e-mail não institucional
        M-->>API: erros[]
        API-->>UI: 400 + mensagens
    else Dados válidos
        API->>AD: cadastrar(nome, email, senha)
        AD->>AUTH: signUp(email, password)
        alt E-mail já cadastrado
            AUTH-->>AD: erro code "user_already_exists"
            AD-->>API: motivo EMAIL_JA_CADASTRADO
            API-->>UI: 409 e-mail já cadastrado
        else Conta criada como PENDENTE_VERIFICACAO
            AUTH->>AUTH: Gera o hash da senha
            AUTH-->>E: E-mail com link de verificação
            AD-->>API: sucesso
            API-->>UI: 201 verifique seu e-mail
        end
    end

    E->>AUTH: Abre o link de verificação
    AUTH->>AUTH: Token válido, conta passa a ATIVO

    E->>UI: E-mail + senha
    UI->>API: POST /api/login
    API->>AD: entrar(email, senha)
    AD->>AUTH: signInWithPassword(email, password)

    alt Conta ainda pendente
        AD-->>API: motivo EMAIL_NAO_CONFIRMADO
        API-->>UI: 403 confirme seu e-mail
    else Credenciais inválidas
        AD-->>API: motivo CREDENCIAIS_INVALIDAS
        API-->>UI: 401 mensagem genérica
    else Autenticação válida
        AD-->>API: sucesso
        API-->>UI: 200 + redirecionamento (sessão JWT gerida pelo Supabase)
    end
```

**Descrição e decisões representadas:** o cadastro só chega ao serviço de autenticação depois de passar por `Usuario.validarCadastro()` (RN-01 e regra de senha); caso contrário, o backend responde `400` sem chamar o Supabase. A conta é criada como `PENDENTE_VERIFICACAO` e só passa a `ATIVO` com o token do e-mail. No login, a conta pendente recebe `403` com orientação para confirmar o e-mail, e credenciais inválidas recebem `401` com mensagem genérica (US-01, critério 2). Em relação à primeira versão do modelo, os endpoints propostos (`/api/auth/...`) foram substituídos pelos efetivamente implementados (`/api/cadastro`, `/api/login`, `/api/recuperar-senha`, `/api/salvar-nova-senha`), e o caso "conta pendente" foi separado de "credenciais inválidas" por ter tratamento diferente no código. O comportamento está coberto por [`tests/auth.test.js`](../../tests/auth.test.js).

**Atualização da Sprint 5 (padrão Adapter, PP-01):** o backend deixou de chamar o Supabase diretamente. As rotas usam a interface `ServicoAutenticacao` ([`src/servicos/servico-autenticacao.js`](../../src/servicos/servico-autenticacao.js)), e o participante `AdaptadorSupabaseAuth` ([`src/servicos/adaptador-supabase-auth.js`](../../src/servicos/adaptador-supabase-auth.js)) traduz as chamadas e os erros do Supabase para motivos do domínio. Os casos "e-mail já cadastrado" e "conta pendente" passaram a ser identificados pelo código do erro (`user_already_exists`/`email_exists` e `email_not_confirmed`), e não pelo texto da mensagem. Os status HTTP do fluxo não mudaram. Justificativa em [`docs/padroes/padroes-de-projeto.md`](../padroes/padroes-de-projeto.md); testes em [`tests/adaptador-autenticacao.test.js`](../../tests/adaptador-autenticacao.test.js). A imagem `imagens/03-sequencia-cadastro-login.png` precisa ser regenerada a partir do `.mmd` atualizado.

---

### 4.2 Resolver questão

Esse é o fluxo central de estudo. A questão é filtrada, respondida e corrigida no domínio por `Questao.corrigir()`. O resultado gera uma `RespostaQuestao`, utilizada posteriormente para histórico e progresso.

```mermaid
sequenceDiagram
    actor E as Estudante
    participant UI as Frontend
    participant API as Backend
    participant Q as Questao

    E->>UI: Escolhe matéria e filtros
    UI->>API: GET /api/questoes?materia&topico&dificuldade&q
    API->>Q: Questao.filtrar()
    Q-->>API: Questões filtradas
    API-->>UI: Lista de questões

    E->>UI: Seleciona alternativa e confirma
    UI->>API: POST /api/questoes/:id/respostas
    API->>Q: corrigir(usuarioId, alternativaId)
    Q-->>API: RespostaQuestao(correta)

    API->>API: Salva RespostaQuestao
    API-->>UI: Correta? + gabarito + explicação
```

**Descrição e decisões representadas:** a filtragem considera matéria, tópico, dificuldade e busca textual. A correção é responsabilidade da entidade `Questao`, enquanto `RespostaQuestao` registra a resposta do estudante para formar o histórico e contribuir para o progresso.

---

### 4.3 Dúvida com IA

O fluxo representa a integração com o serviço externo de IA. Apenas o backend realiza a comunicação com o provedor, mantendo a chave da API no servidor. Em caso de indisponibilidade, o sistema apresenta uma mensagem amigável e permite uma nova tentativa.

```mermaid
sequenceDiagram
    actor E as Estudante
    participant UI as Frontend
    participant API as Backend
    participant C as ConversaIA
    participant IA as Serviço de IA

    E->>UI: Solicita ajuda da IA na questão
    UI->>API: POST /api/conversas {questaoId}
    API->>C: Cria ConversaIA(contexto={questaoId})

    E->>UI: Digita a dúvida
    UI->>API: POST /api/conversas/:id/mensagens
    API->>C: adicionar(USUARIO, texto)
    API->>IA: Enunciado + historicoParaEnvio()

    alt IA responde
        IA-->>API: Resposta
        API->>C: adicionar(IA, resposta)
        API-->>UI: Resposta
    else Serviço indisponível
        API-->>UI: Erro amigável + reenviar
    end
```

**Descrição e decisões representadas:** `ConversaIA` mantém o histórico da interação e pode guardar o contexto da questão. A comunicação com o serviço externo acontece exclusivamente pelo backend.

---

### 4.4 Regras de upload de materiais

O upload de materiais possui regras específicas de formato, tamanho e acesso. São aceitos arquivos `PDF`, `PNG`, `JPG` e `TXT`, com limite máximo de `50 MB`. O acesso ao item é permitido somente ao seu proprietário.

```mermaid
flowchart TD
    A["Usuário seleciona arquivo"] --> B{"Formato permitido?"}

    B -->|"PDF, PNG, JPG ou TXT"| C{"Tamanho <= 50 MB?"}
    B -->|"Não"| D["Rejeitar upload"]

    C -->|"Sim"| E{"Usuário é o proprietário?"}
    C -->|"Não"| D

    E -->|"Sim"| F["Armazenar arquivo"]
    E -->|"Não"| G["Negar acesso"]

    F --> H["Disponibilizar item no repositório"]
```

**Descrição e decisões representadas:** a validação do upload deve garantir os formatos permitidos e o limite máximo de 50 MB. A regra de privacidade determina que somente o proprietário tenha acesso ao item. A implementação está em [`src/models/materiais.js`](../../src/models/materiais.js) (`validarUpload()`) e é verificada em [`tests/models.test.js`](../../tests/models.test.js).

---

### 4.5 Estados do usuário

O ciclo de vida da conta é representado pelos estados `PENDENTE_VERIFICACAO` e `ATIVO`.

```mermaid
stateDiagram-v2
    [*] --> PENDENTE_VERIFICACAO : Cadastro válido (RF-01)

    PENDENTE_VERIFICACAO --> ATIVO : Verificar e-mail com token válido (RF-03)

    PENDENTE_VERIFICACAO --> PENDENTE_VERIFICACAO : Token expirado / reenvio

    ATIVO --> ATIVO : Login / logout / recuperar senha
```

**Descrição e decisões representadas:** uma conta criada corretamente inicia como `PENDENTE_VERIFICACAO`. A verificação de um token válido altera seu estado para `ATIVO`. Um token expirado não ativa a conta, sendo necessário realizar o reenvio.

---

## 5. Relação entre requisitos e modelos

| Requisito | Elemento do modelo                                     | Como está representado                                                    | Alteração provocada no backlog/código |
| --------- | ------------------------------------------------------ | ------------------------------------------------------------------------- | ------------------------------------- |
| RF-01     | `Usuario.validarCadastro()`                            | Cadastro e validação de dados no modelo de domínio e no fluxo de cadastro | [`src/models/usuario.js`](../../src/models/usuario.js) |
| RF-02     | `Usuario.podeAutenticar()`                             | Fluxo de login e autenticação                                             | [`src/models/usuario.js`](../../src/models/usuario.js) |
| RF-03     | `TokenVerificacao` / `verificarEmail()`                | Verificação de e-mail e recuperação de senha                              | [`src/models/usuario.js`](../../src/models/usuario.js) |
| RF-04     | `RespostaQuestao`                                      | Histórico e progresso de estudos                                          | [`src/models/questao.js`](../../src/models/questao.js) |
| RF-05     | `Usuario`                                              | Dados e gerenciamento do perfil                                           | [`src/models/usuario.js`](../../src/models/usuario.js) |
| RF-06     | `Materia` / `Topico`                                   | Organização das matérias e tópicos                                        | [`src/models/questao.js`](../../src/models/questao.js) |
| RF-07     | `Questao.filtrar()`                                    | Busca e filtros de questões                                               | [`src/models/questao.js`](../../src/models/questao.js) |
| RF-08     | `Questao` / `Alternativa`                              | Cadastro e validação de questões                                          | [`src/models/questao.js`](../../src/models/questao.js) |
| RF-09     | `Questao.corrigir()` / `RespostaQuestao`               | Resolução, correção e histórico                                           | [`src/models/questao.js`](../../src/models/questao.js) |
| RF-10     | `ConversaIA` / `MensagemIA`                            | Conversação com o serviço externo de IA                                   | [`src/models/conversa.js`](../../src/models/conversa.js) |
| RF-11     | `ItemDoRepositorio` / `Pasta` / `Arquivo` / `Anotacao` | Organização e gerenciamento de materiais                                  | [`src/models/materiais.js`](../../src/models/materiais.js) |
| RN-01     | `Usuario.validarCadastro()`                            | Validação do e-mail institucional                                         | [`src/models/usuario.js`](../../src/models/usuario.js) |
| RN-02     | `Usuario.podeEditarBancoDeQuestoes()`                  | Permissão adicional do administrador                                      | [`src/models/usuario.js`](../../src/models/usuario.js) |
| RN-03     | `Usuario.status` / `TokenVerificacao`                  | Conta pendente ou ativa                                                   | [`src/models/usuario.js`](../../src/models/usuario.js) |
| RN-04     | `ItemDoRepositorio.acessivelPor()`                     | Acesso aos materiais somente pelo proprietário                            | [`src/models/materiais.js`](../../src/models/materiais.js) |
| RN-05     | `ConversaIA`                                           | Comunicação com IA realizada pelo backend                                 | [`src/models/conversa.js`](../../src/models/conversa.js) |
| RNF-02    | Fluxo de cadastro/login                                | Hash de senha e JWT tratados na camada de serviço (Supabase Auth)         | [`src/servicos/`](../../src/servicos/) |
| RNF-03    | `Questao.filtrar()`                                    | Busca e filtragem de questões                                             | [`src/models/questao.js`](../../src/models/questao.js) |
| RNF-04    | `validarUpload()`                                      | Formatos e limite de tamanho dos arquivos                                 | [`src/models/materiais.js`](../../src/models/materiais.js) |

---

## 6. Correspondência entre modelo e código

| Elemento modelado   | Arquivo/diretório correspondente | Observação                                                                         |
| ------------------- | -------------------------------- | ---------------------------------------------------------------------------------- |
| `Usuario`           | [`src/models/usuario.js`](../../src/models/usuario.js) | Concentra validações de cadastro, autenticação, verificação de e-mail e permissões |
| `TokenVerificacao`  | [`src/models/usuario.js`](../../src/models/usuario.js) | Representa tokens de verificação e recuperação de senha                            |
| `Materia`           | [`src/models/questao.js`](../../src/models/questao.js) | Representa as matérias utilizadas na organização das questões                      |
| `Topico`            | [`src/models/questao.js`](../../src/models/questao.js) | Representa os tópicos associados às matérias                                       |
| `Questao`           | [`src/models/questao.js`](../../src/models/questao.js) | Contém filtragem e correção das questões                                           |
| `Alternativa`       | [`src/models/questao.js`](../../src/models/questao.js) | Representa as alternativas das questões                                            |
| `RespostaQuestao`   | [`src/models/questao.js`](../../src/models/questao.js) | Registra respostas, acertos e histórico                                            |
| `ConversaIA`        | [`src/models/conversa.js`](../../src/models/conversa.js) | Mantém o contexto e histórico da conversa                                          |
| `MensagemIA`        | [`src/models/conversa.js`](../../src/models/conversa.js) | Representa mensagens enviadas pelo usuário ou pela IA                              |
| `ItemDoRepositorio` | [`src/models/materiais.js`](../../src/models/materiais.js) | Abstração compartilhada dos itens do repositório                                   |
| `Pasta`             | [`src/models/materiais.js`](../../src/models/materiais.js) | Organização dos materiais                                                          |
| `Arquivo`           | [`src/models/materiais.js`](../../src/models/materiais.js) | Armazenamento de arquivos enviados                                                 |
| `Anotacao`          | [`src/models/materiais.js`](../../src/models/materiais.js) | Representa anotações do usuário                                                    |
| Validação de upload | [`src/models/materiais.js`](../../src/models/materiais.js) | Implementa as regras de formato, tamanho e acesso                                  |
| Testes dos modelos  | [`tests/models.test.js`](../../tests/models.test.js) | Verificação automatizada dos modelos e regras                                      |
| Endpoints do fluxo 4.1 | [`src/rotas/autenticacao.js`](../../src/rotas/autenticacao.js) (até a Sprint 5, em `src/server.js`) | `/api/cadastro`, `/api/login`, `/api/recuperar-senha` e `/api/salvar-nova-senha`, aplicando as regras de `Usuario` |
| `ServicoAutenticacao` (fluxo 4.1, Sprint 5) | [`src/servicos/servico-autenticacao.js`](../../src/servicos/servico-autenticacao.js) | Interface usada pelas rotas e motivos de falha do domínio (padrão Adapter, papel Target) |
| `AdaptadorSupabaseAuth` (fluxo 4.1, Sprint 5) | [`src/servicos/adaptador-supabase-auth.js`](../../src/servicos/adaptador-supabase-auth.js) | Único ponto do backend que conhece o Supabase Auth (papel Adapter) |
| Testes do adaptador | [`tests/adaptador-autenticacao.test.js`](../../tests/adaptador-autenticacao.test.js) | Tradução de erros por código e rotas com outra implementação da interface |
| Telas do fluxo 4.1 | [`cadastro/`](../../src/public/cadastro/), [`login/`](../../src/public/login/), [`recuperar-senha/`](../../src/public/recuperar-senha/) em `src/public/` | Formulários que chamam os endpoints acima |
| Testes do fluxo 4.1 | [`tests/auth.test.js`](../../tests/auth.test.js) | Cadastro, e-mail repetido, conta pendente, login e recuperação (Supabase simulado) |

---

## 7. Refinamentos identificados

* `Usuario` foi utilizado como entidade única para estudantes e administradores, diferenciados pelo atributo `papel`.
* `Topico` foi separado de `Materia` para representar os tópicos associados e permitir filtragem por assunto.
* `RespostaQuestao` foi criada como entidade própria para suportar histórico de respostas e progresso de estudos.
* `ItemDoRepositorio` foi definido como abstração para centralizar regras compartilhadas entre pastas, arquivos e anotações.
* `TokenVerificacao` passou a representar tanto a verificação de e-mail quanto a recuperação de senha, diferenciadas pelo tipo.
* `ConversaIA` possui contexto opcional de matéria ou questão para representar a manutenção de contexto da conversa.
* A chave da API da IA permanece fora do modelo de domínio, na configuração do backend.
* Foram definidas regras para upload de materiais: formatos `PDF`, `PNG`, `JPG` e `TXT`, limite de `50 MB` e acesso restrito ao proprietário.
* Os domínios de e-mail aceitos e a regra de senha foram confirmados pelo grupo; permanecem a definir o SGBD das demais entidades e o formato definitivo dos identificadores.

---

## 8. Decisões e suposições a confirmar

| Item               | Situação atual                                               | Próximo passo                                      |
| ------------------ | ------------------------------------------------------------ | -------------------------------------------------- |
| Domínios de e-mail | Implementado com `ufla.br` e `estudante.ufla.br` como padrão, configurável pela variável `DOMINIOS_INSTITUCIONAIS` | Confirmado pelo grupo na Sprint 3 |
| Regra de senha     | Implementado: mínimo de 8 caracteres, com letra e número (`validarSenha()`) | Confirmado pelo grupo na Sprint 3 |
| Persistência       | Autenticação já usa o Supabase Auth (PR #15); as demais entidades ainda não são persistidas | Definir a persistência das demais entidades na Sprint 4 |
| Identificadores    | `id` tratado como identificador opaco                        | Definir entre string/UUID e implementação do banco |
| Endpoints          | Fluxo 4.1 implementado; endpoints dos fluxos 4.2 a 4.4 ainda são propostos | Implementar conforme evolução do backend |

---

## 9. Histórico de atualização

| Sprint   | Modelo alterado                | Motivo                                                      | Evidência                 |
| -------- | ------------------------------ | ----------------------------------------------------------- | ------------------------- |
| Sprint 3 | Casos de uso                   | Consolidar atores e funcionalidades do sistema              | `docs/modelagem`          |
| Sprint 3 | Classes / entidades de domínio | Definir estrutura lógica e relações entre entidades; `Questao.validar()` acrescentado ao implementar o RF-08 | [`src/models/`](../../src/models/) |
| Sprint 3 | Cadastro, verificação e login  | Evolução do fluxo responsável por liberar as telas privadas; diagrama alinhado aos endpoints implementados e ao uso do Supabase Auth | [PR #15](https://github.com/pstehling/tp-eng-software/pull/15), `src/server.js`, `src/models/usuario.js` |
| Sprint 3 | Resolver questão               | Modelar o fluxo central de estudo e registro do histórico   | [`src/models/questao.js`](../../src/models/questao.js) |
| Sprint 3 | Dúvida com IA                  | Representar a integração com o serviço externo              | [`src/models/conversa.js`](../../src/models/conversa.js) |
| Sprint 3 | Upload de materiais            | Formalizar validações de formato, tamanho e acesso          | [`src/models/materiais.js`](../../src/models/materiais.js) |
| Sprint 3 | Estados do usuário             | Representar o ciclo de vida da conta                        | [`src/models/usuario.js`](../../src/models/usuario.js) |
| Sprint 5 | Cadastro, verificação e login  | Participante `AdaptadorSupabaseAuth` incluído (padrão Adapter, PP-01) | [`docs/padroes/padroes-de-projeto.md`](../padroes/padroes-de-projeto.md) |
| Sprint 6 | Cadastro, verificação e login; correspondência modelo × código | Rotas movidas de `server.js` para `src/rotas/autenticacao.js` na reorganização arquitetural; o fluxo e as respostas não mudaram | [`docs/arquitetura/arquitetura.md`](../arquitetura/arquitetura.md) |

> **Evidências no GitHub:** primeira versão deste documento no commit [`e6568f4`](https://github.com/pstehling/tp-eng-software/commit/e6568f4149376cc1b806b544cad4f6cb82fb204e); implementação do fluxo 4.1 no commit [`aeaabd1`](https://github.com/pstehling/tp-eng-software/commit/aeaabd13d4cee5bbfd09e58ad7c8888ca1a856ca) ([PR #15](https://github.com/pstehling/tp-eng-software/pull/15)); modelos de domínio, testes e imagens dos diagramas na branch `sprint-03` (ver [`docs/sprints/sprint-03.md`](../sprints/sprint-03.md)).

---

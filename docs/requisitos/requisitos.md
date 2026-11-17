# Requisitos da aplicação

> **Artefato central da Sprint 2.** Não repita apenas o problema; descreva o comportamento e as condições que o sistema deverá atender.

## **1\. Método de levantamento**

Os requisitos do **While(estuda)** foram identificados e consolidados por meio de reuniões técnicas e de alinhamento entre os integrantes do grupo de desenvolvimento. Durante as discussões, foram analisadas as principais dores enfrentadas por estudantes de computação e concurseiros em relação à desorganização de materiais, ausência de feedback centralizado ao resolver questões e falta de suporte personalizado no tira-dúvidas.

## **2\. Atores e perfis**

| Ator/perfil | Objetivo no sistema | Permissões ou limitações principais |
| :---- | :---- | :---- |
| **Estudante (ACT-01)** | Resolver questões, organizar materiais de estudo, acompanhar métricas de desempenho e tirar dúvidas via IA. | Permissão total de navegação no seu repositório pessoal; limitação de não poder alterar o banco de questões global. |
| **Administrador (ACT-02)** | Manter o sistema povoado com disciplinas e questões atualizadas para os alunos. | Permissão para cadastrar, editar e importar questões em lote; acesso a recursos administrativos. |
| **Serviço de IA (ACT-03)** | Processar dúvidas de estudo e gerar explicações contextualizadas por matéria ou questão. | Agente de sistema externo; sem permissão para alteração direta de dados de usuários. |

## **3\. Requisitos funcionais**

| ID | Nome | Descrição verificável | Prioridade | História/Issue | Situação final |
| :---- | :---- | :---- | :---- | :---- | :---- |
| RF-01 | Cadastro com e-mail institucional | O sistema deve permitir que o estudante se cadastre informando nome, e-mail institucional e senha válida. | Alta | \#02 | Implementado |
| RF-02 | Autenticação e Sessão Persistente | O sistema deve permitir que o estudante realize login e logout com e-mail e senha, mantendo a sessão autenticada. | Alta | \#01 | Implementado parcialmente (login implementado; logout ainda não) |
| RF-03 | Verificação e Recuperação de Conta | O sistema deve enviar e-mail de verificação para novos cadastros e permitir a recuperação de senha via link temporário. | Alta | \#02 | Implementado |
| RF-04 | Tela Inicial do Usuário | O sistema deve exibir um painel com saudações, progresso de estudos, atalhos rápidos e materiais acessados recentemente. | Alta | \#03 | Planejado |
| RF-05 | Gestão de Perfil | O sistema deve permitir que o usuário visualize e edite suas informações de perfil, avatar, curso e senha. | Média | \#04 | Planejado |
| RF-06 | Listagem e Detalhes de Matérias | O sistema deve apresentar a lista de disciplinas de computação com contagem de questões e tópicos associados. | Alta | \#05 | Planejado |
| RF-07 | Banco de Questões com Filtros | O sistema deve permitir a busca e filtragem de questões combinando matéria, assunto, palavra-chave e dificuldade. | Alta | \#06 | Planejado |
| RF-08 | Povoamento do Banco de Questões | O sistema deve permitir que administradores realizem o cadastro manual ou importação em lote (JSON/CSV) de questões. | Alta | \#07 | Planejado |
| RF-09 | Resolução e Explicação de Questão | O sistema deve permitir ao estudante responder questões, receber correção instantânea, gabarito e histórico. | Alta | \#08 | Planejado |
| RF-10 | Chat com IA Contextualizado | O sistema deve disponibilizar uma interface de chat onde o assistente de IA responde dúvidas mantendo o contexto da matéria/questão. | Média | \#09 | Planejado |
| RF-11 | Organização de Materiais Próprios | O sistema deve permitir ao usuário criar pastas, subir arquivos (PDF, imagens) e criar anotações de estudo. | Alta | \#10 | Planejado |

## **4\. Requisitos não funcionais**

| ID | Categoria | Descrição verificável | Como será avaliado | Issue |
| :---- | :---- | :---- | :---- | :---- |
| RNF-01 | Usabilidade / Acessibilidade | O layout deve adaptar-se perfeitamente de 360px a 1920px+, garantindo contraste adequado e suporte à navegação via teclado. | Teste de responsividade via Chrome DevTools e auditoria de acessibilidade via Lighthouse. | \#03, \#08, \#10 |
| RNF-02 | Segurança | As senhas devem ser armazenadas com hash (*bcrypt* ou *Argon2*) e as rotas privadas protegidas por autenticação via token JWT. | Inspeção no schema do banco de dados e testes de integração com requisições sem token (HTTP 401). | \#01, \#02, \#04, \#07 |
| RNF-03 | Desempenho | Consultas e filtragens na listagem de questões e matérias devem responder em no máximo $2,0\\text{s}$ sob uso normal. | Execução de testes automatizados de carga e tempo de resposta na API. | \#03, \#05, \#06, \#09 |
| RNF-04 | Armazenamento | O upload de arquivos pessoais deve aceitar formatos PDF, PNG, JPG e TXT, aplicando o limite máximo de 50 MB por arquivo. | Validação via middleware de backend durante tentativas de envio de arquivos variados e acima do limite. | \#10 |

### 4.1 Relação com a arquitetura (atualização da Sprint 6)

O texto dos requisitos acima não foi alterado. Esta tabela registra como cada RNF é atendido pela arquitetura e a situação verificada na Sprint 6. Detalhes em [`docs/arquitetura/arquitetura.md`](../arquitetura/arquitetura.md), seções 5 e 7.

| ID | Decisão arquitetural | Situação na Sprint 6 |
| :---- | :---- | :---- |
| RNF-01 | DA-02 — frontend HTML/CSS servido pelo próprio backend | Parcial: responsividade e acessibilidade ainda não auditadas (Lighthouse previsto para a Sprint 7). |
| RNF-02 | DA-03 — Supabase Auth acessado só pelo backend; DA-04 — segredos em variáveis de ambiente; DA-06 — teste garante que o frontend não contém chaves nem acessa o Supabase | Parcial: o hash da senha é feito pelo Supabase Auth (bcrypt). A proteção de rotas privadas por JWT **ainda não existe** (débito T-08 no backlog). |
| RNF-03 | DA-01 — monolito em camadas, sem chamadas de rede internas | Ainda não verificável: a listagem de questões não foi implementada. |
| RNF-04 | Regra no domínio (`validarUpload`); a rota de upload será um módulo em `src/rotas/` | Parcial: regra implementada e testada; rota e armazenamento pendentes. |

## **5\. Regras de negócio**

| ID | Regra | Origem/justificativa | Requisitos afetados |
| :---- | :---- | :---- | :---- |
| RN-01 | **Validação de Domínio Institucional** | Garantir que a plataforma atenda prioritariamente à comunidade acadêmica e de concursos. | RF-01 |
| RN-02 | **Restrição de Povoamento de Dados** | Impedir que estudantes comuns alterem ou insiram questões no banco global do sistema. | RF-08 |
| RN-03 | **Bloqueio por Verificação de E-mail** | Garantir a veracidade dos cadastros e evitar contas maliciosas ou inativas. | RF-01, RF-03 |
| RN-04 | **Privacidade de Materiais** | O repositório pessoal de pastas e arquivos pertence estritamente ao usuário que realizou o upload. | RF-11 |
| RN-05 | **Segurança de Tokens e Chaves de IA** | A chave de API do provedor de IA deve permanecer ocultada no servidor backend, nunca exposta no frontend. | RF-10 |

## **6\. Histórias de usuário e critérios de aceitação**

### **US-01 — Tela de Login**
Links para o drive com as histórias de usário completa: https://drive.google.com/drive/folders/1f8o5BMjtLZeF1OhzzGDfxfk1CFpEldtI?usp=sharing

Como *estudante cadastrado*, quero *acessar a plataforma informando e-mail e senha*, para *retomar meus estudos e materiais salvos*.

*Requisitos relacionados:* RF-02, RNF-02

*Critérios de aceitação:*

1. *Dado que* o usuário informa e-mail e senha válidos na tela de login, *quando* clica no botão "Entrar", *então* o sistema autentica a sessão e o redireciona para a tela inicial.  
2. *Dado que* o usuário insere credenciais incorretas, *quando* tenta realizar o login, *então* o sistema exibe uma mensagem de erro genérica sem informar se o erro foi no e-mail ou na senha.  
3. *Dado que* ocorre falha de comunicação ou indisponibilidade no provedor externo de autenticação (R-01, T-06), *quando* o usuário tenta logar, *então* o sistema informa que o serviço está temporariamente indisponível (HTTP 503), sem mascarar a falha como erro de credencial.

*Issue:* \#01

### **US-02 — Tela de Autenticação (Cadastro e Verificação de Conta)**

Como *novo usuário*, quero *criar minha conta e confirmar meu e-mail*, para *ter acesso seguro à plataforma*.

*Requisitos relacionados:* RF-01, RF-03, RNF-02

*Critérios de aceitação:*

1. *Dado que* o novo usuário preenche todos os campos obrigatórios e informa um e-mail institucional inédito, *quando* submete o formulário de cadastro, *então* o sistema cria a conta e envia um link de verificação para a caixa de entrada do usuário.  
2. *Dado que* o usuário tenta utilizar um e-mail já existente na base de dados, *quando* tenta concluir o cadastro, *então* o sistema bloqueia o registro e exibe um aviso claro (HTTP 409).  
3. *Dado que* o usuário tenta utilizar um e-mail fora dos domínios institucionais permitidos (RN-01), *quando* tenta se cadastrar, *então* o sistema bloqueia o cadastro localmente com mensagem clara (HTTP 400) antes de acionar o provedor externo.

*Issue:* \#02

### **US-03 — Tela Inicial do Usuário**

Como *estudante autenticado*, quero *ver uma tela inicial com minhas matérias, materiais recentes e atalhos rápidos*, para *começar a estudar sem precisar procurar*.

*Requisitos relacionados:* RF-04, RNF-01, RNF-03

*Critérios de aceitação:*

1. *Dado que* o estudante logado acessa a dashboard, *quando* a página carrega, *então* o sistema exibe uma saudação personalizada com seu nome, últimos materiais acessados e matérias ativas.  
2. *Dado que* um usuário recém-cadastrado realiza o seu primeiro acesso, *quando* entra no sistema, *então* o painel exibe um guia de primeiros passos orientando a navegação.

*Issue:* \#03

### **US-04 — Tela de Perfil**

Como *usuário*, quero *visualizar e editar meus dados de perfil*, para *manter minhas informações e preferências de estudo atualizadas*.

*Requisitos relacionados:* RF-05, RNF-02

*Critérios de aceitação:*

1. *Dado que* o usuário acessa seu perfil e altera seu nome de exibição ou avatar, *quando* clica em "Salvar", *então* o sistema atualiza as informações e as reflete nas demais telas.  
2. *Dado que* o usuário solicita a alteração de sua senha, *quando* fornece a senha atual correta e a nova senha dentro dos padrões de segurança, *então* o sistema realiza a atualização com sucesso.

*Issue:* \#04

### **US-05 — Tela de Matéria**

Como *estudante*, quero *abrir uma matéria e ver seus assuntos, questões e materiais relacionados*, para *estudar um conteúdo específico de forma centralizada*.

*Requisitos relacionados:* RF-06, RNF-03

*Critérios de aceitação:*

1. *Dado que* o estudante seleciona uma matéria na listagem, *quando* a página da disciplina se abre, *então* o sistema exibe a descrição, a lista de tópicos e a quantidade de questões disponíveis.  
2. *Dado que* o estudante clica no botão de praticar questões daquela disciplina, *quando* é redirecionado, *então* o banco de questões abre trazendo a matéria selecionada pré-filtrada.

*Issue:* \#05

### **US-06 — Tela de Banco de Questões**

Como *estudante*, quero *buscar e filtrar questões por matéria, assunto e dificuldade*, para *montar uma revisão direcionada ao que preciso estudar*.

*Requisitos relacionados:* RF-07, RNF-03

*Critérios de aceitação:*

1. *Dado que* o usuário aplica filtros combinados de matéria e nível de dificuldade, *quando* a busca é executada, *então* o sistema exibe apenas as questões que satisfazem todos os critérios selecionados.  
2. *Dado que* o usuário aplica filtros que não possuem correspondências no banco, *quando* a pesquisa é concluída, *então* o sistema apresenta uma mensagem informativa sugerindo a alteração dos parâmetros de busca.

*Issue:* \#06

### **US-07 — Povoar Banco de Questões**

Como *administrador/monitor*, quero *cadastrar questões manualmente ou importá-las em lote*, para *que o banco tenha conteúdo suficiente para os estudantes praticarem*.

*Requisitos relacionados:* RF-08, RNF-02

*Critérios de aceitação:*

1. *Dado que* um usuário com permissão de administrador realiza o upload de um arquivo JSON/CSV estruturado com novas questões, *quando* a importação é submetida, *então* o sistema adiciona as questões ao banco e gera um relatório do processamento.  
2. *Dado que* um usuário comum tenta acessar a rota de povoamento, *quando* submete a requisição, *então* o sistema impede o acesso e retorna um código de negação de permissão.

*Issue:* \#07

### **US-08 — Tela de Questão**

Como *estudante*, quero *resolver uma questão e receber a correção com explicação*, para *identificar meus erros e entender o conteúdo*.

*Requisitos relacionados:* RF-09, RF-10, RNF-01

*Critérios de aceitação:*

1. *Dado que* o estudante seleciona uma alternativa e confirma a submissão, *quando* o sistema processa a resposta, *então* exibe imediatamente se o palpite está correto, destaca o gabarito e atualiza o histórico de desempenho do usuário.  
2. *Dado que* o estudante deseja aprofundar a explicação da questão, *quando* clica no botão "Tirar dúvida com a IA", *então* o chat abre anexando o contexto e o enunciado da questão atual.

*Issue:* \#08

### **US-09 — Tela de Conversa com a IA**

Como *estudante com dúvida*, quero *conversar com uma IA sobre um tema ou questão específica*, para *receber explicações sem precisar sair da plataforma*.

*Requisitos relacionados:* RF-10, RNF-03

*Critérios de aceitação:*

1. *Dado que* o usuário digita uma dúvida e a submete no chat, *quando* o serviço de IA processa o prompt, *então* a resposta é exibida na tela mantendo o contexto da conversa.  
2. *Dado que* ocorra uma indisponibilidade temporária na API externa de IA, *quando* o envio falhar, *então* o sistema exibe um alerta de erro amigável e habilita um botão para tentar reenviar.

*Issue:* \#09

### **US-10 — Tela de Organização de Materiais Próprios**

Como *estudante*, quero *organizar meus resumos, anotações e listas em pastas e arquivos dentro da plataforma*, para *centralizar todo o meu material de estudo em um só lugar*.

*Requisitos relacionados:* RF-11, RNF-01, RNF-04

*Critérios de aceitação:*

1. *Dado que* o estudante cria uma estrutura de pastas e faz upload de um arquivo PDF válido, *quando* o upload é finalizado, *então* o arquivo fica acessível dentro do seu diretório pessoal.  
2. *Dado que* o estudante tenta enviar um arquivo com tamanho superior a 50 MB, *quando* inicia o upload, *então* o sistema bloqueia o arquivo e avisa sobre o limite permitido.

*Issue:* \#10

## **7\. Fora do escopo**

| Item | Motivo | Possível trabalho futuro |
| :---- | :---- | :---- |
| **Aplicativo Mobile Nativo (iOS/Android)** | Garantir o foco na entrega de uma aplicação Web responsiva com alta qualidade durante o período da disciplina. | Desenvolvimento de apps nativos ou empacotamento PWA em etapas futuras do produto. |
| **Gateway de Pagamento / Assinaturas** | O produto possui foco estritamente acadêmico e sem fins lucrativos na versão atual. | Implementação de planos pagos para recursos corporativos ou mentorias. |
| **Correção de Redação por Visão Computacional (OCR)** | Complexidade de desenvolvimento incompatível com o cronograma de Sprints do semestre. | Integração de modelo de IA generativa com análise de imagens manuscritas. |
| **Rede Social Interna e Chat entre Estudantes** | Manter a plataforma direcionada ao foco e estudo individual sem distrações interpessoais. | Criação de fóruns de discussão colaborativos por matéria. |

## **8\. Histórico de alterações**

| Sprint | Requisito alterado | Alteração | Motivo | Issue/commit |
| :---- | :---- | :---- | :---- | :---- |
| Sprint 2 | Todos os Requisitos | Estruturação inicial do documento de requisitos e detalhamento das Histórias de Usuário em formato BDD. | Mapeamento e consolidação das entregas da disciplina de Engenharia de Software. | \#01 \- \#10 |
| Sprint 3 | RF-01 / RN-01 | Esclarecido o que é "e-mail institucional": domínios `ufla.br` e `estudante.ufla.br` (configuráveis). | A modelagem precisou de uma regra verificável para `Usuario.validarCadastro()`; regra confirmada pelo grupo. | `src/models/usuario.js` |
| Sprint 3 | RF-01 / RF-03 | Esclarecida a "senha válida": mínimo de 8 caracteres, com pelo menos uma letra e um número; a mesma regra vale para a nova senha na recuperação. | Critério necessário para validar cadastro e redefinição de senha de forma objetiva; regra confirmada pelo grupo. | `src/models/usuario.js` |
| Sprint 3 | RF-01, RF-02, RF-03 | Situação atualizada após a implementação do cadastro, login e recuperação de senha. | Fluxo modelado em `docs/modelagem/modelagem.md` (4.1) e implementado. | [PR \#15](https://github.com/pstehling/tp-eng-software/pull/15) |
| Sprint 7 | RF-01, RF-02, RF-03 | Critérios de aceitação refinados com base na estratégia de testes: especificação de falha de serviço no login (T-06 / CT-06) e validação de e-mail institucional (CT-01). | Alinhamento com a estratégia de testes da Sprint 7 e tratamento de falhas de comunicação com serviços externos. | `docs/testes/plano-de-testes.md`, Issue [#22](https://github.com/pstehling/tp-eng-software/issues/22) |


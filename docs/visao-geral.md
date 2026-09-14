# Visão geral do produto

> Criado na Sprint 1 e atualizado sempre que o problema ou escopo muda.

## 1. Problema escolhido

**Título:** Dispersão do material de estudo e ausência de um banco de questões organizado para as disciplinas de computação

**Descrição específica:** Estudantes de Ciência da Computação e Sistemas de Informação da UFLA precisam revisar conteúdos para provas, trabalhos e processos seletivos de estágio. Hoje esse estudo acontece de forma fragmentada: os slides ficam no ambiente virtual da disciplina, os resumos ficam em cadernos ou em arquivos soltos no computador, as listas de exercícios chegam por e-mail ou grupo de WhatsApp e as questões de prova antiga circulam em PDFs repassados entre turmas. Não existe um lugar único que reúna questões separadas por matéria e assunto junto com o material próprio do aluno. A consequência é que boa parte do tempo de estudo é gasta procurando onde cada coisa está, a revisão fica desorganizada e o estudante não consegue identificar com clareza em quais assuntos ainda erra.

**Evidências ou exemplos do problema:**

- Listas de exercícios e provas antigas de disciplinas como Algoritmos, Estrutura de Dados e Banco de Dados circulam em PDFs avulsos em grupos de WhatsApp e Drive compartilhado, sem indexação por assunto e sem gabarito comentado.
- Cada disciplina usa um canal diferente para disponibilizar material (ambiente virtual, e-mail, repositório do professor), o que obriga o aluno a consultar várias fontes para montar uma única revisão.
- Plataformas de questões existentes no mercado são voltadas para concursos e vestibulares e cobrem pouco ou nada do conteúdo específico de computação exigido nas disciplinas do curso.
- Quando o aluno tem dúvida em uma questão fora do horário de aula ou monitoria, não há apoio imediato: ele recorre a busca genérica na internet, que não considera o contexto da questão que ele está resolvendo.

## 2. Público e partes interessadas

| Parte interessada | Necessidade/interesse | Como será envolvido ou representado |
|---|---|---|
| Estudante de computação da UFLA (usuário principal) | Resolver questões organizadas por matéria e assunto, guardar e localizar rapidamente seus próprios resumos e listas, e tirar dúvidas pontuais sem sair da plataforma | Levantamento de requisitos por meio de conversas com colegas de turma; validação das telas em testes de usabilidade ao final das Sprints 2 e 3 |
| Administrador/monitor de disciplina | Cadastrar e revisar questões, manter o banco atualizado e coerente com o conteúdo da disciplina | Representado pelo perfil administrador da aplicação; funcionalidade de cadastro e importação em lote validada com integrantes do grupo atuando nesse papel |
| Professor da disciplina | Ter uma fonte de exercícios alinhada à ementa que os alunos possam usar em revisões | Consulta informal sobre a organização das matérias e assuntos; não haverá integração com sistemas oficiais nesta versão |
| Equipe de desenvolvimento (grupo) | Entregar uma aplicação funcional, versionada e documentada dentro das sprints da disciplina | Papéis definidos no README; acompanhamento por issues, pull requests e reuniões de sprint |
| Professor da disciplina de Engenharia de Software | Avaliar o processo de desenvolvimento, a rastreabilidade entre requisitos e código e a qualidade das entregas | Acompanhamento pelas tags de cada sprint no repositório e pela documentação em `docs/` |

## 3. Visão do produto

**Nome da solução:** While(estuda)

**Proposta de valor:** Para estudantes das disciplinas de computação da UFLA que perdem tempo procurando exercícios e material espalhado, o While(estuda) é uma plataforma web que reúne banco de questões por matéria, organização pessoal de arquivos e apoio de IA contextualizada em um único ambiente, tornando a revisão mais rápida e direcionada.

**Objetivo geral:** Centralizar em uma única aplicação web a prática de exercícios e a organização do material de estudo das disciplinas de computação, reduzindo o tempo gasto na busca por conteúdo e apoiando o estudante na identificação dos assuntos em que ainda tem dificuldade.

**Objetivos específicos:**

1. Disponibilizar um banco de questões de computação categorizado por matéria, assunto e nível de dificuldade, com filtros e busca textual.
2. Permitir que o estudante resolva questões e receba correção imediata com explicação, registrando o histórico e o percentual de acerto por assunto.
3. Oferecer uma área pessoal de organização de materiais em pastas e subpastas, com upload de arquivos, criação de anotações e vínculo com as matérias.
4. Integrar um chat com IA capaz de esclarecer dúvidas considerando o contexto da matéria ou da questão que o estudante está resolvendo.
5. Garantir acesso individual e seguro aos dados de cada usuário por meio de cadastro, verificação de e-mail e autenticação.

## 4. Escopo inicial

### Dentro do escopo

- Cadastro de usuário, verificação de e-mail, login/logout e recuperação de senha.
- Perfil do usuário com edição de dados, alteração de senha e estatísticas básicas de desempenho.
- Tela inicial com matérias acompanhadas, materiais recentes e atalhos para as funções principais.
- Listagem e detalhe de matérias, com seus assuntos e contagem de questões.
- Banco de questões com filtros combináveis (matéria, assunto, dificuldade) e busca por palavra-chave.
- Resolução de questão objetiva com correção automática, exibição do gabarito e explicação.
- Cadastro manual e importação em lote de questões por usuário administrador, incluindo carga inicial de seed.
- Chat com IA acessível de forma geral e a partir do contexto de uma questão, com histórico de conversas.
- Organização de materiais próprios em pastas e subpastas, com upload de arquivos, anotações em texto e vínculo com matérias.
- Aplicação web responsiva, publicada em ambiente de hospedagem gratuito.

### Fora do escopo

- Aplicativo mobile nativo (Android/iOS).
- Integração com sistemas acadêmicos oficiais da UFLA (SIG, matrícula, notas ou autenticação institucional).
- Correção automática de questões discursivas ou de código submetido pelo usuário.
- Geração automática de questões pela IA para povoar o banco.
- Compartilhamento de materiais entre usuários, fórum, comentários ou qualquer funcionalidade de rede social.
- Gamificação com ranking público, medalhas ou competição entre usuários.
- Cobrança, planos pagos ou qualquer integração com meios de pagamento.
- Modo offline e sincronização de arquivos com o sistema de arquivos local do dispositivo.

## 5. Restrições e premissas

| Tipo | Item | Impacto no projeto |
|---|---|---|
| Restrição | Prazo do semestre 2026/2, dividido em sprints com entregas versionadas por tag | Escopo precisa caber nas sprints; funcionalidades são priorizadas como Alta, Média e Baixa, e as de prioridade Baixa podem ser cortadas |
| Restrição | Equipe de cinco integrantes, todos com carga de outras disciplinas | Tarefas distribuídas em pares por issue; funcionalidades grandes são fatiadas para caber em uma sprint |
| Restrição | Uso de API externa de IA com créditos ou cota limitada | Necessário limitar o tamanho do contexto enviado e tratar erro de cota; a chave fica no backend e nunca é exposta no cliente |
| Restrição | Hospedagem e banco de dados em plano gratuito | Limita armazenamento de arquivos enviados pelos usuários, exigindo limite de tamanho e de tipos aceitos no upload |
| Restrição | Sem acesso a dados ou sistemas oficiais da UFLA | Matérias, assuntos e questões precisam ser cadastrados manualmente pela equipe |
| Restrição | Tratamento de dados pessoais sujeito à LGPD | Coleta mínima de dados (nome e e-mail), senhas armazenadas com hash e acesso restrito aos próprios materiais |
| Premissa | Os estudantes têm acesso a computador e internet para usar uma aplicação web | A solução é entregue apenas como aplicação web responsiva, sem versão offline |
| Premissa | A equipe conseguirá reunir material suficiente (listas, provas antigas, exercícios autorais) para a carga inicial do banco | Meta de no mínimo 30 questões distribuídas entre as matérias na Sprint 2 |
| Premissa | A API de IA escolhida permanecerá disponível e dentro da cota gratuita durante o semestre | Caso a cota se esgote, o chat exibe mensagem de indisponibilidade sem quebrar as demais funcionalidades |
| Premissa | Os usuários de teste serão colegas do próprio curso, acessíveis para validação ao final das sprints | Testes de usabilidade planejados com participantes reais, sem necessidade de recrutamento externo |

## 6. Diferenciais da solução

O While(estuda) não se resume a um CRUD de cadastros porque as três frentes da aplicação se conectam por regras de negócio próprias, e não apenas por formulários independentes:

1. **Questão com correção e histórico, não apenas listagem.** Ao responder, o sistema compara a alternativa marcada com o gabarito, exibe a explicação, registra a tentativa no histórico do usuário e atualiza as estatísticas por assunto. Isso alimenta a tela de perfil e a marcação de questões já resolvidas no banco, criando um ciclo que um cadastro simples não teria.

2. **IA contextualizada, não um chat genérico.** Ao acionar a IA a partir de uma questão, o backend envia junto o enunciado, as alternativas e o assunto relacionado. A resposta é ancorada no exercício que o aluno está resolvendo, diferentemente de uma busca aberta na internet ou de um chat sem contexto.

3. **Estrutura hierárquica de arquivos com vínculo às matérias.** A organização de materiais não é uma lista plana de anexos: envolve pastas e subpastas, movimentação de arquivos entre elas, navegação em árvore e ligação com uma matéria, o que faz o material próprio do aluno aparecer na tela da matéria ao lado das questões daquele conteúdo.

4. **Recorte de domínio específico.** As plataformas de questões disponíveis atendem concursos e vestibulares. O While(estuda) é construído sobre as matérias de computação do curso, o que torna a categorização por assunto diretamente utilizável para revisar uma prova de disciplina.

O que amarra a proposta é a integração: a mesma matéria organiza as questões, os materiais do aluno e o contexto fornecido à IA. Um formulário genérico resolveria o armazenamento, mas não entregaria a revisão direcionada, que é o objetivo do produto.

## 7. Histórico de mudanças

| Data/Sprint | Mudança | Motivo | Issue/decisão relacionada |
|---|---|---|---|
| Sprint 1 | Versão inicial do documento de visão do produto | Definição do problema, público, escopo e objetivos do projeto | #01 |
| Sprint 1 | Chat com IA incorporado à tela de questão em vez de tela isolada | Evitar duplicação de implementação e aproveitar o contexto da questão para respostas mais úteis | #08 / #09 |
| Sprint 1 | Nome da solução alterado de EstUFLA para While(estuda) | Decisão do grupo por um nome com identidade ligada ao domínio de computação | #01 |

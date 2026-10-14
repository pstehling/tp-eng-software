# Protótipo de Interface (Figma) - While(Estuda)

Esta secção detalha os ecrãs, especificações funcionais e a arquitetura de informação do protótipo de alta fidelidade desenvolvido no Figma para a plataforma While Estuda.

---

## Link de Acesso ao Protótipo

- Protótipo Interativo no Figma: https://www.figma.com/design/ZwGcqaC17wPH2kgO9ep0kg/While-estuda-?node-id=0-1&t=zTwX3UnHKSIQJs7U-1

---

## Especificações dos Ecrãs do Protótipo

### 1. Autenticação (Login e Criar Conta)
* Layout Split-Screen: O lado esquerdo apresenta a marca, o slogan ("Transforme esforço em progresso real") e métricas da plataforma (mais de 2400 questões, 92 por cento de satisfação e assistência por inteligência artificial 24 horas por dia, 7 dias por semana).
* Ecrã de Login: Possui campos para e-mail institucional, palavra-passe com alternância de visibilidade, opção "manter ligado" e atalhos para recuperação de palavra-passe e registo.
* Ecrã de Registo: Permite a criação de conta informando Nome Completo, E-mail Institucional e Palavra-passe.

### 2. Dashboard
* Barra de Navegação Superior: Permite alternar entre Início, Matérias, Questões, Assistente IA, Materiais e a área Admin, além de pesquisa, alternador de tema (claro e escuro), notificações e perfil do utilizador.
* Banner de Boas-Vindas: Saudação personalizada ao estudante acompanhada pelo indicador de sequência diária de estudo.
* Painel de Métricas (KPIs): Exibe cartões com quantidade de Questões Resolvidas, Taxa de Acertos e Tempo de Estudo Acumulado com variação semanal.
* Ações Principais: Banners com atalhos diretos para "Resolver questões" e "Tirar dúvida com IA".
* Onboarding ("Configure a sua jornada"): Lista de etapas de configuração inicial (Criar conta, Escolher matérias e Definir meta semanal).
* Matérias Ativas: Lista resumida das disciplinas em andamento com barra de progresso visual (exemplo: Algoritmos e Estruturas de Dados, Base de Dados, Redes de Computadores).

### 3. Visão Detalhada de Matérias
* Cabeçalho da Matéria: Exibe estatísticas da disciplina selecionada, incluindo total de tópicos, quantidade de questões disponíveis, histórico de acesso e botão para praticar.
* Métricas de Desempenho: Cartões com Progresso Geral, Questões Corretas e Desempenho Relativo (comparativo com a média).
* Estrutura do Conteúdo: Módulos expansíveis por tópicos (exemplo: Complexidade de Algoritmos, Listas, Pilhas e Filas), contendo aulas em vídeo, resumos em PDF e atalhos para resolver questões específicas do tópico.

### 4. Banco de Questões
* Filtros e Pesquisa: Barra de pesquisa por palavras-chave acompanhada de filtros suspensos por Matéria, Assunto e Dificuldade, além do botão "Mais filtros".
* Listagem de Questões: Cartões organizados informando a identificação da questão, nível de dificuldade (Fácil, Média, Difícil), assunto, percentagem de acertos da comunidade, banca examinadora e botão "Resolver".

### 5. Inteligência Artificial
* Interface de Chat: Histórico de conversas recentes na barra lateral (exemplo: Complexidade de árvores, Normalização de base de dados) e botão para criar uma nova conversa.
* Contexto Ancorado: Suporte para vincular uma questão específica à conversa (exemplo: Questão 11024 - Árvore binária de busca), permitindo que a IA esclareça dúvidas contextualizadas.
* Explicações Interativas: A IA fornece respostas detalhadas com etapas lógicas e demonstrações visuais para facilitar a consolidação dos conceitos.

### 6. Meus Materiais
* Upload e Armazenamento: Área de carregamento de ficheiros no modelo drag-and-drop (arrastar e largar) compatível com ficheiros PDF, PNG e TXT, acompanhada pelo indicador da quota de armazenamento utilizada.
* Organização em Pastas: Filtro e separação por matérias (Algoritmos, Base de Dados, Redes) ou exames.
* Tabela de Ficheiros Recentes: Lista ficheiros com formato, tamanho, pasta vinculada, data de modificação e opções de transferência e gestão.

### 7. Povoamento de Questões
* Módulo de Registo: Permite o registo manual ou a importação em lote de questões.
* Formulário Completo: Campos para definição de Matéria, Assunto, Dificuldade, Enunciado, Alternativas de escolha múltipla (A a E) com seleção de solução e espaço para a explicação comentada da resposta.

### 8. Perfil
* Informações Pessoais: Edição da fotografia de perfil, Nome Completo, E-mail Institucional, Curso e Instituição de Ensino.
* Painel de Segurança: Formulário de alteração de palavra-passe com verificação em tempo real dos requisitos de segurança (mínimo de caracteres, letras maiúsculas e minúsculas, números e caracteres especiais).

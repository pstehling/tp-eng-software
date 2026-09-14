# Trabalho Final de Engenharia de Software - Modelo Oficial 2026/2

> **Use este repositório como estrutura de trabalho.** Substitua os exemplos e campos marcados com `[PREENCHER]` pelas informações reais do grupo. O professor corrigirá a versão registrada na tag de cada sprint.

## 1. Identificação do projeto

| Campo | Informação |
|---|---|
| Nome do projeto | `While(Estuda)` |
| Problema escolhido | `Falta de matérias e centralização para o estudo na área da computação` |
| Turma/semestre | Engenharia de Software — 2026/2 |
| Professor | Prof. Johnatan Oliveira |
| Link do GitHub Project | [`https://github.com/users/pstehling/projects/2`](https://github.com/users/pstehling/projects/2) |
| Link da aplicação publicada | `Ainda não publicada — aplicação roda localmente (ver seção 7). Publicação prevista para sprints futuras.` |
| Link do vídeo final | `[PREENCHER NA ENTREGA FINAL]` |

### Integrantes

| Nome completo | Usuário no GitHub | Responsabilidade principal | Outras contribuições |
|---|---|---|---|
| `Pedro Stehling Mendes` | `@pstehling` | `Scrum Master` | `Dev, BD` |
| `Gabriel Soares Carvalho` | `@gabrielcarvalho28` | `Requisitos` | `Dev` |
| `Isadora Rocha Brito` | `@IsadoraRB-dge` | `Dev` | `Backend Dev` |
| `Joao Vitor Maximiliom Vieira` | `@joaovitormv` | `Dev` | `Backend Dev, QA` |
| `Gabriel Rocha de Almeida` | `@gabrielrooocha` | `UI/UX Designer` | `FrontEnd Dev, QA` |

> O grupo deve ter de 3 a 5 integrantes. A atribuição de uma responsabilidade principal não dispensa a participação colaborativa nas demais atividades.

## 2. Resumo da solução

**Problema:** `Quem estuda para provas, vestibulares ou concursos sabe como é difícil encontrar questões bem organizadas por matéria. Ficar caçando exercícios torna qualquer revisão cansativa e ineficiente. Para piorar, resumos, anotações e listas de exercícios costumam ficar espalhados entre vários cadernos, arquivos no computador e diferentes aplicativos. Essa bagunça atrapalha o planejamento, derruba a produtividade e faz com que percamos um tempo precioso só procurando onde está cada coisa`

**Solução proposta:** `É exatamente por isso que faz tanta falta uma plataforma que resolva esse problema. Voltada para a área da computação, a proposta é oferecer um ambiente único que concentre questões separadas por área de estudo. Além disso, a plataforma deve disponibilizar ferramentas para organizar todo o material de estudo, resumos, anotações e listas de forma prática e centralizada. Assim, o estudante ganha tempo e consegue planejar sua revisão com muito mais eficiência.`

**Público principal:** `Estudantes das disciplinas de computação da UFLA`

**Funcionalidades prioritárias:**
- `Resolução de questões`
- `Organização de pastas e arquivos de diretórios para centralização de arquivos e materiais`
- `Chat com IA que auxilia nas dúvidas e em temas específicos`

**Tecnologias inicialmente consideradas:**

| Camada | Tecnologia | Observação |
|---|---|---|
| Backend | Node.js + Express | Estrutura inicial em `src/server.js`, usada como esqueleto executável desde a Sprint 1. |
| Frontend | HTML, CSS e JavaScript (estático, servido pelo Express) | Páginas iniciais em `src/public/` (`index.html`, `materiais.html`). Poderá evoluir para um framework (ex.: React) nas próximas sprints, conforme necessidade. |
| Autenticação/Segurança | JWT + hash de senha (bcrypt ou Argon2) | Previsto pelos requisitos RNF-02; ainda não implementado no código. |
| Persistência de dados | A definir | Necessário para usuários, questões e materiais (RF-01, RF-07, RF-11); decisão registrada em `docs/projeto/decisoes-de-projeto.md` a partir da Sprint 4. |
| IA / Chat contextualizado | API externa de IA (provedor a definir) | Chave mantida apenas no backend, conforme RN-05. |
| Testes | `node:test` (nativo do Node.js) | Ver `tests/`. |
| Integração contínua | GitHub Actions | Workflow em `.github/workflows/ci.yml`, roda `npm test` a cada push/PR na `main`. |

> Lista sujeita a revisão nas próximas sprints (Sprint 4 — princípios de projeto — e Sprint 6 — arquitetura), conforme o regulamento do trabalho.

## 3. Comece por aqui

1. Leia o [Guia rápido de uso](GUIA_RAPIDO.md).
2. Preencha este `README.md` e o documento de [visão geral](docs/visao-geral.md).
3. Crie o GitHub Project e registre os itens como Issues.
4. Consulte o [mapa das oito entregas](docs/sprints/README.md).
5. Em cada prazo, atualize o arquivo da sprint, crie a tag correspondente e envie os links no UFLA Virtual.
6. Antes da entrega final, execute o [validador da estrutura](scripts/validar_repositorio.py) e o [checklist final](CHECKLIST_ENTREGA_FINAL.md).

## 4. Cronograma e pontuação

| Etapa | Data | Entrega central | Pontos | Tag obrigatória |
|---|---:|---|---:|---|
| Sprint 1 | 24/08/2026 | Problema, visão do produto, Scrum, GitHub e backlog inicial | 2,5 | `sprint-01` |
| Sprint 2 | 14/09/2026 | Requisitos verificáveis e escopo da aplicação | 2,5 | `sprint-02` |
| Sprint 3 | 28/09/2026 | Modelagem e rastreabilidade | 2,5 | `sprint-03` |
| Sprint 4 | 13/10/2026 | Princípios de projeto e decisões locais | 2,5 | `sprint-04` |
| Sprint 5 | 26/10/2026 | Padrões de projeto aplicados ao código | 2,5 | `sprint-05` |
| Sprint 6 | 09/11/2026 | Arquitetura global da aplicação | 2,5 | `sprint-06` |
| Sprint 7 | 16/11/2026 | Plano de testes e primeiras execuções | 2,5 | `sprint-07` |
| Sprint 8 | 23/11/2026 | Validação final e estabilização | 2,5 | `sprint-08` |
| Entrega final | 30/11/2026 | GitHub consolidado, slides e vídeo no YouTube | 5,0 | `versao-final` |
| **Total** |  |  | **25,0** |  |

## 5. Como cada sprint é avaliada

Cada sprint vale **2,5 pontos**:

| Dimensão | Pontos | O que deve estar verificável |
|---|---:|---|
| Artefato central da disciplina | 0,75 | Documento específico da etapa, tecnicamente consistente e completo |
| Incremento da aplicação web | 0,75 | Código, protótipo, teste ou funcionalidade que demonstre evolução concreta |
| Scrum e gestão do trabalho | 0,50 | Issues, Sprint Backlog, responsáveis, critérios de aceitação e revisão |
| GitHub, documentação e rastreabilidade | 0,50 | Commits, links, tag, organização e relação entre artefatos e código |

> Criar apenas o arquivo `docs/sprints/sprint-0X.md` não caracteriza a entrega. Ele deve funcionar como **índice**, contendo links para tudo que foi realmente produzido.

## 6. Estrutura do repositório

```text
.
├── README.md
├── GUIA_RAPIDO.md
├── CONTRIBUTING.md
├── CHECKLIST_ENTREGA_FINAL.md
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/         # CI (opcional)
├── docs/
│   ├── visao-geral.md
│   ├── backlog-produto.md
│   ├── rastreabilidade.md
│   ├── uso-de-ia.md
│   ├── requisitos/requisitos.md
│   ├── modelagem/modelagem.md
│   ├── projeto/decisoes-de-projeto.md
│   ├── padroes/padroes-de-projeto.md
│   ├── arquitetura/arquitetura.md
│   ├── testes/
│   │   ├── plano-de-testes.md
│   │   └── evidencias-testes.md
│   ├── reunioes/
│   ├── evidencias/
│   ├── sprints/sprint-01.md ... sprint-08.md
│   └── entrega-final.md
├── slides/
├── src/
├── tests/
└── scripts/validar_repositorio.py
```

## 7. Execução da aplicação de exemplo

A pasta `src/` contém uma estrutura mínima em **Node.js + Express** apenas para demonstrar que, desde a Sprint 1, o repositório deve possuir uma aplicação executável.

```bash
cd src
npm install
npm start
```

Abra `http://localhost:3000`. O grupo deverá substituir esse exemplo pela tecnologia e pelo código reais do projeto (ver [`src/README.md`](src/README.md)).

## 8. Regra de ouro da rastreabilidade

Sempre que possível, deve ser possível seguir este caminho:

```text
Problema → requisito → Issue → sprint → modelo/decisão → código → teste → evidência
```

A tabela central desse vínculo deve ser mantida em [`docs/rastreabilidade.md`](docs/rastreabilidade.md).

## 9. Entrega final

Até **30/11/2026**, o repositório deve estar consolidado na tag `versao-final` e conter:

- código-fonte e instruções de execução;
- todos os artefatos atualizados;
- slides utilizados, dentro de `slides/`;
- link do vídeo no YouTube, público ou não listado;
- vídeo de no máximo **10 minutos**;
- explicação inicial da documentação e da organização do repositório;
- demonstração das principais funcionalidades;
- compartilhamento legível da tela com a execução do sistema;
- pelo menos um aluno visível no vídeo. Não é necessário que todos apresentem.

Leia os detalhes em [`docs/entrega-final.md`](docs/entrega-final.md).

# Código-fonte da aplicação

Este diretório contém uma estrutura mínima em **Node.js + Express** apenas como
**exemplo executável da Sprint 1**. Ela comprova que o repositório possui uma
aplicação web funcional desde a primeira entrega.

## Pré-requisitos

- Node.js 18 ou superior
- npm

## Instalação e execução

```bash
cd src
npm install
npm start
```

Depois acesse `http://localhost:3000`.

Para reiniciar automaticamente durante o desenvolvimento:

```bash
npm run dev
```

## Estrutura

```text
src/
├── server.js        # ponto de entrada do backend (Express)
├── package.json
└── public/           # frontend estático servido pelo Express
    ├── index.html
    ├── materiais.html
    ├── style.css
    └── script.js
```

## Adicionar:

- tecnologias e versões definitivas (podem ser diferentes de Node/Express);
- pré-requisitos;
- instalação das dependências;
- configuração de variáveis de ambiente (`.env.example`);
- criação/migração do banco de dados, quando houver;
- execução do frontend e backend;
- credenciais de demonstração sem expor senhas reais;
- comandos de testes (`npm test`).

> Não versionar `.env`, tokens, senhas ou chaves. Forneça apenas `.env.example` quando necessário.

# Código-fonte da aplicação

Aplicação web do **While(estuda)**: servidor **Node.js + Express** que serve as páginas
estáticas de `public/` e expõe a API de autenticação, integrada ao **Supabase Auth**.

## Pré-requisitos

- Node.js 20 ou superior
- npm
- Um projeto no [Supabase](https://supabase.com) (para cadastro, login e recuperação de senha)

## Instalação e execução

```bash
cd src
npm install
cp .env.example .env
npm start
```

Depois acesse `http://localhost:3000`.

Para reiniciar automaticamente durante o desenvolvimento:

```bash
npm run dev
```

## Variáveis de ambiente (`.env`)

| Variável | Obrigatória | Descrição |
|---|---|---|
| `SUPABASE_URL` | Sim | URL do projeto Supabase (Settings > API). |
| `SUPABASE_ANON_KEY` | Sim | Chave pública (anon) do projeto Supabase. |
| `PORT` | Não | Porta do servidor (padrão `3000`). |
| `APP_URL` | Não | Endereço público da aplicação, usado nos links enviados por e-mail (padrão `http://localhost:3000`). |
| `DOMINIOS_INSTITUCIONAIS` | Não | Domínios aceitos no cadastro (RN-01), separados por vírgula. Padrão: `ufla.br,estudante.ufla.br`. |

> O arquivo `.env` **não deve ser versionado** (já está no `.gitignore`). Sem ele, as páginas
> abrem normalmente, mas os endpoints de autenticação respondem `503`.
>
> No painel do Supabase, em Authentication > URL Configuration, cadastre
> `http://localhost:3000/login/index.html` e `http://localhost:3000/recuperar-senha/index.html`
> como URLs de redirecionamento permitidas.

## Estrutura

```text
src/
├── server.js              # ponto de entrada do backend (Express) e endpoints da API
├── models/                # modelos de domínio (ver docs/modelagem/modelagem.md)
│   ├── usuario.js         # Usuario, TokenVerificacao — RF-01, RF-02, RF-03, RN-01..RN-03
│   ├── questao.js         # Materia, Topico, Questao, Alternativa, RespostaQuestao — RF-04, RF-06..RF-09
│   ├── conversa.js        # ConversaIA, MensagemIA — RF-10, RN-05
│   ├── materiais.js       # ItemDoRepositorio, Pasta, Arquivo, Anotacao, validarUpload — RF-11, RNF-04, RN-04
│   └── index.js
├── package.json
└── public/                # frontend estático servido pelo Express
    ├── index.html
    ├── materiais.html
    ├── cadastro/          # RF-01
    ├── login/             # RF-02
    ├── recuperar-senha/   # RF-03
    ├── style.css
    └── script.js
```

## Endpoints

| Método e rota | Requisito | Descrição |
|---|---|---|
| `GET /api/status` | — | Verifica se a aplicação está em execução. |
| `POST /api/cadastro` | RF-01, RN-01 | Valida os dados com `Usuario.validarCadastro()` e cria a conta no Supabase (pendente de verificação). |
| `POST /api/login` | RF-02, RN-03 | Autentica; conta não verificada recebe `403` e credenciais inválidas recebem `401` genérico. |
| `POST /api/recuperar-senha` | RF-03 | Envia o link de redefinição de senha por e-mail. |
| `POST /api/salvar-nova-senha` | RF-03 | Valida a nova senha e a grava usando o token do link. |

## Testes

```bash
cd src
npm test
```

Ver [`tests/README.md`](../tests/README.md).

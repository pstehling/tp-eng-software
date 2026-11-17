// Montagem da aplicação (raiz de composição) — docs/arquitetura/arquitetura.md, seção 3.
// É o único arquivo que conhece todas as camadas: cria os serviços externos a partir da
// configuração, entrega-os às rotas e registra o frontend estático e o tratamento de erros.
const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const config = require('./config');
const { AdaptadorSupabaseAuth } = require('./servicos/adaptador-supabase-auth');
const { criarRotasStatus } = require('./rotas/status');
const { criarRotasAutenticacao } = require('./rotas/autenticacao');

const app = express();

app.use(express.json());

// Frontend (camada de interface): páginas estáticas servidas pela mesma origem da API (DA-02)
app.use(express.static(path.join(__dirname, 'public')));

// O cliente do Supabase é criado sob demanda, para que a aplicação (e os testes)
// possam subir mesmo sem o .env configurado. Nos testes, um cliente falso pode ser
// injetado em app.locals.supabase.
let supabaseCliente = null;
function obterSupabase() {
  if (app.locals.supabase) return app.locals.supabase;
  if (supabaseCliente) return supabaseCliente;
  const { url, chaveAnonima } = config.supabase;
  if (!url || !chaveAnonima) return null;
  // Para ambientes Node.js < 22 sem WebSocket nativo (ex.: Node 20 no CI),
  // fornecemos um transporte seguro para o Realtime, já que a aplicação utiliza apenas Supabase Auth.
  const opcoes = typeof WebSocket === 'undefined'
    ? { realtime: { transport: class StubWebSocket {} } }
    : {};
  supabaseCliente = createClient(url, chaveAnonima, opcoes);
  return supabaseCliente;
}

// Padrão Adapter (docs/padroes/padroes-de-projeto.md, PP-01): as rotas dependem apenas
// da interface ServicoAutenticacao. Qualquer implementação dela pode ser injetada em
// app.locals.servicoAutenticacao; sem injeção, o Supabase é adaptado a essa interface.
function obterServicoAutenticacao() {
  if (app.locals.servicoAutenticacao) return app.locals.servicoAutenticacao;
  const supabase = obterSupabase();
  return supabase ? new AdaptadorSupabaseAuth(supabase) : null;
}

// API HTTP (camada de apresentação): cada grupo de rotas recebe apenas o que usa
app.use('/api', criarRotasStatus({ obterServicoAutenticacao }));
app.use('/api', criarRotasAutenticacao({ obterServicoAutenticacao, urlAplicacao: config.urlAplicacao }));

// Rotas da API inexistentes respondem JSON, e não a página HTML padrão do Express (DA-05)
app.use('/api', (req, res) => {
  res.status(404).json({ sucesso: false, erro: 'Rota não encontrada.' });
});

// Tratamento centralizado de erros inesperados (DA-05): o detalhe fica no log do
// servidor e o cliente recebe uma mensagem genérica, sem rastro interno.
// eslint-disable-next-line no-unused-vars
app.use((erro, req, res, next) => {
  console.error(erro);
  res.status(500).json({ sucesso: false, erro: 'Erro interno no servidor. Tente novamente.' });
});

module.exports = app;

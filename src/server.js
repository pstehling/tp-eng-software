require('dotenv').config(); // carrega o .env (SUPABASE_URL, SUPABASE_ANON_KEY, ...)
const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const { Usuario, validarSenha } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;
const APP_URL = process.env.APP_URL || `http://localhost:${PORT}`;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// O cliente do Supabase é criado sob demanda, para que a aplicação (e os testes)
// possam subir mesmo sem o .env configurado. Nos testes, um cliente falso pode ser
// injetado em app.locals.supabase.
let supabaseCliente = null;
function obterSupabase() {
  if (app.locals.supabase) return app.locals.supabase;
  if (supabaseCliente) return supabaseCliente;
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  supabaseCliente = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return supabaseCliente;
}

function servicoIndisponivel(res) {
  return res.status(503).json({
    sucesso: false,
    erro: 'Serviço de autenticação não configurado. Verifique o arquivo .env (ver src/README.md).',
  });
}

// ----------------------------------------------------
// Verificação de execução da aplicação (usada pelo CT-00 em tests/status.test.js)
// ----------------------------------------------------
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', mensagem: 'Aplicação While(estuda) em execução.' });
});

// ----------------------------------------------------
// RF-01 / RN-01 / RN-03 - Cadastro de usuário
// Diagrama: "Cadastro, verificação e login" (docs/modelagem/modelagem.md, 4.1)
// ----------------------------------------------------
app.post('/api/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body || {};

  // 1. Regras de domínio (Usuario.validarCadastro) antes de qualquer chamada externa
  const erros = Usuario.validarCadastro({ nome, email, senha });
  if (erros.length > 0) {
    return res.status(400).json({ sucesso: false, erro: erros.join(' '), erros });
  }

  const supabase = obterSupabase();
  if (!supabase) return servicoIndisponivel(res);

  // 2. O Supabase Auth gera o hash da senha (RNF-02), cria a conta como pendente
  //    de verificação e envia o link de confirmação por e-mail (RF-03)
  const { error } = await supabase.auth.signUp({
    email,
    password: senha,
    options: {
      data: { display_name: nome, nome },
      emailRedirectTo: `${APP_URL}/login/index.html`,
    },
  });

  if (error) {
    if (/already registered/i.test(error.message)) {
      return res.status(409).json({ sucesso: false, erro: 'Este e-mail já está cadastrado.' });
    }
    return res.status(400).json({ sucesso: false, erro: error.message });
  }

  res.status(201).json({
    sucesso: true,
    mensagem: 'Cadastro realizado! Verifique seu e-mail para confirmar a conta.',
  });
});

// ----------------------------------------------------
// RF-02 / RN-03 - Login
// ----------------------------------------------------
app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body || {};

  const supabase = obterSupabase();
  if (!supabase) return servicoIndisponivel(res);

  const { error } = await supabase.auth.signInWithPassword({ email, password: senha });

  if (error) {
    // RN-03: conta ainda em PENDENTE_VERIFICACAO não acessa as áreas restritas
    if (error.message === 'Email not confirmed') {
      return res.status(403).json({
        sucesso: false,
        erro: 'Conta não verificada. Por favor, confirme seu e-mail antes de acessar.',
      });
    }
    // US-01, critério 2: mensagem genérica, sem revelar se o erro foi no e-mail ou na senha
    return res.status(401).json({ sucesso: false, erro: 'E-mail ou senha incorretos.' });
  }

  res.status(200).json({ sucesso: true, redirecionar: '/materiais.html' });
});

// ----------------------------------------------------
// RF-03 - Solicitar recuperação de senha
// ----------------------------------------------------
app.post('/api/recuperar-senha', async (req, res) => {
  const { email } = req.body || {};

  const supabase = obterSupabase();
  if (!supabase) return servicoIndisponivel(res);

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    // página que recebe o token do e-mail e exibe o formulário de nova senha
    redirectTo: `${APP_URL}/recuperar-senha/index.html`,
  });

  if (error) {
    return res.status(400).json({ sucesso: false, erro: error.message });
  }

  res.status(200).json({
    sucesso: true,
    mensagem: 'Se o e-mail existir, um link de recuperação foi enviado.',
  });
});

// ----------------------------------------------------
// RF-03 - Salvar a nova senha (token temporário recebido por e-mail)
// ----------------------------------------------------
app.post('/api/salvar-nova-senha', async (req, res) => {
  const { token_acesso, refresh_token, nova_senha } = req.body || {};

  const errosSenha = validarSenha(nova_senha);
  if (errosSenha.length > 0) {
    return res.status(400).json({ sucesso: false, erro: errosSenha.join(' '), erros: errosSenha });
  }

  const supabase = obterSupabase();
  if (!supabase) return servicoIndisponivel(res);

  // 1. Assume temporariamente a sessão do usuário usando o token do link
  const { error: sessionError } = await supabase.auth.setSession({
    access_token: token_acesso,
    refresh_token: refresh_token || token_acesso,
  });

  if (sessionError) {
    return res.status(401).json({ sucesso: false, erro: 'Token inválido ou expirado.' });
  }

  // 2. Atualiza a senha do usuário autenticado
  const { error: updateError } = await supabase.auth.updateUser({ password: nova_senha });

  if (updateError) {
    return res.status(400).json({ sucesso: false, erro: updateError.message });
  }

  res.status(200).json({ sucesso: true, mensagem: 'Senha atualizada com sucesso!' });
});

// Só sobe o servidor quando o arquivo é executado diretamente (`npm start`),
// não quando é importado pelos testes em tests/.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Aplicação disponível em ${APP_URL}`);
  });
}

module.exports = app;

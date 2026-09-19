require('dotenv').config(); // Deve ser a primeira linha! Carrega o seu .env
const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializa o Supabase no backend
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ----------------------------------------------------
// Requisito: RF-01 - Cadastro de Usuário
// ----------------------------------------------------
app.post('/api/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  // O backend faz a chamada segura ao banco
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: senha,
    options: {
      data: { 
        display_name: nome,
        nome: nome
      }

    }
  });

  // Retorna o erro se o e-mail já existir ou a senha for fraca
  if (error) {
    return res.status(400).json({ sucesso: false, erro: error.message });
  }

  // Sucesso
  res.status(201).json({ 
    sucesso: true, 
    mensagem: 'Cadastro realizado! Verifique seu e-mail para confirmar.' 
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Aplicação disponível em http://localhost:${PORT}`);
  });
}

// ----------------------------------------------------
// Requisito: RF-02 - Login de Usuário
// ----------------------------------------------------
app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;

  // Supabase compara a senha com o hash do banco automaticamente
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: senha,
  });

  if (error) {
    // Tratamento para RF-01: Bloqueia usuário não verificado
    if (error.message === 'Email not confirmed') {
      return res.status(403).json({ 
        sucesso: false, 
        erro: 'Conta não verificada. Por favor, confirme seu e-mail antes de acessar.' 
      });
    }
    
    // Tratamento para RF-02: Mensagem de erro genérica
    return res.status(401).json({ 
      sucesso: false, 
      erro: 'E-mail ou senha incorretos.' // Nunca revela qual dos dois está errado
    });
  }

  // Sucesso: Retorna o caminho da tela inicial do usuário
  res.status(200).json({ 
    sucesso: true, 
    redirecionar: '/materiais.html' 
  });
});

// ----------------------------------------------------
// Requisito: RF-01 - Solicitar Recuperação de Senha
// ----------------------------------------------------
app.post('/api/recuperar-senha/index.html', async (req, res) => {
  const { email } = req.body;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    // URL para onde o usuário será enviado ao clicar no link do e-mail
    redirectTo: 'http://localhost:3000/redefinir-senha/index.html',
  });

  if (error) {
    return res.status(400).json({ sucesso: false, erro: error.message });
  }

  res.status(200).json({ 
    sucesso: true, 
    mensagem: 'Se o e-mail existir, um link de recuperação foi enviado.' 
  });
});

// ----------------------------------------------------
// Requisito: RF-01 - Salvar a Nova Senha
// ----------------------------------------------------
app.post('/api/salvar-nova-senha', async (req, res) => {
  const { token_acesso, nova_senha } = req.body;

  // 1. O backend assume a sessão do usuário temporariamente usando o token do e-mail
  const { error: sessionError } = await supabase.auth.setSession({
    access_token: token_acesso,
    refresh_token: token_acesso,
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

module.exports = app;
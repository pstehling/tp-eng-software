// Camada de apresentação (API HTTP) — fluxo "Cadastro, verificação e login"
// (docs/modelagem/modelagem.md, 4.1). Requisitos: RF-01, RF-02, RF-03 | Regras: RN-01, RN-03.
// As rotas só tratam HTTP: validam a entrada com o domínio (models/), chamam a interface
// ServicoAutenticacao (padrão Adapter, PP-01) e escolhem a resposta. Elas não sabem qual
// provedor de autenticação está por trás nem como ele é criado (ver app.js).
const express = require('express');
const { Usuario, validarSenha } = require('../models');
const { MOTIVOS_FALHA_AUTENTICACAO } = require('../servicos/servico-autenticacao');

// Express 4 não repassa erros de funções async ao tratador de erros; este invólucro
// garante que uma exceção inesperada vire resposta 500 em vez de derrubar o servidor (DA-05).
const assincrona = (rota) => (req, res, next) => Promise.resolve(rota(req, res, next)).catch(next);

function servicoIndisponivel(res) {
  return res.status(503).json({
    sucesso: false,
    erro: 'Serviço de autenticação não configurado. Verifique o arquivo .env (ver src/README.md).',
  });
}

function criarRotasAutenticacao({ obterServicoAutenticacao, urlAplicacao }) {
  const rotas = express.Router();

  // RF-01 / RN-01 / RN-03 - Cadastro de usuário
  rotas.post('/cadastro', assincrona(async (req, res) => {
    const { nome, email, senha } = req.body || {};

    // 1. Regras de domínio (Usuario.validarCadastro) antes de qualquer chamada externa
    const erros = Usuario.validarCadastro({ nome, email, senha });
    if (erros.length > 0) {
      return res.status(400).json({ sucesso: false, erro: erros.join(' '), erros });
    }

    const servicoAuth = obterServicoAutenticacao();
    if (!servicoAuth) return servicoIndisponivel(res);

    // 2. Cria a conta pendente de verificação e envia o link de confirmação (RF-03)
    const resultado = await servicoAuth.cadastrar({
      nome,
      email,
      senha,
      urlConfirmacao: `${urlAplicacao}/login/index.html`,
    });

    if (!resultado.sucesso) {
      if (resultado.motivo === MOTIVOS_FALHA_AUTENTICACAO.EMAIL_JA_CADASTRADO) {
        return res.status(409).json({ sucesso: false, erro: 'Este e-mail já está cadastrado.' });
      }
      return res.status(400).json({ sucesso: false, erro: resultado.detalhe });
    }

    res.status(201).json({
      sucesso: true,
      mensagem: 'Cadastro realizado! Verifique seu e-mail para confirmar a conta.',
    });
  }));

  // RF-02 / RN-03 - Login
  rotas.post('/login', assincrona(async (req, res) => {
    const { email, senha } = req.body || {};

    const servicoAuth = obterServicoAutenticacao();
    if (!servicoAuth) return servicoIndisponivel(res);

    const resultado = await servicoAuth.entrar({ email, senha });

    if (!resultado.sucesso) {
      // RN-03: conta ainda em PENDENTE_VERIFICACAO não acessa as áreas restritas
      if (resultado.motivo === MOTIVOS_FALHA_AUTENTICACAO.EMAIL_NAO_CONFIRMADO) {
        return res.status(403).json({
          sucesso: false,
          erro: 'Conta não verificada. Por favor, confirme seu e-mail antes de acessar.',
        });
      }
      // T-06 / CT-06: falha de comunicação ou indisponibilidade no provedor não pode ser mascarada como credencial errada
      if (resultado.motivo === MOTIVOS_FALHA_AUTENTICACAO.ERRO_SERVICO) {
        return res.status(503).json({
          sucesso: false,
          erro: 'Serviço de autenticação temporariamente indisponível. Tente novamente mais tarde.',
        });
      }
      // US-01, critério 2: mensagem genérica, sem revelar se o erro foi no e-mail ou na senha
      return res.status(401).json({ sucesso: false, erro: 'E-mail ou senha incorretos.' });
    }

    res.status(200).json({ sucesso: true, redirecionar: '/materiais.html' });
  }));

  // RF-03 - Solicitar recuperação de senha
  rotas.post('/recuperar-senha', assincrona(async (req, res) => {
    const { email } = req.body || {};

    const servicoAuth = obterServicoAutenticacao();
    if (!servicoAuth) return servicoIndisponivel(res);

    const resultado = await servicoAuth.solicitarRecuperacaoSenha({
      email,
      // página que recebe o token do e-mail e exibe o formulário de nova senha
      urlRedefinicao: `${urlAplicacao}/recuperar-senha/index.html`,
    });

    if (!resultado.sucesso) {
      return res.status(400).json({ sucesso: false, erro: resultado.detalhe });
    }

    res.status(200).json({
      sucesso: true,
      mensagem: 'Se o e-mail existir, um link de recuperação foi enviado.',
    });
  }));

  // RF-03 - Salvar a nova senha (token temporário recebido por e-mail)
  rotas.post('/salvar-nova-senha', assincrona(async (req, res) => {
    const { token_acesso, refresh_token, nova_senha } = req.body || {};

    const errosSenha = validarSenha(nova_senha);
    if (errosSenha.length > 0) {
      return res.status(400).json({ sucesso: false, erro: errosSenha.join(' '), erros: errosSenha });
    }

    const servicoAuth = obterServicoAutenticacao();
    if (!servicoAuth) return servicoIndisponivel(res);

    const resultado = await servicoAuth.redefinirSenha({
      tokenAcesso: token_acesso,
      tokenRenovacao: refresh_token,
      novaSenha: nova_senha,
    });

    if (!resultado.sucesso) {
      if (resultado.motivo === MOTIVOS_FALHA_AUTENTICACAO.TOKEN_INVALIDO) {
        return res.status(401).json({ sucesso: false, erro: 'Token inválido ou expirado.' });
      }
      return res.status(400).json({ sucesso: false, erro: resultado.detalhe });
    }

    res.status(200).json({ sucesso: true, mensagem: 'Senha atualizada com sucesso!' });
  }));

  return rotas;
}

module.exports = { criarRotasAutenticacao };

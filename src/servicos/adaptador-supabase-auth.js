// Adapter do padrão Adapter — ver docs/padroes/padroes-de-projeto.md (PP-01).
// Adapta o cliente do Supabase Auth (Adaptee, @supabase/supabase-js) à interface
// ServicoAutenticacao (Target). É o único arquivo do backend que conhece os nomes dos
// métodos do Supabase, o formato dos seus parâmetros e os seus códigos de erro.

const {
  ServicoAutenticacao,
  MOTIVOS_FALHA_AUTENTICACAO: MOTIVOS,
  sucesso,
  falha,
} = require('./servico-autenticacao');

// Códigos estáveis do Supabase Auth (AuthApiError.code). A mensagem em texto só é usada
// como alternativa quando o erro não traz código.
const CODIGOS_EMAIL_JA_CADASTRADO = ['user_already_exists', 'email_exists'];
const CODIGO_EMAIL_NAO_CONFIRMADO = 'email_not_confirmed';

function emailJaCadastrado(erro) {
  return CODIGOS_EMAIL_JA_CADASTRADO.includes(erro.code) || /already registered/i.test(erro.message);
}

// Com "Confirm email" ativo, o Supabase não devolve erro para e-mail já confirmado:
// devolve um usuário fictício sem identidades (documentação de signUp em
// @supabase/auth-js, GoTrueClient.d.ts). O erro "User already registered" só ocorre
// com a confirmação desativada, e é tratado em emailJaCadastrado().
function usuarioFicticio(dados) {
  return Array.isArray(dados?.user?.identities) && dados.user.identities.length === 0;
}

function emailNaoConfirmado(erro) {
  return erro.code === CODIGO_EMAIL_NAO_CONFIRMADO || erro.message === 'Email not confirmed';
}

class AdaptadorSupabaseAuth extends ServicoAutenticacao {
  constructor(clienteSupabase) {
    super();
    this.auth = clienteSupabase.auth;
  }

  async cadastrar({ nome, email, senha, urlConfirmacao }) {
    // O Supabase gera o hash da senha (RNF-02), cria a conta pendente de verificação
    // e envia o link de confirmação por e-mail (RF-03).
    const { data, error } = await this.auth.signUp({
      email,
      password: senha,
      options: {
        data: { display_name: nome, nome },
        emailRedirectTo: urlConfirmacao,
      },
    });
    if (!error) return usuarioFicticio(data) ? falha(MOTIVOS.EMAIL_JA_CADASTRADO) : sucesso();
    if (emailJaCadastrado(error)) return falha(MOTIVOS.EMAIL_JA_CADASTRADO);
    return falha(MOTIVOS.ERRO_SERVICO, error.message);
  }

  async entrar({ email, senha }) {
    const { error } = await this.auth.signInWithPassword({ email, password: senha });
    if (!error) return sucesso();
    if (emailNaoConfirmado(error)) return falha(MOTIVOS.EMAIL_NAO_CONFIRMADO);
    return falha(MOTIVOS.CREDENCIAIS_INVALIDAS, error.message);
  }

  async solicitarRecuperacaoSenha({ email, urlRedefinicao }) {
    const { error } = await this.auth.resetPasswordForEmail(email, { redirectTo: urlRedefinicao });
    if (!error) return sucesso();
    return falha(MOTIVOS.ERRO_SERVICO, error.message);
  }

  async redefinirSenha({ tokenAcesso, tokenRenovacao, novaSenha }) {
    // 1. Assume temporariamente a sessão do usuário usando o token do link
    const { error: erroSessao } = await this.auth.setSession({
      access_token: tokenAcesso,
      refresh_token: tokenRenovacao || tokenAcesso,
    });
    if (erroSessao) return falha(MOTIVOS.TOKEN_INVALIDO, erroSessao.message);

    // 2. Atualiza a senha do usuário autenticado
    const { error: erroAtualizacao } = await this.auth.updateUser({ password: novaSenha });
    if (erroAtualizacao) return falha(MOTIVOS.ERRO_SERVICO, erroAtualizacao.message);
    return sucesso();
  }
}

module.exports = { AdaptadorSupabaseAuth };

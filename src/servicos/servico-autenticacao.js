// Interface-alvo (Target) do padrão Adapter — ver docs/padroes/padroes-de-projeto.md (PP-01).
// Define as operações de autenticação que as rotas de src/server.js precisam, com nomes e
// resultados do nosso domínio. Nenhum detalhe de provedor (Supabase ou outro) aparece aqui.
// Requisitos: RF-01, RF-02, RF-03 | Regras: RN-03.

// Motivos de falha que as rotas sabem tratar. Cada adaptador traduz os erros do seu
// provedor para um destes valores.
const MOTIVOS_FALHA_AUTENTICACAO = Object.freeze({
  EMAIL_JA_CADASTRADO: 'EMAIL_JA_CADASTRADO',
  EMAIL_NAO_CONFIRMADO: 'EMAIL_NAO_CONFIRMADO',
  CREDENCIAIS_INVALIDAS: 'CREDENCIAIS_INVALIDAS',
  TOKEN_INVALIDO: 'TOKEN_INVALIDO',
  ERRO_SERVICO: 'ERRO_SERVICO',
});

// Formato único de resultado: { sucesso: true } ou { sucesso: false, motivo, detalhe }.
// Segue o mesmo formato { valido, motivo, mensagem } de validarUpload (src/models/materiais.js).
function sucesso() {
  return { sucesso: true };
}

function falha(motivo, detalhe = '') {
  return { sucesso: false, motivo, detalhe };
}

class ServicoAutenticacao {
  constructor() {
    if (new.target === ServicoAutenticacao) {
      throw new TypeError('ServicoAutenticacao é abstrata; use um adaptador (ex.: AdaptadorSupabaseAuth).');
    }
  }

  // RF-01 + RF-03: cria a conta pendente de verificação e envia o link de confirmação.
  async cadastrar({ nome, email, senha, urlConfirmacao }) {
    throw new Error('cadastrar() não implementado.');
  }

  // RF-02 + RN-03: autentica com e-mail e senha.
  async entrar({ email, senha }) {
    throw new Error('entrar() não implementado.');
  }

  // RF-03: envia o link temporário de redefinição de senha.
  async solicitarRecuperacaoSenha({ email, urlRedefinicao }) {
    throw new Error('solicitarRecuperacaoSenha() não implementado.');
  }

  // RF-03: troca a senha usando o token recebido por e-mail.
  async redefinirSenha({ tokenAcesso, tokenRenovacao, novaSenha }) {
    throw new Error('redefinirSenha() não implementado.');
  }
}

module.exports = { ServicoAutenticacao, MOTIVOS_FALHA_AUTENTICACAO, sucesso, falha };

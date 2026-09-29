// Modelo de domínio: Usuario e TokenVerificacao.
// Corresponde ao diagrama de classes e aos diagramas "Cadastro, verificação e login"
// e "Estados do usuário" de docs/modelagem/modelagem.md.
// Requisitos: RF-01, RF-02, RF-03, RF-05 | Regras: RN-01, RN-02, RN-03.

const PAPEIS = Object.freeze({
  ESTUDANTE: 'ESTUDANTE',
  ADMIN: 'ADMIN',
});

const STATUS = Object.freeze({
  PENDENTE_VERIFICACAO: 'PENDENTE_VERIFICACAO',
  ATIVO: 'ATIVO',
});

const TIPOS_TOKEN = Object.freeze({
  VERIFICACAO_EMAIL: 'VERIFICACAO_EMAIL',
  RECUPERACAO_SENHA: 'RECUPERACAO_SENHA',
});

// RN-01: domínios aceitos por padrão (confirmados pelo grupo na Sprint 3).
// Pode ser sobrescrito pela variável de ambiente DOMINIOS_INSTITUCIONAIS
// (lista separada por vírgula), sem alterar o código.
const DOMINIOS_PADRAO = ['ufla.br', 'estudante.ufla.br'];
const SENHA_TAMANHO_MINIMO = 8;

function dominiosInstitucionais() {
  const configurados = process.env.DOMINIOS_INSTITUCIONAIS;
  if (!configurados) return DOMINIOS_PADRAO;
  return configurados
    .split(',')
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);
}

function emailValido(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function emailInstitucional(email) {
  if (!emailValido(email)) return false;
  const dominio = email.split('@')[1].toLowerCase();
  return dominiosInstitucionais().includes(dominio);
}

// Regra de senha (confirmada pelo grupo na Sprint 3): mínimo de 8 caracteres, com letra e número.
function validarSenha(senha) {
  const erros = [];
  if (typeof senha !== 'string' || senha.length < SENHA_TAMANHO_MINIMO) {
    erros.push(`A senha deve ter no mínimo ${SENHA_TAMANHO_MINIMO} caracteres.`);
  }
  if (typeof senha !== 'string' || !/[A-Za-z]/.test(senha) || !/[0-9]/.test(senha)) {
    erros.push('A senha deve conter pelo menos uma letra e um número.');
  }
  return erros;
}

class TokenVerificacao {
  constructor({ valor, tipo, expiraEm, usadoEm = null }) {
    if (!Object.values(TIPOS_TOKEN).includes(tipo)) {
      throw new Error(`Tipo de token inválido: ${tipo}`);
    }
    this.valor = valor;
    this.tipo = tipo;
    this.expiraEm = new Date(expiraEm);
    this.usadoEm = usadoEm ? new Date(usadoEm) : null;
  }

  estaValido(agora = new Date()) {
    return this.usadoEm === null && agora < this.expiraEm;
  }

  consumir(agora = new Date()) {
    if (!this.estaValido(agora)) {
      throw new Error('Token expirado ou já utilizado.');
    }
    this.usadoEm = agora;
  }
}

class Usuario {
  constructor({
    id,
    nome,
    email,
    senhaHash = null,
    papel = PAPEIS.ESTUDANTE,
    status = STATUS.PENDENTE_VERIFICACAO,
    avatarUrl = null,
    curso = null,
  }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senhaHash = senhaHash; // o hash é gerado na camada de serviço (Supabase Auth), nunca aqui
    this.papel = papel;
    this.status = status;
    this.avatarUrl = avatarUrl;
    this.curso = curso;
  }

  // RF-01 + RN-01: valida os dados antes de qualquer chamada ao serviço de autenticação.
  // Retorna a lista de erros (vazia quando o cadastro é válido).
  static validarCadastro({ nome, email, senha } = {}) {
    const erros = [];
    if (typeof nome !== 'string' || nome.trim().length < 2) {
      erros.push('Informe seu nome completo.');
    }
    if (!emailValido(email)) {
      erros.push('Informe um e-mail em formato válido.');
    } else if (!emailInstitucional(email)) {
      erros.push(
        `Use um e-mail institucional (${dominiosInstitucionais().map((d) => '@' + d).join(' ou ')}).`
      );
    }
    erros.push(...validarSenha(senha));
    return erros;
  }

  // RF-02 + RN-03: apenas contas ativas (e-mail verificado) podem se autenticar.
  podeAutenticar() {
    return this.status === STATUS.ATIVO;
  }

  // RF-03 + RN-03: transição PENDENTE_VERIFICACAO -> ATIVO com token válido.
  verificarEmail(token, agora = new Date()) {
    if (!(token instanceof TokenVerificacao) || token.tipo !== TIPOS_TOKEN.VERIFICACAO_EMAIL) {
      throw new Error('Token de verificação inválido.');
    }
    token.consumir(agora); // lança erro se expirado ou já usado; o status não muda
    this.status = STATUS.ATIVO;
  }

  // RN-02: somente administradores alteram o banco global de questões.
  podeEditarBancoDeQuestoes() {
    return this.papel === PAPEIS.ADMIN;
  }
}

module.exports = {
  Usuario,
  TokenVerificacao,
  PAPEIS,
  STATUS,
  TIPOS_TOKEN,
  validarSenha,
  emailInstitucional,
  dominiosInstitucionais,
};

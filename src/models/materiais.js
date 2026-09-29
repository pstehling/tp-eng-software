// Modelo de domínio: ItemDoRepositorio (abstrata), Pasta, Arquivo, Anotacao
// e a regra de validação de upload.
// Corresponde ao diagrama de classes e ao diagrama "Regras de upload de materiais"
// de docs/modelagem/modelagem.md.
// Requisitos: RF-11 | RNF-04 | Regra: RN-04.

// RNF-04: formatos aceitos e limite de tamanho por arquivo.
const TIPOS_PERMITIDOS = Object.freeze({
  'application/pdf': 'PDF',
  'image/png': 'PNG',
  'image/jpeg': 'JPG',
  'text/plain': 'TXT',
});
const TAMANHO_MAXIMO_BYTES = 50 * 1024 * 1024; // 50 MB

const MOTIVOS_REJEICAO = Object.freeze({
  FORMATO_NAO_PERMITIDO: 'FORMATO_NAO_PERMITIDO',
  TAMANHO_EXCEDIDO: 'TAMANHO_EXCEDIDO',
  ACESSO_NEGADO: 'ACESSO_NEGADO',
});

class ItemDoRepositorio {
  constructor({ id, nome, donoId, pastaId = null }) {
    if (new.target === ItemDoRepositorio) {
      throw new TypeError('ItemDoRepositorio é abstrata; use Pasta, Arquivo ou Anotacao.');
    }
    this.id = id;
    this.nome = nome;
    this.donoId = donoId;
    this.pastaId = pastaId; // Pasta 0..1 o-- 0..* ItemDoRepositorio
  }

  // RN-04: o material pertence estritamente a quem o criou.
  acessivelPor(usuarioId) {
    return this.donoId === usuarioId;
  }
}

class Pasta extends ItemDoRepositorio {}

class Arquivo extends ItemDoRepositorio {
  constructor({ tipoMime, tamanhoBytes, ultimoAcessoEm = null, ...base }) {
    super(base);
    this.tipoMime = tipoMime;
    this.tamanhoBytes = tamanhoBytes;
    this.ultimoAcessoEm = ultimoAcessoEm;
  }
}

class Anotacao extends ItemDoRepositorio {
  constructor({ conteudo = '', ultimoAcessoEm = null, ...base }) {
    super(base);
    this.conteudo = conteudo;
    this.ultimoAcessoEm = ultimoAcessoEm;
  }
}

// Segue a ordem do fluxograma 4.4: formato -> tamanho -> proprietário da pasta de destino.
// pastaDestino é opcional (null = raiz do repositório do próprio usuário).
function validarUpload({ tipoMime, tamanhoBytes }, { usuarioId, pastaDestino = null } = {}) {
  if (!Object.prototype.hasOwnProperty.call(TIPOS_PERMITIDOS, tipoMime)) {
    return {
      valido: false,
      motivo: MOTIVOS_REJEICAO.FORMATO_NAO_PERMITIDO,
      mensagem: 'Formato não permitido. Envie PDF, PNG, JPG ou TXT.',
    };
  }
  if (typeof tamanhoBytes !== 'number' || tamanhoBytes > TAMANHO_MAXIMO_BYTES) {
    return {
      valido: false,
      motivo: MOTIVOS_REJEICAO.TAMANHO_EXCEDIDO,
      mensagem: 'O arquivo excede o limite de 50 MB.',
    };
  }
  if (pastaDestino && !pastaDestino.acessivelPor(usuarioId)) {
    return {
      valido: false,
      motivo: MOTIVOS_REJEICAO.ACESSO_NEGADO,
      mensagem: 'Você não tem acesso a esta pasta.',
    };
  }
  return { valido: true };
}

module.exports = {
  ItemDoRepositorio,
  Pasta,
  Arquivo,
  Anotacao,
  validarUpload,
  TIPOS_PERMITIDOS,
  TAMANHO_MAXIMO_BYTES,
  MOTIVOS_REJEICAO,
};

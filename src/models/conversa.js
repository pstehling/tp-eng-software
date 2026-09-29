// Modelo de domínio: ConversaIA e MensagemIA.
// Corresponde ao diagrama de classes e ao diagrama "Dúvida com IA"
// de docs/modelagem/modelagem.md.
// Requisitos: RF-10 | Regra: RN-05 (a chave da API fica no backend, fora do domínio).

const AUTORES = Object.freeze({
  USUARIO: 'USUARIO',
  IA: 'IA',
});

// Restrição da visão geral: limitar o contexto enviado à API de IA (cota limitada).
const LIMITE_HISTORICO_PADRAO = 10;

class MensagemIA {
  constructor({ autor, texto, criadaEm = new Date() }) {
    this.autor = autor;
    this.texto = texto;
    this.criadaEm = criadaEm;
  }
}

class ConversaIA {
  // contexto opcional: { questaoId } e/ou { materiaId }
  constructor({ id, usuarioId, contexto = {}, mensagens = [] }) {
    this.id = id;
    this.usuarioId = usuarioId;
    this.contexto = contexto;
    this.mensagens = mensagens;
  }

  adicionar(autor, texto, agora = new Date()) {
    if (!Object.values(AUTORES).includes(autor)) {
      throw new Error(`Autor inválido: ${autor}`);
    }
    if (typeof texto !== 'string' || !texto.trim()) {
      throw new Error('A mensagem não pode ser vazia.');
    }
    const mensagem = new MensagemIA({ autor, texto: texto.trim(), criadaEm: agora });
    this.mensagens.push(mensagem);
    return mensagem;
  }

  // Monta apenas as últimas mensagens, no formato genérico de papéis usado por APIs de chat.
  historicoParaEnvio(limite = LIMITE_HISTORICO_PADRAO) {
    return this.mensagens.slice(-limite).map((m) => ({
      papel: m.autor === AUTORES.USUARIO ? 'user' : 'assistant',
      conteudo: m.texto,
    }));
  }
}

module.exports = { ConversaIA, MensagemIA, AUTORES, LIMITE_HISTORICO_PADRAO };

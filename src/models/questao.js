// Modelo de domínio: Materia, Topico, Questao, Alternativa e RespostaQuestao.
// Corresponde ao diagrama de classes e ao diagrama "Resolver questão"
// de docs/modelagem/modelagem.md.
// Requisitos: RF-04, RF-06, RF-07, RF-08, RF-09 | RNF-03.

const DIFICULDADES = Object.freeze({
  FACIL: 'FACIL',
  MEDIA: 'MEDIA',
  DIFICIL: 'DIFICIL',
});

class Materia {
  constructor({ id, nome, descricao = '', topicos = [] }) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.topicos = topicos; // composição: Materia 1 *-- 1..* Topico
  }
}

class Topico {
  constructor({ id, nome, materiaId }) {
    this.id = id;
    this.nome = nome;
    this.materiaId = materiaId;
  }
}

class Alternativa {
  constructor({ id, texto }) {
    this.id = id;
    this.texto = texto;
  }
}

class RespostaQuestao {
  constructor({ usuarioId, questaoId, alternativaId, correta, respondidaEm = new Date() }) {
    this.usuarioId = usuarioId;
    this.questaoId = questaoId;
    this.alternativaId = alternativaId;
    this.correta = correta;
    this.respondidaEm = respondidaEm;
  }
}

class Questao {
  constructor({
    id,
    enunciado,
    alternativas = [],
    alternativaCorretaId,
    explicacao = '',
    dificuldade,
    materiaId,
    topicoId,
  }) {
    this.id = id;
    this.enunciado = enunciado;
    this.alternativas = alternativas.map((a) => (a instanceof Alternativa ? a : new Alternativa(a)));
    this.alternativaCorretaId = alternativaCorretaId;
    this.explicacao = explicacao;
    this.dificuldade = dificuldade;
    this.materiaId = materiaId;
    this.topicoId = topicoId;
  }

  // RF-08: regras mínimas para uma questão entrar no banco (usadas no cadastro/importação).
  validar() {
    const erros = [];
    if (!this.enunciado || !String(this.enunciado).trim()) erros.push('Enunciado obrigatório.');
    if (this.alternativas.length < 2) erros.push('A questão precisa de ao menos 2 alternativas.');
    if (!this.alternativas.some((a) => a.id === this.alternativaCorretaId)) {
      erros.push('O gabarito deve corresponder a uma das alternativas.');
    }
    if (!this.materiaId) erros.push('A questão deve estar vinculada a uma matéria.');
    if (!Object.values(DIFICULDADES).includes(this.dificuldade)) {
      erros.push('Dificuldade inválida (use FACIL, MEDIA ou DIFICIL).');
    }
    return erros;
  }

  // RF-09: a correção é responsabilidade da própria questão e gera uma RespostaQuestao.
  corrigir(usuarioId, alternativaId, agora = new Date()) {
    if (!this.alternativas.some((a) => a.id === alternativaId)) {
      throw new Error('Alternativa não pertence a esta questão.');
    }
    return new RespostaQuestao({
      usuarioId,
      questaoId: this.id,
      alternativaId,
      correta: alternativaId === this.alternativaCorretaId,
      respondidaEm: agora,
    });
  }

  // RF-07: filtros combináveis (matéria, tópico, dificuldade e busca textual no enunciado).
  // Todos os critérios informados precisam ser satisfeitos ao mesmo tempo.
  static filtrar(questoes, filtros = {}) {
    const { materiaId, topicoId, dificuldade, q } = filtros;
    const termo = q ? String(q).trim().toLowerCase() : '';
    return questoes.filter(
      (questao) =>
        (!materiaId || questao.materiaId === materiaId) &&
        (!topicoId || questao.topicoId === topicoId) &&
        (!dificuldade || questao.dificuldade === dificuldade) &&
        (!termo || String(questao.enunciado).toLowerCase().includes(termo))
    );
  }
}

// RF-04: progresso de estudos calculado a partir do histórico de respostas.
function calcularProgresso(respostas) {
  const total = respostas.length;
  const acertos = respostas.filter((r) => r.correta).length;
  return {
    total,
    acertos,
    percentualAcerto: total === 0 ? 0 : Math.round((acertos / total) * 100),
  };
}

module.exports = {
  Materia,
  Topico,
  Questao,
  Alternativa,
  RespostaQuestao,
  DIFICULDADES,
  calcularProgresso,
};

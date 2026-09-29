// Testes dos modelos de domínio (Sprint 3).
// Cada bloco corresponde a um elemento de docs/modelagem/modelagem.md e comprova
// que o código implementa as regras representadas nos diagramas.

const { test, describe, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const {
  Usuario,
  TokenVerificacao,
  PAPEIS,
  STATUS,
  TIPOS_TOKEN,
  Questao,
  DIFICULDADES,
  calcularProgresso,
  ConversaIA,
  AUTORES,
  ItemDoRepositorio,
  Pasta,
  Arquivo,
  Anotacao,
  validarUpload,
  TAMANHO_MAXIMO_BYTES,
  MOTIVOS_REJEICAO,
} = require(path.join(__dirname, '..', 'src', 'models'));

const cadastroValido = { nome: 'Ana Souza', email: 'ana@estudante.ufla.br', senha: 'senhaSegura1' };

describe('Usuario — RF-01 / RN-01 (validarCadastro)', () => {
  beforeEach(() => {
    delete process.env.DOMINIOS_INSTITUCIONAIS; // usa os domínios padrão da modelagem
  });

  test('aceita cadastro com e-mail institucional e senha válida', () => {
    assert.deepEqual(Usuario.validarCadastro(cadastroValido), []);
    assert.deepEqual(Usuario.validarCadastro({ ...cadastroValido, email: 'prof@ufla.br' }), []);
  });

  test('rejeita e-mail fora do domínio institucional (RN-01)', () => {
    const erros = Usuario.validarCadastro({ ...cadastroValido, email: 'ana@gmail.com' });
    assert.equal(erros.length, 1);
    assert.match(erros[0], /institucional/);
  });

  test('rejeita senha curta ou sem número', () => {
    assert.ok(Usuario.validarCadastro({ ...cadastroValido, senha: 'abc1' }).length > 0);
    assert.ok(Usuario.validarCadastro({ ...cadastroValido, senha: 'somenteletras' }).length > 0);
  });

  test('domínios aceitos podem ser configurados por variável de ambiente', () => {
    process.env.DOMINIOS_INSTITUCIONAIS = 'exemplo.edu.br';
    assert.deepEqual(Usuario.validarCadastro({ ...cadastroValido, email: 'x@exemplo.edu.br' }), []);
  });
});

describe('Usuario / TokenVerificacao — estados da conta (RF-02, RF-03, RN-03)', () => {
  const agora = new Date('2026-09-28T12:00:00Z');
  const daquiUmaHora = new Date('2026-09-28T13:00:00Z');

  test('nova conta começa PENDENTE_VERIFICACAO e não pode autenticar', () => {
    const usuario = new Usuario({ id: 'u1', nome: 'Ana', email: cadastroValido.email });
    assert.equal(usuario.status, STATUS.PENDENTE_VERIFICACAO);
    assert.equal(usuario.podeAutenticar(), false);
  });

  test('token válido muda a conta para ATIVO e libera o login', () => {
    const usuario = new Usuario({ id: 'u1', nome: 'Ana', email: cadastroValido.email });
    const token = new TokenVerificacao({ valor: 't', tipo: TIPOS_TOKEN.VERIFICACAO_EMAIL, expiraEm: daquiUmaHora });
    usuario.verificarEmail(token, agora);
    assert.equal(usuario.status, STATUS.ATIVO);
    assert.equal(usuario.podeAutenticar(), true);
    assert.equal(token.estaValido(agora), false, 'token não pode ser reutilizado');
  });

  test('token expirado não ativa a conta (transição PENDENTE -> PENDENTE)', () => {
    const usuario = new Usuario({ id: 'u1', nome: 'Ana', email: cadastroValido.email });
    const token = new TokenVerificacao({ valor: 't', tipo: TIPOS_TOKEN.VERIFICACAO_EMAIL, expiraEm: agora });
    assert.throws(() => usuario.verificarEmail(token, daquiUmaHora), /expirado/);
    assert.equal(usuario.status, STATUS.PENDENTE_VERIFICACAO);
  });

  test('token de recuperação de senha não serve para verificar e-mail', () => {
    const usuario = new Usuario({ id: 'u1', nome: 'Ana', email: cadastroValido.email });
    const token = new TokenVerificacao({ valor: 't', tipo: TIPOS_TOKEN.RECUPERACAO_SENHA, expiraEm: daquiUmaHora });
    assert.throws(() => usuario.verificarEmail(token, agora));
  });
});

describe('Usuario — permissões (RN-02)', () => {
  test('somente ADMIN pode editar o banco de questões', () => {
    assert.equal(new Usuario({ id: 'a', papel: PAPEIS.ADMIN }).podeEditarBancoDeQuestoes(), true);
    assert.equal(new Usuario({ id: 'e' }).podeEditarBancoDeQuestoes(), false);
  });
});

describe('Questao — RF-07, RF-08, RF-09 e progresso (RF-04)', () => {
  const questoes = [
    new Questao({
      id: 'q1',
      enunciado: 'Qual é a complexidade da busca binária?',
      alternativas: [{ id: 'a', texto: 'O(n)' }, { id: 'b', texto: 'O(log n)' }],
      alternativaCorretaId: 'b',
      explicacao: 'A cada passo o intervalo é dividido pela metade.',
      dificuldade: DIFICULDADES.FACIL,
      materiaId: 'aed',
      topicoId: 'busca',
    }),
    new Questao({
      id: 'q2',
      enunciado: 'O que caracteriza uma pilha?',
      alternativas: [{ id: 'a', texto: 'FIFO' }, { id: 'b', texto: 'LIFO' }],
      alternativaCorretaId: 'b',
      dificuldade: DIFICULDADES.MEDIA,
      materiaId: 'aed',
      topicoId: 'estruturas',
    }),
    new Questao({
      id: 'q3',
      enunciado: 'Qual forma normal elimina dependências transitivas?',
      alternativas: [{ id: 'a', texto: '2FN' }, { id: 'b', texto: '3FN' }],
      alternativaCorretaId: 'b',
      dificuldade: DIFICULDADES.MEDIA,
      materiaId: 'bd',
      topicoId: 'normalizacao',
    }),
  ];

  test('filtra combinando matéria e dificuldade (US-06, critério 1)', () => {
    const resultado = Questao.filtrar(questoes, { materiaId: 'aed', dificuldade: DIFICULDADES.MEDIA });
    assert.deepEqual(resultado.map((q) => q.id), ['q2']);
  });

  test('busca textual no enunciado ignora maiúsculas', () => {
    assert.deepEqual(Questao.filtrar(questoes, { q: 'BUSCA BINÁRIA' }).map((q) => q.id), ['q1']);
  });

  test('filtro sem correspondência retorna lista vazia (US-06, critério 2)', () => {
    assert.deepEqual(Questao.filtrar(questoes, { materiaId: 'bd', dificuldade: DIFICULDADES.FACIL }), []);
  });

  test('corrigir gera RespostaQuestao correta ou incorreta', () => {
    assert.equal(questoes[0].corrigir('u1', 'b').correta, true);
    const errada = questoes[0].corrigir('u1', 'a');
    assert.equal(errada.correta, false);
    assert.equal(errada.questaoId, 'q1');
    assert.equal(errada.usuarioId, 'u1');
  });

  test('corrigir rejeita alternativa de outra questão', () => {
    assert.throws(() => questoes[0].corrigir('u1', 'z'));
  });

  test('validar impede questão sem gabarito válido ou sem matéria (RF-08)', () => {
    const invalida = new Questao({
      id: 'x',
      enunciado: 'Enunciado',
      alternativas: [{ id: 'a', texto: 'A' }, { id: 'b', texto: 'B' }],
      alternativaCorretaId: 'c',
      dificuldade: DIFICULDADES.FACIL,
    });
    const erros = invalida.validar();
    assert.ok(erros.some((e) => /gabarito/.test(e)));
    assert.ok(erros.some((e) => /matéria/.test(e)));
    assert.deepEqual(questoes[0].validar(), []);
  });

  test('progresso calcula percentual de acerto a partir do histórico', () => {
    const respostas = [questoes[0].corrigir('u1', 'b'), questoes[1].corrigir('u1', 'a')];
    assert.deepEqual(calcularProgresso(respostas), { total: 2, acertos: 1, percentualAcerto: 50 });
    assert.deepEqual(calcularProgresso([]), { total: 0, acertos: 0, percentualAcerto: 0 });
  });
});

describe('ConversaIA — RF-10', () => {
  test('mantém o contexto da questão e o histórico da conversa', () => {
    const conversa = new ConversaIA({ id: 'c1', usuarioId: 'u1', contexto: { questaoId: 'q1' } });
    conversa.adicionar(AUTORES.USUARIO, 'Não entendi o gabarito');
    conversa.adicionar(AUTORES.IA, 'Vamos por partes...');
    assert.equal(conversa.contexto.questaoId, 'q1');
    assert.deepEqual(conversa.historicoParaEnvio(), [
      { papel: 'user', conteudo: 'Não entendi o gabarito' },
      { papel: 'assistant', conteudo: 'Vamos por partes...' },
    ]);
  });

  test('limita o histórico enviado à IA e rejeita mensagem vazia', () => {
    const conversa = new ConversaIA({ id: 'c1', usuarioId: 'u1' });
    for (let i = 0; i < 15; i += 1) conversa.adicionar(AUTORES.USUARIO, `mensagem ${i}`);
    assert.equal(conversa.historicoParaEnvio(10).length, 10);
    assert.equal(conversa.historicoParaEnvio(10)[0].conteudo, 'mensagem 5');
    assert.throws(() => conversa.adicionar(AUTORES.USUARIO, '   '));
  });
});

describe('Materiais — RF-11, RNF-04, RN-04', () => {
  const pastaDaAna = new Pasta({ id: 'p1', nome: 'Algoritmos', donoId: 'ana' });

  test('aceita PDF dentro do limite na pasta do próprio usuário', () => {
    const r = validarUpload({ tipoMime: 'application/pdf', tamanhoBytes: 1024 }, { usuarioId: 'ana', pastaDestino: pastaDaAna });
    assert.equal(r.valido, true);
  });

  test('aceita exatamente 50 MB e rejeita acima disso (US-10, critério 2)', () => {
    assert.equal(validarUpload({ tipoMime: 'image/png', tamanhoBytes: TAMANHO_MAXIMO_BYTES }, { usuarioId: 'ana' }).valido, true);
    const r = validarUpload({ tipoMime: 'image/png', tamanhoBytes: TAMANHO_MAXIMO_BYTES + 1 }, { usuarioId: 'ana' });
    assert.equal(r.motivo, MOTIVOS_REJEICAO.TAMANHO_EXCEDIDO);
  });

  test('rejeita formato não permitido', () => {
    const r = validarUpload({ tipoMime: 'application/zip', tamanhoBytes: 10 }, { usuarioId: 'ana' });
    assert.equal(r.motivo, MOTIVOS_REJEICAO.FORMATO_NAO_PERMITIDO);
  });

  test('nega upload na pasta de outro usuário (RN-04)', () => {
    const r = validarUpload({ tipoMime: 'text/plain', tamanhoBytes: 10 }, { usuarioId: 'bruno', pastaDestino: pastaDaAna });
    assert.equal(r.motivo, MOTIVOS_REJEICAO.ACESSO_NEGADO);
  });

  test('itens do repositório só são acessíveis pelo dono', () => {
    const arquivo = new Arquivo({ id: 'f1', nome: 'resumo.pdf', donoId: 'ana', tipoMime: 'application/pdf', tamanhoBytes: 100 });
    const anotacao = new Anotacao({ id: 'n1', nome: 'Notas', donoId: 'ana', conteudo: 'texto' });
    assert.equal(arquivo.acessivelPor('ana'), true);
    assert.equal(anotacao.acessivelPor('bruno'), false);
  });

  test('ItemDoRepositorio é abstrata', () => {
    assert.throws(() => new ItemDoRepositorio({ id: 'x', nome: 'x', donoId: 'ana' }), TypeError);
  });
});

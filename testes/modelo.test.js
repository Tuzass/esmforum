const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

test("Testando cadastro de respostas", () => {
    modelo.cadastrar_pergunta("7 + 21 = ?");
    modelo.cadastrar_pergunta("16 * 3 = ?");
    modelo.cadastrar_pergunta("87 / 28 = ?");
    const perguntas = modelo.listar_perguntas();
    modelo.cadastrar_resposta(perguntas[0].id_pergunta, "28");
    modelo.cadastrar_resposta(perguntas[1].id_pergunta, "48");
    modelo.cadastrar_resposta(perguntas[2].id_pergunta, "3");
    expect(modelo.get_num_respostas(perguntas[0].id_pergunta)).toBe(1);
    expect(modelo.get_num_respostas(perguntas[1].id_pergunta)).toBe(1);
    expect(modelo.get_num_respostas(perguntas[2].id_pergunta)).toBe(1);
  });

test("Testando busca de perguntas", () => {
    modelo.cadastrar_pergunta("90 - 37 = ?");
    modelo.cadastrar_pergunta("17 * 2 - 65 = ?");
    const perguntas = modelo.listar_perguntas();
    const p1 = modelo.get_pergunta(perguntas[0].id_pergunta);
    const p2 = modelo.get_pergunta(perguntas[1].id_pergunta);
    expect(p1.texto).toBe("90 - 37 = ?");
    expect(p2.texto).toBe("17 * 2 - 65 = ?");
});

// Dados de exemplo da tela: ainda não há endpoint de acompanhamento na API

export const mockStats = [
  {
    id: 'aproveitamento',
    label: 'Aproveitamento Médio',
    value: '68%',
    variation: '9 p.p.',
    isPositive: true,
    previousValueText: 'Mês anterior: 59%',
  },
  {
    id: 'questoes',
    label: 'Questões Respondidas',
    value: 248,
    variation: '62',
    isPositive: true,
    previousValueText: 'Mês anterior: 186',
  },
  {
    id: 'simulados',
    label: 'Simulados Concluídos',
    value: 6,
    variation: '2',
    isPositive: true,
    previousValueText: 'Mês anterior: 4',
  },
  {
    id: 'acertos',
    label: 'Acertos',
    value: 169,
    variation: '59',
    isPositive: true,
    previousValueText: 'Mês anterior: 110',
  },
]

export const mockEvolucao = {
  comentario: 'Você subiu 24 pontos percentuais desde o primeiro simulado e está acima da média da plataforma (56%).',
  simulados: [
    { data: '02/08', percentual: 48 },
    { data: '08/08', percentual: 52 },
    { data: '12/08', percentual: 55 },
    { data: '18/08', percentual: 61 },
    { data: '21/08', percentual: 64 },
    { data: '28/08', percentual: 72, destaque: true },
  ],
}

export const mockAcertosErros = {
  totalQuestoes: 248,
  porcentagemAcertos: 68,
  acertos: 169,
  erros: 60,
  emBranco: 19,
  comparativo: {
    acertosAnterior: 110,
    errosAnterior: 64,
    emBrancoAnterior: 12,
  },
}
export const mockCategorias = [
  { materia: 'Matemática', percentual: 81, variacao: '▲ 12', tipoVariacao: 'positivo' },
  { materia: 'Biologia', percentual: 74, variacao: '▲ 6', tipoVariacao: 'positivo' },
  { materia: 'Português', percentual: 67, variacao: '▲ 3', tipoVariacao: 'positivo' },
  { materia: 'Química', percentual: 62, variacao: '= 0', tipoVariacao: 'neutro' },
  { materia: 'História', percentual: 58, variacao: '▲ 8', tipoVariacao: 'positivo' },
  { materia: 'Geografia', percentual: 51, variacao: '▼ 4', tipoVariacao: 'negativo' },
  { materia: 'Física', percentual: 44, variacao: '▼ 7', tipoVariacao: 'negativo', alerta: true },
]

export const mockOndeFocar = [
  {
    ordem: 1,
    materia: 'Física · 44%',
    descricao: 'Caiu 7 p.p. e é sua menor nota. 18 questões erradas de eletricidade.',
  },
  {
    ordem: 2,
    materia: 'Geografia · 51%',
    descricao: 'Queda de 4 p.p. concentrada em geografia agrária.',
  },
  {
    ordem: 3,
    materia: 'Questões em branco',
    descricao: 'Subiram de 12 para 19 — vale treinar com tempo cronometrado.',
  },
]

export const mockConstancia = {
  semanas: [3, 4, 5, 6], // intensidade de estudo por semana para controle de cor/preenchimento
  diasEstudados: 18,
}

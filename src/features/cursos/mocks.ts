import type { Curso, CursosPorArea, DetalhesCurso } from './types'

// Dados mockados — remover quando a API estiver disponível.

export const cursosRecomendadosMock: Curso[] = [
  {
    id: 'c-biomedicina-uem',
    nome: 'Biomedicina',
    area: 'Saúde',
    graus: ['bacharelado'],
    modalidades: ['presencial'],
    duracaoSemestresMin: 10,
    duracaoSemestresMax: 10,
    imagemUrl: null,
    notaCorteSisu: 712.4,
    totalUniversidades: 1,
  },
  {
    id: 'c-medicina-unicesumar',
    nome: 'Medicina',
    area: 'Saúde',
    graus: ['bacharelado'],
    modalidades: ['presencial'],
    duracaoSemestresMin: 12,
    duracaoSemestresMax: 12,
    imagemUrl: null,
    totalUniversidades: 1,
    notaCorteSisu: 798.1,
  },
  {
    id: 'c-enfermagem-uniasselvi',
    nome: 'Enfermagem',
    area: 'Saúde',
    graus: ['bacharelado'],
    modalidades: ['semipresencial'],
    duracaoSemestresMin: 10,
    duracaoSemestresMax: 10,
    imagemUrl: null,
    totalUniversidades: 1,
    notaCorteSisu: null,
  },
  
]

export const cursosListagemMock: Curso[] = [
  {
    id: 'c-biomedicina-uem',
    nome: 'Biomedicina',
    area: 'Saúde',
    graus: ['bacharelado'],
    modalidades: ['presencial'],
    duracaoSemestresMin: 10,
    duracaoSemestresMax: 10,
    imagemUrl: null,
    notaCorteSisu: 712.4,
    totalUniversidades: 14,
    
  },
  {
    id: 'c-enfermagem-uem',
    nome: 'Enfermagem',
    area: 'Saúde',
    graus: ['bacharelado'],
    modalidades: ['presencial'],
    duracaoSemestresMin: 10,
    duracaoSemestresMax: 10,
    imagemUrl: null,
    notaCorteSisu: 640.0,
    totalUniversidades: 11,
  },
  {
    id: 'c-fisioterapia-uem',
    nome: 'Fisioterapia',
    area: 'Saúde',
    graus: ['bacharelado'],
    modalidades: ['presencial'],
    duracaoSemestresMin: 8,
    duracaoSemestresMax: 8,
    imagemUrl: null,
    notaCorteSisu: 681.9,
    totalUniversidades: 8,
  },
  {
    id: 'c-nutricao-uem',
    nome: 'Nutrição',
    area: 'Saúde',
    graus: ['bacharelado'],
    modalidades: ['presencial'],
    duracaoSemestresMin: 8,
    duracaoSemestresMax: 8,
    imagemUrl: null,
    notaCorteSisu: 598.3,
    totalUniversidades: 12,
  },
  {
    id: 'c-odontologia-uem',
    nome: 'Odontologia',
    area: 'Saúde',
    graus: ['bacharelado'],
    modalidades: ['presencial'],
    duracaoSemestresMin: 10,
    duracaoSemestresMax: 10,
    imagemUrl: null,
    notaCorteSisu: 726.8,
    totalUniversidades: 6,
  },
  {
    id: 'c-psicologia-uem',
    nome: 'Psicologia',
    area: 'Saúde',
    graus: ['bacharelado'],
    modalidades: ['presencial'],
    duracaoSemestresMin: 10,
    duracaoSemestresMax: 10,
    imagemUrl: null,
    notaCorteSisu: 744.2,
    totalUniversidades: 10,
  },
]


export const totalCursosMock = 1842

function curso(dados: Omit<Curso, 'imagemUrl' | 'totalUniversidades'>): Curso {
  return { ...dados, imagemUrl: null, totalUniversidades: 1 }
}

export const cursosPorAreaMock: Record<string, CursosPorArea> = {
  Tecnologia: {
    total: 196,
    cursos: [
      curso({
        id: 'c-ciencia-computacao-uem',
        nome: 'Ciência da Computação',
        area: 'Tecnologia',
        graus: ['bacharelado'],
        modalidades: ['presencial'],
        duracaoSemestresMin: 8,
        duracaoSemestresMax: 8,
        notaCorteSisu: 708.6,
      }),
      curso({
        id: 'c-engenharia-software-utfpr',
        nome: 'Engenharia de Software',
        area: 'Tecnologia',
        graus: ['bacharelado'],
        modalidades: ['presencial'],
        duracaoSemestresMin: 10,
        duracaoSemestresMax: 10,
        notaCorteSisu: 721.3,
      }),
      curso({
        id: 'c-ads-utfpr',
        nome: 'Análise e Desenvolvimento de Sistemas',
        area: 'Tecnologia',
        graus: ['tecnologo'],
        modalidades: ['semipresencial'],
        duracaoSemestresMin: 5,
        duracaoSemestresMax: 5,
        notaCorteSisu: 612.4,
      }),
    ],
  },
  Saúde: {
    total: 212,
    cursos: cursosRecomendadosMock,
  },
  Educação: {
    total: 148,
    cursos: [
      curso({
        id: 'c-pedagogia-uem',
        nome: 'Pedagogia',
        area: 'Educação',
        graus: ['licenciatura'],
        modalidades: ['presencial'],
        duracaoSemestresMin: 8,
        duracaoSemestresMax: 8,
        notaCorteSisu: 640.2,
      }),
      curso({
        id: 'c-letras-uniasselvi',
        nome: 'Letras — Português',
        area: 'Educação',
        graus: ['licenciatura'],
        modalidades: ['ead'],
        duracaoSemestresMin: 8,
        duracaoSemestresMax: 8,
        notaCorteSisu: null,
      }),
      curso({
        id: 'c-matematica-utfpr',
        nome: 'Matemática',
        area: 'Educação',
        graus: ['licenciatura'],
        modalidades: ['presencial'],
        duracaoSemestresMin: 8,
        duracaoSemestresMax: 8,
        notaCorteSisu: 655.0,
      }),
    ],
  },
}


export const detalhesCursoMock: Record<string, DetalhesCurso> = {
  'c-biomedicina-uem': {
    descricao:
      'O curso de Biomedicina estuda os processos biológicos e as alterações que podem ocorrer no organismo humano. A formação combina conhecimentos teóricos e práticos para investigar doenças e contribuir para o diagnóstico laboratorial.',
    areasAtuacao: [
      'Análises clínicas',
      'Pesquisa científica',
      'Diagnóstico por imagem',
      'Biologia molecular',
    ],
  },
  'c-medicina-unicesumar': {
    descricao:
      'O curso de Medicina prepara profissionais para atuar na promoção da saúde, prevenção de doenças, diagnóstico e tratamento, com formação científica e prática voltada ao cuidado das pessoas.',
    areasAtuacao: [
      'Atenção primária à saúde',
      'Hospitais e clínicas',
      'Urgência e emergência',
      'Pesquisa médica',
    ],
  },
  'c-enfermagem-uem': {
    descricao:
      'O curso de Enfermagem prepara profissionais para prestar cuidados de saúde, acompanhar pacientes e participar de ações de prevenção, recuperação e promoção da saúde.',
    areasAtuacao: [
      'Hospitais e clínicas',
      'Saúde pública',
      'Atendimento domiciliar',
      'Gestão em saúde',
    ],
  },
  'c-enfermagem-uniasselvi': {
    descricao:
      'O curso de Enfermagem prepara profissionais para prestar cuidados de saúde, acompanhar pacientes e participar de ações de prevenção, recuperação e promoção da saúde.',
    areasAtuacao: [
      'Hospitais e clínicas',
      'Saúde pública',
      'Atendimento domiciliar',
      'Gestão em saúde',
    ],
  },
  'c-fisioterapia-uem': {
    descricao:
      'O curso de Fisioterapia estuda o movimento humano e os recursos utilizados na prevenção e recuperação de limitações funcionais, buscando melhorar a mobilidade e a qualidade de vida.',
    areasAtuacao: [
      'Fisioterapia ortopédica',
      'Reabilitação esportiva',
      'Fisioterapia respiratória',
      'Saúde do idoso',
    ],
  },
  'c-nutricao-uem': {
    descricao:
      'O curso de Nutrição aborda a relação entre alimentação, nutrientes e saúde, preparando profissionais para orientar hábitos alimentares e planejar intervenções nutricionais.',
    areasAtuacao: [
      'Nutrição clínica',
      'Alimentação coletiva',
      'Saúde pública',
      'Nutrição esportiva',
    ],
  },
  'c-odontologia-uem': {
    descricao:
      'O curso de Odontologia prepara profissionais para prevenir, diagnosticar e tratar condições relacionadas à saúde bucal, incluindo dentes, gengivas e estruturas da boca.',
    areasAtuacao: [
      'Clínica odontológica',
      'Saúde pública',
      'Odontopediatria',
      'Diagnóstico bucal',
    ],
  },
  'c-psicologia-uem': {
    descricao:
      'O curso de Psicologia estuda o comportamento humano e os processos mentais, preparando profissionais para atuar em diferentes contextos de promoção da saúde e bem-estar psicológico.',
    areasAtuacao: [
      'Psicologia clínica',
      'Psicologia organizacional',
      'Psicologia escolar',
      'Políticas públicas',
    ],
  },
}

export const vagasAnoRegiaoMock: Record<string, number> = {
  'c-biomedicina-uem': 1240,
}

export const notaAlunoMock = 698
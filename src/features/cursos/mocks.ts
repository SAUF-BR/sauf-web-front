import { universidadesMock } from '../universidades/mocks'
import type { UniversidadeResumo } from '../universidades/types'
import type { Curso, CursosPorArea, DetalhesCurso } from './types'

// Dados mockados — remover quando a API estiver disponível.

function resumoUniversidade(id: string): UniversidadeResumo {
  const universidade = universidadesMock.find((u) => u.id === id)

  if (!universidade) {
    throw new Error(`Universidade mockada não encontrada: ${id}`)
  }

  const { nome, sigla, tipo } = universidade
  return { id, nome, sigla, tipo }
}

export const cursosRecomendadosMock: Curso[] = [
  {
    id: 'c-biomedicina-uem',
    nome: 'Biomedicina',
    area: 'Saúde',
    grau: 'bacharelado',
    modalidade: 'presencial',
    duracaoSemestres: 10,
    imagemUrl: null,
    universidade: resumoUniversidade('u-uem'),
    notaCorteSisu: 712.4,
    mensalidadeMinima: null,
  },
  {
    id: 'c-medicina-unicesumar',
    nome: 'Medicina',
    area: 'Saúde',
    grau: 'bacharelado',
    modalidade: 'presencial',
    duracaoSemestres: 12,
    imagemUrl: null,
    universidade: resumoUniversidade('u-unicesumar'),
    notaCorteSisu: 798.1,
    mensalidadeMinima: null,
  },
  {
    id: 'c-enfermagem-uniasselvi',
    nome: 'Enfermagem',
    area: 'Saúde',
    grau: 'bacharelado',
    modalidade: 'semipresencial',
    duracaoSemestres: 10,
    imagemUrl: null,
    universidade: resumoUniversidade('u-uniasselvi'),
    notaCorteSisu: null,
    mensalidadeMinima: 489,
  },
  
]

export const cursosListagemMock: Curso[] = [
  {
    id: 'c-biomedicina-uem',
    nome: 'Biomedicina',
    area: 'Saúde',
    grau: 'bacharelado',
    modalidade: 'presencial',
    duracaoSemestres: 10,
    imagemUrl: null,
    universidade: resumoUniversidade('u-uem'),
    notaCorteSisu: 712.4,
    mensalidadeMinima: null,
    totalOfertas: 14,
    
  },
  {
    id: 'c-enfermagem-uem',
    nome: 'Enfermagem',
    area: 'Saúde',
    grau: 'bacharelado',
    modalidade: 'presencial',
    duracaoSemestres: 10,
    imagemUrl: null,
    universidade: resumoUniversidade('u-uem'),
    notaCorteSisu: 640.0,
    mensalidadeMinima: null,
    totalOfertas: 11,
  },
  {
    id: 'c-fisioterapia-uem',
    nome: 'Fisioterapia',
    area: 'Saúde',
    grau: 'bacharelado',
    modalidade: 'presencial',
    duracaoSemestres: 8,
    imagemUrl: null,
    universidade: resumoUniversidade('u-uem'),
    notaCorteSisu: 681.9,
    mensalidadeMinima: null,
    totalOfertas: 8,
  },
  {
    id: 'c-nutricao-uem',
    nome: 'Nutrição',
    area: 'Saúde',
    grau: 'bacharelado',
    modalidade: 'presencial',
    duracaoSemestres: 8,
    imagemUrl: null,
    universidade: resumoUniversidade('u-uem'),
    notaCorteSisu: 598.3,
    mensalidadeMinima: null,
    totalOfertas: 12,
  },
  {
    id: 'c-odontologia-uem',
    nome: 'Odontologia',
    area: 'Saúde',
    grau: 'bacharelado',
    modalidade: 'presencial',
    duracaoSemestres: 10,
    imagemUrl: null,
    universidade: resumoUniversidade('u-uem'),
    notaCorteSisu: 726.8,
    mensalidadeMinima: null,
    totalOfertas: 6,
  },
  {
    id: 'c-psicologia-uem',
    nome: 'Psicologia',
    area: 'Saúde',
    grau: 'bacharelado',
    modalidade: 'presencial',
    duracaoSemestres: 10,
    imagemUrl: null,
    universidade: resumoUniversidade('u-uem'),
    notaCorteSisu: 744.2,
    mensalidadeMinima: null,
    totalOfertas: 10,
  },
]


export const totalCursosMock = 1842

function curso(dados: Omit<Curso, 'imagemUrl' | 'universidade'> & { universidadeId: string }): Curso {
  const { universidadeId, ...resto } = dados
  return { ...resto, imagemUrl: null, universidade: resumoUniversidade(universidadeId) }
}

export const cursosPorAreaMock: Record<string, CursosPorArea> = {
  Tecnologia: {
    total: 196,
    cursos: [
      curso({
        id: 'c-ciencia-computacao-uem',
        nome: 'Ciência da Computação',
        area: 'Tecnologia',
        grau: 'bacharelado',
        modalidade: 'presencial',
        duracaoSemestres: 8,
        universidadeId: 'u-uem',
        notaCorteSisu: 708.6,
        mensalidadeMinima: null,
      }),
      curso({
        id: 'c-engenharia-software-utfpr',
        nome: 'Engenharia de Software',
        area: 'Tecnologia',
        grau: 'bacharelado',
        modalidade: 'presencial',
        duracaoSemestres: 10,
        universidadeId: 'u-utfpr',
        notaCorteSisu: 721.3,
        mensalidadeMinima: null,
      }),
      curso({
        id: 'c-ads-utfpr',
        nome: 'Análise e Desenvolvimento de Sistemas',
        area: 'Tecnologia',
        grau: 'tecnologo',
        modalidade: 'semipresencial',
        duracaoSemestres: 5,
        universidadeId: 'u-utfpr',
        notaCorteSisu: 612.4,
        mensalidadeMinima: null,
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
        grau: 'licenciatura',
        modalidade: 'presencial',
        duracaoSemestres: 8,
        universidadeId: 'u-uem',
        notaCorteSisu: 640.2,
        mensalidadeMinima: null,
      }),
      curso({
        id: 'c-letras-uniasselvi',
        nome: 'Letras — Português',
        area: 'Educação',
        grau: 'licenciatura',
        modalidade: 'ead',
        duracaoSemestres: 8,
        universidadeId: 'u-uniasselvi',
        notaCorteSisu: null,
        mensalidadeMinima: 249,
      }),
      curso({
        id: 'c-matematica-utfpr',
        nome: 'Matemática',
        area: 'Educação',
        grau: 'licenciatura',
        modalidade: 'presencial',
        duracaoSemestres: 8,
        universidadeId: 'u-utfpr',
        notaCorteSisu: 655.0,
        mensalidadeMinima: null,
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
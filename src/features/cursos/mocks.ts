import { universidadesMock } from '../universidades/mocks'
import type { UniversidadeResumo } from '../universidades/types'
import type { Curso } from './types'

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
  },
]

export const universidadesPorCursoMock: Record<string, number> = {
  'c-biomedicina-uem': 14,
  'c-enfermagem-uem': 11,
  'c-fisioterapia-uem': 8,
  'c-nutricao-uem': 12,
  'c-odontologia-uem': 6,
  'c-psicologia-uem': 10,
}

export const totalCursosMock = 1842


export interface DetalhesCursoMock {
  descricao: string
  areasAtuacao: string[]
}

export const detalhesCursoMock: Record<string, DetalhesCursoMock> = {
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
export type GrauAcademico = 'bacharelado' | 'licenciatura' | 'tecnologo'
export type Modalidade = 'presencial' | 'semipresencial' | 'ead'

export interface DetalhesCurso {
  descricao: string
  areasAtuacao: string[]
}

export interface Curso {
  id: string
  nome: string
  area: string
  graus: GrauAcademico[]
  modalidades: Modalidade[]
  duracaoSemestresMin: number | null
  duracaoSemestresMax: number | null
  imagemUrl: string | null
  notaCorteSisu: number | null
  totalUniversidades: number
  detalhes?: DetalhesCurso
}

export interface CursosPorArea {
  cursos: Curso[]
  total: number
}
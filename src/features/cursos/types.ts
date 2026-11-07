import type { UniversidadeResumo } from '../universidades/types'

// Tipos provisórios — alinhar com o DER/Diagrama de Classe quando o contrato
// com a API estiver definido.

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
  grau: GrauAcademico
  modalidade: Modalidade
  duracaoSemestres: number
  imagemUrl: string | null
  universidade: UniversidadeResumo
  notaCorteSisu: number | null
  mensalidadeMinima: number | null

  // Dados complementares do curso
  totalOfertas?: number
  detalhes?: DetalhesCurso
}

export interface CursosPorArea {
  cursos: Curso[]
  total: number
}
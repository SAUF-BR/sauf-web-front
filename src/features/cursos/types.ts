import type { UniversidadeResumo } from '../universidades/types'

// Tipos provisórios — alinhar com o DER/Diagrama de Classe quando o contrato
// com a API estiver definido.

export type GrauAcademico = 'bacharelado' | 'licenciatura' | 'tecnologo'

export type Modalidade = 'presencial' | 'semipresencial' | 'ead'

export interface Curso {
  id: string
  nome: string
  area: string
  grau: GrauAcademico
  modalidade: Modalidade
  duracaoSemestres: number
  imagemUrl: string | null
  universidade: UniversidadeResumo
  /** Presente em cursos de universidades que usam o SISU. */
  notaCorteSisu: number | null
  /** Presente em cursos pagos (universidades privadas). */
  mensalidadeMinima: number | null
}

export interface CursosPorArea {
  cursos: Curso[]
  total: number
}

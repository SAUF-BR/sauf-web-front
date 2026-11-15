import type { Modalidade } from '../cursos/types'
import type { Universidade } from '../universidades/types'

// GET /favoritos/universidades
export interface UniversidadeFavoritaApi extends Universidade {
  notaMec: number | null
  modalidades: Modalidade[]
  totalCampi: number
}
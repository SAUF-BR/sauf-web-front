import type { Modalidade } from '../cursos/types'
import type { NotaMec, Universidade } from '../universidades/types'

// GET /favoritos/universidades
export interface UniversidadeFavoritaApi extends Universidade {
  notaMec: NotaMec | null
  modalidades: Modalidade[]
  totalCampi: number
}
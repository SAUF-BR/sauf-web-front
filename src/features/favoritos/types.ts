import type { UF } from '../../lib/utils'
import type { Modalidade } from '../cursos/types'
import type { NotaMec, Universidade, UniversidadeResumo } from '../universidades/types'

// GET /favoritos/universidades
export interface UniversidadeFavoritaApi extends Universidade {
  notaMec: NotaMec | null
  modalidades: Modalidade[]
  totalCampi: number
}

// GET /favoritos/cursos
export type GrauOferta = 'bacharelado' | 'licenciatura' | 'tecnologo' | 'bacharelado_e_licenciatura'

export interface CursoFavoritoApi {
  id: string
  curso: { id: string; nome: string }
  universidade: UniversidadeResumo
  opcoes: { grau: GrauOferta; turno: string | null }[]
  modalidade: Modalidade
  duracaoSemestres: number | null
  duracaoTexto: string | null
  cidade: string
  uf: UF
  vagas: number | null
  gratuito: boolean | null
  notaCorteSisu: number | null
  mensalidade: number | null
}
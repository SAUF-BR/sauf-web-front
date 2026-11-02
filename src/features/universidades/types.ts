import type { UF } from '../../lib/utils'
import type { Modalidade } from '../cursos/types'

export type TipoUniversidade = 'publica' | 'privada'

export interface Universidade {
  id: string
  nome: string
  sigla: string | null
  tipo: TipoUniversidade
  cidade: string
  uf: UF
  logoUrl: string | null
  totalCursos: number
}

export type UniversidadeResumo = Pick<Universidade, 'id' | 'nome' | 'sigla' | 'tipo'>

export type FaixaNotaMec = '4-5' | '3'

export interface UniversidadeListagemApi extends Universidade {
  notaMec: number | null
  modalidades: Modalidade[]
}

export interface FiltrosUniversidadesApi {
  busca?: string
  uf?: UF
  cidade?: string
  tipos?: TipoUniversidade[]
  modalidades?: Modalidade[]
  notaMec?: FaixaNotaMec
}

export interface ContagensUniversidades {
  tipo: Record<TipoUniversidade, number>
  modalidade: Record<Modalidade, number>
}
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

export type NotaMec = 1 | 2 | 3 | 4 | 5

export type FaixaNotaMec = '4-5' | '3'

export interface UniversidadeListagemApi extends Universidade {
  notaMec: NotaMec | null
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

export type EsferaAdministrativa = 'federal' | 'estadual' | 'municipal'

export interface EnderecoSede {
  logradouro: string | null
  numero: string | null
  complemento: string | null
  bairro: string | null
  cep: string | null
  cidade: string
  uf: UF
}

export interface ModalidadeOfertada {
  modalidade: Modalidade
  disponivel: boolean
  totalCursos: number
  descricao: string | null
}

export interface AreaCursos {
  area: string
  totalCursos: number
}

export interface FormaIngresso {
  nome: string
  aceita: boolean
}

export interface ProximoPrazo {
  titulo: string
  data: string
  editalUrl: string | null
}

export interface UniversidadeDetalhe extends Universidade {
  esfera: EsferaAdministrativa | null
  enderecoSede: EnderecoSede
  siteUrl: string | null
  capaUrl: string | null
  anoFundacao: number | null
  notaMec: NotaMec | null
  gratuita: boolean
  vagasPorAno: number | null
  sobre: string[]
  modalidades: ModalidadeOfertada[]
  cursosPorArea: AreaCursos[]
  formasIngresso: FormaIngresso[]
  notaFormasIngresso: string | null
  proximoPrazo: ProximoPrazo | null
}
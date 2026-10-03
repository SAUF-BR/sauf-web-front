import type { Modalidade } from '../../features/cursos'
import type { TipoUniversidade } from '../../features/universidades'
import { ESTADOS_BR, type UF } from '../../lib/utils'

// Opções, textos e valores iniciais dos filtros da listagem de universidades

export type FiltroNotaMec = 'todas' | '4-5' | '3'

export type Filtros = {
  estado: UF | ''
  cidade: string
  categorias: TipoUniversidade[]
  notaMec: FiltroNotaMec
  modalidades: Modalidade[]
}

export type Opcao<T extends string> = { valor: T; rotulo: string }

export const Opcoes_categoria: Opcao<TipoUniversidade>[] = [
  { valor: 'publica', rotulo: 'Pública' },
  { valor: 'privada', rotulo: 'Privada' },
]

export const Opcoes_nota_mec: Opcao<FiltroNotaMec>[] = [
  { valor: '4-5', rotulo: '4 ou 5' },
  { valor: '3', rotulo: '3' },
  { valor: 'todas', rotulo: 'Todas' },
]

export const Opcoes_modalidade: Opcao<Modalidade>[] = [
  { valor: 'presencial', rotulo: 'Presencial' },
  { valor: 'semipresencial', rotulo: 'Semipresencial' },
  { valor: 'ead', rotulo: 'A distância (EaD)' },
]

export const Opcoes_estado: Opcao<UF>[] = Object.entries(ESTADOS_BR).map(([valor, rotulo]) => ({
  valor: valor as UF,
  rotulo,
}))

export const Rotulo_chip_nota_mec: Record<FiltroNotaMec, string | null> = {
  '4-5': 'Nota MEC 4+',
  '3': 'Nota MEC 3',
  todas: null,
}

export const Filtros_vazios: Filtros = {
  estado: '',
  cidade: '',
  categorias: [],
  notaMec: 'todas',
  modalidades: [],
}

const Estados_com_na: UF[] = ['BA', 'PB']
const Estados_com_em: UF[] = ['AL', 'GO', 'MG', 'PE', 'RO', 'RR', 'SC', 'SE', 'SP']

export function formatarLocalEstado(uf: UF) {
  const preposicao = Estados_com_na.includes(uf) ? 'na' : Estados_com_em.includes(uf) ? 'em' : 'no'
  return `${preposicao} ${ESTADOS_BR[uf]}`
}
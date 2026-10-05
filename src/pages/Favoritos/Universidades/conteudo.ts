import { ROTULO_MODALIDADE, type Modalidade } from '../../../features/cursos'
import {
  universidadesListagemMock,
  type UniversidadeListagem,
} from '../../../features/universidades/mockUniversidades'
import {
  compararPrazo,
  daquiA,
  type Comparador,
  type Opcao,
  type StatusFavorito,
} from '../conteudo'

export interface UniversidadeFavorita extends UniversidadeListagem {
  totalCampi: number
  distanciaKm: number
  status: StatusFavorito | null
}

export type OrdenacaoUniversidades = 'notaMec' | 'cursos' | 'distancia' | 'nome' | 'prazo'

export const Opcoes_ordenacao_universidades: Opcao<OrdenacaoUniversidades>[] = [
  { valor: 'distancia', rotulo: 'Mais próximas' },
  { valor: 'cursos', rotulo: 'Nº de cursos' },
  { valor: 'nome', rotulo: 'Nome (A–Z)' },
  { valor: 'notaMec', rotulo: 'Nota MEC' },
  { valor: 'prazo', rotulo: 'Prazo mais próximo' },
]

export const Ordenacao_padrao_universidades: OrdenacaoUniversidades = 'notaMec'

export const Comparadores_universidades: Record<
  OrdenacaoUniversidades,
  Comparador<UniversidadeFavorita>
> = {
  notaMec: (a, b) => b.notaMec - a.notaMec,
  cursos: (a, b) => b.totalCursos - a.totalCursos,
  distancia: (a, b) => a.distanciaKm - b.distanciaKm,
  nome: () => 0,
  prazo: compararPrazo,
}

export const Raio_proximidade_km = 30

export function formatarModalidades(modalidades: Modalidade[]) {
  const rotulos = modalidades.map((modalidade) =>
    modalidade === 'ead'
      ? ROTULO_MODALIDADE[modalidade]
      : ROTULO_MODALIDADE[modalidade].toLowerCase(),
  )

  if (rotulos.length <= 1) return rotulos.join('')

  return `${rotulos.slice(0, -1).join(', ')} e ${rotulos[rotulos.length - 1]}`
}

export function formatarCampi(total: number) {
  return `${total} ${total === 1 ? 'campus' : 'campi'}`
}

export function formatarInsightProximidade(perto: number, total: number) {
  const raio = `a menos de ${Raio_proximidade_km} km de você`

  if (perto === 0) return `Nenhuma fica ${raio}`
  if (total === 1) return `Fica ${raio}`
  if (perto === total) return `Todas as ${total} ficam ${raio}`

  return `${perto} das ${total} ${perto === 1 ? 'fica' : 'ficam'} ${raio}`
}

//Dados mockados 

const Extras_favoritos_mock: Record<
  string,
  Omit<UniversidadeFavorita, keyof UniversidadeListagem>
> = {
  'u-uem': {
    totalCampi: 4,
    distanciaKm: 3,
    status: { tipo: 'prazo', processo: 'Vestibular próprio', encerraEm: daquiA(7) },
  },
  'u-unicesumar': {
    totalCampi: 6,
    distanciaKm: 6,
    status: { tipo: 'info', texto: 'Aceita PROUni e FIES' },
  },
  'u-utfpr': {
    totalCampi: 13,
    distanciaKm: 112,
    status: null,
  },
}

export const universidadesFavoritasMock: UniversidadeFavorita[] = universidadesListagemMock
  .filter((universidade) => universidade.id in Extras_favoritos_mock)
  .map((universidade) => ({ ...universidade, ...Extras_favoritos_mock[universidade.id] }))

export const universidadesSelecionadasIniciaisMock = ['u-uem', 'u-unicesumar']
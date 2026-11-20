import { ROTULO_MODALIDADE, type Modalidade } from '../../../features/cursos'
import type { UniversidadeFavoritaApi } from '../../../features/favoritos'
import { ORDEM_MODALIDADES } from '../../../features/universidades'
import { compararComNulos, type Comparador, type Opcao } from '../conteudo'

export type UniversidadeFavorita = UniversidadeFavoritaApi

export type OrdenacaoUniversidades = 'notaMec' | 'cursos' | 'nome'

export const Opcoes_ordenacao_universidades: Opcao<OrdenacaoUniversidades>[] = [
  { valor: 'notaMec', rotulo: 'Nota MEC' },
  { valor: 'cursos', rotulo: 'Nº de cursos' },
  { valor: 'nome', rotulo: 'Nome (A–Z)' },
]

export const Ordenacao_padrao_universidades: OrdenacaoUniversidades = 'notaMec'

export const Comparadores_universidades: Record<
  OrdenacaoUniversidades,
  Comparador<UniversidadeFavorita>
> = {
  // Sem nota MEC vai para o fim da lista
  notaMec: (a, b) => compararComNulos(a.notaMec, b.notaMec, (x, y) => y - x),
  cursos: (a, b) => b.totalCursos - a.totalCursos,
  nome: () => 0,
}

export function formatarModalidades(modalidades: Modalidade[]) {
  const rotulos = ORDEM_MODALIDADES.filter((modalidade) => modalidades.includes(modalidade)).map(
    (modalidade) =>
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
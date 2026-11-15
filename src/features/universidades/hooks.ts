import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { ErroApi } from '../../lib/api/erros'
import {
  getCidadesComUniversidade,
  getContagensUniversidades,
  getUniversidadeDetalhe,
  getUniversidades,
  getUniversidadesEmDestaque,
  limparFiltros,
} from './api'
import type { FiltrosUniversidadesApi } from './types'

export const universidadesKeys = {
  all: ['universidades'] as const,
  destaques: () => [...universidadesKeys.all, 'destaques'] as const,
  lista: (filtros: FiltrosUniversidadesApi) => [...universidadesKeys.all, 'lista', filtros] as const,
  contagens: (filtros: FiltrosUniversidadesApi) =>
    [...universidadesKeys.all, 'contagens', filtros] as const,
  cidades: (uf: string) => [...universidadesKeys.all, 'cidades', uf] as const,
  detalhe: (id: string) => [...universidadesKeys.all, 'detalhe', id] as const,
}

export function ehUniversidadeNaoEncontrada(erro: unknown) {
  return erro instanceof ErroApi && (erro.status === 400 || erro.status === 404)
}

export function useUniversidadesEmDestaque() {
  return useQuery({
    queryKey: universidadesKeys.destaques(),
    queryFn: getUniversidadesEmDestaque,
  })
}

export function useUniversidades(filtros: FiltrosUniversidadesApi) {
  const limpos = limparFiltros(filtros)

  return useInfiniteQuery({
    queryKey: universidadesKeys.lista(limpos),
    queryFn: ({ pageParam }) => getUniversidades(limpos, pageParam),
    initialPageParam: 0,
    getNextPageParam: (ultima) => (ultima.page + 1 < ultima.totalPages ? ultima.page + 1 : undefined),
    placeholderData: keepPreviousData,
  })
}

export function useContagensUniversidades(filtros: FiltrosUniversidadesApi) {
  const limpos = limparFiltros(filtros)

  return useQuery({
    queryKey: universidadesKeys.contagens(limpos),
    queryFn: () => getContagensUniversidades(limpos),
    placeholderData: keepPreviousData,
  })
}

export function useCidadesComUniversidade(uf: string) {
  return useQuery({
    queryKey: universidadesKeys.cidades(uf),
    queryFn: () => getCidadesComUniversidade(uf),
    enabled: uf !== '',
    staleTime: 5 * 60 * 1000,
  })
}

export function useUniversidade(id: string) {
  return useQuery({
    queryKey: universidadesKeys.detalhe(id),
    queryFn: () => getUniversidadeDetalhe(id),
    enabled: id !== '',
  })
}
import { apiClient } from '../../lib/api/client'
import { endpoints } from '../../lib/api/endpoints'
import { simularRequisicao } from '../../lib/api/mock'
import type { Paginado } from '../../types'
import { universidadesDestaqueMock } from './mocks'
import type {
  ContagensUniversidades,
  FiltrosUniversidadesApi,
  Universidade,
  UniversidadeListagemApi,
} from './types'

export const Tamanho_pagina_universidades = 12

export async function getUniversidadesEmDestaque(): Promise<Paginado<Universidade>> {
  // TODO: trocar pelo endpoint real quando o contrato com a API estiver definido
  // const { data } = await apiClient.get<Paginado<Universidade>>(endpoints.universidades.destaques)
  // return data
  return simularRequisicao(universidadesDestaqueMock)
}

function paramsDosFiltros(filtros: FiltrosUniversidadesApi) {
  const params: Record<string, string> = {}

  if (filtros.busca?.trim()) params.busca = filtros.busca.trim()
  if (filtros.uf) params.uf = filtros.uf
  if (filtros.cidade) params.cidade = filtros.cidade
  if (filtros.tipos?.length) params.tipo = filtros.tipos.join(',')
  if (filtros.modalidades?.length) params.modalidade = filtros.modalidades.join(',')
  if (filtros.notaMec) params.notaMec = filtros.notaMec

  return params
}

export async function getUniversidades(
  filtros: FiltrosUniversidadesApi,
  pagina = 0,
): Promise<Paginado<UniversidadeListagemApi>> {
  const { data } = await apiClient.get<Paginado<UniversidadeListagemApi>>(
    endpoints.universidades.list,
    { params: { ...paramsDosFiltros(filtros), page: pagina, size: Tamanho_pagina_universidades } },
  )
  return data
}

export async function getContagensUniversidades(
  filtros: FiltrosUniversidadesApi,
): Promise<ContagensUniversidades> {
  const { data } = await apiClient.get<ContagensUniversidades>(endpoints.universidades.contagens, {
    params: paramsDosFiltros(filtros),
  })
  return data
}

export async function getCidadesComUniversidade(uf: string): Promise<string[]> {
  const { data } = await apiClient.get<string[]>(endpoints.universidades.cidades, {
    params: { uf },
  })
  return data
}
import { apiClient } from '../../lib/api/client'
import { endpoints } from '../../lib/api/endpoints'
import { simularRequisicao } from '../../lib/api/mock'
import type { Paginado } from '../../types'
import { universidadesDestaqueMock } from './mocks'
import type {
  ContagensUniversidades,
  FiltrosUniversidadesApi,
  Universidade,
  UniversidadeDetalhe,
  UniversidadeListagemApi,
} from './types'

export const Tamanho_pagina_universidades = 12

export async function getUniversidadesEmDestaque(): Promise<Paginado<Universidade>> {
  // TODO: trocar pelo endpoint real quando o contrato com a API estiver definido
  // const { data } = await apiClient.get<Paginado<Universidade>>(endpoints.universidades.destaques)
  // return data
  return simularRequisicao(universidadesDestaqueMock)
}

// Tira os campos vazios. Assim, filtros equivalentes viram a mesma chave de cache
export function limparFiltros(filtros: FiltrosUniversidadesApi): FiltrosUniversidadesApi {
  const limpos: FiltrosUniversidadesApi = {}
  const busca = filtros.busca?.trim()

  if (busca) limpos.busca = busca
  if (filtros.uf) limpos.uf = filtros.uf
  if (filtros.cidade) limpos.cidade = filtros.cidade
  if (filtros.tipos?.length) limpos.tipos = filtros.tipos
  if (filtros.modalidades?.length) limpos.modalidades = filtros.modalidades
  if (filtros.notaMec) limpos.notaMec = filtros.notaMec

  return limpos
}
function paramsDosFiltros(filtros: FiltrosUniversidadesApi) {
  const { tipos, modalidades, ...demais } = limparFiltros(filtros)

  return {
    ...demais,
    ...(tipos && { tipo: tipos.join(',') }),
    ...(modalidades && { modalidade: modalidades.join(',') }),
  }
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

export async function getUniversidadeDetalhe(id: string): Promise<UniversidadeDetalhe> {
  const { data } = await apiClient.get<UniversidadeDetalhe>(endpoints.universidades.detalhe(id))
  return data
}
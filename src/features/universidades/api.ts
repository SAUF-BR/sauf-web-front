import { simularRequisicao } from '../../lib/api/mock'
import type { Paginado } from '../../types'
import { universidadesDestaqueMock } from './mocks'
import type { Universidade } from './types'

export async function getUniversidadesEmDestaque(): Promise<Paginado<Universidade>> {
  // TODO: trocar pelo endpoint real quando o contrato com a API estiver definido
  // const { data } = await apiClient.get<Paginado<Universidade>>(endpoints.universidades.destaques)
  // return data
  return simularRequisicao(universidadesDestaqueMock)
}

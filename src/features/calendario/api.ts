import { simularRequisicao } from '../../lib/api/mock'
import { proximosPrazosMock } from './mocks'
import type { Prazo } from './types'

export async function getProximosPrazos(): Promise<Prazo[]> {
  // TODO: trocar pelo endpoint real quando o contrato com a API estiver definido
  // const { data } = await apiClient.get<Prazo[]>(endpoints.calendario.proximosPrazos)
  // return data
  return simularRequisicao(proximosPrazosMock)
}

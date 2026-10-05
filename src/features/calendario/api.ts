import { simularRequisicao } from '../../lib/api/mock'
import { eventosCalendarioMock, proximosPrazosMock } from './mocks'
import type { EventoCalendario, Prazo } from './types'

export async function getProximosPrazos(): Promise<Prazo[]> {
  // TODO: trocar pelo endpoint real quando o contrato com a API estiver definido
  // const { data } = await apiClient.get<Prazo[]>(endpoints.calendario.proximosPrazos)
  // return data
  return simularRequisicao(proximosPrazosMock)
}

export async function getEventosDoAno(ano: number): Promise<EventoCalendario[]> {
  // TODO: trocar pelo endpoint real quando o contrato com a API estiver definido
  // const { data } = await apiClient.get<EventoCalendario[]>(endpoints.calendario.eventos, {
  //   params: { ano },
  // })
  // return data
  return simularRequisicao(
    eventosCalendarioMock.filter((evento) => evento.data.startsWith(`${ano}-`)),
  )
}

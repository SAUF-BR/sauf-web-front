import { apiClient } from '../../lib/api/client'
import { endpoints } from '../../lib/api/endpoints'
import type { EventoCalendario, Prazo } from './types'

export async function getProximosPrazos(limite = 3): Promise<Prazo[]> {
  const { data } = await apiClient.get<Prazo[]>(endpoints.calendario.proximosPrazos, {
    params: { limite },
  })
  return data
}

// Eventos com algum dia no ano: um período que cruza a virada aparece nos dois anos
export async function getEventosDoAno(ano: number): Promise<EventoCalendario[]> {
  const { data } = await apiClient.get<EventoCalendario[]>(endpoints.calendario.eventos, {
    params: { ano },
  })
  return data
}

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getEventosDoAno, getProximosPrazos } from './api'

// As datas mudam no máximo uma vez por dia (envio do scraper): não precisa buscar a cada foco
const CINCO_MINUTOS = 5 * 60 * 1000

export const calendarioKeys = {
  all: ['calendario'] as const,
  proximosPrazos: (limite: number) => [...calendarioKeys.all, 'proximos-prazos', limite] as const,
  eventosDoAno: (ano: number) => [...calendarioKeys.all, 'eventos', ano] as const,
}

export function useProximosPrazos(limite = 3) {
  return useQuery({
    queryKey: calendarioKeys.proximosPrazos(limite),
    queryFn: () => getProximosPrazos(limite),
    staleTime: CINCO_MINUTOS,
  })
}

export function useEventosDoAno(ano: number) {
  return useQuery({
    queryKey: calendarioKeys.eventosDoAno(ano),
    queryFn: () => getEventosDoAno(ano),
    placeholderData: keepPreviousData,
    staleTime: CINCO_MINUTOS,
  })
}

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getEventosDoAno, getProximosPrazos } from './api'

export const calendarioKeys = {
  all: ['calendario'] as const,
  proximosPrazos: () => [...calendarioKeys.all, 'proximos-prazos'] as const,
  eventosDoAno: (ano: number) => [...calendarioKeys.all, 'eventos', ano] as const,
}

export function useProximosPrazos() {
  return useQuery({
    queryKey: calendarioKeys.proximosPrazos(),
    queryFn: getProximosPrazos,
  })
}

export function useEventosDoAno(ano: number) {
  return useQuery({
    queryKey: calendarioKeys.eventosDoAno(ano),
    queryFn: () => getEventosDoAno(ano),
    placeholderData: keepPreviousData,
  })
}

import { useQuery } from '@tanstack/react-query'
import { getProximosPrazos } from './api'

export const calendarioKeys = {
  all: ['calendario'] as const,
  proximosPrazos: () => [...calendarioKeys.all, 'proximos-prazos'] as const,
}

export function useProximosPrazos() {
  return useQuery({
    queryKey: calendarioKeys.proximosPrazos(),
    queryFn: getProximosPrazos,
  })
}

import { useQuery } from '@tanstack/react-query'
import { getUniversidadesEmDestaque } from './api'

export const universidadesKeys = {
  all: ['universidades'] as const,
  destaques: () => [...universidadesKeys.all, 'destaques'] as const,
}

export function useUniversidadesEmDestaque() {
  return useQuery({
    queryKey: universidadesKeys.destaques(),
    queryFn: getUniversidadesEmDestaque,
  })
}

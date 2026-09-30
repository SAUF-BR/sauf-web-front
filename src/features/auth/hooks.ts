import { useQuery } from '@tanstack/react-query'
import { getUsuarioAtual } from './api'

export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
}

export function useUsuarioAtual() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: getUsuarioAtual,
    staleTime: 5 * 60 * 1000,
  })
}

import { useQuery } from '@tanstack/react-query'
import { getTotalNotificacoesNaoLidas } from './api'

export const notificacoesKeys = {
  all: ['notificacoes'] as const,
  totalNaoLidas: () => [...notificacoesKeys.all, 'nao-lidas', 'total'] as const,
}

export function useTotalNotificacoesNaoLidas({ enabled = true } = {}) {
  return useQuery({
    queryKey: notificacoesKeys.totalNaoLidas(),
    queryFn: getTotalNotificacoesNaoLidas,
    enabled,
  })
}

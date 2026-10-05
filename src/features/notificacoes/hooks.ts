import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getNotificacoes, getTotalNotificacoesNaoLidas, marcarTodasComoLidas } from './api'
import type { Notificacao } from './types'
import { ordenarMaisRecentes } from './utils'

export const notificacoesKeys = {
  all: ['notificacoes'] as const,
  lista: () => [...notificacoesKeys.all, 'lista'] as const,
  totalNaoLidas: () => [...notificacoesKeys.all, 'nao-lidas', 'total'] as const,
}

export function useTotalNotificacoesNaoLidas({ enabled = true } = {}) {
  return useQuery({
    queryKey: notificacoesKeys.totalNaoLidas(),
    queryFn: getTotalNotificacoesNaoLidas,
    enabled,
  })
}

export function useNotificacoes({ enabled = true } = {}) {
  return useQuery({
    queryKey: notificacoesKeys.lista(),
    queryFn: getNotificacoes,
    select: ordenarMaisRecentes,
    enabled,
  })
}

export function useMarcarTodasComoLidas() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: marcarTodasComoLidas,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: notificacoesKeys.all })

      const listaAnterior = queryClient.getQueryData<Notificacao[]>(notificacoesKeys.lista())
      const totalAnterior = queryClient.getQueryData<number>(notificacoesKeys.totalNaoLidas())

      queryClient.setQueryData<Notificacao[]>(notificacoesKeys.lista(), (lista) =>
        lista?.map((notificacao) => ({ ...notificacao, lida: true })),
      )
      queryClient.setQueryData(notificacoesKeys.totalNaoLidas(), 0)

      return { listaAnterior, totalAnterior }
    },
    onError: (_erro, _variaveis, contexto) => {
      queryClient.setQueryData(notificacoesKeys.lista(), contexto?.listaAnterior)
      queryClient.setQueryData(notificacoesKeys.totalNaoLidas(), contexto?.totalAnterior)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: notificacoesKeys.all }),
  })
}

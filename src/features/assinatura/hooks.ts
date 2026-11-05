import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { PlanoAssinatura } from '../../types'
import {
  cancelarAssinatura,
  getAssinaturaAtual,
  getPlanos,
  reativarAssinatura,
  trocarPlano,
} from './api'

export const assinaturaKeys = {
  all: ['assinatura'] as const,
  planos: () => [...assinaturaKeys.all, 'planos'] as const,
  atual: () => [...assinaturaKeys.all, 'atual'] as const,
}

export function usePlanos() {
  return useQuery({
    queryKey: assinaturaKeys.planos(),
    queryFn: getPlanos,
    staleTime: 30 * 60 * 1000,
  })
}

export function useAssinaturaAtual() {
  return useQuery({
    queryKey: assinaturaKeys.atual(),
    queryFn: getAssinaturaAtual,
  })
}

// Depois de qualquer tentativa de mudança, recarrega a assinatura (selo "Seu plano", resumo
// e acesso). No sucesso, a ação só termina depois de recarregar, para o botão não liberar
// com dados antigos. No erro, a mensagem aparece na hora e a recarga segue em segundo plano
// (um 409 indica que a tela estava desatualizada).
function useRecarregarAssinatura() {
  const queryClient = useQueryClient()
  const recarregar = () => queryClient.invalidateQueries({ queryKey: assinaturaKeys.atual() })

  return {
    onSuccess: recarregar,
    onError: () => {
      void recarregar()
    },
  }
}

export function useTrocarPlano() {
  const recarregar = useRecarregarAssinatura()

  return useMutation({
    mutationFn: (plano: PlanoAssinatura) => trocarPlano(plano),
    ...recarregar,
  })
}

export function useCancelarAssinatura() {
  const recarregar = useRecarregarAssinatura()

  return useMutation({ mutationFn: cancelarAssinatura, ...recarregar })
}

export function useReativarAssinatura() {
  const recarregar = useRecarregarAssinatura()

  return useMutation({ mutationFn: reativarAssinatura, ...recarregar })
}

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

// Depois de qualquer mudança, recarrega a assinatura: selo "Seu plano", resumo e acesso
function useRecarregarAssinatura() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: assinaturaKeys.atual() })
}

export function useTrocarPlano() {
  const recarregar = useRecarregarAssinatura()

  return useMutation({
    mutationFn: (plano: PlanoAssinatura) => trocarPlano(plano),
    onSuccess: recarregar,
  })
}

export function useCancelarAssinatura() {
  const recarregar = useRecarregarAssinatura()

  return useMutation({ mutationFn: cancelarAssinatura, onSuccess: recarregar })
}

export function useReativarAssinatura() {
  const recarregar = useRecarregarAssinatura()

  return useMutation({ mutationFn: reativarAssinatura, onSuccess: recarregar })
}

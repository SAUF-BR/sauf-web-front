import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { PlanoAssinatura } from '../../types'
import { useUsuarioAtual } from '../auth'
import {
  cancelarAssinatura,
  getAssinaturaAtual,
  getPlanos,
  reativarAssinatura,
  trocarPlano,
} from './api'

// Só em desenvolvimento (.env.development): libera as telas de assinante sem pagamento.
// Ainda é preciso entrar na conta, porque a API dos simulados exige login.
const ASSINATURA_SIMULADA = import.meta.env.VITE_MOCK_ASSINATURA === 'true'

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

// `enabled: false` para visitantes: sem conta não há assinatura para buscar
export function useAssinaturaAtual({ enabled = true }: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: assinaturaKeys.atual(),
    queryFn: getAssinaturaAtual,
    enabled,
  })
}

/**
 * Se a pessoa tem assinatura vigente (a API responde 204 quando não tem, D-56).
 * Visitante conta como sem assinatura. `isPending` fica true enquanto ainda não dá
 * para saber, para as rotas não redirecionarem antes da hora.
 */
export function useTemAssinaturaAtiva() {
  const { data: usuario, isPending: carregandoUsuario } = useUsuarioAtual()
  const consulta = useAssinaturaAtual({ enabled: !!usuario })

  if (carregandoUsuario) return { ativa: false, isPending: true }
  if (!usuario) return { ativa: false, isPending: false }

  return { ativa: !!consulta.data || ASSINATURA_SIMULADA, isPending: consulta.isPending && !ASSINATURA_SIMULADA }
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

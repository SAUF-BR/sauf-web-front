import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { atualizarPerfil, enviarFoto, getUsuarioAtual, sair } from './api'

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

// Depois de editar o perfil ou a foto, recarrega o usuário — o Header e o
// perfil se atualizam sozinhos por usarem o mesmo cache
function useRecarregarUsuario() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: authKeys.me() })
}

export function useAtualizarPerfil() {
  const recarregar = useRecarregarUsuario()

  return useMutation({ mutationFn: atualizarPerfil, onSuccess: recarregar })
}

export function useEnviarFoto() {
  const recarregar = useRecarregarUsuario()

  return useMutation({ mutationFn: enviarFoto, onSuccess: recarregar })
}

// `onSuccess` permite à tela navegar depois de sair (ex.: voltar ao início)
export function useSair({ onSuccess }: { onSuccess?: () => void } = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: sair,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.me(), null)
      onSuccess?.()
    },
  })
}

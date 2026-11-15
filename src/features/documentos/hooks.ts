import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authKeys } from '../auth/hooks'
import { aceitarDocumentos, getDocumentosVigentes } from './api'

export const documentosKeys = {
  all: ['documentos'] as const,
  vigentes: () => [...documentosKeys.all, 'vigentes'] as const,
}

export function useDocumentosVigentes({ enabled = true }: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: documentosKeys.vigentes(),
    queryFn: getDocumentosVigentes,
    staleTime: 10 * 60 * 1000,
    enabled,
  })
}

// Depois de aceitar, recarrega o usuário: as pendências somem e a tela libera
export function useAceitarDocumentos() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: aceitarDocumentos,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: authKeys.me() }),
    // 409: a versão mudou enquanto a pessoa lia; busca o texto novo
    onError: () => queryClient.invalidateQueries({ queryKey: documentosKeys.vigentes() }),
  })
}

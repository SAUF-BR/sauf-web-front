import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { alternarCursoFavorito, getCursosFavoritosIds } from './api'

export const favoritosKeys = {
  all: ['favoritos'] as const,
  cursosIds: () => [...favoritosKeys.all, 'cursos', 'ids'] as const,
}

// Ids dos cursos favoritados. Só busca com usuário logado (`enabled`).
export function useCursosFavoritosIds({ enabled = true } = {}) {
  return useQuery({
    queryKey: favoritosKeys.cursosIds(),
    queryFn: getCursosFavoritosIds,
    select: (ids) => new Set(ids),
    enabled,
  })
}

export function useAlternarCursoFavorito() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ cursoId, favoritar }: { cursoId: string; favoritar: boolean }) =>
      alternarCursoFavorito(cursoId, favoritar),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: favoritosKeys.all }),
  })
}

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  alternarCursoFavorito,
  alternarUniversidadeFavorita,
  getCursosFavoritosIds,
  getUniversidadesFavoritas,
} from './api'

export const favoritosKeys = {
  all: ['favoritos'] as const,
  cursosIds: () => [...favoritosKeys.all, 'cursos', 'ids'] as const,
  universidades: () => [...favoritosKeys.all, 'universidades'] as const,
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

export function useUniversidadesFavoritas() {
  return useQuery({
    queryKey: favoritosKeys.universidades(),
    queryFn: getUniversidadesFavoritas,
  })
}

// Depois de favoritar ou remover, busca a lista de novo para ficar igual à do servidor
export function useAlternarUniversidadeFavorita() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ universidadeId, favoritar }: { universidadeId: string; favoritar: boolean }) =>
      alternarUniversidadeFavorita(universidadeId, favoritar),
    onSettled: () => queryClient.invalidateQueries({ queryKey: favoritosKeys.universidades() }),
  })
}
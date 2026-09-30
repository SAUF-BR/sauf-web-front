import { useQuery } from '@tanstack/react-query'
import { getCursosRecomendados, getTotalCursos } from './api'

export const cursosKeys = {
  all: ['cursos'] as const,
  recomendados: () => [...cursosKeys.all, 'recomendados'] as const,
  total: () => [...cursosKeys.all, 'total'] as const,
}

export function useCursosRecomendados() {
  return useQuery({
    queryKey: cursosKeys.recomendados(),
    queryFn: getCursosRecomendados,
  })
}

export function useTotalCursos() {
  return useQuery({
    queryKey: cursosKeys.total(),
    queryFn: getTotalCursos,
  })
}

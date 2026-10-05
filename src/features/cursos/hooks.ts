import { useQuery } from '@tanstack/react-query'
import { getCursosPorArea, getCursosRecomendados, getTotalCursos } from './api'

export const cursosKeys = {
  all: ['cursos'] as const,
  recomendados: () => [...cursosKeys.all, 'recomendados'] as const,
  total: () => [...cursosKeys.all, 'total'] as const,
  porArea: (area: string) => [...cursosKeys.all, 'area', area] as const,
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

export function useCursosPorArea(area: string | undefined) {
  return useQuery({
    queryKey: cursosKeys.porArea(area ?? ''),
    queryFn: () => getCursosPorArea(area ?? ''),
    enabled: !!area,
  })
}

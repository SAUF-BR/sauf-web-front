import { useQuery } from '@tanstack/react-query'
import { getCursosPorArea, getCursosRecomendados, getTotalCursos } from './api'
import {
  cursosListagemMock,
  cursosRecomendadosMock,
} from './mocks'

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

export function useCurso(cursoId: string | undefined) {
  return useQuery({
    queryKey: [...cursosKeys.all, 'detalhe', cursoId],
    queryFn: () => {
      const cursos = [...cursosListagemMock, ...cursosRecomendadosMock]

      const curso = cursos.find((item) => item.id === cursoId)

      if (!curso) {
        throw new Error('Curso não encontrado')
      }

      return curso
    },
    enabled: !!cursoId,
  })
}
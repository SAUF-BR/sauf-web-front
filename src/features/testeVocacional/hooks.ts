import { useQuery } from '@tanstack/react-query'
import { getProgressoTeste, getQuestionario } from './api'

export const testeVocacionalKeys = {
  all: ['teste-vocacional'] as const,
  questionario: () => [...testeVocacionalKeys.all, 'questionario'] as const,
  progresso: () => [...testeVocacionalKeys.all, 'progresso'] as const,
}

export function useQuestionario() {
  return useQuery({
    queryKey: testeVocacionalKeys.questionario(),
    queryFn: getQuestionario,
    staleTime: Infinity,
  })
}

export function useProgressoTeste({ enabled = true } = {}) {
  return useQuery({
    queryKey: testeVocacionalKeys.progresso(),
    queryFn: getProgressoTeste,
    enabled,
  })
}

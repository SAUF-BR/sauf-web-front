import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  finalizarTeste,
  getProgressoTeste,
  getQuestionario,
  getResultadoTeste,
  refazerTeste,
  salvarResposta,
} from './api'
import type { ProgressoTeste } from './types'

export const testeVocacionalKeys = {
  all: ['teste-vocacional'] as const,
  questionario: () => [...testeVocacionalKeys.all, 'questionario'] as const,
  progresso: () => [...testeVocacionalKeys.all, 'progresso'] as const,
  resultado: () => [...testeVocacionalKeys.all, 'resultado'] as const,
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

export function useSalvarResposta() {
  const queryClient = useQueryClient()
  const chave = testeVocacionalKeys.progresso()

  return useMutation({
    mutationFn: salvarResposta,
    onMutate: async ({ perguntaId, alternativaId }) => {
      await queryClient.cancelQueries({ queryKey: chave })
      const anterior = queryClient.getQueryData<ProgressoTeste>(chave)

      queryClient.setQueryData<ProgressoTeste>(chave, (progresso) => ({
        respostas: { ...progresso?.respostas, [perguntaId]: alternativaId },
        atualizadoEm: new Date().toISOString(),
      }))

      return { anterior }
    },
    onError: (_erro, _variaveis, contexto) => {
      queryClient.setQueryData(chave, contexto?.anterior)
    },
    onSuccess: (progresso) => {
      queryClient.setQueryData(chave, progresso)
    },
  })
}

export function useResultadoTeste({ enabled = true } = {}) {
  return useQuery({
    queryKey: testeVocacionalKeys.resultado(),
    queryFn: getResultadoTeste,
    enabled,
  })
}

export function useFinalizarTeste() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: finalizarTeste,
    onSuccess: (resultado) => {
      queryClient.setQueryData(testeVocacionalKeys.resultado(), resultado)
    },
  })
}

export function useRefazerTeste() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: refazerTeste,
    onSuccess: () => {
      queryClient.setQueryData<ProgressoTeste>(testeVocacionalKeys.progresso(), {
        respostas: {},
        atualizadoEm: null,
      })
      queryClient.setQueryData(testeVocacionalKeys.resultado(), null)
    },
  })
}

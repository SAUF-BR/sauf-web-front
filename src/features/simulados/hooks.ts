import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  criarSimulado,
  finalizarSimulado,
  getCronometro,
  getOpcoes,
  getResumo,
  getRevisao,
  getSimulado,
  listarSimulados,
  refazerErros,
  responderQuestao,
} from './api'
import type {
  CriarSimuladoRequest,
  FiltroSimulados,
  Periodo,
  ResponderQuestaoRequest,
  SimuladoDetalhe,
} from './types'

export const simuladosKeys = {
  all: ['simulados'] as const,
  opcoes: () => [...simuladosKeys.all, 'opcoes'] as const,
  listas: () => [...simuladosKeys.all, 'lista'] as const,
  lista: (filtro: FiltroSimulados) => [...simuladosKeys.listas(), filtro] as const,
  detalhe: (id: string) => [...simuladosKeys.all, 'detalhe', id] as const,
  revisao: (id: string) => [...simuladosKeys.all, 'revisao', id] as const,
  resumo: () => [...simuladosKeys.all, 'resumo'] as const,
  cronometros: () => [...simuladosKeys.all, 'cronometro'] as const,
  cronometro: (periodo: Periodo) => [...simuladosKeys.cronometros(), periodo] as const,
}

export function useOpcoesSimulado() {
  return useQuery({
    queryKey: simuladosKeys.opcoes(),
    queryFn: getOpcoes,
    staleTime: 30 * 60 * 1000,
  })
}

// Sem refetch ao voltar o foco da janela: com o simulado em andamento, isso poderia
// sobrescrever respostas ainda não enviadas.
export function useSimulado(id: string) {
  return useQuery({
    queryKey: simuladosKeys.detalhe(id),
    queryFn: () => getSimulado(id),
    refetchOnWindowFocus: false,
  })
}

export function useRevisao(id: string) {
  return useQuery({
    queryKey: simuladosKeys.revisao(id),
    queryFn: () => getRevisao(id),
  })
}

export function useSimulados(filtro: FiltroSimulados = {}) {
  return useQuery({
    queryKey: simuladosKeys.lista(filtro),
    queryFn: () => listarSimulados(filtro),
    placeholderData: keepPreviousData,
  })
}

export function useResumoSimulados() {
  return useQuery({
    queryKey: simuladosKeys.resumo(),
    queryFn: getResumo,
  })
}

export function useCronometroSimulados(periodo: Periodo) {
  return useQuery({
    queryKey: simuladosKeys.cronometro(periodo),
    queryFn: () => getCronometro(periodo),
    placeholderData: keepPreviousData,
  })
}

export function useCriarSimulado() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (pedido: CriarSimuladoRequest) => criarSimulado(pedido),
    onSuccess: (simulado) => {
      queryClient.setQueryData(simuladosKeys.detalhe(simulado.id), simulado)
      void queryClient.invalidateQueries({ queryKey: simuladosKeys.listas() })
    },
  })
}

// A API devolve a questão já atualizada: troca só ela no detalhe em cache, sem refetch
// a cada resposta.
export function useResponderQuestao(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ ordem, ...resposta }: ResponderQuestaoRequest & { ordem: number }) =>
      responderQuestao(id, ordem, resposta),
    onSuccess: (questao) => {
      queryClient.setQueryData<SimuladoDetalhe>(simuladosKeys.detalhe(id), (detalhe) =>
        detalhe
          ? {
              ...detalhe,
              questoes: detalhe.questoes.map((atual) =>
                atual.ordem === questao.ordem ? questao : atual,
              ),
            }
          : detalhe,
      )
    },
  })
}

export function useFinalizarSimulado(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => finalizarSimulado(id),
    onSuccess: (revisao) => {
      queryClient.setQueryData(simuladosKeys.revisao(id), revisao)
      void queryClient.invalidateQueries({ queryKey: simuladosKeys.detalhe(id) })
      void queryClient.invalidateQueries({ queryKey: simuladosKeys.listas() })
      void queryClient.invalidateQueries({ queryKey: simuladosKeys.resumo() })
      void queryClient.invalidateQueries({ queryKey: simuladosKeys.cronometros() })
    },
  })
}

export function useRefazerErros() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => refazerErros(id),
    onSuccess: (simulado) => {
      queryClient.setQueryData(simuladosKeys.detalhe(simulado.id), simulado)
      void queryClient.invalidateQueries({ queryKey: simuladosKeys.listas() })
    },
  })
}

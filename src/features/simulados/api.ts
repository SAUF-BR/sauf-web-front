import { apiClient } from '../../lib/api/client'
import { endpoints } from '../../lib/api/endpoints'
import type { Paginado } from '../../types'
import type {
  CriarSimuladoRequest,
  DadosAcompanhamento,
  DadosCronometro,
  DadosRanking,
  FiltroSimulados,
  OpcoesSimulado,
  Periodo,
  QuestaoSimulado,
  ResponderQuestaoRequest,
  ResumoSimulados,
  RevisaoSimulado,
  SimuladoDetalhe,
  SimuladoResumo,
} from './types'

export async function getOpcoes(): Promise<OpcoesSimulado> {
  const { data } = await apiClient.get<OpcoesSimulado>(endpoints.simulados.opcoes)
  return data
}

export async function criarSimulado(pedido: CriarSimuladoRequest): Promise<SimuladoDetalhe> {
  const { data } = await apiClient.post<SimuladoDetalhe>(endpoints.simulados.lista, pedido)
  return data
}

export async function getSimulado(id: string): Promise<SimuladoDetalhe> {
  const { data } = await apiClient.get<SimuladoDetalhe>(endpoints.simulados.detalhe(id))
  return data
}

export async function responderQuestao(
  id: string,
  ordem: number,
  resposta: ResponderQuestaoRequest,
): Promise<QuestaoSimulado> {
  const { data } = await apiClient.put<QuestaoSimulado>(
    endpoints.simulados.questao(id, ordem),
    resposta,
  )
  return data
}

export async function finalizarSimulado(id: string): Promise<RevisaoSimulado> {
  const { data } = await apiClient.post<RevisaoSimulado>(endpoints.simulados.finalizar(id))
  return data
}

export async function getRevisao(id: string): Promise<RevisaoSimulado> {
  const { data } = await apiClient.get<RevisaoSimulado>(endpoints.simulados.revisao(id))
  return data
}

export async function refazerErros(id: string): Promise<SimuladoDetalhe> {
  const { data } = await apiClient.post<SimuladoDetalhe>(endpoints.simulados.refazerErros(id))
  return data
}

export async function listarSimulados(
  filtro: FiltroSimulados = {},
): Promise<Paginado<SimuladoResumo>> {
  const { data } = await apiClient.get<Paginado<SimuladoResumo>>(endpoints.simulados.lista, {
    params: filtro,
  })
  return data
}

export async function getResumo(): Promise<ResumoSimulados> {
  const { data } = await apiClient.get<ResumoSimulados>(endpoints.simulados.resumo)
  return data
}

export async function getCronometro(periodo: Periodo): Promise<DadosCronometro> {
  const { data } = await apiClient.get<DadosCronometro>(endpoints.simulados.cronometro, {
    params: { periodo },
  })
  return data
}

export async function getAcompanhamento(periodo: Periodo): Promise<DadosAcompanhamento> {
  const { data } = await apiClient.get<DadosAcompanhamento>(endpoints.simulados.acompanhamento, {
    params: { periodo, vestibular: 'enem' },
  })
  return data
}

export async function getRanking(periodo: Periodo): Promise<DadosRanking> {
  const { data } = await apiClient.get<DadosRanking>(endpoints.simulados.ranking, {
    params: { periodo, vestibular: 'enem' },
  })
  return data
}

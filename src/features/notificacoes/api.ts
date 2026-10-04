import { simularRequisicao } from '../../lib/api/mock'
import { notificacoesMock } from './mocks'
import type { Notificacao } from './types'

export async function getTotalNotificacoesNaoLidas(): Promise<number> {
  // TODO: trocar pelo endpoint real quando o contrato com a API estiver definido
  // const { data } = await apiClient.get<{ total: number }>(endpoints.notificacoes.naoLidas)
  // return data.total
  return simularRequisicao(notificacoesMock.filter((notificacao) => !notificacao.lida).length)
}

export async function getNotificacoes(): Promise<Notificacao[]> {
  // TODO: trocar pelo endpoint real quando o contrato com a API estiver definido
  // const { data } = await apiClient.get<Notificacao[]>(endpoints.notificacoes.lista)
  // return data
  return simularRequisicao(notificacoesMock)
}

export async function marcarTodasComoLidas(): Promise<void> {
  // TODO: trocar pelo endpoint real quando o contrato com a API estiver definido
  // await apiClient.patch(endpoints.notificacoes.marcarTodasComoLidas)
  for (const notificacao of notificacoesMock) {
    notificacao.lida = true
  }
  return simularRequisicao(undefined)
}

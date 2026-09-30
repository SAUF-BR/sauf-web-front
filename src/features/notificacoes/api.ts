import { simularRequisicao } from '../../lib/api/mock'
import { totalNaoLidasMock } from './mocks'

export async function getTotalNotificacoesNaoLidas(): Promise<number> {
  // TODO: trocar pelo endpoint real quando o contrato com a API estiver definido
  // const { data } = await apiClient.get<{ total: number }>(endpoints.notificacoes.naoLidas)
  // return data.total
  return simularRequisicao(totalNaoLidasMock)
}

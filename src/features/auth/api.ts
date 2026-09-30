import { simularRequisicao } from '../../lib/api/mock'
import { usuarioAtualMock } from './mocks'
import type { UsuarioAtual } from './types'

export async function getUsuarioAtual(): Promise<UsuarioAtual | null> {
  // TODO: trocar pelo endpoint real quando o contrato com a API estiver definido
  // const { data } = await apiClient.get<UsuarioAtual>(endpoints.auth.me)
  // return data  (tratar 401 como null)
  return simularRequisicao(usuarioAtualMock)
}

import { simularRequisicao } from '../../lib/api/mock'
import { usuarioAtualMock } from './mocks'
import type { DadosPerfil, UsuarioAtual } from './types'

// TODO: trocar pelos endpoints reais quando o contrato com a API estiver definido.
// Por enquanto as funções só leem/alteram o mock em memória.

export async function getUsuarioAtual(): Promise<UsuarioAtual | null> {
  // const { data } = await apiClient.get<UsuarioAtual>(endpoints.auth.me)
  // return data  (tratar 401 como null)
  return simularRequisicao(usuarioAtualMock.atual)
}

export async function atualizarPerfil(dados: DadosPerfil): Promise<void> {
  // await apiClient.patch(endpoints.auth.me, dados)
  if (usuarioAtualMock.atual) {
    usuarioAtualMock.atual = { ...usuarioAtualMock.atual, ...dados }
  }

  return simularRequisicao(undefined)
}

export async function enviarFoto(arquivo: File): Promise<void> {
  // const formulario = new FormData()
  // formulario.append('foto', arquivo)
  // await apiClient.post(endpoints.auth.foto, formulario)
  if (usuarioAtualMock.atual) {
    usuarioAtualMock.atual = { ...usuarioAtualMock.atual, fotoUrl: URL.createObjectURL(arquivo) }
  }

  return simularRequisicao(undefined, 600)
}

export async function sair(): Promise<void> {
  // await apiClient.post(endpoints.auth.logout)
  usuarioAtualMock.atual = null

  return simularRequisicao(undefined, 150)
}

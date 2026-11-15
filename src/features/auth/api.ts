import { apiClient } from '../../lib/api/client'
import { endpoints } from '../../lib/api/endpoints'
import { ErroApi } from '../../lib/api/erros'
import type {
  DadosAlterarSenha,
  DadosCodigoAcesso,
  DadosCadastro,
  DadosLogin,
  DadosPerfil,
  UsuarioAtual,
} from './types'

// A API devolve o caminho da foto ("/api/v1/me/foto?v=…"); a <img> precisa do
// endereço completo, que fica no mesmo servidor da VITE_API_URL
function completarFotoUrl(usuario: UsuarioAtual): UsuarioAtual {
  if (!usuario.fotoUrl) return usuario
  const base = import.meta.env.VITE_API_URL ?? window.location.origin

  return { ...usuario, fotoUrl: new URL(usuario.fotoUrl, base).toString() }
}

// Sem sessão (401) = visitante (null)
export async function getUsuarioAtual(): Promise<UsuarioAtual | null> {
  try {
    const { data } = await apiClient.get<UsuarioAtual>(endpoints.auth.me)
    return completarFotoUrl(data)
  } catch (erro) {
    if (erro instanceof ErroApi && erro.status === 401) return null
    throw erro
  }
}

// Login e cadastro: a API cria o cookie da sessão e devolve o usuário
export async function entrar(dados: DadosLogin): Promise<UsuarioAtual> {
  const { data } = await apiClient.post<UsuarioAtual>(endpoints.auth.login, dados)
  return completarFotoUrl(data)
}

// Antes da etapa dos termos: o e-mail já tem conta? (e-mail no corpo, nunca na URL)
export async function emailDisponivel(email: string): Promise<boolean> {
  const { data } = await apiClient.post<{ disponivel: boolean }>(endpoints.auth.emailDisponivel, { email })
  return data.disponivel
}

export async function cadastrar(dados: DadosCadastro): Promise<UsuarioAtual> {
  const { data } = await apiClient.post<UsuarioAtual>(endpoints.auth.cadastro, dados)
  return completarFotoUrl(data)
}

// Manda o código de 6 dígitos. A API responde igual exista ou não a conta (não revela
// e-mails cadastrados)
export async function esqueciSenha(email: string): Promise<void> {
  await apiClient.post(endpoints.auth.esqueciSenha, { email })
}

// Código certo: a API abre a sessão e libera criar a senha nova sem a atual por 15 minutos
export async function entrarComCodigo(dados: DadosCodigoAcesso): Promise<UsuarioAtual> {
  const { data } = await apiClient.post<UsuarioAtual>(endpoints.auth.entrarComCodigo, dados)
  return completarFotoUrl(data)
}

// A API apaga o cookie da sessão
export async function sair(): Promise<void> {
  await apiClient.post(endpoints.auth.logout)
}

export async function atualizarPerfil(dados: DadosPerfil): Promise<UsuarioAtual> {
  const { data } = await apiClient.patch<UsuarioAtual>(endpoints.auth.me, dados)
  return completarFotoUrl(data)
}

export async function alterarSenha(dados: DadosAlterarSenha): Promise<void> {
  await apiClient.put(endpoints.auth.senha, dados)
}

export async function enviarFoto(arquivo: File): Promise<UsuarioAtual> {
  const formulario = new FormData()
  formulario.append('foto', arquivo)

  // Sobrescreve o JSON padrão do apiClient; o navegador completa com o boundary
  const { data } = await apiClient.put<UsuarioAtual>(endpoints.auth.foto, formulario, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return completarFotoUrl(data)
}

export async function removerFoto(): Promise<void> {
  await apiClient.delete(endpoints.auth.foto)
}

import type { UF } from '../../lib/utils'
import type { Usuario } from '../../types'
import type { Modalidade } from '../cursos/types'
import type { AceiteDocumento, TipoDocumento } from '../documentos/types'

export interface PreferenciasEstudante {
  areas: string[]
  modalidades: Modalidade[]
  estados: UF[]
}

// Resposta do GET /me (UsuarioResposta da API). Datas em ISO 8601 (UTC).
export interface UsuarioAtual extends Usuario {
  emailVerificado: boolean
  notaEnem: number | null
  // Já absoluta (a API devolve o caminho; o api.ts completa com o endereço da API)
  fotoUrl: string | null
  criadoEm: string
  // null em contas sem senha (criadas antes do login)
  senhaAlteradaEm: string | null
  // Logo depois de entrar pelo código do "esqueci minha senha": até esse instante a senha
  // nova pode ser criada sem a atual. null no resto do tempo.
  trocaSenhaSemAtualAte: string | null
  // Documentos com versão nova que a pessoa ainda precisa aceitar (vazio = em dia)
  documentosPendentes: TipoDocumento[]
  // Ainda não vem da API: as preferências chegam com o cadastro/onboarding
  preferencias?: PreferenciasEstudante
}

// Campos que a própria pessoa edita no perfil (e-mail e senha têm fluxo próprio)
export type DadosPerfil = Pick<UsuarioAtual, 'nome' | 'notaEnem'>

// POST /auth/login
export interface DadosLogin {
  email: string
  senha: string
}

// POST /auth/cadastro
export interface DadosCadastro {
  nome: string
  email: string
  senha: string
  // Versões dos documentos legais que a tela mostrou (D-93)
  aceites: AceiteDocumento[]
}

// PUT /me/senha (o e-mail da conta não pode ser trocado). A senha atual pode faltar só
// logo depois de entrar pelo código do "esqueci minha senha".
export interface DadosAlterarSenha {
  senhaAtual?: string
  novaSenha: string
}

// POST /auth/esqueci-senha/codigo: o e-mail e o código de 6 dígitos que chegou nele
export interface DadosCodigoAcesso {
  email: string
  codigo: string
}


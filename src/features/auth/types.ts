import type { UF } from '../../lib/utils'
import type { Usuario } from '../../types'
import type { Modalidade } from '../cursos/types'

// Tipos provisórios — alinhar com o DER/Diagrama de Classe quando o contrato
// com a API estiver definido.

export interface PreferenciasEstudante {
  areas: string[]
  modalidades: Modalidade[]
  estados: UF[]
}

export interface UsuarioAtual extends Usuario {
  preferencias: PreferenciasEstudante
  fotoUrl: string | null
  notaEnem: number | null
  emailVerificado: boolean
  criadoEm: string
  senhaAlteradaEm: string
}

// Campos que a própria pessoa edita no perfil (e-mail e senha têm fluxo próprio)
export type DadosPerfil = Pick<UsuarioAtual, 'nome' | 'notaEnem'>

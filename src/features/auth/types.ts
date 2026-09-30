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
}

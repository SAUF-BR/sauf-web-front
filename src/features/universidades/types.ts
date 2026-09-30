import type { UF } from '../../lib/utils'

// Tipos provisórios — alinhar com o DER/Diagrama de Classe quando o contrato
// com a API estiver definido.

export type TipoUniversidade = 'publica' | 'privada'

export interface Universidade {
  id: string
  nome: string
  sigla: string | null
  tipo: TipoUniversidade
  cidade: string
  uf: UF
  logoUrl: string | null
  totalCursos: number
}

// Dados resumidos da universidade que acompanham um curso.
export type UniversidadeResumo = Pick<Universidade, 'id' | 'nome' | 'sigla' | 'tipo'>

import type { PlanoAssinatura } from '../../types'

// Tipos provisórios — alinhar com o contrato da API quando estiver definido.

export type RecursoPlano =
  | 'simulados-enem'
  | 'simulados-vestibulares'
  | 'dashboard'
  | 'timer'
  | 'ranking'

export interface Plano {
  id: PlanoAssinatura
  nome: string
  precoMensal: number
  descricao: string
  recursos: RecursoPlano[]
  selo?: string
}

export interface Assinatura {
  plano: PlanoAssinatura
  status: 'ativa' | 'cancelamento-agendado'
  renovaEm: string
}

export type SituacaoAssinatura = 'sem-assinatura' | Assinatura['status']

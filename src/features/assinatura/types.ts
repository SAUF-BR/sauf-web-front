import type { PlanoAssinatura } from '../../types'

export type RecursoPlano =
  | 'busca-cursos'
  | 'busca-universidades'
  | 'teste-vocacional'
  | 'calendario'
  | 'favoritos'
  | 'simulados-enem'
  | 'ranking'
  | 'timer'
  | 'dashboard'

export interface Plano {
  id: PlanoAssinatura
  nome: string
  precoMensal: number
  descricao: string
  recursos: RecursoPlano[]
  selo: string | null
}

// O Free nunca aparece aqui: é o plano de quem não tem assinatura (a API responde 204)
export interface Assinatura {
  plano: Exclude<PlanoAssinatura, 'free'>
  status: 'ativa' | 'cancelamento-agendado'
  renovaEm: string
}

export type SituacaoAssinatura = 'sem-assinatura' | Assinatura['status']

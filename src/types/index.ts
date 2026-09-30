export interface Usuario {
  id: string
  nome: string
  email: string
}

export type PlanoAssinatura = 'basic' | 'plus' | 'premium'

export interface Paginado<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}

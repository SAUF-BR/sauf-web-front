import type { Paginado } from '../../types'
import type { Universidade } from './types'

// Dados mockados — remover quando a API estiver disponível.

export const universidadesMock: Universidade[] = [
  {
    id: 'u-unicesumar',
    nome: 'UniCesumar',
    sigla: null,
    tipo: 'privada',
    cidade: 'Maringá',
    uf: 'PR',
    logoUrl: null,
    totalCursos: 214,
  },
  {
    id: 'u-uniasselvi',
    nome: 'Uniasselvi',
    sigla: null,
    tipo: 'privada',
    cidade: 'Indaial',
    uf: 'SC',
    logoUrl: null,
    totalCursos: 178,
  },
  {
    id: 'u-uem',
    nome: 'Universidade Estadual de Maringá',
    sigla: 'UEM',
    tipo: 'publica',
    cidade: 'Maringá',
    uf: 'PR',
    logoUrl: null,
    totalCursos: 63,
  },
  {
    id: 'u-utfpr',
    nome: 'Universidade Tecnológica Federal do Paraná',
    sigla: 'UTFPR',
    tipo: 'publica',
    cidade: 'Curitiba',
    uf: 'PR',
    logoUrl: null,
    totalCursos: 41,
  },
]

export const universidadesDestaqueMock: Paginado<Universidade> = {
  content: universidadesMock,
  page: 0,
  size: universidadesMock.length,
  totalElements: 96,
  totalPages: 24,
}

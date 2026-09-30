import { universidadesMock } from '../universidades/mocks'
import type { UniversidadeResumo } from '../universidades/types'
import type { Curso } from './types'

// Dados mockados — remover quando a API estiver disponível.

function resumoUniversidade(id: string): UniversidadeResumo {
  const universidade = universidadesMock.find((u) => u.id === id)

  if (!universidade) {
    throw new Error(`Universidade mockada não encontrada: ${id}`)
  }

  const { nome, sigla, tipo } = universidade
  return { id, nome, sigla, tipo }
}

export const cursosRecomendadosMock: Curso[] = [
  {
    id: 'c-biomedicina-uem',
    nome: 'Biomedicina',
    area: 'Saúde',
    grau: 'bacharelado',
    modalidade: 'presencial',
    duracaoSemestres: 10,
    imagemUrl: null,
    universidade: resumoUniversidade('u-uem'),
    notaCorteSisu: 712.4,
    mensalidadeMinima: null,
  },
  {
    id: 'c-medicina-unicesumar',
    nome: 'Medicina',
    area: 'Saúde',
    grau: 'bacharelado',
    modalidade: 'presencial',
    duracaoSemestres: 12,
    imagemUrl: null,
    universidade: resumoUniversidade('u-unicesumar'),
    notaCorteSisu: 798.1,
    mensalidadeMinima: null,
  },
  {
    id: 'c-enfermagem-uniasselvi',
    nome: 'Enfermagem',
    area: 'Saúde',
    grau: 'bacharelado',
    modalidade: 'semipresencial',
    duracaoSemestres: 10,
    imagemUrl: null,
    universidade: resumoUniversidade('u-uniasselvi'),
    notaCorteSisu: null,
    mensalidadeMinima: 489,
  },
]

export const totalCursosMock = 1842

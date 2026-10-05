import { universidadesMock } from '../universidades/mocks'
import type { UniversidadeResumo } from '../universidades/types'
import type { Curso, CursosPorArea } from './types'

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

function curso(dados: Omit<Curso, 'imagemUrl' | 'universidade'> & { universidadeId: string }): Curso {
  const { universidadeId, ...resto } = dados
  return { ...resto, imagemUrl: null, universidade: resumoUniversidade(universidadeId) }
}

export const cursosPorAreaMock: Record<string, CursosPorArea> = {
  Tecnologia: {
    total: 196,
    cursos: [
      curso({
        id: 'c-ciencia-computacao-uem',
        nome: 'Ciência da Computação',
        area: 'Tecnologia',
        grau: 'bacharelado',
        modalidade: 'presencial',
        duracaoSemestres: 8,
        universidadeId: 'u-uem',
        notaCorteSisu: 708.6,
        mensalidadeMinima: null,
      }),
      curso({
        id: 'c-engenharia-software-utfpr',
        nome: 'Engenharia de Software',
        area: 'Tecnologia',
        grau: 'bacharelado',
        modalidade: 'presencial',
        duracaoSemestres: 10,
        universidadeId: 'u-utfpr',
        notaCorteSisu: 721.3,
        mensalidadeMinima: null,
      }),
      curso({
        id: 'c-ads-utfpr',
        nome: 'Análise e Desenvolvimento de Sistemas',
        area: 'Tecnologia',
        grau: 'tecnologo',
        modalidade: 'semipresencial',
        duracaoSemestres: 5,
        universidadeId: 'u-utfpr',
        notaCorteSisu: 612.4,
        mensalidadeMinima: null,
      }),
    ],
  },
  Saúde: {
    total: 212,
    cursos: cursosRecomendadosMock,
  },
  Educação: {
    total: 148,
    cursos: [
      curso({
        id: 'c-pedagogia-uem',
        nome: 'Pedagogia',
        area: 'Educação',
        grau: 'licenciatura',
        modalidade: 'presencial',
        duracaoSemestres: 8,
        universidadeId: 'u-uem',
        notaCorteSisu: 640.2,
        mensalidadeMinima: null,
      }),
      curso({
        id: 'c-letras-uniasselvi',
        nome: 'Letras — Português',
        area: 'Educação',
        grau: 'licenciatura',
        modalidade: 'ead',
        duracaoSemestres: 8,
        universidadeId: 'u-uniasselvi',
        notaCorteSisu: null,
        mensalidadeMinima: 249,
      }),
      curso({
        id: 'c-matematica-utfpr',
        nome: 'Matemática',
        area: 'Educação',
        grau: 'licenciatura',
        modalidade: 'presencial',
        duracaoSemestres: 8,
        universidadeId: 'u-utfpr',
        notaCorteSisu: 655.0,
        mensalidadeMinima: null,
      }),
    ],
  },
}

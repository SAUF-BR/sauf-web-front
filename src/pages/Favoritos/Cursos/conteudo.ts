import type { Curso } from '../../../features/cursos'
import { cursosRecomendadosMock } from '../../../features/cursos/mocks'
import { universidadesListagemMock } from '../../../features/universidades/mockUniversidades'
import type { UniversidadeResumo } from '../../../features/universidades'
import type { UF } from '../../../lib/utils'
import {
  compararComNulos,
  compararPrazo,
  daquiA,
  type Comparador,
  type Opcao,
  type StatusFavorito,
} from '../conteudo'

// O favorito é o curso numa universidade: guarda a instituição e a mensalidade da oferta
interface CursoNaUniversidade extends Curso {
  universidade: UniversidadeResumo
  mensalidadeMinima: number | null
}

export interface CursoFavorito extends CursoNaUniversidade {
  cidade: string
  uf: UF
  status: StatusFavorito | null
}

export type OrdenacaoCursos = 'corte' | 'mensalidade' | 'nome' | 'prazo'

export const Opcoes_ordenacao_cursos: Opcao<OrdenacaoCursos>[] = [
  { valor: 'corte', rotulo: 'Corte SISU' },
  { valor: 'mensalidade', rotulo: 'Menor mensalidade' },
  { valor: 'nome', rotulo: 'Nome (A–Z)' },
  { valor: 'prazo', rotulo: 'Prazo mais próximo' },
]

export const Ordenacao_padrao_cursos: OrdenacaoCursos = 'corte'

export const Comparadores_cursos: Record<OrdenacaoCursos, Comparador<CursoFavorito>> = {
  corte: (a, b) => compararComNulos(a.notaCorteSisu, b.notaCorteSisu, (x, y) => y - x),
  mensalidade: (a, b) =>
    compararComNulos(a.mensalidadeMinima, b.mensalidadeMinima, (x, y) => x - y),
  nome: () => 0,
  prazo: compararPrazo,
}

export function formatarSemestres(total: number) {
  return `${total} ${total === 1 ? 'semestre' : 'semestres'}`
}

// Dados mockados 
const Cursos_extras_mock: CursoNaUniversidade[] = [
  {
    id: 'c-fisioterapia-utfpr',
    nome: 'Fisioterapia',
    area: 'Saúde',
    graus: ['bacharelado'],
    modalidades: ['presencial'],
    duracaoSemestresMin: 8,
    duracaoSemestresMax: 8,
    imagemUrl: null,
    universidade: {
      id: 'u-utfpr',
      nome: 'Universidade Tecnológica Federal do Paraná',
      sigla: 'UTFPR',
      tipo: 'publica',
    },
    notaCorteSisu: 705.3,
    totalUniversidades: 1,
    mensalidadeMinima: null,
  },
  {
    id: 'c-nutricao-uniasselvi',
    nome: 'Nutrição',
    area: 'Saúde',
    graus: ['bacharelado'],
    modalidades: ['presencial'],
    duracaoSemestresMin: 8,
    duracaoSemestresMax: 8,
    imagemUrl: null,
    universidade: { id: 'u-uniasselvi', nome: 'Uniasselvi', sigla: null, tipo: 'privada' },
    notaCorteSisu: null,
    totalUniversidades: 1,
    mensalidadeMinima: 529,
  },
]

const Status_cursos_mock: Record<string, StatusFavorito> = {
  'c-biomedicina-uem': { tipo: 'prazo', processo: 'Vestibular UEM', encerraEm: daquiA(7) },
  'c-medicina-unicesumar': { tipo: 'info', texto: 'Aceita FIES e PROUni parcial' },
  'c-enfermagem-uniasselvi': { tipo: 'neutro', texto: 'Inscrições abrem em novembro' },
}
const Universidade_dos_recomendados_mock: Record<string, UniversidadeResumo> = {
  'c-biomedicina-uem': { id: 'u-uem', nome: 'Universidade Estadual de Maringá', sigla: 'UEM', tipo: 'publica' },
  'c-medicina-unicesumar': { id: 'u-unicesumar', nome: 'UniCesumar', sigla: null, tipo: 'privada' },
  'c-enfermagem-uniasselvi': { id: 'u-uniasselvi', nome: 'Uniasselvi', sigla: null, tipo: 'privada' },
}

const Mensalidade_dos_recomendados_mock: Record<string, number> = {
  'c-enfermagem-uniasselvi': 489,
}

export const cursosFavoritosMock: CursoFavorito[] = [
  ...cursosRecomendadosMock.map((curso) => ({
    ...curso,
    universidade: Universidade_dos_recomendados_mock[curso.id],
    mensalidadeMinima: Mensalidade_dos_recomendados_mock[curso.id] ?? null,
  })),
  ...Cursos_extras_mock,
].map((curso) => {
  const universidade = universidadesListagemMock.find((item) => item.id === curso.universidade.id)

  if (!universidade)
    throw new Error(`Universidade mockada não encontrada: ${curso.universidade.id}`)

  return {
    ...curso,
    cidade: universidade.cidade,
    uf: universidade.uf,
    status: Status_cursos_mock[curso.id] ?? null,
  }
})

export const cursosSelecionadosIniciaisMock = [
  'c-biomedicina-uem',
  'c-medicina-unicesumar',
  'c-enfermagem-uniasselvi',
]

export const mediaEnemUsuarioMock: number | null = 698
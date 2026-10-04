import type { Modalidade } from '../../features/cursos'
import {
  universidadesListagemMock,
  type NotaMec,
  type UniversidadeListagem,
} from '../../features/universidades/mockUniversidades'
import type { Universidade } from '../../features/universidades'

export type EsferaAdministrativa = 'federal' | 'estadual' | 'municipal'

export type ModalidadeOfertada = {
  modalidade: Modalidade
  disponivel: boolean
  totalCursos: number | null
  descricao: string | null
}

export type AreaCursos = {
  area: string
  totalCursos: number
}

export type FormaIngresso = {
  nome: string
  aceita: boolean
}

export type Endereco = {
  logradouro: string
  cep: string
}

export type ProximoPrazo = {
  titulo: string
  data: string
  editalUrl: string | null
}

export interface UniversidadeDetalhe extends Universidade {
  esfera: EsferaAdministrativa | null
  anoFundacao: number | null
  notaMec: NotaMec | null
  gratuita: boolean
  capaUrl: string | null
  vagasPorAno: number | null
  sobre: string[]
  modalidades: ModalidadeOfertada[]
  cursosPorArea: AreaCursos[]
  endereco: Endereco | null
  distanciaKm: number | null
  formasIngresso: FormaIngresso[]
  notaFormasIngresso: string | null
  proximoPrazo: ProximoPrazo | null
}

export type Aba = { id: string; rotulo: string }

export const Abas_universidade: Aba[] = [{ id: 'visao-geral', rotulo: 'Visão geral' }]

export const Ordem_modalidades: Modalidade[] = ['presencial', 'semipresencial', 'ead']

export const Rotulo_modalidade_detalhe: Record<Modalidade, string> = {
  presencial: 'Presencial',
  semipresencial: 'Semipresencial',
  ead: 'A distância (EaD)',
}

// Mock — Dados de exemplo, só para os blocos visuais aparecerem preenchido

const Um_dia_ms = 24 * 60 * 60 * 1000

const Areas_exemplo = [
  { area: 'Saúde', percentual: 35 },
  { area: 'Tecnologia', percentual: 29 },
  { area: 'Educação', percentual: 22 },
  { area: 'Humanas', percentual: 14 },
]

function cursosPorAreaExemplo(totalCursos: number): AreaCursos[] {
  const areas = Areas_exemplo.map(({ area, percentual }) => ({
    area,
    totalCursos: Math.floor((totalCursos * percentual) / 100),
  }))
  const resto = totalCursos - areas.reduce((soma, a) => soma + a.totalCursos, 0)
  areas[0].totalCursos += resto

  return areas.filter((a) => a.totalCursos > 0)
}

function formasIngressoExemplo(tipo: UniversidadeListagem['tipo']): FormaIngresso[] {
  const publica = tipo === 'publica'

  return [
    { nome: 'SISU', aceita: publica },
    { nome: 'Vestibular próprio', aceita: true },
    { nome: 'Transferência externa', aceita: true },
    { nome: 'PROUni e FIES', aceita: !publica },
  ]
}

const Paginas_editais_mock: Record<string, string> = {
  'u-unicesumar': 'https://www.unicesumar.edu.br/vestibular/',
  'u-uniasselvi': 'https://portal.uniasselvi.com.br/',
  'u-uem': 'https://www.vestibular.uem.br/',
  'u-utfpr': 'https://www.utfpr.edu.br/cursos/estudenautfpr/vestibular',
  'u-pucpr': 'https://www.pucpr.br/vestibular/editais/',
  'u-uel': 'https://sites.uel.br/vestibular/editais/',
  'u-unifil': 'https://unifil.br/editais-regulamentos/editais/',
  'u-usp': 'https://www.fuvest.br/vestibular-da-usp/',
  'u-ufsc': 'https://vestibularunificado2027.ufsc.br/edital/',
  'u-unisul': 'https://www.unisul.br/editais/',
}

function proximoPrazoExemplo(item: UniversidadeListagem): ProximoPrazo {
  const nomeCurto = item.sigla ?? item.nome
  const data = new Date(Date.now() + 10 * Um_dia_ms).toISOString().slice(0, 10)

  return {
    titulo: `Vestibular ${nomeCurto} 2027`,
    data,
    editalUrl: Paginas_editais_mock[item.id] ?? null,
  }
}

function montarDetalheMock(item: UniversidadeListagem): UniversidadeDetalhe {
  const publica = item.tipo === 'publica'

  return {
    ...item,
    esfera: null,
    anoFundacao: null,
    gratuita: publica,
    capaUrl: null,
    vagasPorAno: null,
    sobre: [],
    modalidades: Ordem_modalidades.map((modalidade) => ({
      modalidade,
      disponivel: item.modalidades.includes(modalidade),
      totalCursos: null,
      descricao: null,
    })),
    cursosPorArea: cursosPorAreaExemplo(item.totalCursos),
    endereco: null,
    distanciaKm: null,
    formasIngresso: formasIngressoExemplo(item.tipo),
    notaFormasIngresso: publica
      ? 'PROUni e FIES valem apenas para instituições privadas.'
      : 'O SISU vale apenas para instituições públicas.',
    proximoPrazo: proximoPrazoExemplo(item),
  }
}

export function buscarUniversidadeDetalheMock(id: string): UniversidadeDetalhe | null {
  const item = universidadesListagemMock.find((u) => u.id === id)

  return item ? montarDetalheMock(item) : null
}
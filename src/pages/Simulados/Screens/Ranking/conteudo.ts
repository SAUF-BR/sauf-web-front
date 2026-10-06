import { formatarInteiro } from '../../../../lib/utils'
import {
  diasEstudoMock,
  Periodos,
  resumirJanelaMock,
  sequenciaAtual,
  type Periodo,
} from '../../compartilhados/conteudo'

export type ParticipantePodio = {
  posicao: 1 | 2 | 3
  nome: string
  cidade: string
  uf: string
  fotoUrl: string | null
  segundos: number
  simulados: number
}

export type DadosRanking = {
  totalParticipantes: number
  podio: ParticipantePodio[]
  colocacao: { posicao: number; anterior: number | null }
  percentil: { percentual: number; regiao: string } | null
  estatisticas: { segundos: number; simulados: number; ofensiva: number }
}

const Formato_mes = new Intl.DateTimeFormat('pt-BR', { month: 'long' })

export function tituloPodio(periodo: Periodo) {
  if (periodo === 'semana') return 'Pódio da semana'
  if (periodo === 'ano') return 'Pódio do ano'
  return `Pódio de ${Formato_mes.format(new Date())}`
}

export function formatarPosicao(posicao: number) {
  return `${formatarInteiro(posicao)}º`
}

export type MudancaPosicao = { tendencia: 'subiu' | 'caiu' | 'manteve'; texto: string }

export function calcularMudancaPosicao({
  posicao,
  anterior,
}: DadosRanking['colocacao']): MudancaPosicao | null {
  if (anterior === null) return null

  const diferenca = anterior - posicao
  const posicoes = (n: number) => `${n} ${n === 1 ? 'posição' : 'posições'}`

  if (diferenca === 0) return { tendencia: 'manteve', texto: 'manteve a posição' }
  if (diferenca > 0) return { tendencia: 'subiu', texto: `subiu ${posicoes(diferenca)}` }
  return { tendencia: 'caiu', texto: `caiu ${posicoes(-diferenca)}` }
}

export function calcularProgresso({ totalParticipantes, colocacao }: DadosRanking) {
  if (totalParticipantes <= 1) return 100
  return ((totalParticipantes - colocacao.posicao) / (totalParticipantes - 1)) * 100
}

// Mock 

const Hora = 3600

const Podio_mock: Omit<ParticipantePodio, 'segundos' | 'simulados'>[] = [
  { posicao: 1, nome: 'Larissa C.', cidade: 'Maringá', uf: 'PR', fotoUrl: null },
  { posicao: 2, nome: 'Rafael M.', cidade: 'Londrina', uf: 'PR', fotoUrl: null },
  { posicao: 3, nome: 'João P.', cidade: 'Curitiba', uf: 'PR', fotoUrl: null },
]

const Desempenho_podio_mock: Record<Periodo, { segundos: number; simulados: number }[]> = {
  semana: [
    { segundos: 6 * Hora + 12 * 60, simulados: 8 },
    { segundos: 5 * Hora + 40 * 60, simulados: 7 },
    { segundos: 4 * Hora + 55 * 60, simulados: 6 },
  ],
  mes: [
    { segundos: 24 * Hora + 18 * 60, simulados: 31 },
    { segundos: 19 * Hora + 4 * 60, simulados: 26 },
    { segundos: 17 * Hora + 46 * 60, simulados: 22 },
  ],
  ano: [
    { segundos: 241 * Hora + 30 * 60, simulados: 298 },
    { segundos: 203 * Hora + 12 * 60, simulados: 251 },
    { segundos: 187 * Hora + 5 * 60, simulados: 236 },
  ],
}

const Colocacao_mock: Record<
  Periodo,
  { totalParticipantes: number; posicao: number; anterior: number | null; simulados: number }
> = {
  semana: { totalParticipantes: 1236, posicao: 21, anterior: 25, simulados: 4 },
  mes: { totalParticipantes: 1842, posicao: 38, anterior: 52, simulados: 14 },
  ano: { totalParticipantes: 3507, posicao: 112, anterior: null, simulados: 61 },
}

export function montarRankingMock(periodo: Periodo): DadosRanking {
  const colocacao = Colocacao_mock[periodo]
  const tempo = resumirJanelaMock(diasEstudoMock, 0, Periodos[periodo].dias)

  return {
    totalParticipantes: colocacao.totalParticipantes,
    podio: Podio_mock.map((participante, indice) => ({
      ...participante,
      ...Desempenho_podio_mock[periodo][indice],
    })),
    colocacao: { posicao: colocacao.posicao, anterior: colocacao.anterior },
    percentil: {
      percentual: Math.max(1, Math.round((colocacao.posicao / colocacao.totalParticipantes) * 100)),
      regiao: 'no Paraná',
    },
    estatisticas: {
      segundos: tempo.segundos,
      simulados: colocacao.simulados,
      ofensiva: sequenciaAtual(diasEstudoMock),
    },
  }
}
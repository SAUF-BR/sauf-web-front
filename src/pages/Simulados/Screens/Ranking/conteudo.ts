import { formatarInteiro } from '../../../../lib/utils'
import type { DadosRanking } from '../../../../features/simulados'
import type { Periodo } from '../../compartilhados/conteudo'

export type { DadosRanking, ParticipantePodio } from '../../../../features/simulados'

export type Colocacao = NonNullable<DadosRanking['colocacao']>

// O ranking usa o calendário: a semana de segunda a domingo, o mês e o ano correntes
export function tituloPodio(periodo: Periodo, inicioJanela: string) {
  const [ano, mes] = inicioJanela.split('-').map(Number)
  if (periodo === 'semana') return 'Pódio da semana'
  if (periodo === 'ano') return `Pódio de ${ano}`
  const nomeMes = new Date(ano, mes - 1, 1).toLocaleDateString('pt-BR', { month: 'long' })
  return `Pódio de ${nomeMes}`
}

export function formatarPosicao(posicao: number) {
  return `${formatarInteiro(posicao)}º`
}

// "Brasil" ou a sigla da UF do perfil
export function descreverRegiao(regiao: string) {
  return regiao === 'Brasil' ? 'no Brasil' : `no seu estado (${regiao})`
}

export type MudancaPosicao = { tendencia: 'subiu' | 'caiu' | 'manteve'; texto: string }

export function calcularMudancaPosicao({ posicao, anterior }: Colocacao): MudancaPosicao | null {
  if (anterior === null) return null

  const diferenca = anterior - posicao
  const posicoes = (n: number) => `${n} ${n === 1 ? 'posição' : 'posições'}`

  if (diferenca === 0) return { tendencia: 'manteve', texto: 'manteve a posição' }
  if (diferenca > 0) return { tendencia: 'subiu', texto: `subiu ${posicoes(diferenca)}` }
  return { tendencia: 'caiu', texto: `caiu ${posicoes(-diferenca)}` }
}

export function calcularProgresso(colocacao: Colocacao, totalParticipantes: number) {
  if (totalParticipantes <= 1) return 100
  return ((totalParticipantes - colocacao.posicao) / (totalParticipantes - 1)) * 100
}

// Posições do pódio (até 3) que existem no ranking mas cujo dono não aparece em público
export function posicoesPrivadas({ podio, totalParticipantes }: DadosRanking) {
  const visiveis = new Set(podio.map((participante) => participante.posicao))
  return [1, 2, 3].filter((posicao) => posicao <= totalParticipantes && !visiveis.has(posicao))
}

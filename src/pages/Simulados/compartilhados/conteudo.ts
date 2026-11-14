import { ROTAS } from '../../../routes/paths'
import type { Comparativo, DiaEstudo, Periodo } from '../../../features/simulados/types'

// Tipos únicos, definidos junto do contrato da API
export type { Comparativo, DiaEstudo, Periodo }

// Tipos, constantes e formatações comuns às abas de Simulados
// (Simulados, Meu acompanhamento, Cronômetro e Ranking)

export type AbaSimulados = 'simulados' | 'acompanhamento' | 'cronometro' | 'ranking'

export const Abas_simulados: { id: AbaSimulados; rotulo: string; rota: string }[] = [
  { id: 'simulados', rotulo: 'Simulados', rota: ROTAS.simulados },  
  { id: 'acompanhamento', rotulo: 'Meu acompanhamento', rota: ROTAS.simuladosAcompanhamento },
  { id: 'cronometro', rotulo: 'Cronômetro', rota: ROTAS.simuladosCronometro },
  { id: 'ranking', rotulo: 'Ranking', rota: ROTAS.simuladosRanking },
]

export const Selo_plano = 'Plano premium'

export const Ordem_periodos: Periodo[] = ['semana', 'mes', 'ano']

export const Periodos: Record<Periodo, { rotulo: string; rotuloAnterior: string; dias: number }> = {
  semana: { rotulo: '7 dias', rotuloAnterior: 'Semana anterior', dias: 7 },
  mes: { rotulo: 'Último mês', rotuloAnterior: 'Mês anterior', dias: 30 },
  ano: { rotulo: 'Último ano', rotuloAnterior: 'Ano anterior', dias: 365 },
}

export const Periodo_padrao: Periodo = 'mes'

// ?periodo=ano → 'ano'; ausente ou inválido → o padrão
export function lerPeriodo(valor: string | null): Periodo {
  return Ordem_periodos.find((periodo) => periodo === valor) ?? Periodo_padrao
}

// 68.5 → "68,5%" · 70 → "70%"
export function formatarPorcentagem(valor: number) {
  return `${valor.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`
}

// Diferença entre porcentagens, em pontos percentuais: 6.5 → "6,5 p.p."
export function formatarPontos(valor: number) {
  return `${valor.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} p.p.`
}

export type Variacao = {
  texto: string
  tendencia: 'alta' | 'baixa' | 'estavel'
  sentido: 'positivo' | 'negativo' | 'neutro'
}

// Sem um dos lados (período sem dados), não há variação para mostrar
export function calcularVariacao(
  { atual, anterior }: { atual: number | null; anterior: number | null },
  formatar: (valor: number) => string,
  menorEhMelhor = false,
): Variacao | null {
  if (atual === null || anterior === null) return null

  const diferenca = atual - anterior
  if (diferenca === 0) return { texto: formatar(0), tendencia: 'estavel', sentido: 'neutro' }

  const subiu = diferenca > 0

  return {
    texto: formatar(Math.abs(diferenca)),
    tendencia: subiu ? 'alta' : 'baixa',
    sentido: subiu !== menorEhMelhor ? 'positivo' : 'negativo',
  }
}

// 41520 → "11h32" · 2280 → "38min"
export function formatarHoras(segundos: number) {
  const minutosTotais = Math.round(segundos / 60)
  const horas = Math.floor(minutosTotais / 60)
  const minutos = minutosTotais % 60

  if (horas === 0) return `${minutos}min`
  return `${horas}h${String(minutos).padStart(2, '0')}`
}

export function formatarMinutosSegundos(segundos: number) {
  const total = Math.round(segundos)
  const minutos = Math.floor(total / 60)
  const resto = total % 60

  if (minutos === 0) return `${resto}s`
  return `${minutos}m${String(resto).padStart(2, '0')}`
}

export function formatarDias(dias: number) {
  return `${dias} ${dias === 1 ? 'dia' : 'dias'}`
}

export type Sequencia = { dias: number; fim: string | null }

export function maiorSequencia(dias: DiaEstudo[]): Sequencia {
  let melhor: Sequencia = { dias: 0, fim: null }
  let atual = 0

  for (const dia of dias) {
    atual = dia.segundos > 0 ? atual + 1 : 0
    if (atual > melhor.dias) melhor = { dias: atual, fim: dia.data }
  }

  return melhor
}

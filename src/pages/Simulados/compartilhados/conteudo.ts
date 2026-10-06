import { ROTAS } from '../../../routes/paths'

// Tipos, constantes e formatações comuns às abas de Simulados
// (Simulados, Meu acompanhamento, Cronômetro e Ranking)

export type AbaSimulados = 'simulados' | 'acompanhamento' | 'cronometro' | 'ranking'

export const Abas_simulados: { id: AbaSimulados; rotulo: string; rota: string }[] = [
  { id: 'simulados', rotulo: 'Simulados', rota: ROTAS.simuladosMain },
  { id: 'acompanhamento', rotulo: 'Meu acompanhamento', rota: ROTAS.simuladosAcompanhamento },
  { id: 'cronometro', rotulo: 'Cronômetro', rota: ROTAS.simuladosCronometro },
  { id: 'ranking', rotulo: 'Ranking', rota: ROTAS.simuladosRanking },
]

export const Selo_plano = 'Plano premium'

export type Periodo = 'semana' | 'mes' | 'ano'

export const Ordem_periodos: Periodo[] = ['semana', 'mes', 'ano']

export const Periodos: Record<Periodo, { rotulo: string; rotuloAnterior: string; dias: number }> = {
  semana: { rotulo: '7 dias', rotuloAnterior: 'Semana anterior', dias: 7 },
  mes: { rotulo: 'Último mês', rotuloAnterior: 'Mês anterior', dias: 30 },
  ano: { rotulo: 'Último ano', rotuloAnterior: 'Ano anterior', dias: 365 },
}

export const Periodo_padrao: Periodo = 'mes'

export type Comparativo = { atual: number; anterior: number | null }

export type Variacao = {
  texto: string
  tendencia: 'alta' | 'baixa' | 'estavel'
  sentido: 'positivo' | 'negativo' | 'neutro'
}

export function calcularVariacao(
  { atual, anterior }: Comparativo,
  formatar: (valor: number) => string,
  menorEhMelhor = false,
): Variacao | null {
  if (anterior === null) return null

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

export type DiaEstudo = { data: string; segundos: number }

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
export function sequenciaAtual(dias: DiaEstudo[]) {
  let indice = dias.length - 1
  if (dias[indice]?.segundos === 0) indice--

  let total = 0
  while (indice >= 0 && dias[indice].segundos > 0) {
    total++
    indice--
  }

  return total
}

// Mock 

function dataIsoDiasAtras(dias: number) {
  const hoje = new Date()
  const data = new Date(Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - dias))

  return data.toISOString().slice(0, 10)
}
function criarSorteio(semente: number) {
  let valor = semente

  return () => {
    valor = (valor * 1664525 + 1013904223) % 4294967296
    return valor / 4294967296
  }
}

function gerarDiasEstudoMock(): DiaEstudo[] {
  const sortear = criarSorteio(595)
  const minutosSorteados = () => 15 + Math.round(sortear() * 65)

  const minutos = Array.from({ length: 365 }, () => (sortear() < 0.22 ? minutosSorteados() : 0))

  const preencher = (de: number, ate: number) => {
    for (let i = de; i <= ate; i++) minutos[i] = minutos[i] || minutosSorteados()
    if (de > 0) minutos[de - 1] = 0
    minutos[ate + 1] = 0
  }

  preencher(0, 5)
  preencher(50, 61)

  return minutos
    .map((min, diasAtras) => ({ data: dataIsoDiasAtras(diasAtras), segundos: min * 60 }))
    .reverse()
}

export const diasEstudoMock = gerarDiasEstudoMock()

export function resumirJanelaMock(dias: DiaEstudo[], inicio: number, fim: number) {
  const janela = dias.slice(Math.max(dias.length - fim, 0), dias.length - inicio)

  return {
    segundos: janela.reduce((soma, dia) => soma + dia.segundos, 0),
    diasAtivos: janela.filter((dia) => dia.segundos > 0).length,
  }
}
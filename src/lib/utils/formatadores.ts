const LOCALE = 'pt-BR'

// 712.4 → "712,4"
export function formatarNumero(valor: number, casasDecimais = 1) {
  return new Intl.NumberFormat(LOCALE, {
    minimumFractionDigits: casasDecimais,
    maximumFractionDigits: casasDecimais,
  }).format(valor)
}

// 1842 → "1.842"
export function formatarInteiro(valor: number) {
  return new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 0 }).format(valor)
}

// 489 → "R$ 489" · 489.9 → "R$ 489,90"
export function formatarMoeda(valor: number) {
  const inteiro = Number.isInteger(valor)

  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: inteiro ? 0 : 2,
    maximumFractionDigits: inteiro ? 0 : 2,
  }).format(valor)
}

/**
 * Data ISO (somente data, ex.: "2026-08-28") → { dia: "28", mes: "AGO" }.
 * Usa UTC para que a data não "volte um dia" no fuso do Brasil (ADR-010).
 */
export function formatarDiaMes(dataIso: string) {
  const data = new Date(dataIso)

  const dia = new Intl.DateTimeFormat(LOCALE, { day: '2-digit', timeZone: 'UTC' }).format(data)
  const mes = new Intl.DateTimeFormat(LOCALE, { month: 'short', timeZone: 'UTC' })
    .format(data)
    .replace('.', '')
    .toUpperCase()

  return { dia, mes }
}

// Data ISO (somente data, ex.: "2026-10-02") → "2 de outubro"
// · { comAno: true } → "2 de outubro de 2026"
// · { comDia: false, comAno: true } → "outubro de 2026"
// UTC pelo mesmo motivo do formatarDiaMes.
export function formatarDataExtenso(dataIso: string, { comDia = true, comAno = false } = {}) {
  return new Intl.DateTimeFormat(LOCALE, {
    day: comDia ? 'numeric' : undefined,
    month: 'long',
    year: comAno ? 'numeric' : undefined,
    timeZone: 'UTC',
  }).format(new Date(dataIso))
}

export function obterIniciais(nomeCompleto: string) {
  const partes = nomeCompleto.trim().split(/\s+/)
  const primeira = partes[0]?.[0] ?? ''
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : ''

  return `${primeira}${ultima}`.toUpperCase()
}

export function obterPrimeiroNome(nomeCompleto: string) {
  return nomeCompleto.trim().split(/\s+/)[0] ?? ''
}

// "2026-09-02T14:30:00Z" → "2 de setembro de 2026" (no fuso do navegador)
export function formatarData(dataHoraIso: string) {
  return new Intl.DateTimeFormat(LOCALE, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dataHoraIso))
}

// 8280 → "2h18" · 2820 → "47 min" · 45 → "45s"
export function formatarDuracao(segundos: number) {
  const total = Math.max(0, Math.round(segundos))

  if (total < 60) return `${total}s`

  const minutos = Math.round(total / 60)
  if (minutos < 60) return `${minutos} min`

  return `${Math.floor(minutos / 60)}h${String(minutos % 60).padStart(2, '0')}`
}

// 62 → "1m02s" · 45 → "45s"
export function formatarTempoQuestao(segundos: number) {
  const total = Math.max(0, Math.round(segundos))
  const minutos = Math.floor(total / 60)
  const resto = total % 60

  if (minutos === 0) return `${resto}s`
  return `${minutos}m${String(resto).padStart(2, '0')}s`
}

// (1, 'questão', 'questões') → "1 questão" · (10, ...) → "10 questões"
export function formatarQuantidade(valor: number, singular: string, plural: string) {
  return `${formatarInteiro(valor)} ${valor === 1 ? singular : plural}`
}

// 150 → "02:30"
export function formatarCronometro(segundos: number) {
  const total = Math.max(0, Math.round(segundos))
  const minutos = Math.floor(total / 60)

  return `${String(minutos).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

// 72 → "72%" · 72.5 → "72,5%"
export function formatarPorcentagem(valor: number) {
  return `${new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 1 }).format(valor)}%`
}

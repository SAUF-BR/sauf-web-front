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

const LOCALE = 'pt-BR'

export type AnoMes = { ano: number; mes: number }

export type DiaDaGrade = {
  dataIso: string
  dia: number
  doMesAtual: boolean
}

function paraIso(data: Date) {
  return data.toISOString().slice(0, 10)
}

export function obterHojeIso() {
  const hoje = new Date()
  const mes = String(hoje.getMonth() + 1).padStart(2, '0')
  const dia = String(hoje.getDate()).padStart(2, '0')

  return `${hoje.getFullYear()}-${mes}-${dia}`
}

export function obterAnoMes(dataIso: string): AnoMes {
  return { ano: Number(dataIso.slice(0, 4)), mes: Number(dataIso.slice(5, 7)) }
}

export function lerAnoMes(valor: string | null): AnoMes | null {
  const partes = valor?.match(/^(\d{4})-(\d{2})$/)
  if (!partes) return null

  const ano = Number(partes[1])
  const mes = Number(partes[2])

  return mes >= 1 && mes <= 12 ? { ano, mes } : null
}

export function formatarAnoMesIso({ ano, mes }: AnoMes) {
  return `${ano}-${String(mes).padStart(2, '0')}`
}

export function somarMeses({ ano, mes }: AnoMes, quantidade: number): AnoMes {
  const data = new Date(Date.UTC(ano, mes - 1 + quantidade, 1))
  return { ano: data.getUTCFullYear(), mes: data.getUTCMonth() + 1 }
}

export function formatarMesAno({ ano, mes }: AnoMes) {
  const texto = new Intl.DateTimeFormat(LOCALE, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(ano, mes - 1, 1)))

  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

export function formatarDiaPorExtenso(dataIso: string) {
  return new Intl.DateTimeFormat(LOCALE, {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  }).format(new Date(dataIso))
}

export function obterDiasDaSemana() {
  const formato = new Intl.DateTimeFormat(LOCALE, { weekday: 'short', timeZone: 'UTC' })

  // 04/01/1970 foi um domingo
  return Array.from({ length: 7 }, (_, indice) =>
    formato
      .format(new Date(Date.UTC(1970, 0, 4 + indice)))
      .replace('.', '')
      .toUpperCase(),
  )
}

export function montarGradeDoMes({ ano, mes }: AnoMes): DiaDaGrade[] {
  const primeiroDia = new Date(Date.UTC(ano, mes - 1, 1))
  const totalDias = new Date(Date.UTC(ano, mes, 0)).getUTCDate()
  const diasAntes = primeiroDia.getUTCDay()
  const totalCelulas = Math.ceil((diasAntes + totalDias) / 7) * 7

  return Array.from({ length: totalCelulas }, (_, indice) => {
    const data = new Date(Date.UTC(ano, mes - 1, 1 - diasAntes + indice))

    return {
      dataIso: paraIso(data),
      dia: data.getUTCDate(),
      doMesAtual: data.getUTCMonth() === mes - 1,
    }
  })
}

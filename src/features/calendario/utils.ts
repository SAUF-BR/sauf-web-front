import type { EventoCalendario, TipoEvento } from './types'

export const TIPOS_EVENTO: TipoEvento[] = ['inscricao', 'prova', 'resultado', 'feira']

export const ROTULO_TIPO_EVENTO: Record<TipoEvento, string> = {
  inscricao: 'Inscrições',
  prova: 'Provas',
  resultado: 'Resultados',
  feira: 'Feiras e eventos',
}

export function contarEventosPorTipo(eventos: EventoCalendario[]) {
  const contagem: Record<TipoEvento, number> = { inscricao: 0, prova: 0, resultado: 0, feira: 0 }

  for (const evento of eventos) {
    contagem[evento.tipo] += 1
  }

  return contagem
}

export function agruparEventosPorDia(eventos: EventoCalendario[]) {
  const ordenados = [...eventos].sort(
    (a, b) => TIPOS_EVENTO.indexOf(a.tipo) - TIPOS_EVENTO.indexOf(b.tipo),
  )
  const porDia = new Map<string, EventoCalendario[]>()

  for (const evento of ordenados) {
    porDia.set(evento.data, [...(porDia.get(evento.data) ?? []), evento])
  }

  return porDia
}

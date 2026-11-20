import { formatarDataExtenso, type AnoMes } from '../../lib/utils'
import type { EventoCalendario, TipoEvento } from './types'

export const TIPOS_EVENTO: TipoEvento[] = ['inscricao', 'prova', 'resultado', 'feira', 'outro']

export const ROTULO_TIPO_EVENTO: Record<TipoEvento, string> = {
  inscricao: 'Inscrições',
  prova: 'Provas',
  resultado: 'Resultados',
  feira: 'Feiras e eventos',
  outro: 'Outras datas',
}

// Eventos sem universidade (ENEM, ProUni) ficam juntos no filtro
export const INSTITUICAO_NACIONAL = 'nacional'
export const ROTULO_NACIONAL = 'Nacionais (ENEM, ProUni)'

export function chaveInstituicao(evento: EventoCalendario) {
  return evento.instituicao?.sigla ?? evento.instituicao?.nome ?? INSTITUICAO_NACIONAL
}

export function contarEventosPorTipo(eventos: EventoCalendario[]) {
  const contagem: Record<TipoEvento, number> = {
    inscricao: 0,
    prova: 0,
    resultado: 0,
    feira: 0,
    outro: 0,
  }

  for (const evento of eventos) {
    contagem[evento.tipo] += 1
  }

  return contagem
}

/** Nacionais primeiro, depois as universidades em ordem alfabética, com a contagem de cada uma. */
export function contarEventosPorInstituicao(eventos: EventoCalendario[]) {
  const contagem = new Map<string, number>()

  for (const evento of eventos) {
    const chave = chaveInstituicao(evento)
    contagem.set(chave, (contagem.get(chave) ?? 0) + 1)
  }

  return [...contagem.entries()]
    .map(([chave, total]) => ({ chave, total }))
    .sort((a, b) => {
      if (a.chave === INSTITUICAO_NACIONAL) return -1
      if (b.chave === INSTITUICAO_NACIONAL) return 1
      return a.chave.localeCompare(b.chave, 'pt-BR')
    })
}

function limitesDoMes({ ano, mes }: AnoMes) {
  const primeiro = new Date(Date.UTC(ano, mes - 1, 1)).toISOString().slice(0, 10)
  const ultimo = new Date(Date.UTC(ano, mes, 0)).toISOString().slice(0, 10)
  return { primeiro, ultimo }
}

function ultimoDia(evento: EventoCalendario) {
  return evento.fim ?? evento.inicio
}

function ordenar(a: EventoCalendario, b: EventoCalendario) {
  return (
    a.inicio.localeCompare(b.inicio) ||
    TIPOS_EVENTO.indexOf(a.tipo) - TIPOS_EVENTO.indexOf(b.tipo) ||
    a.titulo.localeCompare(b.titulo, 'pt-BR')
  )
}

/** Eventos com pelo menos um dia no mês, em ordem de início. */
export function eventosDoMes(eventos: EventoCalendario[], anoMes: AnoMes) {
  const { primeiro, ultimo } = limitesDoMes(anoMes)
  return eventos.filter((e) => e.inicio <= ultimo && ultimoDia(e) >= primeiro).sort(ordenar)
}

/**
 * Cada dia do mês com os eventos que acontecem nele: um período (inscrições de 17/08 a 23/09)
 * aparece em todos os dias dele que caem no mês.
 */
export function agruparEventosPorDia(eventos: EventoCalendario[], anoMes: AnoMes) {
  const { primeiro, ultimo } = limitesDoMes(anoMes)
  const porDia = new Map<string, EventoCalendario[]>()

  for (const evento of eventosDoMes(eventos, anoMes)) {
    const de = evento.inicio > primeiro ? evento.inicio : primeiro
    const ate = ultimoDia(evento) < ultimo ? ultimoDia(evento) : ultimo
    const dia = new Date(`${de}T00:00:00Z`)
    const fim = new Date(`${ate}T00:00:00Z`)

    while (dia <= fim) {
      const iso = dia.toISOString().slice(0, 10)
      porDia.set(iso, [...(porDia.get(iso) ?? []), evento])
      dia.setUTCDate(dia.getUTCDate() + 1)
    }
  }

  return porDia
}

/** "6 de dezembro de 2026" ou "17 de agosto a 23 de setembro de 2026" (ano só no fim, se for o mesmo). */
export function formatarPeriodo(evento: Pick<EventoCalendario, 'inicio' | 'fim'>) {
  if (!evento.fim || evento.fim === evento.inicio) {
    return formatarDataExtenso(evento.inicio, { comAno: true })
  }
  const mesmoAno = evento.inicio.slice(0, 4) === evento.fim.slice(0, 4)
  const inicio = formatarDataExtenso(evento.inicio, { comAno: !mesmoAno })
  return `${inicio} a ${formatarDataExtenso(evento.fim, { comAno: true })}`
}

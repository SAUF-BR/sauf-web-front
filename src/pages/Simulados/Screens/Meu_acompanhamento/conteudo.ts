import type { BlocoConstancia, Periodo, PontoEvolucao } from '../../../../features/simulados'
import { formatarPontos, formatarPorcentagem } from '../../compartilhados/conteudo'

const Fuso = 'America/Sao_Paulo'

// "2026-11-10T21:04:00-03:00" → "10/11"
export function rotuloDataHora(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', timeZone: Fuso })
}

// "2026-11-13" sem passar por UTC (senão vira o dia 12 no Brasil)
function dataLocal(iso: string) {
  const [ano, mes, dia] = iso.split('-').map(Number)
  return new Date(ano, mes - 1, dia)
}

export function rotuloDia(iso: string) {
  return dataLocal(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
}

// Semana: "seg" · Mês: "S1" a "S4" · Ano: "nov"
export function rotuloBloco(bloco: BlocoConstancia, indice: number, periodo: Periodo) {
  const data = dataLocal(bloco.inicio)
  if (periodo === 'semana') return data.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')
  if (periodo === 'mes') return `S${indice + 1}`
  return data.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')
}

export function descreverBloco(bloco: BlocoConstancia, periodo: Periodo) {
  const data = dataLocal(bloco.inicio)
  if (periodo === 'semana') {
    return data.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' })
  }
  if (periodo === 'mes') return `Semana de ${rotuloDia(bloco.inicio)}`
  return data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
}

export const Subtitulo_constancia: Record<Periodo, string> = {
  semana: 'Dias com pelo menos uma questão nos últimos 7 dias',
  mes: 'Dias com pelo menos uma questão em cada uma das últimas 4 semanas',
  ano: 'Dias com pelo menos uma questão em cada mês',
}

export function comentarioEvolucao(pontos: PontoEvolucao[], mediaPlataforma: number | null) {
  const partes: string[] = []
  if (pontos.length >= 2) {
    const diferenca = pontos[pontos.length - 1].aproveitamento - pontos[0].aproveitamento
    if (diferenca === 0) partes.push('Seu último simulado ficou igual ao primeiro do período.')
    else {
      const lado = diferenca > 0 ? 'acima' : 'abaixo'
      partes.push(`Seu último simulado ficou ${formatarPontos(Math.abs(diferenca))} ${lado} do primeiro do período.`)
    }
  } else if (pontos.length === 1) {
    partes.push(`Seu simulado do período: ${formatarPorcentagem(pontos[0].aproveitamento)} de acertos.`)
  }
  if (mediaPlataforma !== null) partes.push(`Média da plataforma: ${formatarPorcentagem(mediaPlataforma)}.`)
  return partes.join(' ')
}

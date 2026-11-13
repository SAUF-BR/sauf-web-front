import {
    maiorSequencia,
    type Comparativo,
    type DiaEstudo,
  } from '../../compartilhados/conteudo'
  import type {
    DadosCronometro,
    HorasSemana,
    RitmoCategoria,
    TamanhoSimulado,
    TempoConfiguracao,
  } from '../../../../features/simulados/types'

  // Tipos únicos, definidos junto do contrato da API
  export type { DadosCronometro, HorasSemana, RitmoCategoria, TamanhoSimulado, TempoConfiguracao }
  
  export const Rotulo_tamanho: Record<TamanhoSimulado, string> = {
    rapida: 'Rápida',
    media: 'Média',
    longa: 'Longa',
  }
  
  export function calcularMediaDiaria({ tempoTotal, diasAtivos }: DadosCronometro): Comparativo {
    const media = (tempo: number | null, dias: number | null) =>
      tempo === null || !dias ? null : tempo / dias
  
    return {
      atual: media(tempoTotal.atual, diasAtivos.atual) ?? 0,
      anterior: media(tempoTotal.anterior, diasAtivos.anterior),
    }
  }
  
  export type NivelDia = 0 | 1 | 2 | 3 | 4
  
  export function nivelDoDia(segundos: number): NivelDia {
    const minutos = segundos / 60
  
    if (minutos <= 0) return 0
    if (minutos < 20) return 1
    if (minutos < 40) return 2
    if (minutos < 60) return 3
    return 4
  }
  
  export type SemanaQuadro = { rotuloMes: string | null; dias: (DiaEstudo | null)[] }
  
  const Formato_mes = new Intl.DateTimeFormat('pt-BR', { month: 'short', timeZone: 'UTC' })
  
  function rotuloMes(dataIso: string) {
    return Formato_mes.format(new Date(dataIso)).replace('.', '')
  }
  
  function diaDaSemana(dataIso: string) {
    return (new Date(dataIso).getUTCDay() + 6) % 7
  }
  
  export function montarSemanas(dias: DiaEstudo[]): SemanaQuadro[] {
    if (dias.length === 0) return []
  
    const posicoes: (DiaEstudo | null)[] = [
      ...Array<null>(diaDaSemana(dias[0].data)).fill(null),
      ...dias,
    ]
  
    const semanas: SemanaQuadro[] = []
    for (let i = 0; i < posicoes.length; i += 7) {
      const semanaDias = posicoes.slice(i, i + 7)
      while (semanaDias.length < 7) semanaDias.push(null)
  
      const inicioMes = semanaDias.find((dia) => dia?.data.endsWith('-01'))
      semanas.push({ rotuloMes: inicioMes ? rotuloMes(inicioMes.data) : null, dias: semanaDias })
    }
  
    return semanas
  }
  
  const Nomes_dias_semana = [
    'segunda-feira',
    'terça-feira',
    'quarta-feira',
    'quinta-feira',
    'sexta-feira',
    'sábado',
    'domingo',
  ]
  
  const Formato_mes_longo = new Intl.DateTimeFormat('pt-BR', { month: 'long', timeZone: 'UTC' })
  
  export function resumirQuadro(dias: DiaEstudo[]) {
    const sequencia = maiorSequencia(dias)
  
    const tempoPorDiaSemana = Array<number>(7).fill(0)
    for (const dia of dias) tempoPorDiaSemana[diaDaSemana(dia.data)] += dia.segundos
  
    const maiorTempo = Math.max(...tempoPorDiaSemana)
  
    return {
      diasComEstudo: dias.filter((dia) => dia.segundos > 0).length,
      melhorSequencia: sequencia.fim
        ? { dias: sequencia.dias, mes: Formato_mes_longo.format(new Date(sequencia.fim)) }
        : null,
      diaMaisProdutivo:
        maiorTempo > 0 ? Nomes_dias_semana[tempoPorDiaSemana.indexOf(maiorTempo)] : null,
    }
  }

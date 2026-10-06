import {
    diasEstudoMock,
    maiorSequencia,
    Periodos,
    resumirJanelaMock,
    sequenciaAtual,
    type Comparativo,
    type DiaEstudo,
    type Periodo,
  } from '../../compartilhados/conteudo'
  
  export type TamanhoSimulado = 'rapida' | 'media' | 'longa'
  
  export type TempoConfiguracao = {
    tamanho: TamanhoSimulado
    questoes: number
    simulados: number
    mediaSegundos: number
    totalSegundos: number
    segundosPorQuestao: number
    observacao: string | null
  }
  
  export type HorasSemana = { rotulo: string; segundos: number }
  
  export type RitmoCategoria = { categoria: string; segundosPorQuestao: number }
  
  export type DadosCronometro = {
    tempoTotal: Comparativo
    tempoMedioQuestao: Comparativo
    diasAtivos: Comparativo
    ofensiva: { atual: number; recorde: number }
    dias: DiaEstudo[]
    porConfiguracao: TempoConfiguracao[]
    horasPorSemana: HorasSemana[]
    ritmoPorCategoria: RitmoCategoria[]
  }
  
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

  // Mock 
  const Tempo_medio_questao_mock: Record<Periodo, Comparativo> = {
    semana: { atual: 161, anterior: 172 },
    mes: { atual: 168, anterior: 190 },
    ano: { atual: 175, anterior: null },
  }
  
  const Por_configuracao_mock: TempoConfiguracao[] = [
    {
      tamanho: 'rapida',
      questoes: 10,
      simulados: 4,
      mediaSegundos: 1440,
      totalSegundos: 5760,
      segundosPorQuestao: 144,
      observacao: null,
    },
    {
      tamanho: 'media',
      questoes: 20,
      simulados: 7,
      mediaSegundos: 2940,
      totalSegundos: 20580,
      segundosPorQuestao: 147,
      observacao: null,
    },
    {
      tamanho: 'longa',
      questoes: 30,
      simulados: 3,
      mediaSegundos: 5040,
      totalSegundos: 15180,
      segundosPorQuestao: 168,
      observacao: 'ritmo mais lento no fim da prova',
    },
  ]
  
  const Ritmo_por_categoria_mock: RitmoCategoria[] = [
    { categoria: 'Física', segundosPorQuestao: 221 },
    { categoria: 'Química', segundosPorQuestao: 182 },
    { categoria: 'Matemática', segundosPorQuestao: 156 },
    { categoria: 'Português', segundosPorQuestao: 118 },
  ]
  
  export function montarCronometroMock(periodo: Periodo): DadosCronometro {
    const dias = diasEstudoMock
    const duracao = Periodos[periodo].dias
  
    const atual = resumirJanelaMock(dias, 0, duracao)
    const anterior = periodo === 'ano' ? null : resumirJanelaMock(dias, duracao, duracao * 2)
  
    return {
      tempoTotal: { atual: atual.segundos, anterior: anterior?.segundos ?? null },
      tempoMedioQuestao: Tempo_medio_questao_mock[periodo],
      diasAtivos: { atual: atual.diasAtivos, anterior: anterior?.diasAtivos ?? null },
      ofensiva: { atual: sequenciaAtual(dias), recorde: maiorSequencia(dias).dias },
      dias,
      porConfiguracao: Por_configuracao_mock,
      horasPorSemana: [3, 2, 1, 0].map((semanasAtras, indice) => ({
        rotulo: `S${indice + 1}`,
        segundos: resumirJanelaMock(dias, semanasAtras * 7, semanasAtras * 7 + 7).segundos,
      })),
      ritmoPorCategoria: Ritmo_por_categoria_mock,
    }
  }
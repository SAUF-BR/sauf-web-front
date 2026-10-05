import type {
  AfinidadeArea,
  AreaVocacional,
  Pergunta,
  ProgressoTeste,
  Respostas,
} from './types'

const MINUTOS_ESTIMADOS = 12
const TOTAL_PERGUNTAS_ESTIMADO = 20

export const AREAS_VOCACIONAIS: AreaVocacional[] = ['tecnologia', 'saude', 'educacao']

export const ROTULO_AREA: Record<AreaVocacional, string> = {
  tecnologia: 'Tecnologia',
  saude: 'Saúde',
  educacao: 'Educação',
}

export type StatusPergunta = 'respondida' | 'atual' | 'pendente'

export function temProgressoSalvo(progresso: ProgressoTeste | undefined) {
  return !!progresso && Object.keys(progresso.respostas).length > 0
}

export function contarRespondidas(respostas: Respostas) {
  return Object.values(respostas).filter(Boolean).length
}

/** Primeira pergunta ainda não vista (nem respondida, nem pulada). */
export function obterNumeroParaContinuar(perguntas: Pergunta[], respostas: Respostas) {
  const proxima = perguntas.find((pergunta) => !(pergunta.id in respostas))
  return proxima?.numero ?? perguntas.length
}

export function obterStatusPergunta(
  pergunta: Pergunta,
  numeroAtual: number,
  respostas: Respostas,
): StatusPergunta {
  if (pergunta.numero === numeroAtual) return 'atual'
  return respostas[pergunta.id] ? 'respondida' : 'pendente'
}

export function estimarMinutosRestantes(perguntasRestantes: number) {
  return Math.ceil((perguntasRestantes * MINUTOS_ESTIMADOS) / TOTAL_PERGUNTAS_ESTIMADO)
}

/**
 * Percentual de respostas em cada área, da maior para a menor. O arredondamento
 * distribui as sobras pelas maiores frações para a soma fechar sempre em 100%.
 */
export function calcularAfinidades(perguntas: Pergunta[], respostas: Respostas): AfinidadeArea[] {
  const contagem = Object.fromEntries(AREAS_VOCACIONAIS.map((area) => [area, 0])) as Record<
    AreaVocacional,
    number
  >

  for (const pergunta of perguntas) {
    const escolhida = pergunta.alternativas.find(
      (alternativa) => alternativa.id === respostas[pergunta.id],
    )
    if (escolhida) contagem[escolhida.area] += 1
  }

  const total = Object.values(contagem).reduce((soma, valor) => soma + valor, 0)
  if (total === 0) return AREAS_VOCACIONAIS.map((area) => ({ area, percentual: 0 }))

  const parciais = AREAS_VOCACIONAIS.map((area) => {
    const exato = (contagem[area] / total) * 100
    return { area, percentual: Math.floor(exato), fracao: exato % 1 }
  })

  let sobra = 100 - parciais.reduce((soma, { percentual }) => soma + percentual, 0)
  for (const parcial of [...parciais].sort((a, b) => b.fracao - a.fracao)) {
    if (sobra === 0) break
    parcial.percentual += 1
    sobra -= 1
  }

  return parciais
    .map(({ area, percentual }) => ({ area, percentual }))
    .sort((a, b) => b.percentual - a.percentual)
}

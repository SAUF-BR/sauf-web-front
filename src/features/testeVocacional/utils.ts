import type { Pergunta, ProgressoTeste, Respostas } from './types'

const MINUTOS_ESTIMADOS = 12
const TOTAL_PERGUNTAS_ESTIMADO = 20

export type StatusPergunta = 'respondida' | 'atual' | 'pendente'

export function temProgressoSalvo(progresso: ProgressoTeste | undefined) {
  return !!progresso && Object.keys(progresso.respostas).length > 0
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

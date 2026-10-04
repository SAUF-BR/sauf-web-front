import type { Notificacao } from './types'

export function ordenarMaisRecentes(notificacoes: Notificacao[]) {
  return [...notificacoes].sort(
    (a, b) => new Date(b.criadaEm).getTime() - new Date(a.criadaEm).getTime(),
  )
}

export function contarNaoLidas(notificacoes: Notificacao[]) {
  return notificacoes.filter((notificacao) => !notificacao.lida).length
}

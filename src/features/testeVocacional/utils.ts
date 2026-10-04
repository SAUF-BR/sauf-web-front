import type { ProgressoTeste } from './types'

export function temProgressoSalvo(progresso: ProgressoTeste | undefined) {
  return !!progresso && Object.keys(progresso.respostas).length > 0
}

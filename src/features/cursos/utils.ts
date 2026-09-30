import { formatarMoeda, formatarNumero } from '../../lib/utils'
import type { Curso, GrauAcademico, Modalidade } from './types'

export const ROTULO_GRAU: Record<GrauAcademico, string> = {
  bacharelado: 'Bacharelado',
  licenciatura: 'Licenciatura',
  tecnologo: 'Tecnólogo',
}

export const ROTULO_MODALIDADE: Record<Modalidade, string> = {
  presencial: 'Presencial',
  semipresencial: 'Semipresencial',
  ead: 'EaD',
}

export function formatarDuracao(semestres: number) {
  return `${semestres} sem.`
}

/**
 * Informação principal exibida no rodapé do card: nota de corte do SISU quando
 * existir, senão a menor mensalidade. Retorna null se o curso não tiver nenhuma.
 */
export function obterDestaqueCurso(curso: Curso) {
  if (curso.notaCorteSisu !== null) {
    return { rotulo: 'Nota de corte SISU', valor: formatarNumero(curso.notaCorteSisu) }
  }

  if (curso.mensalidadeMinima !== null) {
    return { rotulo: 'Mensalidade desde', valor: formatarMoeda(curso.mensalidadeMinima) }
  }

  return null
}

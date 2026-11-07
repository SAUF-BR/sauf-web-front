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

export type CorChance = 'baixa' | 'media' | 'alta' | 'indisponivel'

export function calcularChance(notaCorte: number | null, notaAluno: number) {
  if (notaCorte === null || notaCorte <= 0) {
    return {
      diferencaNota: null,
      percentualNota: null,
      corChance: 'indisponivel' as CorChance,
    }
  }

  const diferencaNota = Math.round(notaCorte - notaAluno)

  const percentualNota = Math.min(
    100,
    Math.max(0, (notaAluno / notaCorte) * 100),
  )

  const corChance: CorChance =
    percentualNota < 50
      ? 'baixa'
      : percentualNota < 70
        ? 'media'
        : 'alta'

  return {
    diferencaNota,
    percentualNota,
    corChance,
  }
}

export function obterCursosParecidos(curso: Curso, cursos: Curso[]) {
  return cursos.filter(
    (outroCurso) =>
      outroCurso.id !== curso.id &&
      outroCurso.area === curso.area,
  )
}

export function obterAreaPrincipal(
  idCurso: string,
  detalhes: Record<string, { areasAtuacao: string[] }>,
) {
  return detalhes[idCurso]?.areasAtuacao[0] ?? 'Não informado'
}
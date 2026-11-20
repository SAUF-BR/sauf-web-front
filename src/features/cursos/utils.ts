import { formatarNumero } from '../../lib/utils'
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

export function formatarDuracao(
  minimo: number | null,
  maximo: number | null,
) {
  if (minimo === null && maximo === null) {
    return 'Duração não informada'
  }

  if (minimo === maximo) {
    return `${minimo} semestres`
  }

  if (minimo === null) {
    return `Até ${maximo} semestres`
  }

  if (maximo === null) {
    return `A partir de ${minimo} semestres`
  }

  return `${minimo} a ${maximo} semestres`
}


export function obterDestaqueCurso(curso: Curso) {
  if (curso.notaCorteSisu !== null) {
    return { rotulo: 'Nota de corte SISU', valor: formatarNumero(curso.notaCorteSisu) }
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
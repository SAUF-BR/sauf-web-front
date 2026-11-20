import type { Modalidade } from '../cursos/types'
import type { TipoUniversidade, Universidade } from './types'

export const ROTULO_TIPO_UNIVERSIDADE: Record<TipoUniversidade, string> = {
  publica: 'Pública',
  privada: 'Privada',
}

/** Nome curto para exibição em espaços reduzidos (sigla quando existir). */
export function obterNomeCurto(universidade: Pick<Universidade, 'nome' | 'sigla'>) {
  return universidade.sigla ?? universidade.nome
}

// Ordem em que as modalidades aparecem nas telas de universidade
export const ORDEM_MODALIDADES: Modalidade[] = ['presencial', 'semipresencial', 'ead']
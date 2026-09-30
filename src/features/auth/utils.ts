import { ESTADOS_BR } from '../../lib/utils'
import { ROTULO_MODALIDADE } from '../cursos/utils'
import type { PreferenciasEstudante } from './types'

/** Preferências em lista legível, ex.: ["Saúde", "Presencial", "Paraná"]. */
export function listarPreferencias(preferencias: PreferenciasEstudante) {
  return [
    ...preferencias.areas,
    ...preferencias.modalidades.map((modalidade) => ROTULO_MODALIDADE[modalidade]),
    ...preferencias.estados.map((uf) => ESTADOS_BR[uf]),
  ]
}

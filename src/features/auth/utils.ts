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

const NOTA_ENEM_MAXIMA = 1000

/** Texto digitado ("698,0", "698.5", "") → número, ou null quando vazio/inválido. */
export function converterNotaEnem(texto: string): number | null {
  const limpo = texto.trim()
  if (!limpo) return null

  const nota = Number(limpo.replace(',', '.'))
  return Number.isFinite(nota) ? nota : null
}

/** Regra do campo "Nota do ENEM" (opcional): vazio é válido; senão, entre 0 e 1000. */
export function validarNotaEnem(texto: string): true | string {
  if (!texto.trim()) return true

  const nota = converterNotaEnem(texto)
  if (nota === null || nota < 0 || nota > NOTA_ENEM_MAXIMA) {
    return `Informe uma nota entre 0 e ${NOTA_ENEM_MAXIMA}`
  }

  return true
}

export const TAMANHO_MAXIMO_FOTO_MB = 2

/** Valida a foto de perfil antes do envio. Retorna a mensagem de erro, ou null se estiver ok. */
export function validarFoto(arquivo: File): string | null {
  if (!arquivo.type.startsWith('image/')) {
    return 'Escolha um arquivo de imagem (JPG, PNG ou WebP).'
  }

  if (arquivo.size > TAMANHO_MAXIMO_FOTO_MB * 1024 * 1024) {
    return `A foto deve ter no máximo ${TAMANHO_MAXIMO_FOTO_MB} MB.`
  }

  return null
}

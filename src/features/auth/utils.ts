import { ESTADOS_BR } from '../../lib/utils'
import { ROTULO_MODALIDADE } from '../cursos/utils'
import type { PreferenciasEstudante } from './types'

/** Preferências em lista legível, ex.: ["Saúde", "Presencial", "Paraná"]. Sem preferências: []. */
export function listarPreferencias(preferencias?: PreferenciasEstudante) {
  if (!preferencias) return []

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

/**
 * Regras da senha — as mesmas da API (SenhaValidaValidator, D-86). A tela de cadastro
 * mostra a lista e marca cada item conforme a pessoa digita.
 */
export const REGRAS_SENHA = [
  { id: 'tamanho', texto: '8 caracteres ou mais', cumpre: (senha: string) => senha.length >= 8 },
  { id: 'letra', texto: '1 letra', cumpre: (senha: string) => /\p{L}/u.test(senha) },
  {
    id: 'especial',
    texto: '1 caractere especial (@ # ! ?)',
    cumpre: (senha: string) => /[^\p{L}\p{N}\s]/u.test(senha),
  },
] as const

const TAMANHO_MAXIMO_SENHA = 72

/** Validação do campo senha do cadastro: true, ou a mensagem do primeiro problema. */
export function validarSenha(senha: string): true | string {
  const pendente = REGRAS_SENHA.find((regra) => !regra.cumpre(senha))
  if (pendente) return `A senha precisa ter ${pendente.texto}`
  if (senha.length > TAMANHO_MAXIMO_SENHA) return 'A senha deve ter no máximo 72 caracteres'
  return true
}

const PADRAO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Validação simples de e-mail (a API confere de novo). */
export function validarEmail(email: string): true | string {
  if (!email.trim()) return 'Informe seu e-mail'
  return PADRAO_EMAIL.test(email.trim()) || 'Informe um e-mail válido'
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

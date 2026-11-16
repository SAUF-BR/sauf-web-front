import type { Assinatura, Plano, RecursoPlano, SituacaoAssinatura } from './types'

export function obterSituacao(assinatura: Assinatura | null | undefined): SituacaoAssinatura {
  if (!assinatura) return 'sem-assinatura'
  return assinatura.status
}

export type RelacaoPlano = 'assinar' | 'atual' | 'upgrade' | 'downgrade'

// O Free (preço zero) é o plano de quem não assina
export function planoGratuito(plano: Plano): boolean {
  return plano.precoMensal === 0
}

// Compara um plano com o plano atual do usuário. Sem assinatura, o plano atual é o Free.
export function compararPlano(plano: Plano, atual: Plano | undefined): RelacaoPlano {
  if (!atual) return planoGratuito(plano) ? 'atual' : 'assinar'
  if (plano.id === atual.id) return 'atual'
  return plano.precoMensal > atual.precoMensal ? 'upgrade' : 'downgrade'
}

// Recursos que o plano acrescenta em relação ao plano imediatamente mais barato
// (aparecem em negrito no card)
export function recursosNovos(plano: Plano, planos: Plano[]): RecursoPlano[] {
  const anterior = planos
    .filter((outro) => outro.precoMensal < plano.precoMensal)
    .sort((a, b) => b.precoMensal - a.precoMensal)[0]

  if (!anterior) return []

  return plano.recursos.filter((recurso) => !anterior.recursos.includes(recurso))
}

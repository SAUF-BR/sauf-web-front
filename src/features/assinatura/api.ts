import { simularRequisicao } from '../../lib/api/mock'
import type { PlanoAssinatura } from '../../types'
import { assinaturaMock, planosMock } from './mocks'
import type { Assinatura, Plano } from './types'

// TODO: assinar e trocar de plano envolvem cobrança — dependem da integração com a
// API de pagamento, que não faz parte deste momento do projeto. Por enquanto as
// funções só alteram o mock em memória.

export async function getPlanos(): Promise<Plano[]> {
  // const { data } = await apiClient.get<Plano[]>(endpoints.assinatura.planos)
  return simularRequisicao(planosMock)
}

export async function getAssinaturaAtual(): Promise<Assinatura | null> {
  // const { data } = await apiClient.get<Assinatura | null>(endpoints.assinatura.atual)
  return simularRequisicao(assinaturaMock.atual)
}

export async function trocarPlano(plano: PlanoAssinatura): Promise<void> {
  // await apiClient.put(endpoints.assinatura.atual, { plano })
  assinaturaMock.atual = {
    plano,
    status: 'ativa',
    renovaEm: assinaturaMock.atual?.renovaEm ?? daquiAUmMes(),
  }

  return simularRequisicao(undefined)
}

export async function cancelarAssinatura(): Promise<void> {
  // await apiClient.post(endpoints.assinatura.cancelar)
  if (assinaturaMock.atual) {
    assinaturaMock.atual = { ...assinaturaMock.atual, status: 'cancelamento-agendado' }
  }

  return simularRequisicao(undefined)
}

export async function reativarAssinatura(): Promise<void> {
  // await apiClient.post(endpoints.assinatura.reativar)
  if (assinaturaMock.atual) {
    assinaturaMock.atual = { ...assinaturaMock.atual, status: 'ativa' }
  }

  return simularRequisicao(undefined)
}

function daquiAUmMes() {
  const data = new Date()
  data.setMonth(data.getMonth() + 1)
  return data.toISOString().slice(0, 10)
}

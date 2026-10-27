import { apiClient } from '../../lib/api/client'
import { endpoints } from '../../lib/api/endpoints'
import type { PlanoAssinatura } from '../../types'
import type { Assinatura, Plano } from './types'

// TODO (P-14): assinar e trocar de plano ainda não passam pela API de pagamento;
// por enquanto o backend trata a escolha como pagamento confirmado.

export async function getPlanos(): Promise<Plano[]> {
  const { data } = await apiClient.get<Plano[]>(endpoints.assinatura.planos)
  return data
}

// Sem assinatura a API responde 204 sem corpo: o axios entrega '' e aqui vira null
export async function getAssinaturaAtual(): Promise<Assinatura | null> {
  const { data } = await apiClient.get<Assinatura | ''>(endpoints.assinatura.atual)
  return data || null
}

export async function trocarPlano(plano: PlanoAssinatura): Promise<void> {
  await apiClient.put(endpoints.assinatura.atual, { plano })
}

export async function cancelarAssinatura(): Promise<void> {
  await apiClient.post(endpoints.assinatura.cancelar)
}

export async function reativarAssinatura(): Promise<void> {
  await apiClient.post(endpoints.assinatura.reativar)
}

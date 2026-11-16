import { Navigate, Outlet } from 'react-router-dom'
import { useTemAssinaturaAtiva } from '../features/assinatura'
import { ROTAS } from './paths'

/**
 * Protege rotas que exigem assinatura ativa (Basic ou Plus; o Free não libera).
 * Quem não assina (ou não entrou) é levado ao paywall de Simulados.
 */
export function SubscriberRoute() {
  const { ativa, isPending } = useTemAssinaturaAtiva()

  if (isPending) return null

  if (!ativa) {
    return <Navigate to={ROTAS.simuladosPaywall} replace />
  }

  return <Outlet />
}

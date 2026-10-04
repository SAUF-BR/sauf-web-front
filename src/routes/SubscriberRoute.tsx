import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../app/providers/AuthProvider'
import { ROTAS } from './paths'

/**
 * Protege rotas que exigem assinatura ativa (Basic/Plus/Premium).
 * Quem não assina é levado ao paywall de Simulados.
 */
export function SubscriberRoute() {
  const { assinaturaAtiva } = useAuth()

  if (!assinaturaAtiva) {
    return <Navigate to={ROTAS.simuladosPaywall} replace />
  }

  return <Outlet />
}

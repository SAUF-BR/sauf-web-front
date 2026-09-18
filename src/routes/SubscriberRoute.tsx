import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../app/providers/AuthProvider'

/**
 * Protege rotas que exigem assinatura ativa (Basic/Plus/Premium).
 * Usada nas telas internas de Simulados.
 */
export function SubscriberRoute() {
  const { assinaturaAtiva } = useAuth()

  if (!assinaturaAtiva) {
    return <Navigate to="/simulados/paywall" replace />
  }

  return <Outlet />
}

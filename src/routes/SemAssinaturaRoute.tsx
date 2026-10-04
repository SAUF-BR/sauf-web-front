import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../app/providers/AuthProvider'
import { ROTAS } from './paths'

/**
 * Inverso do SubscriberRoute: rotas só para quem ainda não tem assinatura ativa.
 * Quem já assina é levado direto à tela de Simulados.
 */
export function SemAssinaturaRoute() {
  const { assinaturaAtiva } = useAuth()

  if (assinaturaAtiva) {
    return <Navigate to={ROTAS.simulados} replace />
  }

  return <Outlet />
}

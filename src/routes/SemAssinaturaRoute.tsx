import { Navigate, Outlet } from 'react-router-dom'
import { useTemAssinaturaAtiva } from '../features/assinatura'
import { ROTAS } from './paths'

/**
 * Inverso do SubscriberRoute: rotas só para quem ainda não tem assinatura ativa.
 * Quem já assina é levado direto à tela de Simulados.
 */
export function SemAssinaturaRoute() {
  const { ativa, isPending } = useTemAssinaturaAtiva()

  if (isPending) return null

  if (ativa) {
    return <Navigate to={ROTAS.simulados} replace />
  }

  return <Outlet />
}

import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useUsuarioAtual } from '../features/auth'
import { ROTAS } from './paths'

/**
 * Protege rotas que exigem um usuário autenticado.
 * Usada no fluxo de perguntas e no resultado do Teste Vocacional.
 */
export function PrivateRoute() {
  const { data: usuario, isPending } = useUsuarioAtual()
  const location = useLocation()

  if (isPending) return null

  if (!usuario) {
    return <Navigate to={ROTAS.login} replace state={{ de: location }} />
  }

  return <Outlet />
}

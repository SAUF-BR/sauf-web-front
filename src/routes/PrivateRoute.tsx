import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../app/providers/AuthProvider'

/**
 * Protege rotas que exigem um usuário autenticado.
 * Usada no fluxo de perguntas do Teste Vocacional.
 */
export function PrivateRoute() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

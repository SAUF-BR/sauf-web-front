import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useUsuarioAtual } from '../features/auth'
import { ErroConta } from '../features/auth/components/ErroConta/ErroConta'
import { ROTAS } from './paths'

/**
 * Protege rotas que exigem um usuário autenticado.
 * Usada no Teste Vocacional e em gerenciar a assinatura.
 */
export function PrivateRoute() {
  const { data: usuario, isPending, isError } = useUsuarioAtual()
  const location = useLocation()

  if (isPending) return null

  // API fora do ar ou erro no servidor: não dá para saber se a pessoa entrou.
  // Mandar ao login seria enganoso (ela pode estar logada); mostra o erro com "Tentar de novo".
  if (isError && usuario === undefined) return <ErroConta />

  if (!usuario) {
    return <Navigate to={ROTAS.login} replace state={{ de: location }} />
  }

  return <Outlet />
}

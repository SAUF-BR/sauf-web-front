import { QueryProvider } from './providers/QueryProvider'
import { AppRouter } from './router'

// A sessão (quem está logado) vem do useUsuarioAtual (features/auth), via React Query
function App() {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  )
}

export default App

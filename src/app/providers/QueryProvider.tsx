import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { ErroApi } from '../../lib/api/erros'

const TENTATIVAS_AUTOMATICAS = 2

// Só tenta de novo sozinho em falhas passageiras (conexão, tempo esgotado, servidor).
// Erro 4xx não muda repetindo a mesma requisição.
function deveTentarDeNovo(falhas: number, erro: Error) {
  return erro instanceof ErroApi && erro.temporario && falhas < TENTATIVAS_AUTOMATICAS
}

// 'always': sem internet, a requisição é feita mesmo assim e falha com a mensagem do
// ErroApi. No padrão ('online') o React Query só pausa e a tela fica esperando, sem aviso.
function criarClienteQuery() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: deveTentarDeNovo, networkMode: 'always' },
      mutations: { networkMode: 'always' },
    },
  })
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(criarClienteQuery)

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

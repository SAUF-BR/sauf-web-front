import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { authKeys } from '../../features/auth/hooks'
import { marcarSessaoExpirada } from '../../features/auth/sessao'
import { ErroApi } from '../../lib/api/erros'

const TENTATIVAS_AUTOMATICAS = 2

// Só tenta de novo sozinho em falhas passageiras (conexão, tempo esgotado, servidor).
// Erro 4xx não muda repetindo a mesma requisição.
function deveTentarDeNovo(falhas: number, erro: Error) {
  return erro instanceof ErroApi && erro.temporario && falhas < TENTATIVAS_AUTOMATICAS
}

/**
 * 401 numa rota da conta = a sessão expirou (cookie vencido ou apagado) enquanto a tela
 * ainda mostrava a pessoa logada. Passa a tratá-la como visitante: as telas protegidas
 * levam ao login, que avisa "Sua sessão expirou". O login em si responde 401 para senha
 * errada, por isso ele marca `meta.ignorarSessaoExpirada`.
 */
function tratarSessaoExpirada(cliente: QueryClient, erro: Error, ignorar: boolean) {
  if (ignorar || !(erro instanceof ErroApi) || erro.status !== 401) return
  if (cliente.getQueryData(authKeys.me()) == null) return

  marcarSessaoExpirada()
  cliente.setQueryData(authKeys.me(), null)
  cliente.removeQueries({ predicate: (consulta) => consulta.queryKey[0] !== authKeys.all[0] })
}

// 'always': sem internet, a requisição é feita mesmo assim e falha com a mensagem do
// ErroApi. No padrão ('online') o React Query só pausa e a tela fica esperando, sem aviso.
function criarClienteQuery() {
  const cliente: QueryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (erro) => tratarSessaoExpirada(cliente, erro, false),
    }),
    mutationCache: new MutationCache({
      onError: (erro, _variaveis, _contexto, mutacao) =>
        tratarSessaoExpirada(cliente, erro, mutacao.meta?.ignorarSessaoExpirada === true),
    }),
    defaultOptions: {
      queries: { retry: deveTentarDeNovo, networkMode: 'always' },
      mutations: { networkMode: 'always' },
    },
  })
  return cliente
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(criarClienteQuery)

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  alterarSenha,
  atualizarPerfil,
  cadastrar,
  enviarFoto,
  entrar,
  entrarComCodigo,
  emailDisponivel,
  esqueciSenha,
  getUsuarioAtual,
  removerFoto,
  sair,
} from './api'
import type { UsuarioAtual } from './types'

export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
}

export function useUsuarioAtual() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: getUsuarioAtual,
    staleTime: 5 * 60 * 1000,
  })
}

// Edição do perfil e da foto devolvem o usuário atualizado: ele entra direto no cache,
// e o Header, a Home e o perfil se atualizam juntos
function useGuardarUsuario() {
  const queryClient = useQueryClient()
  return (usuario: UsuarioAtual) => queryClient.setQueryData(authKeys.me(), usuario)
}

// Ao trocar de conta (entrar, criar conta, entrar com código, sair), apaga o que veio da sessão
// anterior (assinatura, favoritos, notificações…). Não usar clear(): ele desliga as telas
// abertas do cache e elas ficariam com os dados antigos.
function useTrocarSessao() {
  const queryClient = useQueryClient()

  return (usuario: UsuarioAtual | null) => {
    queryClient.setQueryData(authKeys.me(), usuario)
    queryClient.removeQueries({ predicate: (consulta) => consulta.queryKey[0] !== authKeys.all[0] })
  }
}

export function useEntrar() {
  const trocarSessao = useTrocarSessao()

  return useMutation({
    mutationFn: entrar,
    onSuccess: trocarSessao,
    // 401 aqui é senha errada, não sessão expirada (ver QueryProvider)
    meta: { ignorarSessaoExpirada: true },
  })
}

// A conta nova já entra
export function useCadastrar() {
  const trocarSessao = useTrocarSessao()

  return useMutation({ mutationFn: cadastrar, onSuccess: trocarSessao })
}

// Cadastro: confere se o e-mail está livre antes de ir para os termos
export function useConferirEmail() {
  return useMutation({ mutationFn: emailDisponivel })
}

export function useEsqueciSenha() {
  return useMutation({ mutationFn: esqueciSenha })
}

// Código certo do "esqueci minha senha": entra na conta
export function useEntrarComCodigo() {
  const trocarSessao = useTrocarSessao()

  return useMutation({ mutationFn: entrarComCodigo, onSuccess: trocarSessao })
}

export function useAtualizarPerfil() {
  const guardar = useGuardarUsuario()

  return useMutation({ mutationFn: atualizarPerfil, onSuccess: guardar })
}

// Depois de trocar, recarrega o usuário para atualizar a data "Última alteração"
export function useAlterarSenha() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: alterarSenha,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: authKeys.me() }),
  })
}

export function useEnviarFoto() {
  const guardar = useGuardarUsuario()

  return useMutation({ mutationFn: enviarFoto, onSuccess: guardar })
}

export function useRemoverFoto() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removerFoto,
    onSuccess: () =>
      queryClient.setQueryData<UsuarioAtual | null>(authKeys.me(), (atual) =>
        atual ? { ...atual, fotoUrl: null } : atual,
      ),
  })
}

// `onSuccess` permite à tela navegar depois de sair (ex.: perfil de visitante)
export function useSair({ onSuccess }: { onSuccess?: () => void } = {}) {
  const trocarSessao = useTrocarSessao()

  return useMutation({
    mutationFn: sair,
    onSuccess: () => {
      trocarSessao(null)
      onSuccess?.()
    },
  })
}

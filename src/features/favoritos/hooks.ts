import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROTAS } from '../../routes/paths'
import { useUsuarioAtual } from '../auth/hooks'
import {
  alternarCursoFavorito,
  alternarUniversidadeFavorita,
  getCursosFavoritosIds,
  getUniversidadesFavoritas,
  getUniversidadesFavoritasIds,
} from './api'
import type { UniversidadeFavoritaApi } from './types'

export const favoritosKeys = {
  all: ['favoritos'] as const,
  cursosIds: () => [...favoritosKeys.all, 'cursos', 'ids'] as const,
  universidades: () => [...favoritosKeys.all, 'universidades'] as const,
  universidadesIds: () => [...favoritosKeys.universidades(), 'ids'] as const,
}

// Ids dos cursos favoritados. Só busca com usuário logado (`enabled`).
export function useCursosFavoritosIds({ enabled = true } = {}) {
  return useQuery({
    queryKey: favoritosKeys.cursosIds(),
    queryFn: getCursosFavoritosIds,
    select: (ids) => new Set(ids),
    enabled,
  })
}

export function useAlternarCursoFavorito() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ cursoId, favoritar }: { cursoId: string; favoritar: boolean }) =>
      alternarCursoFavorito(cursoId, favoritar),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: favoritosKeys.all }),
  })
}

export function useUniversidadesFavoritas() {
  return useQuery({
    queryKey: favoritosKeys.universidades(),
    queryFn: getUniversidadesFavoritas,
  })
}

// Ids das universidades favoritadas (coração da listagem e botão da visão geral).
// Só busca com usuário logado (`enabled`).
export function useUniversidadesFavoritasIds({ enabled = true } = {}) {
  return useQuery({
    queryKey: favoritosKeys.universidadesIds(),
    queryFn: getUniversidadesFavoritasIds,
    enabled,
  })
}

type AlternarUniversidade = {
  universidadeId: string
  favoritar: boolean
  // Ao desfazer uma remoção, a universidade volta para a lista guardada na hora
  universidade?: UniversidadeFavoritaApi
}

const Chave_alternar_universidade = [...favoritosKeys.universidades(), 'alternar'] as const

// Acrescenta sem repetir (ex.: clique duplo antes da API responder) ou tira o id
function trocarId(ids: string[], id: string, favoritar: boolean) {
  if (!favoritar) return ids.filter((atual) => atual !== id)

  return ids.includes(id) ? ids : [...ids, id]
}

function trocarUniversidade(
  lista: UniversidadeFavoritaApi[],
  { universidadeId, favoritar, universidade }: AlternarUniversidade,
) {
  if (!favoritar) return lista.filter((item) => item.id !== universidadeId)
  if (!universidade || lista.some((item) => item.id === universidadeId)) return lista

  return [...lista, universidade]
}

export function useAlternarUniversidadeFavorita() {
  const queryClient = useQueryClient()
  const chaveLista = favoritosKeys.universidades()
  const chaveIds = favoritosKeys.universidadesIds()

  return useMutation({
    mutationKey: Chave_alternar_universidade,
    mutationFn: ({ universidadeId, favoritar }: AlternarUniversidade) =>
      alternarUniversidadeFavorita(universidadeId, favoritar),
    onMutate: async (alteracao: AlternarUniversidade) => {
      // Cancela os GETs da lista e dos ids que estiverem em andamento
      await queryClient.cancelQueries({ queryKey: chaveLista })

      const idsAnteriores = queryClient.getQueryData<string[]>(chaveIds)
      const listaAnterior = queryClient.getQueryData<UniversidadeFavoritaApi[]>(chaveLista)

      if (idsAnteriores) {
        queryClient.setQueryData(
          chaveIds,
          trocarId(idsAnteriores, alteracao.universidadeId, alteracao.favoritar),
        )
      }

      if (listaAnterior) {
        queryClient.setQueryData(chaveLista, trocarUniversidade(listaAnterior, alteracao))
      }

      return { idsAnteriores, listaAnterior }
    },
    onError: (_erro, _alteracao, contexto) => {
      if (contexto?.idsAnteriores) queryClient.setQueryData(chaveIds, contexto.idsAnteriores)
      if (contexto?.listaAnterior) queryClient.setQueryData(chaveLista, contexto.listaAnterior)
    },
    onSettled: () => {
      if (queryClient.isMutating({ mutationKey: Chave_alternar_universidade }) === 1) {
        return queryClient.invalidateQueries({ queryKey: chaveLista })
      }
    },
  })
}

// Coração das telas de universidade. Visitante que clica vai para o login e volta depois.
export function useFavoritarUniversidade() {
  const { data: usuario } = useUsuarioAtual()
  const logado = Boolean(usuario)
  const ids = useUniversidadesFavoritasIds({ enabled: logado })
  const alternar = useAlternarUniversidadeFavorita()
  const navigate = useNavigate()
  const location = useLocation()

  function ehFavorita(universidadeId: string) {
    return logado && (ids.data?.includes(universidadeId) ?? false)
  }

  function alternarFavorita(universidadeId: string) {
    if (!logado) {
      navigate(ROTAS.login, { state: { de: location } })
      return
    }

    alternar.mutate({ universidadeId, favoritar: !ehFavorita(universidadeId) })
  }

  // Mensagem do ErroApi quando a última tentativa de favoritar ou remover falhou
  const erro = alternar.isError ? alternar.error.message : null

  return { ehFavorita, alternarFavorita, erro }
}
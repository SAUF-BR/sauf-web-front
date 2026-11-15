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

type AlternarUniversidade = { universidadeId: string; favoritar: boolean }

// O coração muda na hora; se a API falhar, volta ao que era. No fim, busca a lista
// e os ids de novo para ficar igual ao servidor.
export function useAlternarUniversidadeFavorita() {
  const queryClient = useQueryClient()
  const chaveIds = favoritosKeys.universidadesIds()

  return useMutation({
    mutationFn: ({ universidadeId, favoritar }: AlternarUniversidade) =>
      alternarUniversidadeFavorita(universidadeId, favoritar),
    onMutate: async ({ universidadeId, favoritar }: AlternarUniversidade) => {
      await queryClient.cancelQueries({ queryKey: chaveIds })
      const anteriores = queryClient.getQueryData<string[]>(chaveIds)

      if (anteriores) {
        queryClient.setQueryData<string[]>(
          chaveIds,
          favoritar
            ? [...anteriores, universidadeId]
            : anteriores.filter((id) => id !== universidadeId),
        )
      }

      return { anteriores }
    },
    onError: (_erro, _variaveis, contexto) => {
      if (contexto?.anteriores) queryClient.setQueryData(chaveIds, contexto.anteriores)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: favoritosKeys.universidades() }),
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

  return { ehFavorita, alternarFavorita }
}
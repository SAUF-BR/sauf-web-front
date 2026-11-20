import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROTAS } from '../../routes/paths'
import { useUsuarioAtual } from '../auth/hooks'
import {
  alternarCursoFavorito,
  alternarUniversidadeFavorita,
  getCursosFavoritos,
  getCursosFavoritosIds,
  getUniversidadesFavoritas,
  getUniversidadesFavoritasIds,
} from './api'
import type { CursoFavoritoApi, UniversidadeFavoritaApi } from './types'

export const favoritosKeys = {
  all: ['favoritos'] as const,
  cursos: () => [...favoritosKeys.all, 'cursos'] as const,
  cursosIds: () => [...favoritosKeys.cursos(), 'ids'] as const,
  universidades: () => [...favoritosKeys.all, 'universidades'] as const,
  universidadesIds: () => [...favoritosKeys.universidades(), 'ids'] as const,
}

function trocarId(ids: string[], id: string, favoritar: boolean) {
  if (!favoritar) return ids.filter((atual) => atual !== id)

  return ids.includes(id) ? ids : [...ids, id]
}

function trocarItem<T extends { id: string }>(
  lista: T[],
  id: string,
  favoritar: boolean,
  item: T | undefined,
) {
  if (!favoritar) return lista.filter((atual) => atual.id !== id)
  if (!item || lista.some((atual) => atual.id === id)) return lista

  return [...lista, item]
}

export function useCursosFavoritos() {
  return useQuery({
    queryKey: favoritosKeys.cursos(),
    queryFn: getCursosFavoritos,
  })
}

export function useCursosFavoritosIds({ enabled = true } = {}) {
  const { data: usuario } = useUsuarioAtual()

  return useQuery({
    queryKey: favoritosKeys.cursosIds(),
    queryFn: getCursosFavoritosIds,
    select: (ids) => new Set(ids),
    enabled: enabled && Boolean(usuario),
  })
}

type AlternarCurso = {
  cursoId: string
  favoritar: boolean
  curso?: CursoFavoritoApi
}

const Chave_alternar_curso = [...favoritosKeys.cursos(), 'alternar'] as const

export function useAlternarCursoFavorito() {
  const queryClient = useQueryClient()
  const chaveLista = favoritosKeys.cursos()
  const chaveIds = favoritosKeys.cursosIds()

  return useMutation({
    mutationKey: Chave_alternar_curso,
    mutationFn: ({ cursoId, favoritar }: AlternarCurso) => alternarCursoFavorito(cursoId, favoritar),
    onMutate: async ({ cursoId, favoritar, curso }: AlternarCurso) => {

      await queryClient.cancelQueries({ queryKey: chaveLista })

      const idsAnteriores = queryClient.getQueryData<string[]>(chaveIds)
      const listaAnterior = queryClient.getQueryData<CursoFavoritoApi[]>(chaveLista)

      if (idsAnteriores) {
        queryClient.setQueryData(chaveIds, trocarId(idsAnteriores, cursoId, favoritar))
      }

      if (listaAnterior) {
        queryClient.setQueryData(chaveLista, trocarItem(listaAnterior, cursoId, favoritar, curso))
      }

      return { idsAnteriores, listaAnterior }
    },
    onError: (_erro, _alteracao, contexto) => {
      if (contexto?.idsAnteriores) queryClient.setQueryData(chaveIds, contexto.idsAnteriores)
      if (contexto?.listaAnterior) queryClient.setQueryData(chaveLista, contexto.listaAnterior)
    },
    onSettled: () => {
      if (queryClient.isMutating({ mutationKey: Chave_alternar_curso }) === 1) {
        return queryClient.invalidateQueries({ queryKey: chaveLista })
      }
    },
  })
}

export function useUniversidadesFavoritas() {
  return useQuery({
    queryKey: favoritosKeys.universidades(),
    queryFn: getUniversidadesFavoritas,
  })
}

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

export function useAlternarUniversidadeFavorita() {
  const queryClient = useQueryClient()
  const chaveLista = favoritosKeys.universidades()
  const chaveIds = favoritosKeys.universidadesIds()

  return useMutation({
    mutationKey: Chave_alternar_universidade,
    mutationFn: ({ universidadeId, favoritar }: AlternarUniversidade) =>
      alternarUniversidadeFavorita(universidadeId, favoritar),
    onMutate: async ({ universidadeId, favoritar, universidade }: AlternarUniversidade) => {
      // Cancela os GETs da lista e dos ids que estiverem em andamento
      await queryClient.cancelQueries({ queryKey: chaveLista })

      const idsAnteriores = queryClient.getQueryData<string[]>(chaveIds)
      const listaAnterior = queryClient.getQueryData<UniversidadeFavoritaApi[]>(chaveLista)

      if (idsAnteriores) {
        queryClient.setQueryData(chaveIds, trocarId(idsAnteriores, universidadeId, favoritar))
      }

      if (listaAnterior) {
        queryClient.setQueryData(
          chaveLista,
          trocarItem(listaAnterior, universidadeId, favoritar, universidade),
        )
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

  const erro = alternar.isError ? alternar.error.message : null

  return { ehFavorita, alternarFavorita, erro }
}
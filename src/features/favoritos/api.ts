import { apiClient } from '../../lib/api/client'
import { endpoints } from '../../lib/api/endpoints'
import type { CursoFavoritoApi, UniversidadeFavoritaApi } from './types'

export async function getCursosFavoritos(): Promise<CursoFavoritoApi[]> {
  const { data } = await apiClient.get<CursoFavoritoApi[]>(endpoints.favoritos.cursos)
  return data
}

export async function getCursosFavoritosIds(): Promise<string[]> {
  const { data } = await apiClient.get<string[]>(endpoints.favoritos.cursosIds)
  return data
}

export async function alternarCursoFavorito(cursoId: string, favoritar: boolean): Promise<void> {
  const url = endpoints.favoritos.curso(cursoId)

  if (favoritar) {
    await apiClient.post(url)
  } else {
    await apiClient.delete(url)
  }
}

export async function getUniversidadesFavoritas(): Promise<UniversidadeFavoritaApi[]> {
  const { data } = await apiClient.get<UniversidadeFavoritaApi[]>(endpoints.favoritos.universidades)
  return data
}

export async function getUniversidadesFavoritasIds(): Promise<string[]> {
  const { data } = await apiClient.get<string[]>(endpoints.favoritos.universidadesIds)
  return data
}

export async function alternarUniversidadeFavorita(
  universidadeId: string,
  favoritar: boolean,
): Promise<void> {
  const url = endpoints.favoritos.universidade(universidadeId)

  if (favoritar) {
    await apiClient.post(url)
  } else {
    await apiClient.delete(url)
  }
}
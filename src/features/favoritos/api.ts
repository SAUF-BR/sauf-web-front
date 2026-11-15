import { apiClient } from '../../lib/api/client'
import { endpoints } from '../../lib/api/endpoints'
import { simularRequisicao } from '../../lib/api/mock'
import { cursosFavoritosIdsMock } from './mocks'
import type { UniversidadeFavoritaApi } from './types'

export async function getCursosFavoritosIds(): Promise<string[]> {
  // TODO: trocar pelo endpoint real quando o contrato com a API estiver definido
  // const { data } = await apiClient.get<string[]>(endpoints.favoritos.cursos)
  // return data
  return simularRequisicao([...cursosFavoritosIdsMock])
}

export async function alternarCursoFavorito(cursoId: string, favoritar: boolean): Promise<void> {
  // TODO: trocar pelo endpoint real quando o contrato com a API estiver definido
  // if (favoritar) await apiClient.post(endpoints.favoritos.curso(cursoId))
  // else await apiClient.delete(endpoints.favoritos.curso(cursoId))
  if (favoritar) {
    cursosFavoritosIdsMock.add(cursoId)
  } else {
    cursosFavoritosIdsMock.delete(cursoId)
  }

  return simularRequisicao(undefined, 150)
}

export async function getUniversidadesFavoritas(): Promise<UniversidadeFavoritaApi[]> {
  const { data } = await apiClient.get<UniversidadeFavoritaApi[]>(endpoints.favoritos.universidades)
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
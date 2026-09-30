import { simularRequisicao } from '../../lib/api/mock'
import { cursosRecomendadosMock, totalCursosMock } from './mocks'
import type { Curso } from './types'

export async function getCursosRecomendados(): Promise<Curso[]> {
  // TODO: trocar pelo endpoint real quando o contrato com a API estiver definido
  // const { data } = await apiClient.get<Curso[]>(endpoints.cursos.recomendados)
  // return data
  return simularRequisicao(cursosRecomendadosMock)
}

export async function getTotalCursos(): Promise<number> {
  // TODO: provavelmente virá do `totalElements` da listagem paginada de cursos
  // const { data } = await apiClient.get<Paginado<Curso>>(endpoints.cursos.list, { params: { size: 1 } })
  // return data.totalElements
  return simularRequisicao(totalCursosMock)
}

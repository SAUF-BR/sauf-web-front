
import { apiClient } from '../../lib/api/client'
import { endpoints } from '../../lib/api/endpoints'
import type { Curso, CursosPorArea } from './types'

export interface CursoApi {
  id: string
  nome: string
  area: {
    id: string
    nome: string
  } | null
  imagemUrl: string | null
  totalUniversidades: number
  modalidades: string[]
  graus: string[]
  duracaoSemestresMin: number | null
  duracaoSemestresMax: number | null
  notaCorteSisuMedia: number | null
  notaCorteSisuAno: number | null
}

export interface Pagina<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}

export interface FiltrosCursosParams {
  busca?: string
  area?: string
  modalidade?: string
  grau?: string
  duracaoSemestres?: number
  notaCorteMax?: number
  uf?: string
  cidade?: string
}

export async function getCursosListagem(
  page: number = 0,
  filtros: FiltrosCursosParams = {},
): Promise<Pagina<Curso>> {
  const { data } = await apiClient.get<Pagina<CursoApi>>(
    endpoints.cursos.list,
    {
      params: {
        page,
        size: 12,
        ...filtros,
      },
    },
  )

  return {
    ...data,
    content: data.content.map((item) => ({
      id: item.id,
      nome: item.nome,
      area: item.area?.nome ?? 'Não informada',
      graus: item.graus as Curso['graus'],
      modalidades: item.modalidades as Curso['modalidades'],
      duracaoSemestresMin: item.duracaoSemestresMin,
      duracaoSemestresMax: item.duracaoSemestresMax,
      imagemUrl: item.imagemUrl,
      notaCorteSisu: item.notaCorteSisuMedia,
      totalUniversidades: item.totalUniversidades,
    })),
  }
}

// Mantemos as outras funções existentes até integrarmos suas respectivas telas.
export async function getCursosRecomendados(): Promise<Curso[]> {
  throw new Error('Integração de cursos recomendados ainda não implementada.')
}

export async function getTotalCursos(): Promise<number> {
  const { data } = await apiClient.get<Pagina<CursoApi>>(
    endpoints.cursos.list,
    { params: { page: 0, size: 1 } },
  )

  return data.totalElements
}

export async function getCursosPorArea(area: string): Promise<CursosPorArea> {
  const { data } = await apiClient.get<Pagina<CursoApi>>(
    endpoints.cursos.list,
    { params: { area, page: 0, size: 3 } },
  )

  return {
    cursos: [],
    total: data.totalElements,
  }
}

export interface AreaApi {
  id: string
  codigoCine: string
  nome: string
  totalCursos: number
}

export async function getAreas(): Promise<AreaApi[]> {
  const { data } = await apiClient.get<AreaApi[]>('/areas')
  return data
}
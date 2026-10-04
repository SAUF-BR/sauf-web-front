import { buscarUniversidadeDetalheMock, type UniversidadeDetalhe } from './conteudo'

type ResultadoUniversidadeDetalhe = {
  universidade: UniversidadeDetalhe | null
  carregando: boolean
  erro: boolean
}

export function useUniversidadeDetalhe(id: string): ResultadoUniversidadeDetalhe {
  const universidade = buscarUniversidadeDetalheMock(id)

  return { universidade, carregando: false, erro: false }
}
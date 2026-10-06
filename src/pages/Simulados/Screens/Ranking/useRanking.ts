import { useMemo } from 'react'
import type { Periodo } from '../../compartilhados/conteudo'
import { montarRankingMock } from './conteudo'

export function useRanking(periodo: Periodo) {
  const dados = useMemo(() => montarRankingMock(periodo), [periodo])

  return { dados, carregando: false, erro: false }
}
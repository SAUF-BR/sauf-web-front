import { useMemo } from 'react'
import type { Periodo } from '../../compartilhados/conteudo'
import { montarCronometroMock } from './conteudo'

// ponto de acesso aos dados da tela
export function useCronometro(periodo: Periodo) {
  const dados = useMemo(() => montarCronometroMock(periodo), [periodo])

  return { dados, carregando: false, erro: false }
}
import { useCronometroSimulados } from '../../../../features/simulados'
import type { Periodo } from '../../compartilhados/conteudo'

// Ponto de acesso aos dados da tela
export function useCronometro(periodo: Periodo) {
  const consulta = useCronometroSimulados(periodo)

  return {
    dados: consulta.data,
    carregando: consulta.isPending,
    erro: consulta.error,
  }
}

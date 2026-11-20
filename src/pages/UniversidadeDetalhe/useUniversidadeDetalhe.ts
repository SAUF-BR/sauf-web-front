import {
  ehUniversidadeNaoEncontrada,
  useUniversidade,
  type UniversidadeDetalhe,
} from '../../features/universidades'

type ResultadoUniversidadeDetalhe = {
  universidade: UniversidadeDetalhe | null
  carregando: boolean
  naoEncontrada: boolean
  erro: boolean
  mensagemErro: string | undefined
  tentando: boolean
  tentarDeNovo: () => void
}

export function useUniversidadeDetalhe(id: string): ResultadoUniversidadeDetalhe {
  const consulta = useUniversidade(id)
  const naoEncontrada = id === '' || ehUniversidadeNaoEncontrada(consulta.error)

  return {
    universidade: consulta.data ?? null,
    carregando: consulta.isPending && !naoEncontrada,
    naoEncontrada,
    erro: consulta.isError && !naoEncontrada,
    mensagemErro: consulta.error?.message,
    tentando: consulta.isFetching,
    tentarDeNovo: () => void consulta.refetch(),
  }
}
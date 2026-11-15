import { EstadoErro } from '../../../../components/ui/EstadoErro/EstadoErro'
import { useUsuarioAtual } from '../../hooks'

// Quando não deu para saber se a pessoa está logada (API fora do ar, sem internet,
// erro no servidor). Melhor avisar e oferecer "Tentar de novo" do que tratá-la como
// visitante ou mandá-la ao login sem motivo.
export function ErroConta() {
  const { error, refetch, isFetching } = useUsuarioAtual()

  return (
    <EstadoErro
      titulo="Não foi possível carregar sua conta"
      descricao={error?.message ?? 'Verifique sua conexão e tente novamente em instantes.'}
      onTentarDeNovo={() => void refetch()}
      tentando={isFetching}
    />
  )
}

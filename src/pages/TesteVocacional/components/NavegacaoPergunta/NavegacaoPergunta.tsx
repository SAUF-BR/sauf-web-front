import { Button } from '../../../../components/ui/Botao/Botao'
import styles from './NavegacaoPergunta.module.scss'

type NavegacaoPerguntaProps = {
  podeVoltar: boolean
  podeAvancar: boolean
  ultima: boolean
  onAnterior: () => void
  onPular: () => void
  onProxima: () => void
}

export function NavegacaoPergunta({
  podeVoltar,
  podeAvancar,
  ultima,
  onAnterior,
  onPular,
  onProxima,
}: NavegacaoPerguntaProps) {
  return (
    <div className={styles.navegacao}>
      <Button variant="outline" disabled={!podeVoltar} onClick={onAnterior}>
        <span aria-hidden="true">←</span>&nbsp;Anterior
      </Button>

      <div className={styles.avancar}>
        <button type="button" className={styles.pular} onClick={onPular}>
          Pular pergunta
        </button>
        <Button disabled={!podeAvancar} onClick={onProxima}>
          {ultima ? 'Ver resultado' : 'Próxima'}&nbsp;<span aria-hidden="true">→</span>
        </Button>
      </div>
    </div>
  )
}

import { Button } from '../../../../components/ui/Botao/Botao'
import { Card } from '../../../../components/ui/Card/Card'
import styles from './CartaoSair.module.scss'

type CartaoSairProps = {
  descricao: string
  desabilitado?: boolean
  saindo?: boolean
  onSair?: () => void
}

export function CartaoSair({ descricao, desabilitado = false, saindo = false, onSair }: CartaoSairProps) {
  return (
    <Card className={`${styles.cartao} ${desabilitado ? styles.desabilitado : ''}`}>
      <div>
        <h2 className={styles.titulo}>Sair da conta</h2>
        <p className={styles.descricao}>{descricao}</p>
      </div>

      <Button
        variant="outline"
        className={styles.acao}
        disabled={desabilitado || saindo}
        onClick={onSair}
      >
        {saindo ? 'Saindo…' : 'Sair da conta'}
      </Button>
    </Card>
  )
}

import { Card } from '../../../components/ui/Card/Card'
import { Tag } from '../../../components/ui/Tag/Tag'
import { formatarMoeda } from '../../../lib/utils'
import type { Plano } from '../Conteudo'
import styles from './CartaoPlano.module.scss'

type CartaoPlanoProps = {
  plano: Plano
}

export function CartaoPlano({ plano }: CartaoPlanoProps) {
  // No Free o nome vai grande no lugar do preço, sem o "R$ 0,00"
  const gratuito = plano.precoMensal === 0

  return (
    <Card className={`${styles.cartao} ${plano.destaque ? styles.destaque : ''}`}>
      <div className={styles.topo}>
        <div className={styles.identificacao}>
          {!gratuito && <h3 className={styles.nome}>{plano.nome}</h3>}
          {plano.destaque && <Tag variant="premium">Completo</Tag>}
        </div>

        <p className={styles.preco}>
          {gratuito ? (
            <span className={`${styles.valor} ${styles.valorFree}`}>{plano.nome}</span>
          ) : (
            <>
              <span className={styles.valor}>{formatarMoeda(plano.precoMensal)}</span>
              <span className={styles.periodo}>/mês</span>
            </>
          )}
        </p>
      </div>

      <p className={styles.descricao}>{plano.descricao}</p>
    </Card>
  )
}

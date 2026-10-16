import { Card } from '../../../components/ui/Card/Card'
import { ROTULO_PLANO, type Recurso } from '../Conteudo'
import styles from './CartaoRecurso.module.scss'

type CartaoRecursoProps = {
  recurso: Recurso
}

export function CartaoRecurso({ recurso }: CartaoRecursoProps) {
  const Icone = recurso.icone
  const premium = recurso.plano === 'premium'

  return (
    <Card className={styles.cartao}>
      <span className={styles.icone} aria-hidden="true">
        <Icone size="1.25rem" />
      </span>

      <h3 className={styles.titulo}>{recurso.titulo}</h3>
      <p className={styles.descricao}>{recurso.descricao}</p>

      <p className={`${styles.plano} ${premium ? styles.planoPremium : ''}`}>
        {ROTULO_PLANO[recurso.plano]}
      </p>
    </Card>
  )
}
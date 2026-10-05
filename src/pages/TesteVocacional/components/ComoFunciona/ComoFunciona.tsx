import { Card } from '../../../../components/ui/Card/Card'
import { PASSOS_COMO_FUNCIONA } from '../../conteudo'
import styles from './ComoFunciona.module.scss'

export function ComoFunciona() {
  return (
    <section aria-labelledby="como-funciona">
      <h2 id="como-funciona" className={styles.titulo}>
        Como funciona
      </h2>

      <ol className={styles.passos}>
        {PASSOS_COMO_FUNCIONA.map((passo) => (
          <li key={passo.numero}>
            <Card className={styles.passo}>
              <span className={styles.numero} aria-hidden="true">
                {passo.numero}
              </span>
              <h3 className={styles.passoTitulo}>{passo.titulo}</h3>
              <p className={styles.passoDescricao}>{passo.descricao}</p>
            </Card>
          </li>
        ))}
      </ol>
    </section>
  )
}

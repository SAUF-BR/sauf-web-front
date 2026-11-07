import type { PrazoIngresso } from '../../../../features/formasIngresso/types'

import styles from '../FormasIngressoConteudo/FormasIngressoConteudo.module.scss'

type PrazosFormaProps = {
  prazos: PrazoIngresso[]
}

export function PrazosForma({ prazos }: PrazosFormaProps) {
  return (
    <section className={styles.secao} id="prazos">
      <h2>Prazos</h2>

      <div className={styles.prazos}>
        {prazos.map((prazo) => (
          <article className={styles.prazo} key={prazo.titulo}>
            <span
              className={`${styles.ponto} ${styles[prazo.status]}`}
            />
            <strong>{prazo.titulo}</strong>
            <span>
              {prazo.inicio && prazo.fim
                ? `${prazo.inicio} – ${prazo.fim}`
                : 'Data a definir'}
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}
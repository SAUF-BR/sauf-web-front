import type { EtapaIngresso } from '../../../../features/formasIngresso/types'

import styles from '../FormasIngressoConteudo/FormasIngressoConteudo.module.scss'

type EtapasInscricaoProps = {
  etapas: EtapaIngresso[]
}

export function EtapasInscricao({
  etapas,
}: EtapasInscricaoProps) {
  return (
    <section className={styles.secao} id="como-se-inscrever">
      <h2>Como se inscrever, passo a passo</h2>

      <div className={styles.etapas}>
        {etapas.map((etapa, indice) => (
          <article className={styles.etapa} key={etapa.titulo}>
            <span className={styles.numero}>
              {String(indice + 1).padStart(2, '0')}
            </span>

            <h3>{etapa.titulo}</h3>
            <p>{etapa.descricao}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
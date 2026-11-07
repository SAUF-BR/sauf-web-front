type RequisitosFormaProps = {
  requisitos: string[]
}

import styles from '../FormasIngressoConteudo/FormasIngressoConteudo.module.scss'

export function RequisitosForma({
  requisitos,
}: RequisitosFormaProps) {
  return (
    <section className={styles.secao} id="quem-pode-participar">
      <h2>Quem pode participar</h2>

      <ul className={styles.requisitos}>
        {requisitos.map((requisito) => (
          <li key={requisito}>
            <span aria-hidden="true">✓</span>
            {requisito}
          </li>
        ))}
      </ul>
    </section>
  )
}
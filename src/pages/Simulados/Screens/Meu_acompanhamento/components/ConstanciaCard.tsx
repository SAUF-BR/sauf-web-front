import styles from './ConstanciaCard.module.scss'

interface ConstanciaCardProps {
  diasEstudados: number
}

export function ConstanciaCard({ diasEstudados }: ConstanciaCardProps) {
  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.title}>Constância de estudo</h3>
        <p className={styles.subtitle}>Dias com pelo menos uma sessão nas últimas 4 semanas</p>
      </div>

      <div className={styles.barsRow}>
        <div className={`${styles.block} ${styles.level1}`} />
        <div className={`${styles.block} ${styles.level2}`} />
        <div className={`${styles.block} ${styles.level3}`} />
        <div className={`${styles.block} ${styles.level4}`} />
      </div>

      <div className={styles.footer}>
        <strong>{diasEstudados}</strong>
        <span>dias estudados no último mês</span>
      </div>
    </div>
  )
}
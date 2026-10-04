import styles from './StatCard.module.scss'

interface StatCardProps {
  label: string
  valor: string | number
  destaqueColor?: string
}

export function StatCard({ label, valor, destaqueColor }: StatCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.label}>{label}</span>
      <strong className={styles.valor} style={{ color: destaqueColor }}>
        {valor}
      </strong>
    </div>
  )
}
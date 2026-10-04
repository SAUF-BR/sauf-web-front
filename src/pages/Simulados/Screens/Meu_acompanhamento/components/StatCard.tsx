import styles from './StatCard.module.scss'

interface StatCardProps {
  label: string
  value: string | number
  variation: string
  isPositive?: boolean
  previousValueText: string
}

export function StatCard({
  label,
  value,
  variation,
  isPositive = true,
  previousValueText,
}: StatCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.label}>{label}</span>
      <div className={styles.valueRow}>
        <span className={styles.value}>{value}</span>
        <span className={`${styles.badge} ${isPositive ? styles.positive : styles.negative}`}>
          {isPositive ? '▲' : '▼'} {variation}
        </span>
      </div>
      <span className={styles.footer}>{previousValueText}</span>
    </div>
  )
}
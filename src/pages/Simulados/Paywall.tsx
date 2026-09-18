import styles from './Paywall.module.scss'

export default function Paywall() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Assine para acessar os simulados</h1>
      <p className={styles.subtitle}>Planos Basic, Plus e Premium.</p>
    </main>
  )
}

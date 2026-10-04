import { Link } from 'react-router-dom'
import styles from './index.module.scss'

export default function Simulados() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Simulado histórico</h1>
      <p className={styles.subtitle}>Treine com simulados. Recurso disponível para assinantes.</p>
      <Link to="/simulados/paywall" className={styles.link}>
        Acessar simulados
      </Link>
    </main>
  )
}

import styles from './index.module.scss'

export default function Simulados() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Simulados</h1>
      <p className={styles.subtitle}>Área do assinante (rota protegida por assinatura ativa).</p>
    </main>
  )
}

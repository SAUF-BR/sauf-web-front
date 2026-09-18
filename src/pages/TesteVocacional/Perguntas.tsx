import styles from './Perguntas.module.scss'

export default function Perguntas() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Teste vocacional — perguntas</h1>
      <p className={styles.subtitle}>Fluxo de perguntas (rota protegida por login).</p>
    </main>
  )
}

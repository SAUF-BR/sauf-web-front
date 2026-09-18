import styles from './SimuladosConteudo.module.scss'

export default function SimuladosConteudo() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Simulados — conteúdo</h1>
      <p className={styles.subtitle}>Área interna (rota protegida por assinatura ativa).</p>
    </main>
  )
}

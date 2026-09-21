import styles from './index.module.scss'

export default function Home() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>SAUF.BR</h1>
      <p className={styles.subtitle}>
        Orientação acadêmica gratuita: cursos, universidades, formas de ingresso e mais.
      </p>
    </main>
  )
}

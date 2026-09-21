import { Link } from 'react-router-dom'
import styles from './index.module.scss'

export default function TesteVocacional() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Teste vocacional</h1>
      <p className={styles.subtitle}>
        Descubra cursos com o seu perfil. É necessário estar logado para responder.
      </p>
      <Link to="/teste-vocacional/perguntas" className={styles.link}>
        Começar teste
      </Link>
    </main>
  )
}

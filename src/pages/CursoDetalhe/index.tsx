import { useParams } from 'react-router-dom'
import styles from './index.module.scss'

export default function CursoDetalhe() {
  const { cursoId } = useParams()

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Curso #{cursoId}</h1>
    </main>
  )
}

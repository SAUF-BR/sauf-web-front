import { useParams } from 'react-router-dom'
import styles from './index.module.scss'

export default function UniversidadeDetalhe() {
  const { universidadeId } = useParams()

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Universidade #{universidadeId}</h1>
    </main>
  )
}

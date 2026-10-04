import type { AreaCursos } from '../../conteudo'
import styles from './CursosPorArea.module.scss'

type CursosPorAreaProps = {
  areas: AreaCursos[]
}

export function CursosPorArea({ areas }: CursosPorAreaProps) {
  if (areas.length === 0) {
    return (
      <p className={`${styles.lista} ${styles.vazio}`}>
        A distribuição de cursos por área ainda não está disponível.
      </p>
    )
  }

  const maior = Math.max(...areas.map((a) => a.totalCursos), 1)

  return (
    <ul className={styles.lista}>
      {areas.map(({ area, totalCursos }) => (
        <li key={area} className={styles.item}>
          <span className={styles.area}>{area}</span>

          <span className={styles.trilho} aria-hidden="true">
            <span
              className={styles.barra}
              style={{ width: `${(totalCursos / maior) * 100}%` }}
            />
          </span>

          <span className={styles.total}>
            {totalCursos} {totalCursos === 1 ? 'curso' : 'cursos'}
          </span>
        </li>
      ))}
    </ul>
  )
}
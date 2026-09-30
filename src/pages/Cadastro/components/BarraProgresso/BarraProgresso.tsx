import type { CSSProperties } from 'react'
import styles from './BarraProgresso.module.scss'

type BarraProgressoProps = {
  atual: number
  total: number
}

export function BarraProgresso({ atual, total }: BarraProgressoProps) {
  return (
    <div
      className={styles.barra}
      style={{ '--atual': atual, '--total': total } as CSSProperties}
      role="progressbar"
      aria-label="Progresso do cadastro"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={atual}
    >
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className={styles.segmento} />
      ))}
      <div className={styles.indicador} />
    </div>
  )
}

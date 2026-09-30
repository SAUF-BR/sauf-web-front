import type { ReactNode } from 'react'
import styles from './CabecalhoSecao.module.scss'

type CabecalhoSecaoProps = {
  id: string
  titulo: string
  subtitulo?: ReactNode
  acao?: ReactNode
}

export function CabecalhoSecao({ id, titulo, subtitulo, acao }: CabecalhoSecaoProps) {
  return (
    <div className={styles.cabecalho}>
      <div>
        <h2 id={id} className={styles.titulo}>
          {titulo}
        </h2>
        {subtitulo && <p className={styles.subtitulo}>{subtitulo}</p>}
      </div>
      {acao && <div className={styles.acao}>{acao}</div>}
    </div>
  )
}

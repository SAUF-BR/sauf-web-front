import type { ReactNode } from 'react'
import styles from './SecaoPerfil.module.scss'

type SecaoPerfilProps = {
  id: string
  titulo: string
  aviso?: string
  observacao?: string
  children: ReactNode
}

export function SecaoPerfil({ id, titulo, aviso, observacao, children }: SecaoPerfilProps) {
  return (
    <section aria-labelledby={id} className={styles.secao}>
      <div className={styles.cabecalho}>
        <h2 id={id} className={styles.titulo}>
          {titulo}
        </h2>
        {aviso && (
          <p className={styles.aviso} aria-live="polite">
            {aviso}
          </p>
        )}
      </div>

      {children}

      {observacao && <p className={styles.observacao}>{observacao}</p>}
    </section>
  )
}

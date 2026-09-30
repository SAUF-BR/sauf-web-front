import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import type { Atalho } from '../../conteudo'
import styles from './AtalhosRapidos.module.scss'

type AtalhosRapidosProps = {
  atalhos: Atalho[]
}

export function AtalhosRapidos({ atalhos }: AtalhosRapidosProps) {
  return (
    <nav aria-label="Atalhos">
      <ul className={styles.lista}>
        {atalhos.map((atalho) => {
          const emDestaque = atalho.variante !== 'neutro'

          return (
            <li key={atalho.id} className={`${styles.item} ${styles[atalho.variante]}`}>
              <Link to={atalho.para} className={styles.link}>
                {/* TODO: substituir pelo ícone definitivo de cada atalho */}
                <span className={styles.icone} aria-hidden="true" />

                <span className={styles.textos}>
                  <span className={styles.titulo}>{atalho.titulo}</span>
                  {atalho.descricao && <span className={styles.descricao}>{atalho.descricao}</span>}
                </span>

                {emDestaque && <ChevronRight size="1em" className={styles.seta} />}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

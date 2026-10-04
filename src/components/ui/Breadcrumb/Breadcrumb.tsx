import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styles from './Breadcrumb.module.scss'

export type ItemBreadcrumb = {
  rotulo: string
  para?: string
}

type BreadcrumbProps = {
  itens: ItemBreadcrumb[]
  className?: string
}

export function Breadcrumb({ itens, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Trilha de navegação" className={className}>
      <ol className={styles.lista}>
        {itens.map((item, indice) => {
          const atual = indice === itens.length - 1

          return (
            <Fragment key={item.rotulo}>
              {indice > 0 && (
                <li aria-hidden="true" className={styles.separador}>
                  /
                </li>
              )}
              <li>
                {atual || !item.para ? (
                  <span className={styles.atual} aria-current={atual ? 'page' : undefined}>
                    {item.rotulo}
                  </span>
                ) : (
                  <Link to={item.para} className={styles.link}>
                    {item.rotulo}
                  </Link>
                )}
              </li>
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}

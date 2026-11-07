import type { LinkOficial } from '../../../../features/formasIngresso/types'

import styles from '../FormasIngressoConteudo/FormasIngressoConteudo.module.scss'

type LinksOficiaisProps = {
  links: LinkOficial[]
}

export function LinksOficiais({ links }: LinksOficiaisProps) {
  return (
    <section className={styles.secao} id="fontes-oficiais">
      <h2>Links e fontes oficiais</h2>

      <div className={styles.perguntas}>
        {links.map((link) => (
          <article key={link.url}>
            <a href={link.url} target="_blank" rel="noreferrer">
              {link.titulo} ↗
            </a>
            <p>{link.descricao}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
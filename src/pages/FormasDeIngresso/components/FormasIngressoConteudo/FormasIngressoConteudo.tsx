import type { FormaIngresso } from '../../../../features/formasIngresso/types'

import styles from './FormasIngressoConteudo.module.scss'

type FormasIngressoConteudoProps = {
  forma: FormaIngresso
}

export function FormasIngressoConteudo({
  forma,
}: FormasIngressoConteudoProps) {
  return (
    <section className={styles.conteudo}>
      <div className={styles.identificacao}>
        <span className={styles.categoria}>{forma.categoria}</span>
        <span className={styles.atualizacao}>
          Atualizado em {forma.atualizadoEm}
        </span>
      </div>

      <h1 id="o-que-e">{forma.nome}</h1>
      <p className={styles.descricao}>{forma.descricao}</p>

      <div className={styles.indicadores}>
        {forma.indicadores.map((indicador) => (
          <article className={styles.indicador} key={indicador.titulo}>
            <span>{indicador.titulo}</span>
            <strong>{indicador.valor}</strong>
          </article>
        ))}
      </div>

      <section className={styles.secao} id="quem-pode-participar">
        <h2>Quem pode participar</h2>

        <ul className={styles.requisitos}>
          {forma.requisitos.map((requisito) => (
            <li key={requisito}>
              <span aria-hidden="true">✓</span>
              {requisito}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.secao} id="como-se-inscrever">
        <h2>Como se inscrever, passo a passo</h2>

        <div className={styles.etapas}>
          {forma.etapas.map((etapa, indice) => (
            <article className={styles.etapa} key={etapa.titulo}>
              <span className={styles.numero}>
                {String(indice + 1).padStart(2, '0')}
              </span>
              <h3>{etapa.titulo}</h3>
              <p>{etapa.descricao}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.secao} id="prazos">
        <h2>Prazos</h2>

        <div className={styles.prazos}>
          {forma.prazos.map((prazo) => (
            <article className={styles.prazo} key={prazo.titulo}>
              <span className={`${styles.ponto} ${styles[prazo.status]}`} />
              <strong>{prazo.titulo}</strong>
              <span>
                {prazo.inicio && prazo.fim
                  ? `${prazo.inicio} – ${prazo.fim}`
                  : 'Data a definir'}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.secao} id="perguntas-frequentes">
        <h2>Perguntas frequentes</h2>

        <div className={styles.perguntas}>
          {forma.perguntasFrequentes.map((item) => (
            <details key={item.pergunta}>
              <summary>{item.pergunta}</summary>
              <p>{item.resposta}</p>
            </details>
          ))}
        </div>
      </section>
      <section className={styles.secao} id="fontes-oficiais">
  <h2>Links e fontes oficiais</h2>

  <div className={styles.perguntas}>
    {forma.linksOficiais.map((link) => (
      <article key={link.url}>
        <a href={link.url} target="_blank" rel="noreferrer">
          {link.titulo} ↗
        </a>
        <p>{link.descricao}</p>
      </article>
    ))}
  </div>
</section>
    </section>
  )
}
import {
  AreaCarregando,
  CartaoEsqueleto,
  Esqueleto,
} from '../../../../compartilhados/Esqueleto/Esqueleto'
import pagina from '../../index.module.scss'
import styles from './EsqueletoConfiguracao.module.scss'

export function EsqueletoConfiguracao() {
  return (
    <AreaCarregando rotulo="Carregando as opções do simulado…" className={pagina.contentContainer}>
      <div className={styles.formulario}>
        <div className={styles.bloco}>
          <Esqueleto largura="11rem" altura="0.75rem" />
          <div className={styles.tamanhos}>
            {[0, 1, 2].map((i) => (
              <CartaoEsqueleto key={i}>
                <Esqueleto largura="50%" altura="1rem" />
                <Esqueleto largura="35%" altura="1.75rem" />
                <Esqueleto altura="0.75rem" />
              </CartaoEsqueleto>
            ))}
          </div>
        </div>

        <div className={styles.bloco}>
          <Esqueleto largura="8rem" altura="0.75rem" />
          <div className={styles.pilulas}>
            {[0, 1, 2, 3].map((i) => (
              <Esqueleto key={i} largura="7.5rem" altura="2.25rem" redondo />
            ))}
          </div>
        </div>

        <div className={styles.bloco}>
          <Esqueleto largura="9rem" altura="0.75rem" />
          <div className={styles.categorias}>
            {[0, 1, 2, 3].map((i) => (
              <Esqueleto key={i} altura="3.5rem" />
            ))}
          </div>
        </div>
      </div>

      <CartaoEsqueleto className={styles.resumo}>
        <Esqueleto largura="40%" altura="1rem" />
        {[0, 1, 2, 3, 4].map((i) => (
          <Esqueleto key={i} altura="0.875rem" />
        ))}
        <Esqueleto altura="2.75rem" />
      </CartaoEsqueleto>
    </AreaCarregando>
  )
}

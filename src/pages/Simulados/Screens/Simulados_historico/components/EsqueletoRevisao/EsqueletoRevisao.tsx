import {
  AreaCarregando,
  CartaoEsqueleto,
  Esqueleto,
} from '../../../../compartilhados/Esqueleto/Esqueleto'
import pagina from '../../index.module.scss'
import styles from './EsqueletoRevisao.module.scss'

const QUESTOES = 3

export function EsqueletoRevisao() {
  return (
    <main className={pagina.pageWrapper}>
      <AreaCarregando rotulo="Carregando a revisão…">
        <div className={pagina.headerSection}>
          <div className={pagina.headerContainer}>
            <div className={styles.titulo}>
              <Esqueleto largura="9rem" altura="0.8125rem" />
              <Esqueleto largura="min(22rem, 70vw)" altura="2.25rem" />
              <Esqueleto largura="min(18rem, 60vw)" altura="0.875rem" />
            </div>
            <div className={styles.resumo}>
              <Esqueleto redondo largura="5.5rem" altura="5.5rem" />
              <div className={styles.numeros}>
                <Esqueleto largura="3.5rem" altura="2.5rem" />
                <Esqueleto largura="3.5rem" altura="2.5rem" />
                <Esqueleto largura="3.5rem" altura="2.5rem" />
              </div>
            </div>
          </div>
        </div>

        <div className={pagina.questoesListSection}>
          <div className={pagina.questoesContainer}>
            {Array.from({ length: QUESTOES }, (_, i) => (
              <CartaoEsqueleto key={i} className={styles.questao}>
                <Esqueleto largura="40%" altura="0.875rem" />
                <Esqueleto altura="0.875rem" />
                <Esqueleto largura="85%" altura="0.875rem" />
                <Esqueleto altura="2.75rem" />
                <Esqueleto altura="2.75rem" />
              </CartaoEsqueleto>
            ))}
          </div>
        </div>
      </AreaCarregando>
    </main>
  )
}

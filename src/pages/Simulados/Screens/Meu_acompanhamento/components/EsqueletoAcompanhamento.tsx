import {
  AreaCarregando,
  CartaoEsqueleto,
  Esqueleto,
} from '../../../compartilhados/Esqueleto/Esqueleto'
import pagina from '../index.module.scss'

export function EsqueletoAcompanhamento() {
  return (
    <AreaCarregando rotulo="Carregando seu acompanhamento…">
      <div className={pagina.statsGrid}>
        {[0, 1, 2, 3].map((i) => (
          <CartaoEsqueleto key={i}>
            <Esqueleto largura="60%" altura="0.6875rem" />
            <Esqueleto largura="40%" altura="1.75rem" />
            <Esqueleto largura="75%" altura="0.75rem" />
          </CartaoEsqueleto>
        ))}
      </div>

      <div className={pagina.middleSection}>
        <Esqueleto altura="20rem" />
        <Esqueleto altura="20rem" />
      </div>

      <div className={pagina.bottomSection}>
        <Esqueleto altura="16rem" />
        <div className={pagina.rightStack}>
          <Esqueleto altura="12rem" />
          <Esqueleto altura="10rem" />
        </div>
      </div>
    </AreaCarregando>
  )
}

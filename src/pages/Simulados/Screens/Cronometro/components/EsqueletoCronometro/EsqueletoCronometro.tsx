import {
  AreaCarregando,
  CartaoEsqueleto,
  Esqueleto,
} from '../../../../compartilhados/Esqueleto/Esqueleto'
import pagina from '../../index.module.scss'

export function EsqueletoCronometro() {
  return (
    <AreaCarregando rotulo="Carregando seus tempos…" className={pagina.corpo}>
      <div className={pagina.resumo}>
        {[0, 1, 2, 3].map((i) => (
          <CartaoEsqueleto key={i}>
            <Esqueleto largura="65%" altura="0.6875rem" />
            <Esqueleto largura="45%" altura="1.75rem" />
            <Esqueleto largura="80%" altura="0.75rem" />
          </CartaoEsqueleto>
        ))}
      </div>

      <Esqueleto altura="11rem" />

      <div className={pagina.inferior}>
        <Esqueleto altura="16rem" />
        <div className={pagina.lateral}>
          <Esqueleto altura="7.5rem" />
          <Esqueleto altura="7.5rem" />
        </div>
      </div>
    </AreaCarregando>
  )
}

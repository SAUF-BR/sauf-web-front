import {
  AreaCarregando,
  CartaoEsqueleto,
  Esqueleto,
} from '../../../../compartilhados/Esqueleto/Esqueleto'
import styles from './EsqueletoSimulados.module.scss'

const CARTOES_RESUMO = 4
const CARTOES_LISTA = 3

export function EsqueletoResumo({ className }: { className?: string }) {
  return (
    <AreaCarregando rotulo="Carregando seu resumo…" className={className}>
      {Array.from({ length: CARTOES_RESUMO }, (_, i) => (
        <CartaoEsqueleto key={i}>
          <Esqueleto largura="65%" altura="0.6875rem" />
          <Esqueleto largura="40%" altura="1.75rem" />
        </CartaoEsqueleto>
      ))}
    </AreaCarregando>
  )
}

export function EsqueletoLista() {
  return (
    <AreaCarregando rotulo="Carregando seus simulados…" className={styles.lista}>
      {Array.from({ length: CARTOES_LISTA }, (_, i) => (
        <CartaoEsqueleto key={i} className={styles.cartao}>
          <Esqueleto className={styles.selo} />
          <div className={styles.textos}>
            <Esqueleto largura="45%" altura="1.125rem" />
            <Esqueleto largura="70%" altura="0.8125rem" />
            <div className={styles.etiquetas}>
              <Esqueleto largura="5.5rem" altura="1.375rem" />
              <Esqueleto largura="7rem" altura="1.375rem" />
            </div>
          </div>
          <div className={styles.botoes}>
            <Esqueleto altura="2.375rem" />
            <Esqueleto altura="2.375rem" />
          </div>
        </CartaoEsqueleto>
      ))}
    </AreaCarregando>
  )
}

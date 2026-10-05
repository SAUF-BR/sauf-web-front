import { useId, type ReactNode } from 'react'
import { cn } from '../../../../lib/utils'
import styles from './ComparacaoRapida.module.scss'

export type ItemComparacao = {
  id: string
  rotulo: string
  valor: number | null
  valorTexto: string
}

type ComparacaoRapidaProps = {
  itens: ItemComparacao[]
  mensagemVazia: string
  rodape?: ReactNode
  coresAlternadas?: boolean
}

export function ComparacaoRapida({
  itens,
  mensagemVazia,
  rodape,
  coresAlternadas = false,
}: ComparacaoRapidaProps) {
  const tituloId = useId()
  const maiorValor = Math.max(...itens.map((item) => item.valor ?? 0), 1)

  return (
    <section
      className={cn(styles.painel, coresAlternadas && styles.coresAlternadas)}
      aria-labelledby={tituloId}
    >
      <h2 id={tituloId} className={styles.titulo}>
        Comparação rápida
      </h2>

      {itens.length === 0 ? (
        <p className={styles.vazio}>{mensagemVazia}</p>
      ) : (
        <ul className={styles.lista}>
          {itens.map((item) => (
            <li key={item.id} className={styles.item}>
              <div className={styles.linha}>
                <span>{item.rotulo}</span>
                <span className={item.valor === null ? styles.semValor : styles.valor}>
                  {item.valorTexto}
                </span>
              </div>

              {item.valor !== null && (
                <div
                  className={styles.trilho}
                  role="meter"
                  aria-label={item.rotulo}
                  aria-valuemin={0}
                  aria-valuemax={maiorValor}
                  aria-valuenow={item.valor}
                >
                  <span
                    className={styles.barra}
                    style={{ width: `${(item.valor / maiorValor) * 100}%` }}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {rodape && <p className={styles.insight}>{rodape}</p>}
    </section>
  )
}
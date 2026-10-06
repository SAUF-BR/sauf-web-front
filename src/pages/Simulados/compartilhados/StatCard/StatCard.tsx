import { Equal, Triangle } from 'lucide-react'
import { cn } from '../../../../lib/utils'
import type { Variacao } from '../conteudo'
import styles from './StatCard.module.scss'

type StatCardProps = {
  rotulo: string
  valor: string
  complemento?: string
  variacao?: Variacao | null
  detalhe?: string
  destaque?: boolean
}

const Leitura_tendencia: Record<Variacao['tendencia'], string> = {
  alta: 'aumento de',
  baixa: 'queda de',
  estavel: 'sem variação,',
}

export function StatCard({
  rotulo,
  valor,
  complemento,
  variacao,
  detalhe,
  destaque = false,
}: StatCardProps) {
  return (
    <article className={cn(styles.card, destaque && styles.destaque)}>
      <p className={styles.rotulo}>{rotulo}</p>

      <p className={styles.linha}>
        <span className={styles.valor}>{valor}</span>
        {complemento && <span className={styles.complemento}>{complemento}</span>}
        {variacao && (
          <span className={cn(styles.variacao, styles[variacao.sentido])}>
            {variacao.tendencia === 'estavel' ? (
              <Equal size={12} strokeWidth={3} aria-hidden="true" />
            ) : (
              <Triangle
                size={10}
                fill="currentColor"
                aria-hidden="true"
                className={cn(variacao.tendencia === 'baixa' && styles.paraBaixo)}
              />
            )}
            <span className={styles.somenteLeitor}>{Leitura_tendencia[variacao.tendencia]} </span>
            {variacao.texto}
          </span>
        )}
      </p>

      {detalhe && <p className={styles.detalhe}>{detalhe}</p>}
    </article>
  )
}
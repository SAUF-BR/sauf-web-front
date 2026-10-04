import { Card } from '../../../../components/ui/Card/Card'
import type { Assinatura, Plano } from '../../../../features/assinatura'
import { formatarDataExtenso, formatarMoeda } from '../../../../lib/utils'
import styles from './ResumoAssinatura.module.scss'

type ResumoAssinaturaProps = {
  assinatura: Assinatura
  plano: Plano
}

export function ResumoAssinatura({ assinatura, plano }: ResumoAssinaturaProps) {
  const cancelamentoAgendado = assinatura.status === 'cancelamento-agendado'

  return (
    <Card className={styles.resumo}>
      <dl className={styles.lista}>
        <div className={styles.item}>
          <dt className={styles.rotulo}>Plano atual</dt>
          <dd className={styles.valor}>
            {plano.nome} · {formatarMoeda(plano.precoMensal)}/mês
          </dd>
        </div>

        <div className={styles.item}>
          <dt className={styles.rotulo}>{cancelamentoAgendado ? 'Acesso até' : 'Renova em'}</dt>
          <dd className={styles.valor}>{formatarDataExtenso(assinatura.renovaEm)}</dd>
        </div>
      </dl>
    </Card>
  )
}

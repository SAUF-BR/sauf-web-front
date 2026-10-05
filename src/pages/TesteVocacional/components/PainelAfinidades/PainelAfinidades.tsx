import type { CSSProperties } from 'react'
import { Card } from '../../../../components/ui/Card/Card'
import { ROTULO_AREA, type AfinidadeArea } from '../../../../features/testeVocacional'
import { cn, formatarDataPorExtenso } from '../../../../lib/utils'
import styles from './PainelAfinidades.module.scss'

type PainelAfinidadesProps = {
  afinidades: AfinidadeArea[]
  concluidoEm: string
}

export function PainelAfinidades({ afinidades, concluidoEm }: PainelAfinidadesProps) {
  return (
    <Card className={styles.painel}>
      <h2 className={styles.titulo}>Afinidade por área</h2>

      <ul className={styles.lista}>
        {afinidades.map(({ area, percentual }, indice) => (
          <li key={area} className={cn(styles.item, indice === 0 && styles.principal)}>
            <div className={styles.rotulo}>
              <span>{ROTULO_AREA[area]}</span>
              <span>{percentual}%</span>
            </div>
            <div
              className={cn(styles.barra, styles[area])}
              style={{ '--percentual': `${percentual}%` } as CSSProperties}
              aria-hidden="true"
            />
          </li>
        ))}
      </ul>

      <p className={styles.conclusao}>Concluído em {formatarDataPorExtenso(concluidoEm)}</p>
    </Card>
  )
}

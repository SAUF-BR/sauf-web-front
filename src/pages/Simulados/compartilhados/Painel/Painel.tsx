import type { ReactNode } from 'react'
import { Card } from '../../../../components/ui/Card/Card'
import styles from './Painel.module.scss'

type PainelProps = {
  titulo: string
  subtitulo?: string
  acoes?: ReactNode
  children: ReactNode
}

export function Painel({ titulo, subtitulo, acoes, children }: PainelProps) {
  return (
    <Card className={styles.painel}>
      <div className={styles.topo}>
        <div>
          <h2 className={styles.titulo}>{titulo}</h2>
          {subtitulo && <p className={styles.subtitulo}>{subtitulo}</p>}
        </div>
        {acoes}
      </div>

      {children}
    </Card>
  )
}
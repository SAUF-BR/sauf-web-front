import { useId } from 'react'
import { Card } from '../../../../components/ui/Card/Card'
import styles from './PainelAlerta.module.scss'

type PainelAlertaProps = {
  titulo: string
  descricao: string
  ativo: boolean
  onAlternar: () => void
}

export function PainelAlerta({ titulo, descricao, ativo, onAlternar }: PainelAlertaProps) {
  const tituloId = useId()
  const descricaoId = useId()

  return (
    <Card className={styles.painel}>
      <h2 id={tituloId} className={styles.titulo}>
        {titulo}
      </h2>
      <p id={descricaoId} className={styles.descricao}>
        {descricao}
      </p>

      <button
        type="button"
        role="switch"
        aria-checked={ativo}
        aria-labelledby={tituloId}
        aria-describedby={descricaoId}
        className={styles.toggle}
        onClick={onAlternar}
      >
        <span className={styles.trilho} aria-hidden="true">
          <span className={styles.bolinha} />
        </span>
        <span className={styles.estado}>{ativo ? 'Ativado' : 'Desativado'}</span>
      </button>
    </Card>
  )
}
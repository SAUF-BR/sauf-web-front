import type { IndicadorIngresso } from '../../../../features/formasIngresso/types'
import styles from '../FormasIngressoConteudo/FormasIngressoConteudo.module.scss'
import { Card } from '../../../../components/ui/Card/Card'

type IndicadoresFormaProps = {
  indicadores: IndicadorIngresso[]
}

export function IndicadoresForma({
  indicadores,
}: IndicadoresFormaProps) {
  return (
    <div className={styles.indicadores}>
      {indicadores.map((indicador) => (
        <Card className={styles.indicador} key={indicador.titulo}>
            <span>{indicador.titulo}</span>
            <strong>{indicador.valor}</strong>
        </Card>
      ))}
    </div>
  )
}
import {
  ROTULO_TIPO_EVENTO,
  TIPOS_EVENTO,
  type TipoEvento,
} from '../../../../features/calendario'
import { cn } from '../../../../lib/utils'
import styles from './FiltroTiposEvento.module.scss'

type FiltroTiposEventoProps = {
  ano: number
  contagem: Record<TipoEvento, number> | undefined
  selecionados: Set<TipoEvento>
  onAlternar: (tipo: TipoEvento) => void
}

export function FiltroTiposEvento({
  ano,
  contagem,
  selecionados,
  onAlternar,
}: FiltroTiposEventoProps) {
  return (
    <fieldset className={styles.filtro}>
      <legend className={styles.titulo}>Tipo de evento · {ano}</legend>

      <ul className={styles.lista}>
        {TIPOS_EVENTO.map((tipo) => (
          <li key={tipo}>
            <label className={styles.opcao}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={selecionados.has(tipo)}
                onChange={() => onAlternar(tipo)}
              />
              <span aria-hidden="true" className={cn(styles.marcador, styles[tipo])} />
              <span className={styles.rotulo}>{ROTULO_TIPO_EVENTO[tipo]}</span>
              {contagem && (
                <span className={styles.contador}>
                  {contagem[tipo]}
                  <span className={styles.oculto}> eventos</span>
                </span>
              )}
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  )
}

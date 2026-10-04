import { ROTULO_TIPO_EVENTO, type EventoCalendario } from '../../../../features/calendario'
import { cn } from '../../../../lib/utils'
import styles from './ChipEvento.module.scss'

type ChipEventoProps = {
  evento: EventoCalendario
  compacto?: boolean
}

export function ChipEvento({ evento, compacto = false }: ChipEventoProps) {
  return (
    <li
      className={cn(compacto ? styles.marcador : styles.chip, styles[evento.tipo])}
      title={`${ROTULO_TIPO_EVENTO[evento.tipo]}: ${evento.titulo}`}
    >
      <span className={compacto ? styles.oculto : undefined}>{evento.titulo}</span>
    </li>
  )
}

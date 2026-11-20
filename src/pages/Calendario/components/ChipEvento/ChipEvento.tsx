import {
  ROTULO_TIPO_EVENTO,
  formatarPeriodo,
  type EventoCalendario,
} from '../../../../features/calendario'
import { cn } from '../../../../lib/utils'
import styles from './ChipEvento.module.scss'

type ChipEventoProps = {
  evento: EventoCalendario
  compacto?: boolean
  // Dia do meio de um período: só a barra, sem repetir o título
  continuacao?: boolean
}

export function ChipEvento({ evento, compacto = false, continuacao = false }: ChipEventoProps) {
  const forma = compacto ? styles.marcador : continuacao ? styles.barra : styles.chip

  return (
    <li
      className={cn(forma, styles[evento.tipo])}
      title={`${ROTULO_TIPO_EVENTO[evento.tipo]}: ${evento.titulo} (${formatarPeriodo(evento)})`}
    >
      <span className={compacto || continuacao ? styles.oculto : undefined}>{evento.titulo}</span>
    </li>
  )
}

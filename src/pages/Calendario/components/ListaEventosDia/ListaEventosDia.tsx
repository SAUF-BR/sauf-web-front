import type { EventoCalendario } from '../../../../features/calendario'
import { formatarDiaPorExtenso } from '../../../../lib/utils'
import { ChipEvento } from '../ChipEvento/ChipEvento'
import styles from './ListaEventosDia.module.scss'

type ListaEventosDiaProps = {
  dataIso: string
  eventos: EventoCalendario[]
}

export function ListaEventosDia({ dataIso, eventos }: ListaEventosDiaProps) {
  return (
    <section className={styles.lista} aria-live="polite">
      <h3 className={styles.titulo}>{formatarDiaPorExtenso(dataIso)}</h3>
      <ul className={styles.eventos}>
        {eventos.map((evento) => (
          <ChipEvento key={evento.id} evento={evento} />
        ))}
      </ul>
    </section>
  )
}

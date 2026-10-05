import type { FiltroStatus } from '../../index'
import styles from './FilterPillButton.module.scss'

interface FilterPillButtonProps {
  label: string
  quantidade: number
  tipo: FiltroStatus
  filtroAtual: FiltroStatus
  onSelect: (tipo: FiltroStatus) => void
}

export function FilterPillButton({
  label,
  quantidade,
  tipo,
  filtroAtual,
  onSelect,
}: FilterPillButtonProps) {
  const isAtivo = filtroAtual === tipo

  const pillStyleClass = {
    todas: styles.pillTodas,
    acertos: styles.pillAcertos,
    erros: styles.pillErros,
    em_branco: styles.pillEmBranco,
  }[tipo]

  return (
    <button
      type="button"
      className={`${styles.pillBtn} ${pillStyleClass} ${isAtivo ? styles.active : ''}`}
      onClick={() => onSelect(tipo)}
    >
      {label} · {quantidade}
    </button>
  )
}
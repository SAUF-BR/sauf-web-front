import styles from './PeriodSelector.module.scss'

export type PeriodoOpcao = '7-dias' | 'ultimo-mes' | 'ultimo-ano'

interface PeriodOption {
  value: PeriodoOpcao
  label: string
}

interface PeriodSelectorProps {
  periodoAtual: PeriodoOpcao
  onSelect: (periodo: PeriodoOpcao) => void
}

const periodOptions: PeriodOption[] = [
  { value: '7-dias', label: '7 dias' },
  { value: 'ultimo-mes', label: 'Último mês' },
  { value: 'ultimo-ano', label: 'Último ano' },
]

export function PeriodSelector({ periodoAtual, onSelect }: PeriodSelectorProps) {
  return (
    <div className={styles.periodGroup}>
      {periodOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          className={periodoAtual === option.value ? styles.active : ''}
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
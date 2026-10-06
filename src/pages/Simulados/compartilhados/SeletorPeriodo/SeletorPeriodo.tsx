import { cn } from '../../../../lib/utils'
import { Ordem_periodos, Periodos, type Periodo } from '../conteudo'
import styles from './SeletorPeriodo.module.scss'

type SeletorPeriodoProps = {
  valor: Periodo
  onMudar: (periodo: Periodo) => void
}

export function SeletorPeriodo({ valor, onMudar }: SeletorPeriodoProps) {
  return (
    <div role="group" aria-label="Período" className={styles.grupo}>
      {Ordem_periodos.map((periodo) => (
        <button
          key={periodo}
          type="button"
          aria-pressed={periodo === valor}
          className={cn(styles.opcao, periodo === valor && styles.ativa)}
          onClick={() => onMudar(periodo)}
        >
          {Periodos[periodo].rotulo}
        </button>
      ))}
    </div>
  )
}
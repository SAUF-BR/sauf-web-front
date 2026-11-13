import type { SituacaoQuestao } from '../../../../../../features/simulados'
import styles from './NavNumberButton.module.scss'

const DESCRICAO: Record<SituacaoQuestao, string> = {
  pendente: 'não respondida',
  respondida: 'respondida',
  em_branco: 'em branco',
  tempo_esgotado: 'tempo esgotado',
}

interface NavNumberButtonProps {
  numero: number
  status: SituacaoQuestao
  isAtiva: boolean
  disabled?: boolean
  onClick: () => void
}

export function NavNumberButton({ numero, status, isAtiva, disabled, onClick }: NavNumberButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.btn} ${styles[status]} ${isAtiva ? styles.ativa : ''}`}
      aria-label={`Questão ${numero}, ${DESCRICAO[status]}`}
      aria-current={isAtiva ? 'step' : undefined}
      disabled={disabled}
      onClick={onClick}
    >
      {numero}
    </button>
  )
}

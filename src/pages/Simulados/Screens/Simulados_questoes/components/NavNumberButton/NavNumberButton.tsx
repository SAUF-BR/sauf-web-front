import type { SituacaoQuestao } from '../../../../../../features/simulados'
import styles from './NavNumberButton.module.scss'

const DESCRICAO: Record<SituacaoQuestao, string> = {
  pendente: 'não respondida',
  respondida: 'respondida',
  em_branco: 'em branco',
}

interface NavNumberButtonProps {
  numero: number
  status: SituacaoQuestao
  foraDoTempo?: boolean
  isAtiva: boolean
  disabled?: boolean
  onClick: () => void
}

export function NavNumberButton({
  numero,
  status,
  foraDoTempo = false,
  isAtiva,
  disabled,
  onClick,
}: NavNumberButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.btn} ${styles[status]} ${isAtiva ? styles.ativa : ''} ${
        foraDoTempo ? styles.foraDoTempo : ''
      }`}
      aria-label={`Questão ${numero}, ${DESCRICAO[status]}${foraDoTempo ? ', fora do tempo' : ''}`}
      aria-current={isAtiva ? 'step' : undefined}
      disabled={disabled}
      onClick={onClick}
    >
      {numero}
    </button>
  )
}

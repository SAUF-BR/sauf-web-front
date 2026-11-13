import type { ResultadoQuestao } from '../../../../../../features/simulados'
import styles from './QuestaoBar.module.scss'

interface QuestaoBarProps {
  numero: number
  status: ResultadoQuestao
  isAtiva?: boolean
  onClick?: () => void
}

export function QuestaoBar({ numero, status, isAtiva = false, onClick }: QuestaoBarProps) {
  return (
    <button
      type="button"
      title={`Questão ${numero}`}
      aria-label={`Ir para a questão ${numero}`}
      aria-current={isAtiva ? 'true' : undefined}
      className={`${styles.bar} ${styles[status]} ${isAtiva ? styles.ativa : ''}`}
      onClick={onClick}
    />
  )
}

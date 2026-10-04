import styles from './QuestaoBar.module.scss'

export type StatusQuestao = 'acerto' | 'erro' | 'em_branco'

interface QuestaoBarProps {
  numero: number
  status: StatusQuestao
  isAtiva?: boolean
  onClick?: () => void
}

export function QuestaoBar({ numero, status, isAtiva = false, onClick }: QuestaoBarProps) {
  return (
    <button
      type="button"
      title={`Questão ${numero}`}
      className={`${styles.bar} ${styles[status]} ${isAtiva ? styles.ativa : ''}`}
      onClick={onClick}
    />
  )
}
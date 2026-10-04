import styles from './NavNumberButton.module.scss'

export type StatusQuestaoNav = 'respondida' | 'em_branco' | 'pendente'

interface NavNumberButtonProps {
  numero: number
  status: StatusQuestaoNav
  isAtiva: boolean
  onClick: () => void
}

export function NavNumberButton({ numero, status, isAtiva, onClick }: NavNumberButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.btn} ${styles[status]} ${isAtiva ? styles.ativa : ''}`}
      onClick={onClick}
    >
      {numero}
    </button>
  )
}
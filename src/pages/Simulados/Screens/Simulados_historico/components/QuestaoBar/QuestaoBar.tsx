import type { ResultadoQuestao } from '../../../../../../features/simulados'
import styles from './QuestaoBar.module.scss'

interface QuestaoBarProps {
  numero: number
  status: ResultadoQuestao
  // Em branco escolhido fica amarelo, como na tela de questões; sem resposta fica cinza
  deixadaEmBranco?: boolean
  isAtiva?: boolean
  onClick?: () => void
}

const DESCRICAO = {
  acerto: 'acertou',
  erro: 'errou',
  em_branco: 'sem resposta',
} as const

export function QuestaoBar({
  numero,
  status,
  deixadaEmBranco = false,
  isAtiva = false,
  onClick,
}: QuestaoBarProps) {
  const descricao = deixadaEmBranco ? 'deixada em branco' : DESCRICAO[status]

  return (
    <button
      type="button"
      title={`Questão ${numero} · ${descricao}`}
      aria-label={`Ir para a questão ${numero}, ${descricao}`}
      aria-current={isAtiva ? 'true' : undefined}
      className={`${styles.bar} ${styles[status]} ${deixadaEmBranco ? styles.escolhida : ''} ${isAtiva ? styles.ativa : ''}`}
      onClick={onClick}
    />
  )
}

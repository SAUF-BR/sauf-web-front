import type { ReactNode } from 'react'
import { CircleAlert } from 'lucide-react'
import styles from './AvisoErro.module.scss'

type AvisoErroProps = {
  children: ReactNode
  className?: string
}

// Mensagem curta de erro perto de um botão ou campo (ex.: uma ação que falhou).
// Para uma área inteira que não carregou, use o EstadoErro.
export function AvisoErro({ children, className }: AvisoErroProps) {
  return (
    <p role="alert" className={`${styles.aviso} ${className ?? ''}`}>
      <CircleAlert className={styles.icone} size={16} aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}

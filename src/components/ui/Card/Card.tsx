import type { ComponentProps } from 'react'
import styles from './Card.module.scss'

type CardProps = ComponentProps<'div'>

export function Card({ className, children, ...rest }: CardProps) {
  return (
    <div className={`${styles.card} ${className ?? ''}`} {...rest}>
      {children}
    </div>
  )
}

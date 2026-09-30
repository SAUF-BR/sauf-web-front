import type { ReactNode } from 'react'
import styles from './Tag.module.scss'

type TagProps = {
  variant?: 'destaque' | 'neutro'
  children: ReactNode
}

export function Tag({ variant = 'neutro', children }: TagProps) {
  return <span className={`${styles.tag} ${styles[variant]}`}>{children}</span>
}

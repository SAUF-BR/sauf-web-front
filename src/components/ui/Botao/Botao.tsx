import type { ComponentProps } from 'react'
import styles from './Botao.module.scss'

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'outline'
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : '',
    className ?? '',
  ].join(' ')

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
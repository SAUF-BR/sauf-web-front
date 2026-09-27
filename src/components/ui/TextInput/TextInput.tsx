import { useId } from 'react'
import type { ComponentProps, ReactNode } from 'react'
import styles from './TextInput.module.scss'

type TextInputProps = ComponentProps<'input'> & {
  label: string
  error?: string
  labelAction?: ReactNode
  rightElement?: ReactNode
}

export function TextInput({
  label,
  error,
  labelAction,
  rightElement,
  id,
  className,
  ...rest
}: TextInputProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const errorId = `${inputId}-error`

  return (
    <div className={styles.wrapper}>
      <div className={styles.labelRow}>
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
        {labelAction}
      </div>

      <div className={styles.field}>
        <input
          id={inputId}
          className={`${error ? styles.inputError : styles.input} ${className ?? ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        />
        {rightElement && <div className={styles.right}>{rightElement}</div>}
      </div>

      {error && (
        <span id={errorId} role="alert" className={styles.error}>
          {error}
        </span>
      )}
    </div>
  )
}
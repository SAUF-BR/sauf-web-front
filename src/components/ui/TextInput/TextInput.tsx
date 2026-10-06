import { useId } from 'react'
import type { ComponentProps, ReactNode } from 'react'
import styles from './TextInput.module.scss'

type TextInputProps = ComponentProps<'input'> & {
  label: string
  error?: string
  hint?: string
  labelAction?: ReactNode
  rightElement?: ReactNode
}

export function TextInput({
  label,
  error,
  hint,
  labelAction,
  rightElement,
  id,
  className,
  ...rest
}: TextInputProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const errorId = `${inputId}-error`
  const hintId = `${inputId}-hint`
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined

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
          aria-describedby={describedBy}
          {...rest}
        />
        {rightElement && <div className={styles.right}>{rightElement}</div>}
      </div>

      {hint && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}

      {error && (
        <span id={errorId} role="alert" className={styles.error}>
          {error}
        </span>
      )}
    </div>
  )
}

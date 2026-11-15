import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { TextInput, type TextInputProps } from '../TextInput/TextInput'
import styles from './CampoSenha.module.scss'

type CampoSenhaProps = Omit<TextInputProps, 'type' | 'rightElement'>

// Campo de senha com o ícone de olho: clicar mostra ou esconde o que foi digitado.
// Aceita tudo do TextInput (inclusive o register do react-hook-form).
export function CampoSenha({ className, ...props }: CampoSenhaProps) {
  const [visivel, setVisivel] = useState(false)

  return (
    <TextInput
      {...props}
      type={visivel ? 'text' : 'password'}
      className={`${styles.comOlho} ${className ?? ''}`}
      rightElement={
        <button
          type="button"
          className={styles.olho}
          onClick={() => setVisivel((atual) => !atual)}
          aria-label={visivel ? 'Esconder senha' : 'Mostrar senha'}
          aria-pressed={visivel}
          title={visivel ? 'Esconder senha' : 'Mostrar senha'}
        >
          {visivel ? <EyeOff size="1.125rem" aria-hidden="true" /> : <Eye size="1.125rem" aria-hidden="true" />}
        </button>
      }
    />
  )
}

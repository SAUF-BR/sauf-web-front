import { Check, Circle } from 'lucide-react'
import { REGRAS_SENHA } from '../../utils'
import styles from './RequisitosSenha.module.scss'

type RequisitosSenhaProps = {
  senha: string
  id?: string
}

// Requisitos da senha (as mesmas regras da API), sempre à vista e marcados conforme a
// pessoa digita. Usado no cadastro, na redefinição e na troca de senha.
export function RequisitosSenha({ senha, id }: RequisitosSenhaProps) {
  return (
    <ul id={id} className={styles.regras} aria-label="Requisitos da senha">
      {REGRAS_SENHA.map((regra) => {
        const cumprida = regra.cumpre(senha ?? '')
        return (
          <li key={regra.id} className={cumprida ? styles.regraCumprida : styles.regra}>
            {cumprida ? (
              <Check size="0.875rem" aria-hidden="true" />
            ) : (
              <Circle size="0.875rem" aria-hidden="true" />
            )}
            <span>{regra.texto}</span>
            <span className={styles.somenteLeitor}>{cumprida ? ' (atendido)' : ' (pendente)'}</span>
          </li>
        )
      })}
    </ul>
  )
}

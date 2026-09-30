import { obterIniciais } from '../../../lib/utils'
import styles from './Avatar.module.scss'

type AvatarProps = {
  nome: string
  fotoUrl?: string | null
  className?: string
}

export function Avatar({ nome, fotoUrl, className }: AvatarProps) {
  return (
    <span className={`${styles.avatar} ${className ?? ''}`} title={nome}>
      {fotoUrl ? (
        <img src={fotoUrl} alt="" className={styles.foto} />
      ) : (
        <span aria-hidden="true">{obterIniciais(nome)}</span>
      )}
    </span>
  )
}

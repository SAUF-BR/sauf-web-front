import { obterIniciais } from '../../../lib/utils'
import styles from './Avatar.module.scss'

type AvatarProps = {
  nome: string
  fotoUrl?: string | null
  tamanho?: 'padrao' | 'grande'
  className?: string
}

export function Avatar({ nome, fotoUrl, tamanho = 'padrao', className }: AvatarProps) {
  return (
    <span
      className={`${styles.avatar} ${tamanho === 'grande' ? styles.grande : ''} ${className ?? ''}`}
      title={nome}
    >
      {fotoUrl ? (
        <img src={fotoUrl} alt="" className={styles.foto} />
      ) : (
        <span aria-hidden="true">{obterIniciais(nome)}</span>
      )}
    </span>
  )
}

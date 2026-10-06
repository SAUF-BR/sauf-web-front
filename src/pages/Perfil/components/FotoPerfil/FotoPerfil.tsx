import { Camera } from 'lucide-react'
import { Avatar } from '../../../../components/ui/Avatar/Avatar'
import styles from './FotoPerfil.module.scss'

type FotoPerfilProps = {
  nome: string
  fotoUrl: string | null
  enviando: boolean
  onTrocar: () => void
}

export function FotoPerfil({ nome, fotoUrl, enviando, onTrocar }: FotoPerfilProps) {
  return (
    <div className={styles.foto} aria-busy={enviando}>
      <Avatar
        nome={nome}
        fotoUrl={fotoUrl}
        tamanho="grande"
        className={`${styles.avatar} ${enviando ? styles.enviando : ''}`}
      />

      <button
        type="button"
        className={styles.camera}
        onClick={onTrocar}
        disabled={enviando}
        aria-label="Trocar foto de perfil"
      >
        <Camera size="1rem" aria-hidden="true" />
      </button>
    </div>
  )
}

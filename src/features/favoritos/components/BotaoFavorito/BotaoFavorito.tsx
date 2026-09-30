import { Heart } from 'lucide-react'
import styles from './BotaoFavorito.module.scss'

type BotaoFavoritoProps = {
  ativo: boolean
  // Nome do item, usado no rótulo acessível (ex.: "Biomedicina").
  nomeItem: string
  onAlternar: () => void
  disabled?: boolean
  className?: string
}

export function BotaoFavorito({ ativo, nomeItem, onAlternar, disabled, className }: BotaoFavoritoProps) {
  return (
    <button
      type="button"
      aria-pressed={ativo}
      aria-label={ativo ? `Remover ${nomeItem} dos favoritos` : `Favoritar ${nomeItem}`}
      className={`${styles.botao} ${ativo ? styles.ativo : ''} ${className ?? ''}`}
      onClick={onAlternar}
      disabled={disabled}
    >
      <Heart size="1em" fill={ativo ? 'currentColor' : 'none'} />
    </button>
  )
}

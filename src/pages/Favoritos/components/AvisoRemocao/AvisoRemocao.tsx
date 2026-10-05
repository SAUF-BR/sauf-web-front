import styles from './AvisoRemocao.module.scss'

type AvisoRemocaoProps = {
  nomeItem: string | null
  onDesfazer: () => void
}

export function AvisoRemocao({ nomeItem, onDesfazer }: AvisoRemocaoProps) {
  return (
    <div role="status" aria-live="polite">
      {nomeItem && (
        <div className={styles.aviso}>
          <p className={styles.texto}>
            Você removeu <strong className={styles.nome}>{nomeItem}</strong> dos favoritos.
          </p>
          <button type="button" className={styles.desfazer} onClick={onDesfazer}>
            Desfazer
          </button>
        </div>
      )}
    </div>
  )
}
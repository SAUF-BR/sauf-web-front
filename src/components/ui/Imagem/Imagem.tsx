import styles from './Imagem.module.scss'

type ImagemProps = {
  src: string | null | undefined
  alt: string
  rotuloPlaceholder?: string
  className?: string
}

/**
 * Exibe a imagem quando existir `src`; caso contrário, um placeholder listrado.
 * O tamanho/proporção vem do `className` de quem usa.
 */
export function Imagem({ src, alt, rotuloPlaceholder, className }: ImagemProps) {
  if (src) {
    return <img src={src} alt={alt} loading="lazy" className={`${styles.imagem} ${className ?? ''}`} />
  }

  return (
    <div role="img" aria-label={alt} className={`${styles.placeholder} ${className ?? ''}`}>
      {rotuloPlaceholder && <span className={styles.rotulo}>{rotuloPlaceholder}</span>}
    </div>
  )
}

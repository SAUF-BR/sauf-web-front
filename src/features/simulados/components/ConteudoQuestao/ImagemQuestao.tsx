import { useState } from 'react'
import { ImageOff, RotateCw } from 'lucide-react'
import styles from './ImagemQuestao.module.scss'

type Estado = 'carregando' | 'pronta' | 'erro'

// A nova tentativa muda a URL para o navegador não reaproveitar a falha do cache
function comTentativa(url: string, tentativa: number) {
  if (tentativa === 0) return url
  return `${url}${url.includes('?') ? '&' : '?'}tentativa=${tentativa}`
}

// Fica dentro de <p> do Markdown, então só usa elementos de linha (span, img, button)
export function ImagemQuestao({ src, alt }: { src: string; alt: string }) {
  const [estado, setEstado] = useState<Estado>('carregando')
  const [tentativa, setTentativa] = useState(0)

  const tentarDeNovo = () => {
    setEstado('carregando')
    setTentativa((t) => t + 1)
  }

  if (estado === 'erro') {
    return (
      <span className={styles.erro} role="alert">
        <span className={styles.erroTitulo}>
          <ImageOff size={18} aria-hidden="true" />
          Não foi possível carregar a imagem.
        </span>
        {/* A descrição ajuda a responder mesmo sem a imagem */}
        {alt && <span className={styles.erroDescricao}>{alt}</span>}
        <button type="button" className={styles.tentar} onClick={tentarDeNovo}>
          <RotateCw size={14} aria-hidden="true" />
          Tentar de novo
        </button>
      </span>
    )
  }

  return (
    <span className={`${styles.moldura} ${estado === 'carregando' ? styles.carregando : ''}`}>
      {estado === 'carregando' && (
        <span className={styles.esqueleto} role="status">
          <span className={styles.somenteLeitor}>Carregando imagem</span>
        </span>
      )}
      <img
        key={tentativa}
        className={styles.imagem}
        src={comTentativa(src, tentativa)}
        alt={alt}
        decoding="async"
        // Imagem que já estava no cache dispara o load antes do React ligar o evento
        ref={(img) => {
          if (img?.complete && img.naturalWidth > 0) setEstado('pronta')
        }}
        onLoad={() => setEstado('pronta')}
        onError={() => setEstado('erro')}
      />
    </span>
  )
}

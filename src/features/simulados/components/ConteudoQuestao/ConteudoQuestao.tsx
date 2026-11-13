import type { ReactNode } from 'react'
import Markdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from './ConteudoQuestao.module.scss'

// Renderiza o Markdown que vem do banco (texto-base, comando e alternativas) com react-markdown
// e remark-gfm (tabelas). Sem rehype-raw: HTML que vier no texto aparece como texto, nunca é executado.

// Só aceita imagens http(s); qualquer outro esquema (javascript:, data:) vira o texto alternativo
function urlSegura(url: string | undefined) {
  return url !== undefined && /^https?:\/\//i.test(url)
}

// Títulos do texto ficam todos no mesmo nível, abaixo do título da página
function Titulo({ children }: { children?: ReactNode }) {
  return <h4 className={styles.titulo}>{children}</h4>
}

const COMPONENTES: Components = {
  h1: Titulo,
  h2: Titulo,
  h3: Titulo,
  h4: Titulo,
  h5: Titulo,
  h6: Titulo,
  p: ({ children }) => <p className={styles.paragrafo}>{children}</p>,
  ul: ({ children }) => <ul className={styles.lista}>{children}</ul>,
  ol: ({ children, start }) => (
    <ol className={styles.lista} start={start}>
      {children}
    </ol>
  ),
  img: ({ src, alt }) => {
    const url = typeof src === 'string' ? src : undefined
    return urlSegura(url) ? (
      <img className={styles.imagem} src={url} alt={alt ?? ''} loading="lazy" />
    ) : (
      <span>{alt}</span>
    )
  },
  table: ({ children }) => (
    <div className={styles.tabelaWrapper}>
      <table className={styles.tabela}>{children}</table>
    </div>
  ),
}

interface ConteudoQuestaoProps {
  texto: string
  className?: string
}

export function ConteudoQuestao({ texto, className }: ConteudoQuestaoProps) {
  return (
    <div className={className ? `${styles.conteudo} ${className}` : styles.conteudo}>
      <Markdown remarkPlugins={[remarkGfm]} components={COMPONENTES}>
        {texto}
      </Markdown>
    </div>
  )
}

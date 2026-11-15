import { useId, useState, type KeyboardEvent } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { DocumentoLegal } from '../../types'
import { descreverDocumento, NOME_DOCUMENTO } from '../../utils'
import styles from './LeitorDocumentos.module.scss'

type LeitorDocumentosProps = {
  documentos: DocumentoLegal[]
  // Classe da área que rola (cada tela define a altura)
  classeTexto?: string
}

// Abas com os documentos legais e o texto formatado (Markdown com tabelas). O react-markdown
// não interpreta HTML escrito no texto: nada do arquivo vira script na página.
export function LeitorDocumentos({ documentos, classeTexto }: LeitorDocumentosProps) {
  const [aberto, setAberto] = useState(0)
  const id = useId()
  const documento = documentos[Math.min(aberto, documentos.length - 1)]

  // Setas esquerda/direita trocam de aba (padrão de acessibilidade para abas)
  function aoTeclar(evento: KeyboardEvent) {
    if (evento.key !== 'ArrowRight' && evento.key !== 'ArrowLeft') return
    const passo = evento.key === 'ArrowRight' ? 1 : -1
    const proximo = (aberto + passo + documentos.length) % documentos.length
    setAberto(proximo)
    document.getElementById(`${id}-aba-${proximo}`)?.focus()
  }

  if (!documento) return null

  return (
    <div className={styles.leitor}>
      {documentos.length > 1 && (
        <div role="tablist" aria-label="Documentos" className={styles.abas} onKeyDown={aoTeclar}>
          {documentos.map((item, indice) => (
            <button
              key={item.tipo}
              id={`${id}-aba-${indice}`}
              type="button"
              role="tab"
              aria-selected={indice === aberto}
              aria-controls={`${id}-painel`}
              tabIndex={indice === aberto ? 0 : -1}
              className={indice === aberto ? styles.abaAtiva : styles.aba}
              onClick={() => setAberto(indice)}
            >
              {NOME_DOCUMENTO[item.tipo]}
            </button>
          ))}
        </div>
      )}

      <p className={styles.descricao}>{descreverDocumento(documento)}</p>

      <div
        id={`${id}-painel`}
        role="tabpanel"
        aria-label={documento.titulo}
        tabIndex={0}
        className={`${styles.texto} ${classeTexto ?? ''}`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Links externos abrem em outra aba, sem dar acesso à página do SAUF
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
          }}
        >
          {documento.conteudo}
        </ReactMarkdown>
      </div>
    </div>
  )
}

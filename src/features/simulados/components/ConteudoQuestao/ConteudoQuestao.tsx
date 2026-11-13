import type { ReactNode } from 'react'
import styles from './ConteudoQuestao.module.scss'

// Renderiza o Markdown simples que vem do banco (texto-base, comando e alternativas):
// parágrafos, títulos "## ", imagens ![alt](url) e tabelas com "|". Sem HTML cru.
// Isolado aqui para poder ser trocado por react-markdown sem mexer nas telas.

type Bloco =
  | { tipo: 'titulo'; texto: string }
  | { tipo: 'imagem'; alt: string; url: string }
  | { tipo: 'tabela'; cabecalho: string[] | null; linhas: string[][] }
  | { tipo: 'paragrafo'; texto: string }

const REGEX_IMAGEM = /^!\[([\s\S]*)\]\((\S+)\)$/
const REGEX_SEPARADOR_TABELA = /^\|?[\s:|-]+\|?$/

function ehLinhaTabela(linha: string) {
  return linha.startsWith('|')
}

function dividirCelulas(linha: string) {
  return linha
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((celula) => celula.trim())
}

function montarTabela(linhas: string[]): Bloco {
  const separador = linhas.length > 1 && /-/.test(linhas[1]) && REGEX_SEPARADOR_TABELA.test(linhas[1])
  const corpo = separador ? linhas.slice(2) : linhas

  return {
    tipo: 'tabela',
    cabecalho: separador ? dividirCelulas(linhas[0]) : null,
    linhas: corpo.filter((linha) => !REGEX_SEPARADOR_TABELA.test(linha)).map(dividirCelulas),
  }
}

function lerBlocos(texto: string): Bloco[] {
  const linhas = texto
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((linha) => linha.trim())

  const blocos: Bloco[] = []
  let paragrafo: string[] = []
  let tabela: string[] = []

  const fecharParagrafo = () => {
    if (paragrafo.length > 0) blocos.push({ tipo: 'paragrafo', texto: paragrafo.join('\n') })
    paragrafo = []
  }
  const fecharTabela = () => {
    if (tabela.length > 0) blocos.push(montarTabela(tabela))
    tabela = []
  }

  for (const linha of linhas) {
    if (ehLinhaTabela(linha)) {
      fecharParagrafo()
      tabela.push(linha)
      continue
    }

    fecharTabela()

    const imagem = REGEX_IMAGEM.exec(linha)

    if (linha === '') {
      fecharParagrafo()
    } else if (linha.startsWith('## ')) {
      fecharParagrafo()
      blocos.push({ tipo: 'titulo', texto: linha.slice(3).trim() })
    } else if (imagem) {
      fecharParagrafo()
      blocos.push({ tipo: 'imagem', alt: imagem[1], url: imagem[2] })
    } else {
      paragrafo.push(linha)
    }
  }

  fecharParagrafo()
  fecharTabela()

  return blocos
}

// Só aceita imagens http(s); qualquer outro esquema (javascript:, data:) vira texto
function urlSegura(url: string) {
  return /^https?:\/\//i.test(url)
}

function renderizarBloco(bloco: Bloco, indice: number): ReactNode {
  switch (bloco.tipo) {
    case 'titulo':
      return (
        <h3 key={indice} className={styles.titulo}>
          {bloco.texto}
        </h3>
      )

    case 'imagem':
      return urlSegura(bloco.url) ? (
        <img key={indice} className={styles.imagem} src={bloco.url} alt={bloco.alt} loading="lazy" />
      ) : (
        <p key={indice} className={styles.paragrafo}>
          {bloco.alt}
        </p>
      )

    case 'tabela':
      return (
        <div key={indice} className={styles.tabelaWrapper}>
          <table className={styles.tabela}>
            {bloco.cabecalho && (
              <thead>
                <tr>
                  {bloco.cabecalho.map((celula, i) => (
                    <th key={i}>{celula}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {bloco.linhas.map((linha, i) => (
                <tr key={i}>
                  {linha.map((celula, j) => (
                    <td key={j}>{celula}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'paragrafo':
      return (
        <p key={indice} className={styles.paragrafo}>
          {bloco.texto}
        </p>
      )
  }
}

interface ConteudoQuestaoProps {
  texto: string
  className?: string
}

export function ConteudoQuestao({ texto, className }: ConteudoQuestaoProps) {
  return (
    <div className={className ? `${styles.conteudo} ${className}` : styles.conteudo}>
      {lerBlocos(texto).map(renderizarBloco)}
    </div>
  )
}

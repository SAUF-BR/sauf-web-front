// Documentos legais (D-93 da API): Termos de Uso e Política de Privacidade, versionados.
export type TipoDocumento = 'termos-uso' | 'politica-privacidade'

// GET /documentos-legais: a versão vigente de cada documento
export interface DocumentoLegal {
  tipo: TipoDocumento
  versao: string
  titulo: string
  vigenteDesde: string // "2026-11-15"
  minutosLeitura: number
  resumoAlteracoes: string | null
  conteudo: string // Markdown
  sha256: string
}

// O que vai no cadastro e no novo aceite: a versão exata que a tela mostrou
export interface AceiteDocumento {
  tipo: TipoDocumento
  versao: string
}

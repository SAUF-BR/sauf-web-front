// Tipos provisórios — alinhar com o DER/Diagrama de Classe quando o contrato
// com a API estiver definido.

export type AreaVocacional = 'tecnologia' | 'saude' | 'educacao'

export type LetraAlternativa = 'A' | 'B' | 'C' | 'D'

export interface Alternativa {
  id: string
  letra: LetraAlternativa
  texto: string
  area: AreaVocacional
}

export interface Pergunta {
  id: string
  numero: number
  categoria: string
  enunciado: string
  instrucao: string
  alternativas: Alternativa[]
}

/** perguntaId → alternativaId; `null` quando a pergunta foi pulada. */
export type Respostas = Record<string, string | null>

export interface ProgressoTeste {
  respostas: Respostas
  atualizadoEm: string | null
}

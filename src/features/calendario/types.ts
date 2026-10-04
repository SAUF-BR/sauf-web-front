// Tipos provisórios — alinhar com o DER/Diagrama de Classe quando o contrato
// com a API estiver definido.

export interface Prazo {
  id: string
  titulo: string
  data: string
  descricao: string
}

export type TipoEvento = 'inscricao' | 'prova' | 'resultado' | 'feira'

export interface EventoCalendario {
  id: string
  titulo: string
  tipo: TipoEvento
  data: string
}

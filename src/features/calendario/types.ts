// Contrato da sauf-api (D-104 e D-105): GET /calendario/eventos e /calendario/proximos-prazos.
// Datas sempre "AAAA-MM-DD" (sem hora), lidas em UTC pelos formatadores (ADR-010).

export type TipoEvento = 'inscricao' | 'prova' | 'resultado' | 'feira' | 'outro'

export interface InstituicaoEvento {
  id: string
  sigla: string | null
  nome: string
}

export interface EventoCalendario {
  id: string
  chave: string
  titulo: string
  tipo: TipoEvento
  // Igual ao inicio: o dia em que o evento começa
  data: string
  inicio: string
  // Último dia do período; null quando o evento é de um dia só
  fim: string | null
  descricao: string | null
  // Página oficial de onde a data veio (edital, cronograma)
  fonteUrl: string
  anoReferencia: number
  // null nos eventos nacionais (ENEM, ProUni)
  instituicao: InstituicaoEvento | null
}

export interface Prazo {
  id: string
  titulo: string
  // O prazo: fim do período ou o dia do evento
  data: string
  // Quanto falta, pronto da API: "Encerra em 5 dias", "Amanhã", "Começa em 10 dias"
  descricao: string
  tipo: TipoEvento
  inicio: string
  fim: string | null
  fonteUrl: string
  instituicao: InstituicaoEvento | null
}

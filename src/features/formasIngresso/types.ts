
export type FormaIngressoId = 'prouni' | 'sisu' | 'fies' | 'enem'

export interface EtapaIngresso {
  titulo: string
  descricao: string
}

export interface PrazoIngresso {
  titulo: string
  inicio: string | null
  fim: string | null
  status: 'concluido' | 'atual' | 'futuro' | 'sem-data'
}

export interface IndicadorIngresso {
  titulo: string
  valor: string
}

export interface LinkOficial {
  titulo: string
  url: string
  descricao: string
}

export interface FormaIngresso {
  id: FormaIngressoId
  nome: string
  subtitulo: string
  categoria: string
  atualizadoEm: string
  descricao: string
  linksOficiais: LinkOficial[]
  indicadores: IndicadorIngresso[]
  requisitos: string[]
  etapas: EtapaIngresso[]
  prazos: PrazoIngresso[]
  perguntasFrequentes: {
    pergunta: string
    resposta: string
  }[]
}

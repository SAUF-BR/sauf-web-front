// Tipos do contrato da API de simulados (/api/v1/simulados). Ids são string e datas, ISO-8601.

export type Area = 'lc' | 'ch' | 'cn' | 'mt'

export type Tamanho = 'rapida' | 'media' | 'longa'

// Só o ENEM está ativo; as demais bancas aparecem como "em breve" na tela
export type Banca = 'enem'

export type StatusSimulado = 'em_andamento' | 'concluido'

export type SituacaoQuestao = 'pendente' | 'respondida' | 'em_branco'

export type ResultadoQuestao = 'acerto' | 'erro' | 'em_branco'

export type OrdemSimulados = 'recente' | 'antigo' | 'maior_nota' | 'menor_nota'

export interface FiltroSimulados {
  status?: StatusSimulado
  ordem?: OrdemSimulados
  page?: number
  size?: number
}

export interface Alternativa {
  rotulo: string
  texto: string
}

export interface OpcoesSimulado {
  tamanhos: { id: Tamanho; questoes: number }[]
  // Padrão sugerido e as opções que a tela oferece (a API aceita de 60 a 600, de 30 em 30)
  segundosPorQuestao: number
  temposPorQuestao: number[]
  bancas: { id: Banca; nome: string }[]
  areas: { id: Area; nome: string; questoesDisponiveis: number }[]
}

export interface CriarSimuladoRequest {
  banca: Banca
  tamanho: Tamanho
  areas: Area[]
  cronometrado: boolean
  // Obrigatório no cronometrado; nulo sem cronômetro
  segundosPorQuestao: number | null
}

export interface QuestaoSimulado {
  ordem: number
  area: Area
  ano: number
  numero: number
  textoBase: string | null
  comando: string
  alternativas: Alternativa[]
  situacao: SituacaoQuestao
  alternativaMarcada: string | null
  tempoSegundos: number
  // Resposta dada com o tempo do simulado cronometrado já esgotado
  foraDoTempo: boolean
}

export interface SimuladoDetalhe {
  id: string
  titulo: string
  banca: Banca
  tamanho: Tamanho | null
  areas: Area[]
  cronometrado: boolean
  segundosPorQuestao: number | null
  status: StatusSimulado
  iniciadoEm: string
  finalizadoEm: string | null
  totalQuestoes: number
  questoes: QuestaoSimulado[]
}

export interface ResponderQuestaoRequest {
  alternativa: string | null
  situacao: 'respondida' | 'em_branco' | 'pendente'
  // Total acumulado na questão, não o tempo desta visita
  tempoSegundos: number
}

export interface DesempenhoArea {
  area: Area
  acertos: number
  total: number
}

export interface QuestaoRevisao {
  ordem: number
  area: Area
  ano: number
  numero: number
  textoBase: string | null
  comando: string
  alternativas: Alternativa[]
  resultado: ResultadoQuestao
  // Ficou o limite inteiro na questão (respondida ou não)
  tempoEsgotado: boolean
  foraDoTempo: boolean
  alternativaMarcada: string | null
  alternativaCorreta: string
  tempoSegundos: number
}

export interface RevisaoSimulado {
  id: string
  titulo: string
  banca: Banca
  tamanho: Tamanho | null
  areas: Area[]
  cronometrado: boolean
  iniciadoEm: string
  finalizadoEm: string
  totalQuestoes: number
  acertos: number
  erros: number
  emBranco: number
  respondidasForaDoTempo: number
  porcentagemAcerto: number
  duracaoSegundos: number
  porArea: DesempenhoArea[]
  questoes: QuestaoRevisao[]
}

export interface SimuladoResumo {
  id: string
  titulo: string
  banca: Banca
  status: StatusSimulado
  tamanho: Tamanho | null
  cronometrado: boolean
  segundosPorQuestao: number | null
  iniciadoEm: string
  finalizadoEm: string | null
  totalQuestoes: number
  respondidas: number
  respondidasForaDoTempo: number
  acertos: number
  erros: number
  emBranco: number
  porcentagemAcerto: number | null
  duracaoSegundos: number
  areas: Area[]
  porArea: DesempenhoArea[]
}

export interface ResumoSimulados {
  simuladosFeitos: number
  questoesRespondidas: number
  aproveitamentoMedio: number | null
  melhorArea: { area: Area; porcentagem: number } | null
}

// Cronômetro (estatísticas de estudo). Tipo único: a tela e a API usam estes mesmos.

export type Periodo = 'semana' | 'mes' | 'ano'

export type Comparativo = { atual: number; anterior: number | null }

export type DiaEstudo = { data: string; segundos: number }

export type TamanhoSimulado = Tamanho

export type TempoConfiguracao = {
  tamanho: TamanhoSimulado
  questoes: number
  simulados: number
  mediaSegundos: number
  totalSegundos: number
  segundosPorQuestao: number
  observacao: string | null
}

export type HorasSemana = { rotulo: string; segundos: number }

export type RitmoCategoria = { categoria: string; segundosPorQuestao: number }

export type DadosCronometro = {
  tempoTotal: Comparativo
  tempoMedioQuestao: Comparativo
  diasAtivos: Comparativo
  ofensiva: { atual: number; recorde: number }
  dias: DiaEstudo[]
  porConfiguracao: TempoConfiguracao[]
  horasPorSemana: HorasSemana[]
  ritmoPorCategoria: RitmoCategoria[]
}

// Exibição

export const NOME_AREA: Record<Area, string> = {
  lc: 'Linguagens',
  ch: 'Ciências Humanas',
  cn: 'Ciências da Natureza',
  mt: 'Matemática',
}

export const ORDEM_AREAS: Area[] = ['lc', 'ch', 'cn', 'mt']

// ('mt', 2024) → "Matemática · ENEM 2024"
export function etiquetaQuestao(area: Area, ano: number) {
  return `${NOME_AREA[area]} · ENEM ${ano}`
}

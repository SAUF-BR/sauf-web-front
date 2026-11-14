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

// Meu acompanhamento: nulo quando a janela não teve simulado concluído
export type ComparativoOpcional = { atual: number | null; anterior: number | null }

export type ComparativoContagem = { atual: number; anterior: number }

export type ResultadosQuestoes = { acertos: number; erros: number; emBranco: number }

export type PontoEvolucao = { id: string; finalizadoEm: string; aproveitamento: number }

export type AproveitamentoArea = {
  area: Area
  aproveitamento: ComparativoOpcional
  respondidas: number
}

// Sem habilidade quando o foco é a área inteira
export type FocoEstudo = {
  ordem: number
  area: Area
  habilidade: string | null
  descricao: string
  erros: number
  respondidas: number
}

// Um dia (semana), 7 dias (mês) ou um mês (ano)
export type BlocoConstancia = { inicio: string; dias: number; diasAtivos: number }

export type DadosAcompanhamento = {
  periodo: Periodo
  janela: { inicio: string; fim: string }
  resumo: {
    aproveitamento: ComparativoOpcional
    questoesRespondidas: ComparativoContagem
    simuladosConcluidos: ComparativoContagem
    acertos: ComparativoContagem
  }
  evolucao: { mediaPlataforma: number | null; simulados: PontoEvolucao[] }
  distribuicao: { atual: ResultadosQuestoes; anterior: ResultadosQuestoes }
  areas: AproveitamentoArea[]
  focos: FocoEstudo[]
  constancia: { diasAtivos: number; diasNaJanela: number; ofensiva: number; semanas: BlocoConstancia[] }
}

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

// Ranking por tempo em simulados (semana, mês ou ano do calendário)

// Posição real: o pódio pode ter o 1º e o 3º sem o 2º (quem não aceitou aparecer ou é menor de idade)
export type ParticipantePodio = {
  posicao: number
  nome: string
  cidade: string
  uf: string
  fotoUrl: string | null
  segundos: number
  simulados: number
}

export type DadosRanking = {
  periodo: Periodo
  janela: { inicio: string; fim: string }
  totalParticipantes: number
  podio: ParticipantePodio[]
  // Nula quando o aluno não tem tempo no período
  colocacao: { posicao: number; anterior: number | null } | null
  // regiao: sigla da UF do perfil ou "Brasil"
  percentil: { percentual: number; regiao: string } | null
  estatisticas: { segundos: number; simulados: number; ofensiva: number }
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

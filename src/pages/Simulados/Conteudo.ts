import { ListChecks, Timer, TrendingUp, Trophy, type LucideIcon } from 'lucide-react'

// Conteúdo editorial da tela de acesso aos Simulados. Dados vindos da API ficam
// nos hooks das features, não aqui.

export type PlanoRecurso = 'basic' | 'plus'

export type Recurso = {
  id: string
  titulo: string
  descricao: string
  plano: PlanoRecurso
  icone: LucideIcon
}

export type Plano = {
  id: string
  nome: string
  precoMensal: number
  descricao: string
  destaque?: boolean
}

export type SimuladoPrevia = {
  id: string
  titulo: string
  detalhe: string
  aproveitamento: number
}

export const ROTULO_PLANO: Record<PlanoRecurso, string> = {
  basic: 'A partir do Basic',
  plus: 'Plano Plus',
}

export const RECURSOS: Recurso[] = [
  {
    id: 'simulados',
    titulo: 'Simulados',
    descricao:
      'Monte provas por vestibular, categoria e quantidade de questões, e revise cada acerto e erro.',
    plano: 'basic',
    icone: ListChecks,
  },
  {
    id: 'acompanhamento',
    titulo: 'Meu acompanhamento',
    descricao:
      'Um painel com sua evolução por categoria, aproveitamento médio e pontos fracos.',
    plano: 'plus',
    icone: TrendingUp,
  },
  {
    id: 'cronometro',
    titulo: 'Cronômetro',
    descricao:
      'Marque o tempo real de estudo por sessão e veja quantas horas você dedicou na semana.',
    plano: 'plus',
    icone: Timer,
  },
  {
    id: 'ranking',
    titulo: 'Ranking',
    descricao:
      'Compare seu desempenho com outros estudantes que treinam para os mesmos vestibulares.',
    plano: 'plus',
    icone: Trophy,
  },
]

// TODO: os planos e preços virão da API (GET /assinatura/planos) quando o paywall usar os hooks
export const PLANOS: Plano[] = [
  {
    id: 'free',
    nome: 'Free',
    precoMensal: 0,
    descricao: 'Busca de cursos e universidades, teste vocacional, calendário e favoritos',
  },
  {
    id: 'basic',
    nome: 'Basic',
    precoMensal: 8,
    descricao: 'Tudo do Free mais os simulados do ENEM',
  },
  {
    id: 'plus',
    nome: 'Plus',
    precoMensal: 10,
    descricao: 'Tudo isso mais ranking, cronômetro e meu acompanhamento',
    destaque: true,
  },
]

// Menor preço entre os planos que liberam os simulados (o Free não libera)
export const PRECO_INICIAL = Math.min(
  ...PLANOS.filter((plano) => plano.precoMensal > 0).map((plano) => plano.precoMensal),
)

// Exemplos ilustrativos do cartão "Meus simulados" (não são dados reais do usuário)
export const PREVIA: SimuladoPrevia[] = [
  {
    id: 'enem-dia-2',
    titulo: 'Simulado ENEM · dia 2',
    detalhe: '45 questões · 32 acertos · 13 erros',
    aproveitamento: 72,
  },
  {
    id: 'uem-geral',
    titulo: 'Vestibular UEM · prova geral',
    detalhe: '40 questões · 26 acertos · 14 erros',
    aproveitamento: 64,
  },
]
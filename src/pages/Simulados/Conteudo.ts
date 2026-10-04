import { ListChecks, Timer, TrendingUp, Trophy, type LucideIcon } from 'lucide-react'

// Conteúdo editorial da tela de acesso aos Simulados. Dados vindos da API ficam
// nos hooks das features, não aqui.

export type PlanoRecurso = 'todos' | 'premium'

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
  todos: 'Todos os planos',
  premium: 'Plano Premium',
}

export const RECURSOS: Recurso[] = [
  {
    id: 'simulados',
    titulo: 'Simulados',
    descricao:
      'Monte provas por vestibular, categoria e quantidade de questões, e revise cada acerto e erro.',
    plano: 'todos',
    icone: ListChecks,
  },
  {
    id: 'acompanhamento',
    titulo: 'Meu acompanhamento',
    descricao:
      'Um painel com sua evolução por categoria, aproveitamento médio e pontos fracos.',
    plano: 'premium',
    icone: TrendingUp,
  },
  {
    id: 'cronometro',
    titulo: 'Cronômetro',
    descricao:
      'Marque o tempo real de estudo por sessão e veja quantas horas você dedicou na semana.',
    plano: 'premium',
    icone: Timer,
  },
  {
    id: 'ranking',
    titulo: 'Ranking',
    descricao:
      'Compare seu desempenho com outros estudantes que treinam para os mesmos vestibulares.',
    plano: 'premium',
    icone: Trophy,
  },
]

// TODO: os planos e preços virão da API quando a feature de assinatura existir
export const PLANOS: Plano[] = [
  {
    id: 'basic',
    nome: 'Basic',
    precoMensal: 8,
    descricao: 'Simulados do ENEM com gabarito comentado',
  },
  {
    id: 'plus',
    nome: 'Plus',
    precoMensal: 12,
    descricao: 'Também os simulados dos vestibulares das universidades',
  },
  {
    id: 'premium',
    nome: 'Premium',
    precoMensal: 15,
    descricao: 'Tudo isso mais acompanhamento, cronômetro e ranking',
    destaque: true,
  },
]

export const PRECO_INICIAL = Math.min(...PLANOS.map((plano) => plano.precoMensal))

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
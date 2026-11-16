import type { RecursoPlano } from '../../features/assinatura'

// Conteúdo editorial da tela de assinatura. Dados vindos da API ficam nos hooks
// da feature, não aqui.

export const ORDEM_RECURSOS: RecursoPlano[] = [
  'busca-cursos',
  'busca-universidades',
  'teste-vocacional',
  'calendario',
  'favoritos',
  'simulados-enem',
  'ranking',
  'timer',
  'dashboard',
]

export const ROTULO_RECURSO: Record<RecursoPlano, string> = {
  'busca-cursos': 'Busca por cursos',
  'busca-universidades': 'Busca por universidades',
  'teste-vocacional': 'Teste vocacional',
  calendario: 'Calendário',
  favoritos: 'Lista de favoritos',
  'simulados-enem': 'Simulados do ENEM',
  ranking: 'Ranking de usuários',
  timer: 'Cronômetro de estudo',
  dashboard: 'Meu acompanhamento',
}

export const TEXTOS_CABECALHO = {
  semAssinatura: {
    titulo: 'Escolha seu plano',
    descricao:
      'Você está no plano Free. Assine o Basic ou o Plus para liberar os simulados. Você pode trocar de plano ou cancelar quando quiser.',
  },
  assinante: {
    titulo: 'Sua assinatura',
    descricao:
      'Escolha o plano que acompanha o seu momento de estudo. A troca vale imediatamente e o valor é ajustado na próxima cobrança.',
  },
}

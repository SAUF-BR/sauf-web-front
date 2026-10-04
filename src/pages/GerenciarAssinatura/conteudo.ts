import type { RecursoPlano } from '../../features/assinatura'

// Conteúdo editorial da tela de assinatura. Dados vindos da API ficam nos hooks
// da feature, não aqui.

export const ORDEM_RECURSOS: RecursoPlano[] = [
  'simulados-enem',
  'simulados-vestibulares',
  'dashboard',
  'timer',
  'ranking',
]

export const ROTULO_RECURSO: Record<RecursoPlano, string> = {
  'simulados-enem': 'Simulados do ENEM',
  'simulados-vestibulares': 'Simulados dos vestibulares das universidades',
  dashboard: 'Dashboard de acompanhamento',
  timer: 'Timer de tempo de estudo',
  ranking: 'Ranking de usuários',
}

export const TEXTOS_CABECALHO = {
  semAssinatura: {
    titulo: 'Escolha seu plano',
    descricao:
      'Assine para liberar os simulados. Você pode trocar de plano ou cancelar quando quiser.',
  },
  assinante: {
    titulo: 'Sua assinatura',
    descricao:
      'Escolha o plano que acompanha o seu momento de estudo. A troca vale imediatamente e o valor é ajustado na próxima cobrança.',
  },
}

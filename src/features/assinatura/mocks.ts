import type { Assinatura, Plano } from './types'

// Dados mockados — remover quando a API estiver disponível.

export const planosMock: Plano[] = [
  {
    id: 'basic',
    nome: 'Basic',
    precoMensal: 8,
    descricao: 'Para quem está começando a treinar para o ENEM.',
    recursos: ['simulados-enem'],
  },
  {
    id: 'plus',
    nome: 'Plus',
    precoMensal: 12,
    descricao: 'Para quem também vai prestar vestibulares próprios.',
    recursos: ['simulados-enem', 'simulados-vestibulares'],
  },
  {
    id: 'premium',
    nome: 'Premium',
    precoMensal: 15,
    descricao: 'Para quem quer acompanhar a própria evolução de perto.',
    recursos: ['simulados-enem', 'simulados-vestibulares', 'dashboard', 'timer', 'ranking'],
    selo: 'Completo',
  },
]

// Assinatura do usuário mockado, mantida em memória para simular troca e
// cancelamento durante a sessão. Para testar as outras situações da tela:
// - `atual: null` → quem ainda não assina
// - `status: 'cancelamento-agendado'` → quem cancelou mas ainda tem acesso
export const assinaturaMock: { atual: Assinatura | null } = {
  atual: null,
}

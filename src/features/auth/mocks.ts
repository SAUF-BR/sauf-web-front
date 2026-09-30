import type { UsuarioAtual } from './types'

// Dados mockados — remover quando a API estiver disponível.
// Troque por `null` para visualizar as telas como visitante (não logado).

export const usuarioAtualMock: UsuarioAtual | null = {
  id: 'e-heloisa',
  nome: 'Heloísa Scarante',
  email: 'heloisa@exemplo.com',
  preferencias: {
    areas: ['Saúde'],
    modalidades: ['presencial'],
    estados: ['PR'],
  },
}

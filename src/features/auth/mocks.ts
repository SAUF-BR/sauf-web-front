import type { UsuarioAtual } from './types'

// Dados mockados — remover quando a API estiver disponível.
// Mantido em memória para simular edição do perfil, troca de foto e saída durante
// a sessão. Troque `atual` por `null` para visualizar as telas como visitante.

export const usuarioAtualMock: { atual: UsuarioAtual | null } = {
  atual: {
    id: 'e-heloisa',
    nome: 'Heloísa Scarante',
    email: 'heloisa@exemplo.com',
    preferencias: {
      areas: ['Saúde'],
      modalidades: ['presencial'],
      estados: ['PR'],
    },
    fotoUrl: null,
    notaEnem: 698,
    emailVerificado: true,
    criadoEm: '2026-03-10',
    senhaAlteradaEm: '2026-06-14',
  },
}

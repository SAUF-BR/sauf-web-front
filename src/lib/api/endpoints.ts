export const endpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
  },
  cursos: {
    list: '/cursos',
    detalhe: (id: string) => `/cursos/${id}`,
  },
  universidades: {
    list: '/universidades',
    detalhe: (id: string) => `/universidades/${id}`,
  },
  testeVocacional: {
    perguntas: '/teste-vocacional/perguntas',
  },
  simulados: {
    list: '/simulados',
  },
  assinatura: {
    atual: '/assinatura',
  },
} as const

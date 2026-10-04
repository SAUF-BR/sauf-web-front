export const endpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    me: '/me',
  },
  cursos: {
    list: '/cursos',
    detalhe: (id: string) => `/cursos/${id}`,
    recomendados: '/cursos/recomendados',
  },
  universidades: {
    list: '/universidades',
    detalhe: (id: string) => `/universidades/${id}`,
    destaques: '/universidades/destaques',
  },
  calendario: {
    proximosPrazos: '/calendario/proximos-prazos',
  },
  favoritos: {
    cursos: '/favoritos/cursos',
    curso: (cursoId: string) => `/favoritos/cursos/${cursoId}`,
  },
  notificacoes: {
    naoLidas: '/notificacoes/nao-lidas',
  },
  testeVocacional: {
    perguntas: '/teste-vocacional/perguntas',
  },
  simulados: {
    list: '/simulados',
  },
  assinatura: {
    atual: '/assinatura',
    planos: '/assinatura/planos',
    cancelar: '/assinatura/cancelar',
    reativar: '/assinatura/reativar',
  },
} as const

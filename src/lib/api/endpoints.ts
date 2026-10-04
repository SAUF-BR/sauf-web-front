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
    eventos: '/calendario/eventos',
  },
  favoritos: {
    cursos: '/favoritos/cursos',
    curso: (cursoId: string) => `/favoritos/cursos/${cursoId}`,
  },
  notificacoes: {
    lista: '/notificacoes',
    naoLidas: '/notificacoes/nao-lidas',
    marcarTodasComoLidas: '/notificacoes/marcar-todas-como-lidas',
  },
  testeVocacional: {
    perguntas: '/teste-vocacional/perguntas',
    progresso: '/teste-vocacional/progresso',
  },
  simulados: {
    list: '/simulados',
  },
  assinatura: {
    atual: '/assinatura',
  },
} as const

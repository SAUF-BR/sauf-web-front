export const endpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    me: '/me',
    foto: '/me/foto',
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
    resposta: (perguntaId: string) => `/teste-vocacional/respostas/${perguntaId}`,
    resultado: '/teste-vocacional/resultado',
  },
  simulados: {
    opcoes: '/simulados/opcoes',
    lista: '/simulados',
    detalhe: (id: string) => `/simulados/${id}`,
    questao: (id: string, ordem: number) => `/simulados/${id}/questoes/${ordem}`,
    finalizar: (id: string) => `/simulados/${id}/finalizar`,
    revisao: (id: string) => `/simulados/${id}/revisao`,
    refazerErros: (id: string) => `/simulados/${id}/refazer-erros`,
    resumo: '/simulados/resumo',
    cronometro: '/simulados/cronometro',
    acompanhamento: '/simulados/acompanhamento',
    ranking: '/simulados/ranking',
  },
  assinatura: {
    atual: '/assinatura',
    planos: '/assinatura/planos',
    cancelar: '/assinatura/cancelar',
    reativar: '/assinatura/reativar',
  },
} as const

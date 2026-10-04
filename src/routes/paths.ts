/**
 * Caminhos das rotas da aplicação. Use sempre estas constantes em links e
 * redirecionamentos, em vez de escrever a URL solta no componente.
 */
export const ROTAS = {
  inicio: '/',
  login: '/login',
  cadastro: '/cadastro',
  cursos: '/cursos',
  // TODO: apontar para a busca geral (cursos, universidades e formas de ingresso) quando existir
  busca: (termo: string) => `/cursos?${new URLSearchParams({ busca: termo })}`,
  cursoDetalhe: (cursoId: string) => `/cursos/${cursoId}`,
  universidades: '/universidades',
  universidadeDetalhe: (universidadeId: string) => `/universidades/${universidadeId}`,
  formasDeIngresso: '/formas-de-ingresso',
  calendario: '/calendario',
  testeVocacional: '/teste-vocacional',
  testeVocacionalPerguntas: '/teste-vocacional/perguntas',
  simulados: '/simulados',
  simuladosPaywall: '/simulados/paywall',
  favoritos: '/favoritos',
  notificacoes: '/notificacoes',
  perfil: '/perfil',
  perfilAssinatura: '/perfil/assinatura',
} as const

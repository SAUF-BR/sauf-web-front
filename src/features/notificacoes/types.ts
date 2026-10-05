export type AcaoNotificacao = {
  rotulo: string
  para: string
}

export interface Notificacao {
  id: string
  titulo: string
  descricao: string
  criadaEm: string
  lida: boolean
  acao?: AcaoNotificacao
}

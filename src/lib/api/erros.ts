import { isAxiosError } from 'axios'

// Formato de erro da API Java (ADR-010)
interface ErroResposta {
  status: number
  error: string
  message: string
  fields: Record<string, string>
}

export type TipoErroApi = 'sem-internet' | 'conexao' | 'tempo-esgotado' | 'servidor' | 'requisicao'

const MENSAGENS: Record<Exclude<TipoErroApi, 'requisicao'>, string> = {
  'sem-internet': 'Você está sem internet. Verifique sua conexão e tente novamente.',
  conexao: 'Não foi possível conectar ao servidor. Tente novamente em instantes.',
  'tempo-esgotado': 'O servidor demorou para responder. Tente novamente.',
  servidor: 'Tivemos um problema no servidor. Tente novamente em instantes.',
}

const MENSAGEM_PADRAO = 'Algo deu errado. Tente novamente.'

/**
 * Erro de qualquer chamada à API, já com uma mensagem pronta para mostrar ao usuário
 * em `message`. O interceptor do apiClient converte todo erro do axios para este.
 */
export class ErroApi extends Error {
  readonly tipo: TipoErroApi
  readonly status?: number
  // Erros por campo vindos da validação da API (ex.: { plano: "Escolha um plano" })
  readonly campos: Record<string, string>

  constructor(
    mensagem: string,
    tipo: TipoErroApi,
    status?: number,
    campos: Record<string, string> = {},
  ) {
    super(mensagem)
    this.name = 'ErroApi'
    this.tipo = tipo
    this.status = status
    this.campos = campos
  }

  // Falhas passageiras: vale a pena tentar de novo automaticamente
  get temporario() {
    return this.tipo !== 'requisicao'
  }
}

export function converterErro(erro: unknown): ErroApi {
  if (erro instanceof ErroApi) return erro
  if (!isAxiosError<ErroResposta>(erro)) return new ErroApi(MENSAGEM_PADRAO, 'requisicao')

  if (erro.code === 'ECONNABORTED' || erro.code === 'ETIMEDOUT') {
    return new ErroApi(MENSAGENS['tempo-esgotado'], 'tempo-esgotado')
  }

  // Sem resposta: a requisição nem chegou ao servidor (offline, API fora do ar, CORS)
  if (!erro.response) {
    const tipo = navigator.onLine ? 'conexao' : 'sem-internet'
    return new ErroApi(MENSAGENS[tipo], tipo)
  }

  const { status, data } = erro.response

  // 5xx: a mensagem da API ("Erro interno") não ajuda o usuário
  if (status >= 500) return new ErroApi(MENSAGENS.servidor, 'servidor', status)

  // 4xx: a API já manda a mensagem em português (ex.: "Você já está no plano Plus")
  return new ErroApi(data?.message ?? MENSAGEM_PADRAO, 'requisicao', status, data?.fields)
}

import axios from 'axios'
import { converterErro } from './erros'

// Acima disso a requisição é cancelada e vira erro "tempo-esgotado"
const TEMPO_LIMITE_MS = 15_000

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: TEMPO_LIMITE_MS,
  // A sessão é um cookie HttpOnly criado pela API (ADR-005): o navegador o envia
  // sozinho em toda requisição; o JavaScript nunca lê nem guarda o token
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Todo erro sai daqui como ErroApi, com a mensagem pronta para o usuário (ADR-007)
apiClient.interceptors.response.use(
  (resposta) => resposta,
  (erro) => Promise.reject(converterErro(erro)),
)

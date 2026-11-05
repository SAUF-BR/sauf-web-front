import axios from 'axios'
import { converterErro } from './erros'

// Acima disso a requisição é cancelada e vira erro "tempo-esgotado"
const TEMPO_LIMITE_MS = 15_000

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: TEMPO_LIMITE_MS,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('sauf:token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Todo erro sai daqui como ErroApi, com a mensagem pronta para o usuário (ADR-007)
apiClient.interceptors.response.use(
  (resposta) => resposta,
  (erro) => Promise.reject(converterErro(erro)),
)

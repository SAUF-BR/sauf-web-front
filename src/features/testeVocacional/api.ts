import { simularRequisicao } from '../../lib/api/mock'
import { perguntasMock } from './mocks'
import type { Pergunta, ProgressoTeste } from './types'

// Simula o progresso salvo no servidor; sai junto com os mocks.
const CHAVE_PROGRESSO = 'sauf:teste-vocacional:progresso'

function lerProgressoSalvo(): ProgressoTeste {
  try {
    const salvo = localStorage.getItem(CHAVE_PROGRESSO)
    if (salvo) return JSON.parse(salvo) as ProgressoTeste
  } catch {
    // localStorage indisponível ou valor inválido: começa do zero
  }

  return { respostas: {}, atualizadoEm: null }
}

export async function getQuestionario(): Promise<Pergunta[]> {
  // TODO: trocar pelo endpoint real quando o contrato com a API estiver definido
  // const { data } = await apiClient.get<Pergunta[]>(endpoints.testeVocacional.perguntas)
  // return data
  return simularRequisicao(perguntasMock)
}

export async function getProgressoTeste(): Promise<ProgressoTeste> {
  // TODO: trocar pelo endpoint real quando o contrato com a API estiver definido
  // const { data } = await apiClient.get<ProgressoTeste>(endpoints.testeVocacional.progresso)
  // return data
  return simularRequisicao(lerProgressoSalvo())
}

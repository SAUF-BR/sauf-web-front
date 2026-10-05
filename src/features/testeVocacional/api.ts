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

function gravarProgresso(progresso: ProgressoTeste) {
  try {
    localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify(progresso))
  } catch {
    // sem localStorage o progresso vale só até recarregar a página
  }
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

export type SalvarRespostaParams = {
  perguntaId: string
  alternativaId: string | null
}

export async function salvarResposta({
  perguntaId,
  alternativaId,
}: SalvarRespostaParams): Promise<ProgressoTeste> {
  // TODO: trocar pelo endpoint real quando o contrato com a API estiver definido
  // const { data } = await apiClient.put<ProgressoTeste>(
  //   endpoints.testeVocacional.resposta(perguntaId),
  //   { alternativaId },
  // )
  // return data
  const atual = lerProgressoSalvo()
  const progresso: ProgressoTeste = {
    respostas: { ...atual.respostas, [perguntaId]: alternativaId },
    atualizadoEm: new Date().toISOString(),
  }
  gravarProgresso(progresso)

  return simularRequisicao(progresso)
}

import { simularRequisicao } from '../../lib/api/mock'
import { descricaoAreaMock, perguntasMock } from './mocks'
import type { Pergunta, ProgressoTeste, ResultadoTeste } from './types'
import { calcularAfinidades, contarRespondidas } from './utils'

// Simula o progresso salvo no servidor; sai junto com os mocks.
const CHAVE_PROGRESSO = 'sauf:teste-vocacional:progresso'
const CHAVE_RESULTADO = 'sauf:teste-vocacional:resultado'

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

function lerResultadoSalvo(): ResultadoTeste | null {
  try {
    const salvo = localStorage.getItem(CHAVE_RESULTADO)
    return salvo ? (JSON.parse(salvo) as ResultadoTeste) : null
  } catch {
    return null
  }
}

export async function getResultadoTeste(): Promise<ResultadoTeste | null> {
  // TODO: trocar pelo endpoint real quando o contrato com a API estiver definido
  // const { data } = await apiClient.get<ResultadoTeste>(endpoints.testeVocacional.resultado)
  // return data  (tratar 404 como null)
  return simularRequisicao(lerResultadoSalvo())
}

export async function finalizarTeste(): Promise<ResultadoTeste> {
  // TODO: trocar pelo endpoint real quando o contrato com a API estiver definido
  // const { data } = await apiClient.post<ResultadoTeste>(endpoints.testeVocacional.resultado)
  // return data
  const { respostas } = lerProgressoSalvo()
  const afinidades = calcularAfinidades(perguntasMock, respostas)
  const areaPrincipal = afinidades[0].area
  const resultado: ResultadoTeste = {
    areaPrincipal,
    descricao: descricaoAreaMock[areaPrincipal],
    afinidades,
    totalRespostas: contarRespondidas(respostas),
    concluidoEm: new Date().toISOString(),
  }

  try {
    localStorage.setItem(CHAVE_RESULTADO, JSON.stringify(resultado))
  } catch {
    // sem localStorage o resultado vale só até recarregar a página
  }

  return simularRequisicao(resultado)
}

export async function refazerTeste(): Promise<void> {
  // TODO: trocar pelo endpoint real quando o contrato com a API estiver definido
  // await apiClient.delete(endpoints.testeVocacional.progresso)
  try {
    localStorage.removeItem(CHAVE_PROGRESSO)
    localStorage.removeItem(CHAVE_RESULTADO)
  } catch {
    // nada salvo para apagar
  }

  return simularRequisicao(undefined)
}

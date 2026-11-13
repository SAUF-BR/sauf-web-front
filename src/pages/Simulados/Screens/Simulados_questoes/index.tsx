import { memo, useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ROTAS } from '../../../../routes/paths'
import { EstadoConsulta } from '../../../../components/ui/EstadoConsulta/EstadoConsulta'
import { AvisoErro } from '../../../../components/ui/AvisoErro/AvisoErro'
import {
  ConteudoQuestao,
  etiquetaQuestao,
  useFinalizarSimulado,
  useResponderQuestao,
  useSimulado,
  type QuestaoSimulado,
  type ResponderQuestaoRequest,
  type SimuladoDetalhe,
} from '../../../../features/simulados'
import { formatarCronometro } from '../../../../lib/utils/formatadores'
import { NavNumberButton } from './components/NavNumberButton/NavNumberButton'
import { OptionRow } from './components/OptionRow/OptionRow'
import { SimuladoHeader } from './components/SimuladoHeader/SimuladoHeader'
import { ModalFinalizar } from './components/ModalFinalizar/ModalFinalizar'
import styles from './index.module.scss'

const SEGUNDOS_ALERTA = 30
const ATRASO_AVANCO_AUTOMATICO_MS = 1500

type Resposta = Pick<ResponderQuestaoRequest, 'alternativa' | 'situacao'>

interface Falha {
  mensagem: string
  tentarDeNovo: () => void
}

// Instante em que a questão atual foi aberta e o tempo que ela já tinha acumulado
interface Visita {
  ordem: number
  inicio: number
  base: number
}

function respostaSalva(questao: QuestaoSimulado): Resposta {
  if (questao.situacao === 'respondida') {
    return { situacao: 'respondida', alternativa: questao.alternativaMarcada }
  }
  if (questao.situacao === 'em_branco') return { situacao: 'em_branco', alternativa: null }
  return { situacao: 'pendente', alternativa: null }
}

// Próxima questão pendente depois de `indice`, dando a volta no fim da lista
function proximaPendente(questoes: QuestaoSimulado[], indice: number) {
  for (let passo = 1; passo < questoes.length; passo++) {
    const candidata = (indice + passo) % questoes.length
    if (questoes[candidata].situacao === 'pendente') return candidata
  }
  return -1
}

const Enunciado = memo(function Enunciado({ questao }: { questao: QuestaoSimulado }) {
  return (
    <>
      {questao.textoBase && (
        <ConteudoQuestao texto={questao.textoBase} className={styles.enunciadoContexto} />
      )}
      <ConteudoQuestao texto={questao.comando} className={styles.perguntaText} />
    </>
  )
})

function Execucao({ simulado }: { simulado: SimuladoDetalhe }) {
  const navigate = useNavigate()
  const responder = useResponderQuestao(simulado.id)
  const finalizar = useFinalizarSimulado(simulado.id)

  const { questoes, cronometrado, totalQuestoes } = simulado
  const limite = simulado.segundosPorQuestao ?? 0

  const [visita, setVisita] = useState<Visita>(() => {
    const primeira = Math.max(
      0,
      questoes.findIndex((q) => q.situacao === 'pendente'),
    )
    return { ordem: questoes[primeira].ordem, inicio: Date.now(), base: questoes[primeira].tempoSegundos }
  })
  const [agora, setAgora] = useState(() => Date.now())
  const [selecionada, setSelecionada] = useState<string | null>(
    () => questoes.find((q) => q.ordem === visita.ordem)?.alternativaMarcada ?? null,
  )
  const [falha, setFalha] = useState<Falha | null>(null)
  const [modalAberto, setModalAberto] = useState(false)
  const [avancoAutomatico, setAvancoAutomatico] = useState<number | null>(null)
  const expirando = useRef(new Set<number>())

  const indice = Math.max(
    0,
    questoes.findIndex((q) => q.ordem === visita.ordem),
  )
  const atual = questoes[indice]
  const ehUltima = indice === questoes.length - 1
  const outrasPendentes = questoes.filter((q) => q.ordem !== atual.ordem && q.situacao === 'pendente')
  const modoFinalizar = ehUltima || outrasPendentes.length === 0

  const tempoTotal = visita.base + Math.max(0, Math.floor((agora - visita.inicio) / 1000))
  const bloqueada = atual.situacao === 'tempo_esgotado' || (cronometrado && tempoTotal >= limite)
  const restante = Math.max(0, limite - tempoTotal)
  const ocupado = responder.isPending || finalizar.isPending

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  useEffect(() => {
    const intervalo = setInterval(() => setAgora(Date.now()), 1000)
    return () => clearInterval(intervalo)
  }, [])

  function abrirQuestao(novoIndice: number) {
    const destino = questoes[novoIndice]
    setVisita({ ordem: destino.ordem, inicio: Date.now(), base: destino.tempoSegundos })
    setAgora(Date.now())
    setSelecionada(destino.alternativaMarcada)
    setFalha(null)
    setAvancoAutomatico(null)
    window.scrollTo({ top: 0 })
  }

  // Executa uma ação que fala com a API; se falhar, mantém tudo como está e oferece tentar de novo
  async function executar(acao: () => Promise<void>) {
    setFalha(null)
    try {
      await acao()
    } catch (erro) {
      setFalha({
        mensagem: erro instanceof Error ? erro.message : 'Não foi possível salvar.',
        tentarDeNovo: () => void executar(acao),
      })
    }
  }

  // Envia o tempo acumulado da questão atual junto com a resposta (a escolhida ou a que já estava salva)
  async function salvarAtual(forcada?: Resposta) {
    if (bloqueada) return

    const resposta: Resposta =
      forcada ??
      (selecionada ? { situacao: 'respondida', alternativa: selecionada } : respostaSalva(atual))
    const segundos = Math.floor((Date.now() - visita.inicio) / 1000)
    const tempoSegundos = cronometrado ? Math.min(visita.base + segundos, limite) : visita.base + segundos

    const mudou =
      forcada !== undefined ||
      resposta.situacao !== respostaSalva(atual).situacao ||
      resposta.alternativa !== respostaSalva(atual).alternativa
    if (!mudou && segundos === 0) return

    await responder.mutateAsync({ ordem: atual.ordem, ...resposta, tempoSegundos })
  }

  // Tempo acabou: o back marca tempo_esgotado ao receber o limite
  function expirar(ordem: number) {
    void executar(async () => {
      await responder.mutateAsync({
        ordem,
        alternativa: null,
        situacao: 'pendente',
        tempoSegundos: limite,
      })
      setAvancoAutomatico(ordem)
    })
  }

  useEffect(() => {
    if (!cronometrado || !bloqueada || atual.situacao === 'tempo_esgotado') return
    if (expirando.current.has(atual.ordem)) return
    expirando.current.add(atual.ordem)
    expirar(atual.ordem)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cronometrado, bloqueada, atual.ordem, atual.situacao])

  const proximaIndice = proximaPendente(questoes, indice)

  useEffect(() => {
    if (avancoAutomatico !== atual.ordem) return
    const espera = setTimeout(() => {
      if (proximaIndice >= 0) abrirQuestao(proximaIndice)
      else setAvancoAutomatico(null)
    }, ATRASO_AVANCO_AUTOMATICO_MS)
    return () => clearTimeout(espera)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avancoAutomatico, atual.ordem, proximaIndice])

  const irPara = (destino: number) => {
    if (destino === indice || destino < 0 || destino >= questoes.length) return
    void executar(async () => {
      await salvarAtual()
      abrirQuestao(destino)
    })
  }

  const responderEAvancar = () =>
    void executar(async () => {
      if (modoFinalizar) {
        await salvarAtual(selecionada ? { situacao: 'respondida', alternativa: selecionada } : undefined)
        setModalAberto(true)
        return
      }
      await salvarAtual({ situacao: 'respondida', alternativa: selecionada })
      abrirQuestao(proximaIndice)
    })

  const deixarEmBranco = () =>
    void executar(async () => {
      await salvarAtual({ situacao: 'em_branco', alternativa: null })
      if (modoFinalizar) setModalAberto(true)
      else abrirQuestao(proximaIndice)
    })

  const continuarBloqueada = () => {
    if (modoFinalizar) setModalAberto(true)
    else abrirQuestao(proximaIndice)
  }

  const pedirFinalizar = () =>
    void executar(async () => {
      await salvarAtual()
      setModalAberto(true)
    })

  const salvarESair = () =>
    void executar(async () => {
      await salvarAtual()
      navigate(ROTAS.simulados)
    })

  const confirmarFinalizacao = () => {
    finalizar.mutate(undefined, {
      onSuccess: () => navigate(ROTAS.simuladosRevisao(simulado.id)),
    })
  }

  const respondidas = questoes.filter((q) => q.situacao === 'respondida').length
  const emBranco = questoes.filter((q) => q.situacao === 'em_branco').length
  const esgotadas = questoes.filter((q) => q.situacao === 'tempo_esgotado').length
  const restantes = questoes.filter((q) => q.situacao === 'pendente').length
  const concluidas = totalQuestoes - restantes
  const semResposta = totalQuestoes - questoes.filter((q) => q.situacao === 'respondida').length

  const respondidaAgora = selecionada !== null

  return (
    <main className={styles.pageWrapper}>
      <SimuladoHeader
        tituloSimulado={simulado.titulo}
        tempo={formatarCronometro(cronometrado ? restante : tempoTotal)}
        rotuloTempo={cronometrado ? 'restantes nesta questão' : 'tempo nesta questão'}
        alerta={cronometrado && restante <= SEGUNDOS_ALERTA}
        desabilitado={ocupado}
        onFinalizar={pedirFinalizar}
        onSalvarSair={salvarESair}
      />

      <section className={styles.headerBar} aria-label="Progresso">
        <div className={styles.headerContainer}>
          <div className={styles.progressTopRow}>
            <div className={styles.progressTitle}>
              <strong>
                Questão {indice + 1} de {totalQuestoes}
              </strong>
              <div
                className={styles.progressBarTrack}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={totalQuestoes}
                aria-valuenow={concluidas}
              >
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${(concluidas / totalQuestoes) * 100}%` }}
                />
              </div>
            </div>

            <div className={styles.legendStats}>
              <span>
                <span className={`${styles.dot} ${styles.greenDot}`} /> {respondidas} respondidas
              </span>
              <span>
                <span className={`${styles.dot} ${styles.yellowDot}`} /> {emBranco} em branco
              </span>
              {esgotadas > 0 && (
                <span>
                  <span className={`${styles.dot} ${styles.redDot}`} /> {esgotadas} tempo esgotado
                </span>
              )}
              <span>
                <span className={`${styles.dot} ${styles.grayDot}`} /> {restantes} restantes
              </span>
            </div>
          </div>

          <div className={styles.numbersNavGrid}>
            {questoes.map((questao, i) => (
              <NavNumberButton
                key={questao.ordem}
                numero={i + 1}
                status={questao.situacao}
                isAtiva={questao.ordem === atual.ordem}
                disabled={ocupado}
                onClick={() => irPara(i)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.questionSection}>
        <div className={styles.questionContainer}>
          <div className={styles.tagsRow}>
            <span className={styles.tag}>{etiquetaQuestao(atual.area, atual.ano)}</span>
          </div>

          <Enunciado questao={atual} />

          {atual.situacao === 'tempo_esgotado' || bloqueada ? (
            <p role="status" className={styles.avisoTempo}>
              Tempo esgotado. Esta questão foi contada como em branco.
            </p>
          ) : null}

          <div className={styles.optionsList} role="radiogroup" aria-label="Alternativas">
            {atual.alternativas.map((alternativa) => (
              <OptionRow
                key={alternativa.rotulo}
                opcao={{ letra: alternativa.rotulo, texto: alternativa.texto }}
                isSelecionada={!bloqueada && selecionada === alternativa.rotulo}
                disabled={bloqueada || ocupado}
                onSelect={() => setSelecionada(alternativa.rotulo)}
              />
            ))}
          </div>

          {falha && (
            <div className={styles.falha}>
              <AvisoErro>{falha.mensagem} Sua resposta continua marcada.</AvisoErro>
              <button type="button" className={styles.whiteBtn} onClick={falha.tentarDeNovo}>
                Tentar de novo
              </button>
            </div>
          )}

          <div className={styles.actionsFooter}>
            <button
              type="button"
              className={styles.prevBtn}
              onClick={() => irPara(indice - 1)}
              disabled={indice === 0 || ocupado}
            >
              ← Questão anterior
            </button>

            <div className={styles.rightActions}>
              {bloqueada ? (
                <button
                  type="button"
                  className={`${styles.nextBtn} ${styles.activeNext}`}
                  onClick={continuarBloqueada}
                  disabled={ocupado || atual.situacao !== 'tempo_esgotado'}
                >
                  {modoFinalizar ? 'Finalizar simulado' : 'Continuar →'}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className={styles.whiteBtn}
                    onClick={deixarEmBranco}
                    disabled={ocupado}
                  >
                    Deixar em branco
                  </button>

                  <button
                    type="button"
                    className={`${styles.nextBtn} ${
                      respondidaAgora || modoFinalizar ? styles.activeNext : ''
                    }`}
                    onClick={responderEAvancar}
                    disabled={ocupado || (!respondidaAgora && !modoFinalizar)}
                  >
                    {modoFinalizar ? 'Finalizar simulado' : 'Responder e avançar →'}
                  </button>
                </>
              )}
            </div>
          </div>

          <p className={styles.bottomFooterNote}>
            ● Você pode voltar em qualquer questão antes de finalizar o simulado.
          </p>
        </div>
      </section>

      {modalAberto && (
        <ModalFinalizar
          totalQuestoes={totalQuestoes}
          semResposta={semResposta}
          enviando={finalizar.isPending}
          erro={finalizar.isError ? finalizar.error.message : null}
          onConfirmar={confirmarFinalizacao}
          onCancelar={() => {
            finalizar.reset()
            setModalAberto(false)
          }}
        />
      )}
    </main>
  )
}

export default function SimuladosQuestoes() {
  const { id = '' } = useParams()
  const consulta = useSimulado(id)

  return (
    <EstadoConsulta consultas={[consulta]} mensagemCarregando="Carregando simulado…">
      {([simulado]) =>
        simulado.status === 'concluido' ? (
          <Navigate to={ROTAS.simuladosRevisao(id)} replace />
        ) : (
          <Execucao key={simulado.id} simulado={simulado} />
        )
      }
    </EstadoConsulta>
  )
}

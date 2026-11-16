import { lazy, Suspense, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Pencil, Plus, RotateCcw } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ROTAS } from '../../../../routes/paths'
import { EstadoConsulta } from '../../../../components/ui/EstadoConsulta/EstadoConsulta'
import { AvisoErro } from '../../../../components/ui/AvisoErro/AvisoErro'
import {
  NOME_AREA,
  ORDEM_AREAS,
  useCriarSimulado,
  useOpcoesSimulado,
  type Area,
  type CriarSimuladoRequest,
  type OpcoesSimulado,
  type Tamanho,
} from '../../../../features/simulados'
import {
  formatarDuracao,
  formatarInteiro,
  formatarTempoPorQuestao,
} from '../../../../lib/utils/formatadores'
import { EsqueletoConfiguracao } from './components/EsqueletoConfiguracao/EsqueletoConfiguracao'
import { TamanhoCard, type TamanhoOpcao } from './components/TamanhoCard/TamanhoCard'
import { camposConfiguracao, schemaConfiguracao, type ConfiguracaoSimulado } from './schema'
import { dividir, maximoComAreas, somar, type Quantidades } from './personalizar/distribuicao'
import styles from './index.module.scss'
import { Trilha } from '../../compartilhados/Trilha/Trilha'

const TEXTO_TAMANHO: Record<Tamanho, { titulo: string; subtexto: string; sugerida?: boolean }> = {
  rapida: { titulo: 'Rápida', subtexto: 'Boa para treinar uma área só.' },
  media: {
    titulo: 'Média',
    subtexto: 'Equilibra tempo e variedade de conteúdo.',
    sugerida: true,
  },
  longa: { titulo: 'Longa', subtexto: 'Mais próxima do ritmo da prova real.' },
}

const VESTIBULARES_EM_BREVE = ['Vestibular UEM', 'Vestibular UTFPR', 'Vestibular UEL', 'Misturar todos']

// 1500 → "25 minutos" · 4500 → "1h15"
function descreverTempo(segundos: number) {
  const minutos = Math.round(segundos / 60)
  return minutos < 60 ? `${minutos} minutos` : formatarDuracao(segundos)
}

// cronometrado=true é o regressivo e false o crescente (D-95); o tempo nunca bloqueia a resposta
const MODOS_CRONOMETRO = [
  {
    cronometrado: true,
    titulo: 'Regressivo',
    texto: 'Conta para baixo a partir de um tempo de referência por questão. Quando zera, segue contando o tempo extra.',
  },
  {
    cronometrado: false,
    titulo: 'Crescente',
    texto: 'Conta o tempo que você passa em cada questão, sem referência.',
  },
]

// Selos das opções de tempo por questão
const SELO_TEMPO: Record<number, string> = { 150: 'sugerido', 180: 'ritmo do ENEM' }

// Os modais (e o react-aria deles) só baixam quando a pessoa clica em personalizar
const ModalTamanho = lazy(() =>
  import('./personalizar/ModalTamanho').then((m) => ({ default: m.ModalTamanho })),
)
const ModalCategorias = lazy(() =>
  import('./personalizar/ModalCategorias').then((m) => ({ default: m.ModalCategorias })),
)

// Valores vindos de outra tela (ex.: repetir a configuração de um simulado anterior)
function lerConfiguracaoInicial(state: unknown): Partial<ConfiguracaoSimulado> {
  const resultado = camposConfiguracao
    .omit({ banca: true })
    .partial({ segundosPorQuestao: true, tamanho: true, quantidade: true, quantidades: true })
    .safeParse(state)
  return resultado.success ? resultado.data : {}
}

// ?area=cn (vindo do "Onde focar agora") já deixa só essa área marcada
function lerAreaDaUrl(valor: string | null): Partial<ConfiguracaoSimulado> {
  const area = ORDEM_AREAS.find((id) => id === valor)
  return area ? { areas: [area] } : {}
}

function Formulario({ opcoes }: { opcoes: OpcoesSimulado }) {
  const navigate = useNavigate()
  const criar = useCriarSimulado()
  const { state } = useLocation()
  const [parametros] = useSearchParams()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ConfiguracaoSimulado>({
    resolver: zodResolver(schemaConfiguracao),
    defaultValues: {
      tamanho: 'media',
      quantidade: null,
      quantidades: null,
      banca: 'enem',
      areas: [...ORDEM_AREAS],
      cronometrado: true,
      segundosPorQuestao: opcoes.segundosPorQuestao,
      ...lerConfiguracaoInicial(state),
      ...lerAreaDaUrl(parametros.get('area')),
    },
  })

  const [modal, setModal] = useState<'tamanho' | 'categorias' | null>(null)
  const tamanho = useWatch({ control, name: 'tamanho' })
  const quantidade = useWatch({ control, name: 'quantidade' })
  const quantidades = useWatch({ control, name: 'quantidades' })
  const areasSel = useWatch({ control, name: 'areas' })
  const cronometrado = useWatch({ control, name: 'cronometrado' })
  const segundosPorQuestao = useWatch({ control, name: 'segundosPorQuestao' })
  // Sem cronômetro, a estimativa usa o tempo sugerido
  const segundosEstimados = cronometrado ? segundosPorQuestao : opcoes.segundosPorQuestao
  const temposPorQuestao = opcoes.temposPorQuestao.includes(segundosPorQuestao)
    ? opcoes.temposPorQuestao
    : [...opcoes.temposPorQuestao, segundosPorQuestao].sort((a, b) => a - b)

  const tamanhos: TamanhoOpcao[] = opcoes.tamanhos.map((t) => ({
    id: t.id,
    questoes: t.questoes,
    titulo: TEXTO_TAMANHO[t.id].titulo,
    subtexto: TEXTO_TAMANHO[t.id].subtexto,
    sugerida: TEXTO_TAMANHO[t.id].sugerida,
    descricaoTempo: `Cerca de ${descreverTempo(t.questoes * segundosEstimados)}.`,
  }))

  const areas = ORDEM_AREAS.flatMap((id) => opcoes.areas.find((a) => a.id === id) ?? [])
  const tamanhoAtual = tamanhos.find((t) => t.id === tamanho)
  const disponiveis = Object.fromEntries(areas.map((a) => [a.id, a.questoesDisponiveis])) as Record<Area, number>
  const limiteQuestoes = opcoes.maximoQuestoes ?? 100

  // Total do simulado: soma por categoria > tamanho personalizado > tamanho pronto (D-97)
  const totalQuestoes = quantidades ? somar(quantidades) : (quantidade ?? tamanhoAtual?.questoes ?? 0)
  const maximoTamanho = maximoComAreas(areasSel, disponiveis, limiteQuestoes)
  // O tamanho personalizado precisa caber nas categorias marcadas (sem repetir questão)
  const erroTamanho =
    !quantidades && quantidade !== null && areasSel.length > 0 && quantidade > maximoTamanho
      ? `Com as categorias marcadas, o máximo é ${maximoTamanho} questões. Diminua o tamanho ou marque mais categorias.`
      : null
  const distribuicao = ORDEM_AREAS.filter((id) => (quantidades?.[id] ?? 0) > 0).map(
    (id) => `${NOME_AREA[id]} ${quantidades?.[id]}`,
  )
  const descreverQuestoes = (n: number) => descreverTempo(n * segundosEstimados)
  const limite = formatarTempoPorQuestao(segundosPorQuestao)
  const todasMarcadas = areas.length > 0 && areasSel.length === areas.length
  const nomesAreas = areas.filter((a) => areasSel.includes(a.id)).map((a) => NOME_AREA[a.id])

  const alternarArea = (id: Area) => {
    const novas = areasSel.includes(id) ? areasSel.filter((a) => a !== id) : [...areasSel, id]
    setValue('areas', novas, { shouldValidate: true })
  }

  const alternarTodas = () => {
    setValue('areas', todasMarcadas ? [] : areas.map((a) => a.id), { shouldValidate: true })
  }

  const enviar = handleSubmit((dados) => {
    if (erroTamanho) return
    const comum = {
      banca: dados.banca,
      cronometrado: dados.cronometrado,
      segundosPorQuestao: dados.cronometrado ? dados.segundosPorQuestao : null,
    }
    let pedido: CriarSimuladoRequest
    if (dados.quantidades) pedido = { ...comum, quantidades: dados.quantidades }
    else if (dados.quantidade !== null) pedido = { ...comum, quantidade: dados.quantidade, areas: dados.areas }
    else pedido = { ...comum, tamanho: dados.tamanho, areas: dados.areas }
    criar.mutate(pedido, {
      onSuccess: (simulado) => navigate(ROTAS.simuladosQuestoes(simulado.id)),
    })
  })

  return (
    <form className={styles.contentContainer} onSubmit={enviar} noValidate>
      <div className={styles.configForm}>
        <div className={styles.sectionBlock}>
          <div className={styles.sectionTitleRow}>
            <h2>1 · TAMANHO DO SIMULADO</h2>
            <span className={styles.badgeObrigatorio}>obrigatório</span>
          </div>

          {quantidades && (
            <p className={styles.avisoDerivado} role="note">
              O tamanho vem da distribuição por categoria: {totalQuestoes}{' '}
              {totalQuestoes === 1 ? 'questão' : 'questões'}.
            </p>
          )}

          <fieldset
            className={`${styles.tamanhosGrid} ${quantidades ? styles.gradeInativa : ''}`}
            disabled={quantidades !== null}
          >
            <legend className={styles.somenteLeitor}>Tamanho do simulado</legend>
            {tamanhos.map((opcao) => (
              <TamanhoCard
                key={opcao.id}
                opcao={opcao}
                isSelecionado={!quantidades && quantidade === null && tamanho === opcao.id}
                onSelect={() => {
                  setValue('tamanho', opcao.id)
                  setValue('quantidade', null)
                }}
              />
            ))}
          </fieldset>

          {!quantidades &&
            (quantidade !== null ? (
              <div className={styles.personalizadoCard}>
                <div className={styles.personalizadoTexto}>
                  <span className={styles.seloPersonalizado}>Personalizado</span>
                  <strong>
                    {quantidade} {quantidade === 1 ? 'questão' : 'questões'}
                  </strong>
                  <span>Cerca de {descreverQuestoes(quantidade)}, divididas entre as categorias marcadas.</span>
                </div>
                <div className={styles.personalizadoAcoes}>
                  <button type="button" className={styles.acaoTexto} onClick={() => setModal('tamanho')}>
                    <Pencil size={14} aria-hidden="true" /> Editar
                  </button>
                  <button
                    type="button"
                    className={styles.acaoTexto}
                    onClick={() => setValue('quantidade', null)}
                  >
                    <RotateCcw size={14} aria-hidden="true" /> Usar tamanhos prontos
                  </button>
                </div>
              </div>
            ) : (
              <button type="button" className={styles.personalizarBtn} onClick={() => setModal('tamanho')}>
                <Plus size={16} aria-hidden="true" /> Personalizar tamanho
              </button>
            ))}
          {erroTamanho && <AvisoErro>{erroTamanho}</AvisoErro>}
        </div>

        <div className={styles.sectionBlock}>
          <h2>2 · VESTIBULAR</h2>
          <div className={styles.pillsRow}>
            {opcoes.bancas.map((banca) => (
              <button
                key={banca.id}
                type="button"
                aria-pressed="true"
                className={`${styles.pillBtn} ${styles.activePill}`}
              >
                {banca.nome}
              </button>
            ))}
            {VESTIBULARES_EM_BREVE.map((nome) => (
              <button key={nome} type="button" className={styles.pillBtn} disabled>
                {nome} <span className={styles.emBreve}>em breve</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.sectionBlock}>
          <div className={styles.sectionHeaderFlex}>
            <h2>3 · CATEGORIAS</h2>
            {!quantidades && (
              <button type="button" className={styles.linkAction} onClick={alternarTodas}>
                {todasMarcadas ? 'Desmarcar todas' : 'Selecionar todas'}
              </button>
            )}
          </div>

          {quantidades ? (
            <div className={styles.personalizadoCard}>
              <div className={styles.personalizadoTexto}>
                <span className={styles.seloPersonalizado}>Personalizado</span>
                <strong>{distribuicao.join(' · ')}</strong>
                <span>
                  {totalQuestoes} {totalQuestoes === 1 ? 'questão' : 'questões'} no total, cerca de{' '}
                  {descreverQuestoes(totalQuestoes)}.
                </span>
              </div>
              <div className={styles.personalizadoAcoes}>
                <button type="button" className={styles.acaoTexto} onClick={() => setModal('categorias')}>
                  <Pencil size={14} aria-hidden="true" /> Editar
                </button>
                <button
                  type="button"
                  className={styles.acaoTexto}
                  onClick={() => {
                    setValue('areas', ORDEM_AREAS.filter((id) => (quantidades[id] ?? 0) > 0))
                    setValue('quantidades', null)
                  }}
                >
                  <RotateCcw size={14} aria-hidden="true" /> Voltar a marcar categorias
                </button>
              </div>
            </div>
          ) : (
            <fieldset className={styles.categoriasGrid} aria-describedby={errors.areas ? 'erro-areas' : undefined}>
              <legend className={styles.somenteLeitor}>Categorias</legend>
              {areas.map((area) => {
                const marcada = areasSel.includes(area.id)
                const semQuestoes = area.questoesDisponiveis === 0
                return (
                  <label
                    key={area.id}
                    className={`${styles.checkboxCard} ${marcada ? styles.checkedCard : ''} ${
                      semQuestoes ? styles.cardDesabilitado : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={marcada}
                      disabled={semQuestoes}
                      onChange={() => alternarArea(area.id)}
                      className={styles.inputEscondido}
                    />
                    <span
                      aria-hidden="true"
                      className={`${styles.checkIcon} ${marcada ? styles.iconActive : ''}`}
                    >
                      {marcada && '✓'}
                    </span>
                    <span className={styles.catLabel}>
                      {NOME_AREA[area.id]}
                      <span className={styles.catDisponiveis}>
                        {formatarInteiro(area.questoesDisponiveis)} questões
                      </span>
                    </span>
                  </label>
                )
              })}
            </fieldset>
          )}
          {!quantidades && (
            <button type="button" className={styles.personalizarBtn} onClick={() => setModal('categorias')}>
              <Plus size={16} aria-hidden="true" /> Escolher quantas de cada categoria
            </button>
          )}
          {errors.areas && !quantidades && (
            <div id="erro-areas">
              <AvisoErro>{errors.areas.message}</AvisoErro>
            </div>
          )}
        </div>

        <div className={styles.sectionBlock}>
          <h2>4 · TEMPO</h2>
          <p className={styles.tempoAviso}>
            O cronômetro é só uma referência: você responde no seu ritmo e o tempo total aparece ao
            lado.
          </p>
          <div className={styles.modosGrid} role="radiogroup" aria-label="Cronômetro por questão">
            {MODOS_CRONOMETRO.map((modo) => {
              const ativo = cronometrado === modo.cronometrado
              return (
                <label
                  key={modo.titulo}
                  className={`${styles.modoCard} ${ativo ? styles.modoAtivo : ''}`}
                >
                  <input
                    type="radio"
                    name="cronometrado"
                    checked={ativo}
                    onChange={() => setValue('cronometrado', modo.cronometrado)}
                    className={styles.inputEscondido}
                  />
                  <span className={`${styles.radioIcon} ${ativo ? styles.radioAtivo : ''}`} />
                  <span className={styles.modoTexto}>
                    <strong>{modo.titulo}</strong>
                    <span>{modo.texto}</span>
                  </span>
                </label>
              )
            })}
          </div>

          {cronometrado && (
            <div className={styles.temposBloco}>
              <span className={styles.temposTitulo} id="rotulo-tempo">
                Tempo de referência por questão
              </span>
              <div className={styles.pillsRow} role="radiogroup" aria-labelledby="rotulo-tempo">
                {temposPorQuestao.map((segundos) => {
                  const ativo = segundosPorQuestao === segundos
                  return (
                    <label
                      key={segundos}
                      className={`${styles.pillBtn} ${ativo ? styles.activePill : ''}`}
                    >
                      <input
                        type="radio"
                        name="segundosPorQuestao"
                        value={segundos}
                        checked={ativo}
                        onChange={() => setValue('segundosPorQuestao', segundos)}
                        className={styles.inputEscondido}
                      />
                      {formatarTempoPorQuestao(segundos)}
                      {SELO_TEMPO[segundos] && (
                        <span className={styles.seloTempo}>{SELO_TEMPO[segundos]}</span>
                      )}
                    </label>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <aside className={styles.summarySidebar}>
        <div className={styles.summaryCard}>
          <h3 className={styles.summaryTitle}>Resumo</h3>

          <div className={styles.summaryList}>
            <div className={styles.summaryRow}>
              <span className={styles.label}>Tamanho</span>
              <strong className={styles.value}>
                {quantidades
                  ? `${totalQuestoes} questões (soma das categorias)`
                  : quantidade !== null
                    ? `Personalizado · ${quantidade} ${quantidade === 1 ? 'questão' : 'questões'}`
                    : `${tamanhoAtual?.titulo} · ${tamanhoAtual?.questoes} questões`}
              </strong>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.label}>Vestibular</span>
              <strong className={styles.value}>{opcoes.bancas[0]?.nome ?? 'ENEM'}</strong>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.label}>Categorias</span>
              <strong className={styles.value}>
                {quantidades
                  ? distribuicao.join(', ')
                  : nomesAreas.length > 0
                    ? nomesAreas.join(', ')
                    : 'Nenhuma selecionada'}
              </strong>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.label}>Tempo estimado</span>
              <strong className={styles.value}>
                {totalQuestoes > 0 ? descreverQuestoes(totalQuestoes) : '—'}
              </strong>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.label}>Cronômetro</span>
              <strong className={styles.value}>
                {cronometrado ? `Regressivo · ${limite} por questão` : 'Crescente'}
              </strong>
            </div>
          </div>

          {criar.isError && <AvisoErro>{criar.error.message}</AvisoErro>}

          <button type="submit" className={styles.startBtn} disabled={criar.isPending || erroTamanho !== null}>
            {criar.isPending ? 'Criando…' : 'Começar simulado'}
          </button>

          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => navigate(ROTAS.simulados)}
            disabled={criar.isPending}
          >
            Cancelar
          </button>

          <p className={styles.footerInfo}>
            ● Suas respostas ficam salvas a cada questão. Dá para sair e continuar depois de onde parou.
          </p>
        </div>
      </aside>

      <Suspense fallback={null}>
        {modal === 'tamanho' && (
          <ModalTamanho
            aberto
            inicial={quantidade ?? tamanhoAtual?.questoes ?? 20}
            maximo={maximoTamanho}
            limite={limiteQuestoes}
            descreverTempo={descreverQuestoes}
            onConfirmar={(n) => setValue('quantidade', n)}
            onFechar={() => setModal(null)}
          />
        )}
        {modal === 'categorias' && (
          <ModalCategorias
            aberto
            areas={areas}
            inicial={quantidades ?? dividir(totalQuestoes, areasSel)}
            limite={limiteQuestoes}
            descreverTempo={descreverQuestoes}
            onConfirmar={(novas: Quantidades) => setValue('quantidades', novas)}
            onFechar={() => setModal(null)}
          />
        )}
      </Suspense>
    </form>
  )
}

export default function SimuladosConfiguracao() {
  const consulta = useOpcoesSimulado()

  return (
    <main className={styles.pageWrapper}>
      <header className={styles.headerSection}>
        <div className={styles.headerContainer}>
          <Trilha
            itens={[{ rotulo: 'Simulados', para: ROTAS.simulados }, { rotulo: 'Novo simulado' }]}
            voltarPara={ROTAS.simulados}
            className={styles.trilha}
          />

          <h1 className={styles.title}>Configurar seu simulado</h1>

          <p className={styles.subtitle}>
            Escolha o tamanho, o vestibular e as categorias. Você pode sair e continuar depois.
          </p>
        </div>
      </header>

      <section className={styles.contentSection}>
        <EstadoConsulta
          consultas={[consulta]}
          carregando={<EsqueletoConfiguracao />}
          tituloErro="Não foi possível carregar as opções do simulado"
        >
          {([opcoes]) => <Formulario opcoes={opcoes} />}
        </EstadoConsulta>
      </section>
    </main>
  )
}

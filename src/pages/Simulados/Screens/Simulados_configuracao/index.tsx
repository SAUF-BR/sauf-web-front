import { Link, useLocation, useNavigate } from 'react-router-dom'
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
  type OpcoesSimulado,
  type Tamanho,
} from '../../../../features/simulados'
import { formatarDuracao, formatarInteiro } from '../../../../lib/utils/formatadores'
import { TamanhoCard, type TamanhoOpcao } from './components/TamanhoCard/TamanhoCard'
import { schemaConfiguracao, type ConfiguracaoSimulado } from './schema'
import styles from './index.module.scss'

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

// 150 → "2m30"
function formatarLimite(segundos: number) {
  return `${Math.floor(segundos / 60)}m${String(segundos % 60).padStart(2, '0')}`
}

// Valores vindos de outra tela (ex.: repetir a configuração de um simulado anterior)
function lerConfiguracaoInicial(state: unknown): Partial<ConfiguracaoSimulado> {
  const resultado = schemaConfiguracao.omit({ banca: true }).safeParse(state)
  return resultado.success ? resultado.data : {}
}

function Formulario({ opcoes }: { opcoes: OpcoesSimulado }) {
  const navigate = useNavigate()
  const criar = useCriarSimulado()
  const { state } = useLocation()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ConfiguracaoSimulado>({
    resolver: zodResolver(schemaConfiguracao),
    defaultValues: {
      tamanho: 'media',
      banca: 'enem',
      areas: [...ORDEM_AREAS],
      cronometrado: true,
      ...lerConfiguracaoInicial(state),
    },
  })

  const tamanho = useWatch({ control, name: 'tamanho' })
  const areasSel = useWatch({ control, name: 'areas' })
  const cronometrado = useWatch({ control, name: 'cronometrado' })

  const tamanhos: TamanhoOpcao[] = opcoes.tamanhos.map((t) => ({
    id: t.id,
    questoes: t.questoes,
    titulo: TEXTO_TAMANHO[t.id].titulo,
    subtexto: TEXTO_TAMANHO[t.id].subtexto,
    sugerida: TEXTO_TAMANHO[t.id].sugerida,
    descricaoTempo: `Cerca de ${descreverTempo(t.questoes * opcoes.segundosPorQuestao)}.`,
  }))

  const areas = ORDEM_AREAS.flatMap((id) => opcoes.areas.find((a) => a.id === id) ?? [])
  const tamanhoAtual = tamanhos.find((t) => t.id === tamanho)
  const limite = formatarLimite(opcoes.segundosPorQuestao)
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
    criar.mutate(dados, {
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

          <div className={styles.tamanhosGrid} role="radiogroup" aria-label="Tamanho do simulado">
            {tamanhos.map((opcao) => (
              <TamanhoCard
                key={opcao.id}
                opcao={opcao}
                isSelecionado={tamanho === opcao.id}
                onSelect={() => setValue('tamanho', opcao.id)}
              />
            ))}
          </div>
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
            <button type="button" className={styles.linkAction} onClick={alternarTodas}>
              {todasMarcadas ? 'Desmarcar todas' : 'Selecionar todas'}
            </button>
          </div>

          <div className={styles.categoriasGrid}>
            {areas.map((area) => {
              const marcada = areasSel.includes(area.id)
              return (
                <button
                  key={area.id}
                  type="button"
                  role="checkbox"
                  aria-checked={marcada}
                  disabled={area.questoesDisponiveis === 0}
                  className={`${styles.checkboxCard} ${marcada ? styles.checkedCard : ''}`}
                  onClick={() => alternarArea(area.id)}
                >
                  <div className={`${styles.checkIcon} ${marcada ? styles.iconActive : ''}`}>
                    {marcada && '✓'}
                  </div>
                  <span className={styles.catLabel}>
                    {NOME_AREA[area.id]}
                    <span className={styles.catDisponiveis}>
                      {formatarInteiro(area.questoesDisponiveis)} questões
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
          {errors.areas && <AvisoErro>{errors.areas.message}</AvisoErro>}
        </div>

        <div className={styles.sectionBlock}>
          <h2>4 · TEMPO</h2>
          <div className={styles.toggleCard}>
            <div>
              <strong id="rotulo-cronometro">Cronometrar o simulado</strong>
              <p>
                {cronometrado
                  ? `Limite de ${limite} por questão, como na prova real`
                  : 'Sem limite de tempo; o tempo gasto é medido mesmo assim'}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={cronometrado}
              aria-labelledby="rotulo-cronometro"
              className={`${styles.switchBtn} ${cronometrado ? styles.switchOn : ''}`}
              onClick={() => setValue('cronometrado', !cronometrado)}
            >
              <span className={styles.switchHandle} />
            </button>
          </div>
        </div>
      </div>

      <aside className={styles.summarySidebar}>
        <div className={styles.summaryCard}>
          <h3 className={styles.summaryTitle}>Resumo</h3>

          <div className={styles.summaryList}>
            <div className={styles.summaryRow}>
              <span className={styles.label}>Tamanho</span>
              <strong className={styles.value}>
                {tamanhoAtual?.titulo} · {tamanhoAtual?.questoes} questões
              </strong>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.label}>Vestibular</span>
              <strong className={styles.value}>{opcoes.bancas[0]?.nome ?? 'ENEM'}</strong>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.label}>Categorias</span>
              <strong className={styles.value}>
                {nomesAreas.length > 0 ? nomesAreas.join(', ') : 'Nenhuma selecionada'}
              </strong>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.label}>Tempo estimado</span>
              <strong className={styles.value}>
                {tamanhoAtual ? descreverTempo(tamanhoAtual.questoes * opcoes.segundosPorQuestao) : '—'}
              </strong>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.label}>Cronômetro</span>
              <strong className={styles.value}>
                {cronometrado ? `Limite de ${limite} por questão` : 'Desligado'}
              </strong>
            </div>
          </div>

          {criar.isError && <AvisoErro>{criar.error.message}</AvisoErro>}

          <button type="submit" className={styles.startBtn} disabled={criar.isPending}>
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
    </form>
  )
}

export default function SimuladosConfiguracao() {
  const consulta = useOpcoesSimulado()

  return (
    <main className={styles.pageWrapper}>
      <header className={styles.headerSection}>
        <div className={styles.headerContainer}>
          <nav className={styles.breadcrumb} aria-label="Você está em">
            <Link to={ROTAS.simulados}>Simulados</Link>
            <span>/</span>
            <span className={styles.currentBreadcrumb}>Novo simulado</span>
          </nav>

          <h1 className={styles.title}>Configurar seu simulado</h1>

          <p className={styles.subtitle}>
            Escolha o tamanho, o vestibular e as categorias. Você pode sair e continuar depois.
          </p>
        </div>
      </header>

      <section className={styles.contentSection}>
        <EstadoConsulta consultas={[consulta]} mensagemCarregando="Carregando opções…">
          {([opcoes]) => <Formulario opcoes={opcoes} />}
        </EstadoConsulta>
      </section>
    </main>
  )
}

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ROTAS } from '../../../../routes/paths'
import styles from './index.module.scss'
import { QuestaoBar } from './components/QuestaoBar/QuestaoBar'
import { QuestaoCard } from './components/QuestaoCard/QuestaoCard'
import { Titulo } from '../../../../components/ui/Titulo/Titulo'
import { EstadoConsulta } from '../../../../components/ui/EstadoConsulta/EstadoConsulta'
import { Carregando } from '../../../../components/ui/Carregando/Carregando'
import { AvisoErro } from '../../../../components/ui/AvisoErro/AvisoErro'
import { FilterPillButton } from './components/FilterPillButton/FilterPillButton'
import {
  NOME_AREA,
  ORDEM_AREAS,
  useRefazerErros,
  useRevisao,
  type Area,
  type RevisaoSimulado,
} from '../../../../features/simulados'
import { ErroApi } from '../../../../lib/api/erros'
import { formatarData, formatarDuracao } from '../../../../lib/utils/formatadores'

export type FiltroStatus = 'todas' | 'acertos' | 'erros' | 'em_branco'

const POR_PAGINA = 6

const RESULTADO_DO_FILTRO = {
  acertos: 'acerto',
  erros: 'erro',
  em_branco: 'em_branco',
} as const

const OPCOES_FILTRO: Array<{ label: string; tipo: FiltroStatus }> = [
  { label: 'Todas', tipo: 'todas' },
  { label: 'Acertos', tipo: 'acertos' },
  { label: 'Erros', tipo: 'erros' },
  { label: 'Em branco', tipo: 'em_branco' },
]

function Revisao({ revisao }: { revisao: RevisaoSimulado }) {
  const navigate = useNavigate()
  const refazer = useRefazerErros()

  const [visiveisCount, setVisiveisCount] = useState(POR_PAGINA)
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>('todas')
  const [area, setArea] = useState<Area | 'todas'>('todas')
  const [questaoAtiva, setQuestaoAtiva] = useState<number | null>(null)
  // Questão para onde rolar depois que a lista for renderizada
  const alvoRolagem = useRef<number | null>(null)

  const areasPresentes = ORDEM_AREAS.filter((id) =>
    revisao.porArea.some((item) => item.area === id),
  )

  const dasArea = revisao.questoes.filter((q) => area === 'todas' || q.area === area)
  const contagem: Record<FiltroStatus, number> = {
    todas: dasArea.length,
    acertos: dasArea.filter((q) => q.resultado === 'acerto').length,
    erros: dasArea.filter((q) => q.resultado === 'erro').length,
    em_branco: dasArea.filter((q) => q.resultado === 'em_branco').length,
  }

  const questoesFiltradas =
    filtroStatus === 'todas'
      ? dasArea
      : dasArea.filter((q) => q.resultado === RESULTADO_DO_FILTRO[filtroStatus])
  const questoesExibidas = questoesFiltradas.slice(0, visiveisCount)
  const restantes = questoesFiltradas.length - questoesExibidas.length

  useEffect(() => {
    if (alvoRolagem.current === null) return

    document
      .getElementById(`questao-${alvoRolagem.current}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    alvoRolagem.current = null
  }, [questaoAtiva, visiveisCount, filtroStatus, area])

  const handleFiltroChange = (novoFiltro: FiltroStatus) => {
    setFiltroStatus(novoFiltro)
    setVisiveisCount(POR_PAGINA)
  }

  const handleAreaChange = (novaArea: Area | 'todas') => {
    setArea(novaArea)
    setVisiveisCount(POR_PAGINA)
  }

  const paginasAte = (indice: number) => Math.ceil((indice + 1) / POR_PAGINA) * POR_PAGINA

  const irParaQuestao = (ordem: number) => {
    const indiceNaLista = questoesFiltradas.findIndex((q) => q.ordem === ordem)

    if (indiceNaLista === -1) {
      // Escondida pelos filtros: limpa os filtros e mostra a lista até ela
      setFiltroStatus('todas')
      setArea('todas')
      setVisiveisCount(
        Math.max(POR_PAGINA, paginasAte(revisao.questoes.findIndex((q) => q.ordem === ordem))),
      )
    } else if (indiceNaLista >= visiveisCount) {
      setVisiveisCount(paginasAte(indiceNaLista))
    }

    setQuestaoAtiva(ordem)

    const cardAtual = document.getElementById(`questao-${ordem}`)
    if (cardAtual) cardAtual.scrollIntoView({ behavior: 'smooth', block: 'center' })
    else alvoRolagem.current = ordem
  }

  const refazerErros = () =>
    refazer.mutate(revisao.id, {
      onSuccess: (novo) => navigate(ROTAS.simuladosQuestoes(novo.id)),
    })

  const semErros = revisao.erros === 0
  const total = revisao.totalQuestoes || 1
  const grafico = {
    '--acertos': `${(revisao.acertos / total) * 100}%`,
    '--ate-erros': `${((revisao.acertos + revisao.erros) / total) * 100}%`,
  } as CSSProperties

  return (
    <main className={styles.page}>
      <div className={styles.headerSection}>
        <div className={styles.headerContainer}>
          <div className={styles.leftInfo}>
            <div className={styles.breadcrumb}>
              <Link to={ROTAS.simulados}>Simulados</Link>
              <span>/</span>
              <span className={styles.currentBreadcrumb}>Revisão</span>
            </div>

            <Titulo
              titulo={revisao.titulo}
              subtitulo={`Concluído em ${formatarData(revisao.finalizadoEm)} · ${revisao.totalQuestoes} questões · ${formatarDuracao(revisao.duracaoSegundos)}`}
              size="Grande"
            />
          </div>

          <div className={styles.summaryCard}>
            <div
              className={styles.donutChart}
              role="img"
              aria-label={`${Math.round(revisao.porcentagemAcerto)}% de acertos`}
              style={grafico}
            >
              <div className={styles.donutHole}>
                <span>{Math.round(revisao.porcentagemAcerto)}%</span>
              </div>
            </div>

            <div className={styles.statsGroup}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>ACERTOS</span>
                <span className={`${styles.statValue} ${styles.greenValue}`}>{revisao.acertos}</span>
              </div>

              <div className={styles.statItem}>
                <span className={styles.statLabel}>ERROS</span>
                <span className={`${styles.statValue} ${styles.redValue}`}>{revisao.erros}</span>
              </div>

              <div className={styles.statItem}>
                <span className={styles.statLabel}>EM BRANCO</span>
                <span className={`${styles.statValue} ${styles.grayValue}`}>{revisao.emBranco}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className={styles.filterBarSection}>
        <div className={styles.filterBarContainer}>
          <div className={styles.controlsRow}>
            <div className={styles.statusPills}>
              {OPCOES_FILTRO.map((opcao) => (
                <FilterPillButton
                  key={opcao.tipo}
                  label={opcao.label}
                  quantidade={contagem[opcao.tipo]}
                  tipo={opcao.tipo}
                  filtroAtual={filtroStatus}
                  onSelect={handleFiltroChange}
                />
              ))}
            </div>

            <div className={styles.actionsRight}>
              <select
                value={area}
                onChange={(e) => handleAreaChange(e.target.value as Area | 'todas')}
                className={styles.categoriaSelect}
                aria-label="Filtrar por categoria"
              >
                <option value="todas">Categoria: todas</option>
                {areasPresentes.map((id) => (
                  <option key={id} value={id}>
                    {NOME_AREA[id]}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className={styles.refazerBtn}
                disabled={semErros || refazer.isPending}
                title={semErros ? 'Você não errou nenhuma questão neste simulado' : undefined}
                onClick={refazerErros}
              >
                {refazer.isPending ? 'Criando…' : 'Refazer só os erros'}
              </button>
            </div>
          </div>

          {refazer.isError && <AvisoErro>{refazer.error.message}</AvisoErro>}

          <div className={styles.questoesBarsRow}>
            {revisao.questoes.map((q) => (
              <QuestaoBar
                key={q.ordem}
                numero={q.ordem}
                status={q.resultado}
                isAtiva={questaoAtiva === q.ordem}
                onClick={() => irParaQuestao(q.ordem)}
              />
            ))}
          </div>
        </div>
      </section>
      <section className={styles.questoesListSection}>
        <div className={styles.questoesContainer}>
          {questoesExibidas.length === 0 && (
            <p className={styles.vazio}>Nenhuma questão com esses filtros.</p>
          )}

          {questoesExibidas.map((questao) => (
            <QuestaoCard
              key={questao.ordem}
              questao={questao}
              isAtiva={questaoAtiva === questao.ordem}
            />
          ))}

          {restantes > 0 && (
            <button
              type="button"
              className={styles.loadMoreBtn}
              onClick={() => setVisiveisCount((prev) => prev + POR_PAGINA)}
            >
              Ver as outras {restantes} {restantes === 1 ? 'questão' : 'questões'}
            </button>
          )}
        </div>
      </section>
    </main>
  )
}

export default function SimuladosHistorico() {
  const { id = '' } = useParams()
  const consulta = useRevisao(id)

  // Simulado ainda em andamento: não há revisão, volta para as questões
  if (consulta.error instanceof ErroApi && consulta.error.status === 409) {
    return <Navigate to={ROTAS.simuladosQuestoes(id)} replace />
  }

  return (
    <EstadoConsulta
      consultas={[consulta]}
      carregando={<Carregando mensagem="Carregando a revisão…" />}
      tituloErro="Não foi possível carregar a revisão"
    >
      {([revisao]) => <Revisao revisao={revisao} />}
    </EstadoConsulta>
  )
}

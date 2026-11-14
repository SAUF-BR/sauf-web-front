import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ROTAS } from '../../../../routes/paths'
import styles from './index.module.scss'
import { QuestaoBar } from './components/QuestaoBar/QuestaoBar'
import { QuestaoCard } from './components/QuestaoCard/QuestaoCard'
import { Titulo } from '../../../../components/ui/Titulo/Titulo'
import { EstadoConsulta } from '../../../../components/ui/EstadoConsulta/EstadoConsulta'
import { EsqueletoRevisao } from './components/EsqueletoRevisao/EsqueletoRevisao'
import { AvisoErro } from '../../../../components/ui/AvisoErro/AvisoErro'
import { Seletor } from '../../compartilhados/Seletor/Seletor'
import { FilterPillButton } from './components/FilterPillButton/FilterPillButton'
import {
  NOME_AREA,
  ORDEM_AREAS,
  useRefazerErros,
  useRevisao,
  type Area,
  type QuestaoRevisao,
  type RevisaoSimulado,
} from '../../../../features/simulados'
import { ErroApi } from '../../../../lib/api/erros'
import { formatarData, formatarDuracao, formatarQuantidade } from '../../../../lib/utils/formatadores'

export type FiltroStatus = 'todas' | 'acertos' | 'erros' | 'em_branco' | 'fora_do_tempo'

const POR_PAGINA = 6

const FILTRO: Record<Exclude<FiltroStatus, 'todas'>, (q: QuestaoRevisao) => boolean> = {
  acertos: (q) => q.resultado === 'acerto',
  erros: (q) => q.resultado === 'erro',
  em_branco: (q) => q.resultado === 'em_branco',
  fora_do_tempo: (q) => q.foraDoTempo,
}

const OPCOES_FILTRO: Array<{ label: string; tipo: FiltroStatus }> = [
  { label: 'Todas', tipo: 'todas' },
  { label: 'Acertos', tipo: 'acertos' },
  { label: 'Erros', tipo: 'erros' },
  { label: 'Em branco', tipo: 'em_branco' },
  { label: 'Fora do tempo', tipo: 'fora_do_tempo' },
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
  // Uma passada só pela lista para contar todos os filtros
  const contagem: Record<FiltroStatus, number> = {
    todas: dasArea.length,
    acertos: 0,
    erros: 0,
    em_branco: 0,
    fora_do_tempo: 0,
  }
  for (const questao of dasArea) {
    if (questao.resultado === 'acerto') contagem.acertos++
    else if (questao.resultado === 'erro') contagem.erros++
    else contagem.em_branco++
    if (questao.foraDoTempo) contagem.fora_do_tempo++
  }
  // O filtro "Fora do tempo" só aparece quando há alguma questão nele
  const opcoesFiltro = OPCOES_FILTRO.filter(
    (opcao) => opcao.tipo !== 'fora_do_tempo' || revisao.respondidasForaDoTempo > 0,
  )

  const questoesFiltradas =
    filtroStatus === 'todas' ? dasArea : dasArea.filter(FILTRO[filtroStatus])
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

  const limparFiltros = () => {
    setFiltroStatus('todas')
    setArea('todas')
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
    <main className={styles.pageWrapper}>
      <div className={styles.headerSection}>
        <div className={styles.headerContainer}>
          <div className={styles.leftInfo}>
            <nav className={styles.breadcrumb} aria-label="Você está em">
              <Link to={ROTAS.simulados}>Simulados</Link>
              <span aria-hidden="true">/</span>
              <span className={styles.currentBreadcrumb} aria-current="page">
                Revisão
              </span>
            </nav>

            <Titulo
              titulo={revisao.titulo}
              subtitulo={`Concluído em ${formatarData(revisao.finalizadoEm)} · ${formatarQuantidade(revisao.totalQuestoes, 'questão', 'questões')} · ${formatarDuracao(revisao.duracaoSegundos)}`}
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

              {revisao.respondidasForaDoTempo > 0 && (
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>FORA DO TEMPO</span>
                  <span className={`${styles.statValue} ${styles.amberValue}`}>
                    {revisao.respondidasForaDoTempo}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <section className={styles.filterBarSection}>
        <div className={styles.filterBarContainer}>
          <div className={styles.controlsRow}>
            <div className={styles.statusPills}>
              {opcoesFiltro.map((opcao) => (
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
              <Seletor
                rotulo="Categoria"
                valor={area}
                opcoes={[
                  { valor: 'todas', rotulo: 'Todas' },
                  ...areasPresentes.map((id) => ({ valor: id, rotulo: NOME_AREA[id] })),
                ]}
                onMudar={handleAreaChange}
              />

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
            <div className={styles.vazio} role="status">
              <p>Nenhuma questão com esses filtros.</p>
              <button type="button" className={styles.loadMoreBtn} onClick={limparFiltros}>
                Limpar filtros
              </button>
            </div>
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
              Ver {restantes === 1 ? 'a outra questão' : `as outras ${restantes} questões`}
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
      carregando={<EsqueletoRevisao />}
      tituloErro="Não foi possível carregar a revisão"
    >
      {([revisao]) => <Revisao revisao={revisao} />}
    </EstadoConsulta>
  )
}

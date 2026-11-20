import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Breadcrumb } from '../../components/ui/Breadcrumb/Breadcrumb'
import { EstadoErro } from '../../components/ui/EstadoErro/EstadoErro'
import { Titulo } from '../../components/ui/Titulo/Titulo'
import {
  TIPOS_EVENTO,
  agruparEventosPorDia,
  chaveInstituicao,
  contarEventosPorInstituicao,
  contarEventosPorTipo,
  eventosDoMes,
  useEventosDoAno,
  type TipoEvento,
} from '../../features/calendario'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import {
  formatarAnoMesIso,
  formatarDiaPorExtenso,
  formatarMesAno,
  lerAnoMes,
  obterAnoMes,
  obterHojeIso,
  type AnoMes,
} from '../../lib/utils'
import { ROTAS } from '../../routes/paths'
import { AgendaEventos } from './components/AgendaEventos/AgendaEventos'
import {
  FiltroInstituicao,
  TODAS_INSTITUICOES,
} from './components/FiltroInstituicao/FiltroInstituicao'
import { FiltroTiposEvento } from './components/FiltroTiposEvento/FiltroTiposEvento'
import { GradeMensal } from './components/GradeMensal/GradeMensal'
import { NavegacaoMes } from './components/NavegacaoMes/NavegacaoMes'
import styles from './index.module.scss'

const CONSULTA_CELULAR = '(max-width: 767px)'

export default function Calendario() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [tiposVisiveis, setTiposVisiveis] = useState<Set<TipoEvento>>(
    () => new Set(TIPOS_EVENTO),
  )
  const [instituicao, setInstituicao] = useState(TODAS_INSTITUICOES)
  const [diaSelecionado, setDiaSelecionado] = useState<string | null>(null)
  const compacto = useMediaQuery(CONSULTA_CELULAR)

  const hojeIso = obterHojeIso()
  const mesAtual = obterAnoMes(hojeIso)
  const anoMes = lerAnoMes(searchParams.get('mes')) ?? mesAtual

  const {
    data: eventosDoAno,
    isPending,
    isError,
    isFetching,
    isPlaceholderData,
    refetch,
  } = useEventosDoAno(anoMes.ano)
  // Enquanto o ano novo carrega, a grade mostra o anterior esmaecido, mas as contagens somem
  const dadosDoAno = eventosDoAno && !isPlaceholderData ? eventosDoAno : undefined

  const opcoesInstituicao = dadosDoAno ? contarEventosPorInstituicao(dadosDoAno) : []
  // A instituição escolhida continua no filtro (com 0) quando não tem datas no ano
  if (
    instituicao !== TODAS_INSTITUICOES &&
    !opcoesInstituicao.some((opcao) => opcao.chave === instituicao)
  ) {
    opcoesInstituicao.push({ chave: instituicao, total: 0 })
  }

  const eventosFiltrados = (eventosDoAno ?? []).filter(
    (evento) =>
      tiposVisiveis.has(evento.tipo) &&
      (instituicao === TODAS_INSTITUICOES || chaveInstituicao(evento) === instituicao),
  )
  const eventosPorDia = agruparEventosPorDia(eventosFiltrados, anoMes)

  // Um filtro pode esvaziar o dia escolhido: aí a agenda volta para o mês
  const diaComEventos =
    diaSelecionado && eventosPorDia.has(diaSelecionado) ? diaSelecionado : null
  const eventosDaAgenda = diaComEventos
    ? (eventosPorDia.get(diaComEventos) ?? [])
    : eventosDoMes(eventosFiltrados, anoMes)

  function mudarMes(novo: AnoMes) {
    setSearchParams({ mes: formatarAnoMesIso(novo) })
    setDiaSelecionado(null)
  }

  function alternarTipo(tipo: TipoEvento) {
    setTiposVisiveis((atuais) => {
      const proximos = new Set(atuais)
      if (proximos.has(tipo)) proximos.delete(tipo)
      else proximos.add(tipo)
      return proximos
    })
  }

  function selecionarDia(dataIso: string) {
    setDiaSelecionado((atual) => (atual === dataIso ? null : dataIso))
  }

  function mensagemVazia() {
    if (dadosDoAno?.length === 0) return `Ainda não há datas cadastradas para ${anoMes.ano}.`
    const filtrando =
      tiposVisiveis.size < TIPOS_EVENTO.length || instituicao !== TODAS_INSTITUICOES
    const mes = formatarMesAno(anoMes)
    return filtrando ? `Nenhum evento em ${mes} com os filtros escolhidos.` : `Nenhum evento em ${mes}.`
  }

  return (
    <main>
      <header className={styles.cabecalho}>
        <div className={styles.cabecalhoConteudo}>
          <Breadcrumb itens={[{ rotulo: 'Início', para: ROTAS.inicio }, { rotulo: 'Calendário' }]} />
          <Titulo
            titulo="Calendário acadêmico"
            subtitulo="Vestibulares, inscrições, provas e resultados em um só lugar"
            size="Medio"
          />
        </div>
      </header>

      <div className={styles.corpo}>
        <aside className={styles.lateral} aria-label="Filtros do calendário">
          <FiltroTiposEvento
            ano={anoMes.ano}
            contagem={dadosDoAno ? contarEventosPorTipo(dadosDoAno) : undefined}
            selecionados={tiposVisiveis}
            onAlternar={alternarTipo}
          />
          <FiltroInstituicao
            opcoes={opcoesInstituicao}
            valor={instituicao}
            onMudar={setInstituicao}
          />
          <p className={styles.nota}>
            As datas vêm dos editais e cronogramas oficiais e podem mudar. Confira sempre na fonte.
          </p>
        </aside>

        <section className={styles.principal} aria-label="Eventos do mês">
          <NavegacaoMes anoMes={anoMes} mesAtual={mesAtual} onMudarMes={mudarMes} />

          {isError && !eventosDoAno ? (
            <EstadoErro
              titulo="Não foi possível carregar o calendário"
              onTentarDeNovo={() => void refetch()}
              tentando={isFetching}
            />
          ) : (
            <>
              <GradeMensal
                anoMes={anoMes}
                eventosPorDia={eventosPorDia}
                hojeIso={hojeIso}
                carregando={isPending || isPlaceholderData}
                compacto={compacto}
                diaSelecionado={diaComEventos}
                onSelecionarDia={selecionarDia}
              />

              {!isPending && (
                <AgendaEventos
                  titulo={
                    diaComEventos
                      ? formatarDiaPorExtenso(diaComEventos)
                      : `Agenda de ${formatarMesAno(anoMes)}`
                  }
                  eventos={eventosDaAgenda}
                  mensagemVazia={mensagemVazia()}
                  onLimpar={diaComEventos ? () => setDiaSelecionado(null) : undefined}
                />
              )}
            </>
          )}
        </section>
      </div>
    </main>
  )
}

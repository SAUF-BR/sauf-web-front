import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Breadcrumb } from '../../components/ui/Breadcrumb/Breadcrumb'
import { Titulo } from '../../components/ui/Titulo/Titulo'
import {
  TIPOS_EVENTO,
  agruparEventosPorDia,
  contarEventosPorTipo,
  useEventosDoAno,
  type TipoEvento,
} from '../../features/calendario'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import {
  formatarAnoMesIso,
  lerAnoMes,
  obterAnoMes,
  obterHojeIso,
  type AnoMes,
} from '../../lib/utils'
import { ROTAS } from '../../routes/paths'
import { FiltroTiposEvento } from './components/FiltroTiposEvento/FiltroTiposEvento'
import { GradeMensal } from './components/GradeMensal/GradeMensal'
import { ListaEventosDia } from './components/ListaEventosDia/ListaEventosDia'
import { NavegacaoMes } from './components/NavegacaoMes/NavegacaoMes'
import styles from './index.module.scss'

const CONSULTA_CELULAR = '(max-width: 767px)'

export default function Calendario() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [tiposVisiveis, setTiposVisiveis] = useState<Set<TipoEvento>>(
    () => new Set(TIPOS_EVENTO),
  )
  const [diaSelecionado, setDiaSelecionado] = useState<string | null>(null)
  const compacto = useMediaQuery(CONSULTA_CELULAR)

  const hojeIso = obterHojeIso()
  const anoMes = lerAnoMes(searchParams.get('mes')) ?? obterAnoMes(hojeIso)
  const prefixoMes = `${formatarAnoMesIso(anoMes)}-`

  const {
    data: eventosDoAno,
    isPending,
    isError,
    isPlaceholderData,
  } = useEventosDoAno(anoMes.ano)

  const eventosVisiveis = (eventosDoAno ?? []).filter(
    (evento) => evento.data.startsWith(prefixoMes) && tiposVisiveis.has(evento.tipo),
  )
  const eventosPorDia = agruparEventosPorDia(eventosVisiveis)
  const eventosDoDiaSelecionado = diaSelecionado ? eventosPorDia.get(diaSelecionado) : undefined

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
        <aside className={styles.lateral}>
          <FiltroTiposEvento
            ano={anoMes.ano}
            contagem={
              eventosDoAno && !isPlaceholderData ? contarEventosPorTipo(eventosDoAno) : undefined
            }
            selecionados={tiposVisiveis}
            onAlternar={alternarTipo}
          />
        </aside>

        <section className={styles.principal} aria-label="Eventos do mês">
          <NavegacaoMes anoMes={anoMes} onMudarMes={mudarMes} />

          {isError ? (
            <p className={styles.erro} role="alert">
              Não foi possível carregar os eventos. Tente novamente em instantes.
            </p>
          ) : (
            <GradeMensal
              anoMes={anoMes}
              eventosPorDia={eventosPorDia}
              hojeIso={hojeIso}
              carregando={isPending || isPlaceholderData}
              compacto={compacto}
              diaSelecionado={compacto ? diaSelecionado : null}
              onSelecionarDia={setDiaSelecionado}
            />
          )}

          {compacto && diaSelecionado && eventosDoDiaSelecionado && (
            <ListaEventosDia dataIso={diaSelecionado} eventos={eventosDoDiaSelecionado} />
          )}
        </section>
      </div>
    </main>
  )
}

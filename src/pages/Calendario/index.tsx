import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Breadcrumb } from '../../components/ui/Breadcrumb/Breadcrumb'
import { EstadoErro } from '../../components/ui/EstadoErro/EstadoErro'
import { Titulo } from '../../components/ui/Titulo/Titulo'
import {
  ROTULO_TIPO_EVENTO,
  TIPOS_EVENTO,
  agruparEventosPorDia,
  chaveInstituicao,
  contarEventosPorInstituicao,
  contarEventosPorTipo,
  eventosDoMes,
  somarDias,
  useEventosDoAno,
  useProximosPrazos,
  type TipoEvento,
} from '../../features/calendario'
import {
  cn,
  formatarAnoMesIso,
  formatarMesAno,
  lerAnoMes,
  obterAnoMes,
  obterHojeIso,
  type AnoMes,
} from '../../lib/utils'
import { ROTAS } from '../../routes/paths'
import { BarraFiltros, TODAS_INSTITUICOES } from './components/BarraFiltros/BarraFiltros'
import { DestaquePrazos } from './components/DestaquePrazos/DestaquePrazos'
import { GradeMensal } from './components/GradeMensal/GradeMensal'
import { ListaDoMes } from './components/ListaDoMes/ListaDoMes'
import { ModalDia } from './components/ModalDia/ModalDia'
import { NavegacaoMes } from './components/NavegacaoMes/NavegacaoMes'
import styles from './index.module.scss'

// Tipos que aparecem no resumo ao lado do mês
const TIPOS_DO_RESUMO: TipoEvento[] = ['inscricao', 'prova', 'resultado']

export default function Calendario() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [tiposVisiveis, setTiposVisiveis] = useState<Set<TipoEvento>>(
    () => new Set(TIPOS_EVENTO),
  )
  const [instituicao, setInstituicao] = useState(TODAS_INSTITUICOES)
  const [diaAberto, setDiaAberto] = useState<string | null>(null)

  const hojeIso = obterHojeIso()
  const mesAtual = obterAnoMes(hojeIso)
  const anoMes = lerAnoMes(searchParams.get('mes')) ?? mesAtual

  const prazos = useProximosPrazos(3)
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
  const eventosNoMes = eventosDoMes(eventosFiltrados, anoMes)
  const eventosPorDia = agruparEventosPorDia(eventosFiltrados, anoMes)
  const resumo = contarEventosPorTipo(eventosNoMes)

  // As setas do modal andam só dentro do mês que está na tela
  const prefixoMes = formatarAnoMesIso(anoMes)
  const diaAnterior = diaAberto && somarDias(diaAberto, -1)
  const diaSeguinte = diaAberto && somarDias(diaAberto, 1)

  function mudarMes(novo: AnoMes) {
    setSearchParams({ mes: formatarAnoMesIso(novo) })
  }

  function abrirPrazo(dataIso: string) {
    const mes = obterAnoMes(dataIso)
    if (mes.ano !== anoMes.ano || mes.mes !== anoMes.mes) mudarMes(mes)
    setDiaAberto(dataIso)
  }

  function alternarTipo(tipo: TipoEvento) {
    setTiposVisiveis((atuais) => {
      const proximos = new Set(atuais)
      if (proximos.has(tipo)) proximos.delete(tipo)
      else proximos.add(tipo)
      return proximos
    })
  }

  function limparFiltros() {
    setTiposVisiveis(new Set(TIPOS_EVENTO))
    setInstituicao(TODAS_INSTITUICOES)
  }

  function mensagemVazia() {
    if (dadosDoAno?.length === 0) return `Ainda não há datas cadastradas para ${anoMes.ano}.`
    const filtrando =
      tiposVisiveis.size < TIPOS_EVENTO.length || instituicao !== TODAS_INSTITUICOES
    return filtrando
      ? 'Nenhuma data neste mês com os filtros escolhidos. Limpe os filtros para ver todas.'
      : 'Nenhuma data cadastrada neste mês. Use as setas para ver os meses vizinhos.'
  }

  return (
    <main>
      <header className={styles.cabecalho}>
        <div className={styles.cabecalhoConteudo}>
          <div className={styles.apresentacao}>
            <Breadcrumb
              itens={[{ rotulo: 'Início', para: ROTAS.inicio }, { rotulo: 'Calendário' }]}
            />
            <Titulo
              titulo="Calendário acadêmico"
              subtitulo="Inscrições, provas e resultados dos vestibulares, do ENEM e do ProUni, mês a mês."
              size="Medio"
            />
            <p className={styles.aviso}>
              Cada data vem do edital ou do cronograma oficial e pode mudar. Antes de se inscrever,
              confira na fonte, que fica no detalhe de cada evento.
            </p>
          </div>

          <DestaquePrazos
            prazos={prazos.data}
            carregando={prazos.isPending}
            erro={prazos.isError}
            onAbrir={abrirPrazo}
          />
        </div>
      </header>

      <div className={styles.corpo}>
        <div className={styles.barraMes}>
          <NavegacaoMes anoMes={anoMes} mesAtual={mesAtual} onMudarMes={mudarMes} />

          {dadosDoAno && (
            <ul className={styles.resumo} aria-label={`Resumo de ${formatarMesAno(anoMes)}`}>
              {TIPOS_DO_RESUMO.map((tipo) => (
                <li key={tipo} className={cn(styles.resumoItem, styles[tipo])}>
                  <span className={styles.resumoNumero}>{resumo[tipo]}</span>
                  {ROTULO_TIPO_EVENTO[tipo].toLowerCase()}
                </li>
              ))}
            </ul>
          )}
        </div>

        <BarraFiltros
          tipos={tiposVisiveis}
          contagemTipos={dadosDoAno ? contarEventosPorTipo(dadosDoAno) : undefined}
          instituicao={instituicao}
          opcoesInstituicao={opcoesInstituicao}
          totalDoAno={dadosDoAno?.length}
          onAlternarTipo={alternarTipo}
          onMudarInstituicao={setInstituicao}
          onLimpar={limparFiltros}
        />

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
              eventos={eventosFiltrados}
              eventosPorDia={eventosPorDia}
              hojeIso={hojeIso}
              carregando={isPending || isPlaceholderData}
              onAbrirDia={setDiaAberto}
            />

            {!isPending && (
              <ListaDoMes
                anoMes={anoMes}
                eventos={eventosNoMes}
                mensagemVazia={mensagemVazia()}
                onAbrirDia={setDiaAberto}
              />
            )}
          </>
        )}
      </div>

      <ModalDia
        dataIso={diaAberto}
        eventos={diaAberto ? (eventosPorDia.get(diaAberto) ?? []) : []}
        carregando={isPending || isPlaceholderData}
        anterior={diaAnterior?.startsWith(prefixoMes) ? diaAnterior : null}
        proximo={diaSeguinte?.startsWith(prefixoMes) ? diaSeguinte : null}
        onMudarDia={setDiaAberto}
        onFechar={() => setDiaAberto(null)}
      />
    </main>
  )
}

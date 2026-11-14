import { useState } from 'react'
import { EstadoConsulta } from '../../../../components/ui/EstadoConsulta/EstadoConsulta'
import { useCronometroSimulados, type DadosCronometro } from '../../../../features/simulados'
import { CabecalhoSimulados } from '../../compartilhados/CabecalhoSimulados/CabecalhoSimulados'
import { SeletorPeriodo } from '../../compartilhados/SeletorPeriodo/SeletorPeriodo'
import { StatCard } from '../../compartilhados/StatCard/StatCard'
import {
  calcularVariacao,
  formatarDias,
  formatarHoras,
  formatarMinutosSegundos,
  Periodo_padrao,
  Periodos,
  type Comparativo,
  type Periodo,
} from '../../compartilhados/conteudo'
import { HorasPorSemana } from './components/HorasPorSemana/HorasPorSemana'
import { QuadroOfensivas } from './components/QuadroOfensivas/QuadroOfensivas'
import { RitmoPorCategoria } from './components/RitmoPorCategoria/RitmoPorCategoria'
import { TempoPorConfiguracao } from './components/TempoPorConfiguracao/TempoPorConfiguracao'
import { calcularMediaDiaria } from './conteudo'
import { EsqueletoCronometro } from './components/EsqueletoCronometro/EsqueletoCronometro'
import styles from './index.module.scss'

function Painel({ dados, periodo }: { dados: DadosCronometro; periodo: Periodo }) {
  const rotuloAnterior = Periodos[periodo].rotuloAnterior
  const diasAtivos = dados.diasAtivos.atual
  const mediaDiaria = calcularMediaDiaria(dados)
  const textoAnterior = ({ anterior }: Comparativo, formatar: (valor: number) => string) =>
    anterior !== null ? `${rotuloAnterior}: ${formatar(anterior)}` : 'Sem dados do período anterior'

  return (
    <div className={styles.corpo}>
      <section aria-label="Resumo do período" className={styles.resumo}>
        <StatCard
          rotulo="Tempo total em simulados"
          valor={formatarHoras(dados.tempoTotal.atual)}
          variacao={calcularVariacao(dados.tempoTotal, formatarHoras)}
          detalhe={textoAnterior(dados.tempoTotal, formatarHoras)}
        />
        <StatCard
          rotulo="Tempo médio por questão"
          valor={formatarMinutosSegundos(dados.tempoMedioQuestao.atual)}
          variacao={calcularVariacao(dados.tempoMedioQuestao, formatarMinutosSegundos, true)}
          detalhe={textoAnterior(dados.tempoMedioQuestao, formatarMinutosSegundos)}
        />
        <StatCard
          rotulo="Média diária de estudo"
          valor={formatarHoras(mediaDiaria.atual)}
          variacao={calcularVariacao(mediaDiaria, formatarHoras)}
          detalhe={
            diasAtivos === 1
              ? 'Considerando 1 dia ativo'
              : `Considerando os ${diasAtivos} dias ativos`
          }
        />
        <StatCard
          rotulo="Ofensiva atual"
          valor={formatarDias(dados.ofensiva.atual)}
          complemento={dados.ofensiva.atual > 1 ? 'seguidos' : undefined}
          detalhe={`Seu recorde: ${formatarDias(dados.ofensiva.recorde)}`}
          destaque
        />
      </section>

      <QuadroOfensivas dias={dados.dias} />

      <div className={styles.inferior}>
        <TempoPorConfiguracao configuracoes={dados.porConfiguracao} />

        <div className={styles.lateral}>
          <HorasPorSemana semanas={dados.horasPorSemana} />
          <RitmoPorCategoria categorias={dados.ritmoPorCategoria} />
        </div>
      </div>
    </div>
  )
}

export default function Cronometro() {
  const [periodo, setPeriodo] = useState<Periodo>(Periodo_padrao)
  const consulta = useCronometroSimulados(periodo)

  return (
    <main>
      <CabecalhoSimulados
        abaAtiva="cronometro"
        titulo="Cronômetro"
        descricao="Tempo medido automaticamente em cada simulado"
        acoes={<SeletorPeriodo valor={periodo} onMudar={setPeriodo} />}
      />

      <EstadoConsulta
        consultas={[consulta]}
        carregando={<EsqueletoCronometro />}
        tituloErro="Não foi possível carregar seus tempos"
        className={styles.estado}
      >
        {([dados]) => <Painel dados={dados} periodo={periodo} />}
      </EstadoConsulta>
    </main>
  )
}
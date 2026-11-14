import { Link, useSearchParams } from 'react-router-dom'
import { ROTAS } from '../../../../routes/paths'
import { EstadoConsulta } from '../../../../components/ui/EstadoConsulta/EstadoConsulta'
import { useAcompanhamento, type DadosAcompanhamento } from '../../../../features/simulados'
import styles from './index.module.scss'
import { EvolucaoAproveitamento } from './components/EvolucaoAproveitamento'
import { AcertosErrosCard } from './components/AcertosErrosCard'
import { AcertosCategoria } from './components/AcertosCategoria'
import { OndeFocarCard } from './components/OndeFocarCard'
import { ConstanciaCard } from './components/ConstanciaCard'
import { EsqueletoAcompanhamento } from './components/EsqueletoAcompanhamento'
import { CabecalhoSimulados } from '../../compartilhados/CabecalhoSimulados/CabecalhoSimulados'
import { SeletorPeriodo } from '../../compartilhados/SeletorPeriodo/SeletorPeriodo'
import { Seletor, type OpcaoSeletor } from '../../compartilhados/Seletor/Seletor'
import { StatCard } from '../../compartilhados/StatCard/StatCard'
import {
  calcularVariacao,
  formatarPontos,
  formatarPorcentagem,
  lerPeriodo,
  Periodos,
  type Periodo,
} from '../../compartilhados/conteudo'

const OPCOES_VESTIBULAR: OpcaoSeletor<string>[] = [
  { valor: 'enem', rotulo: 'ENEM' },
  { valor: 'uem', rotulo: 'UEM', desabilitada: true, detalhe: 'em breve' },
  { valor: 'utfpr', rotulo: 'UTFPR', desabilitada: true, detalhe: 'em breve' },
  { valor: 'uel', rotulo: 'UEL', desabilitada: true, detalhe: 'em breve' },
]

const NADA = () => {}

const formatarInteiro = (valor: number) => valor.toLocaleString('pt-BR')

function Painel({ dados, periodo }: { dados: DadosAcompanhamento; periodo: Periodo }) {
  const { resumo } = dados
  const rotuloAnterior = Periodos[periodo].rotuloAnterior
  const textoAnterior = (anterior: number | null, formatar: (valor: number) => string) =>
    anterior === null ? `${rotuloAnterior}: sem simulados` : `${rotuloAnterior}: ${formatar(anterior)}`

  // Sem simulado concluído nem questão respondida, os números seriam todos zero
  if (resumo.simuladosConcluidos.atual === 0 && resumo.questoesRespondidas.atual === 0) {
    return (
      <section className={styles.vazio}>
        <div className={styles.vazioCaixa}>
          <h2 className={styles.vazioTitulo}>Nenhum simulado no período</h2>
          <p>
            Conclua um simulado para ver aqui seu aproveitamento, onde focar e sua constância de
            estudo.
          </p>
          <Link to={ROTAS.simuladosConfiguracao} className={styles.vazioAcao}>
            Criar simulado
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <section aria-label="Resumo do período" className={styles.statsGrid}>
        <StatCard
          rotulo="Aproveitamento"
          valor={resumo.aproveitamento.atual === null ? '—' : formatarPorcentagem(resumo.aproveitamento.atual)}
          variacao={calcularVariacao(resumo.aproveitamento, formatarPontos)}
          detalhe={textoAnterior(resumo.aproveitamento.anterior, formatarPorcentagem)}
        />
        <StatCard
          rotulo="Questões respondidas"
          valor={formatarInteiro(resumo.questoesRespondidas.atual)}
          variacao={calcularVariacao(resumo.questoesRespondidas, formatarInteiro)}
          detalhe={textoAnterior(resumo.questoesRespondidas.anterior, formatarInteiro)}
        />
        <StatCard
          rotulo="Simulados concluídos"
          valor={formatarInteiro(resumo.simuladosConcluidos.atual)}
          variacao={calcularVariacao(resumo.simuladosConcluidos, formatarInteiro)}
          detalhe={textoAnterior(resumo.simuladosConcluidos.anterior, formatarInteiro)}
        />
        <StatCard
          rotulo="Acertos"
          valor={formatarInteiro(resumo.acertos.atual)}
          variacao={calcularVariacao(resumo.acertos, formatarInteiro)}
          detalhe={textoAnterior(resumo.acertos.anterior, formatarInteiro)}
        />
      </section>

      <section className={styles.middleSection}>
        <EvolucaoAproveitamento
          simulados={dados.evolucao.simulados}
          mediaPlataforma={dados.evolucao.mediaPlataforma}
        />
        <AcertosErrosCard atual={dados.distribuicao.atual} anterior={dados.distribuicao.anterior} />
      </section>

      <section className={styles.bottomSection}>
        <AcertosCategoria areas={dados.areas} />

        <div className={styles.rightStack}>
          <OndeFocarCard focos={dados.focos} />
          <ConstanciaCard constancia={dados.constancia} periodo={periodo} />
        </div>
      </section>
    </>
  )
}

export default function SimuladosMeuAcompanhamento() {
  const [parametros, setParametros] = useSearchParams()
  const periodo = lerPeriodo(parametros.get('periodo'))
  const consulta = useAcompanhamento(periodo)

  const mudarPeriodo = (novo: Periodo) => {
    setParametros(
      (atuais) => {
        atuais.set('periodo', novo)
        return atuais
      },
      { replace: true },
    )
  }

  return (
    <main className={styles.pagina}>
      <CabecalhoSimulados
        abaAtiva="acompanhamento"
        titulo="Meu acompanhamento"
        descricao="Sua evolução nos simulados"
        acoes={
          <div className={styles.filtros}>
            <SeletorPeriodo valor={periodo} onMudar={mudarPeriodo} />
            <Seletor
              rotulo="Vestibular"
              valor="enem"
              opcoes={OPCOES_VESTIBULAR}
              onMudar={NADA}
            />
          </div>
        }
      />

      <EstadoConsulta
        consultas={[consulta]}
        carregando={<EsqueletoAcompanhamento />}
        tituloErro="Não foi possível carregar seu acompanhamento"
        className={styles.estado}
      >
        {([dados]) => <Painel dados={dados} periodo={periodo} />}
      </EstadoConsulta>
    </main>
  )
}

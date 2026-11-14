import { useSearchParams } from 'react-router-dom'
import { EstadoConsulta } from '../../../../components/ui/EstadoConsulta/EstadoConsulta'
import { useRanking } from '../../../../features/simulados'
import { CabecalhoSimulados } from '../../compartilhados/CabecalhoSimulados/CabecalhoSimulados'
import { AreaCarregando, Esqueleto } from '../../compartilhados/Esqueleto/Esqueleto'
import { SeletorPeriodo } from '../../compartilhados/SeletorPeriodo/SeletorPeriodo'
import { lerPeriodo, type Periodo } from '../../compartilhados/conteudo'
import { PodioPeriodo } from './components/PodioPeriodo/PodioPeriodo'
import { SuaColocacao } from './components/SuaColocacao/SuaColocacao'
import { posicoesPrivadas, tituloPodio } from './conteudo'
import styles from './index.module.scss'

function EsqueletoRanking() {
  return (
    <AreaCarregando rotulo="Carregando o ranking…" className={styles.corpo}>
      <Esqueleto altura="22rem" />
      <Esqueleto altura="22rem" />
    </AreaCarregando>
  )
}

export default function Ranking() {
  const [parametros, setParametros] = useSearchParams()
  const periodo = lerPeriodo(parametros.get('periodo'))
  const consulta = useRanking(periodo)

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
    <main>
      <CabecalhoSimulados
        abaAtiva="ranking"
        titulo="Ranking"
        descricao="Ranking por tempo dedicado a simulados"
        acoes={<SeletorPeriodo valor={periodo} onMudar={mudarPeriodo} />}
      />

      <EstadoConsulta
        consultas={[consulta]}
        carregando={<EsqueletoRanking />}
        tituloErro="Não foi possível carregar o ranking"
        className={styles.estado}
      >
        {([dados]) => (
          <div className={styles.corpo}>
            <PodioPeriodo
              titulo={tituloPodio(periodo, dados.janela.inicio)}
              totalParticipantes={dados.totalParticipantes}
              podio={dados.podio}
              privadas={posicoesPrivadas(dados)}
            />
            <SuaColocacao dados={dados} />
          </div>
        )}
      </EstadoConsulta>
    </main>
  )
}

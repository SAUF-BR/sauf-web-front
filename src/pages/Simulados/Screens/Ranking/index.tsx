import { useState } from 'react'
import { CabecalhoSimulados } from '../../compartilhados/CabecalhoSimulados/CabecalhoSimulados'
import { SeletorPeriodo } from '../../compartilhados/SeletorPeriodo/SeletorPeriodo'
import { Periodo_padrao, type Periodo } from '../../compartilhados/conteudo'
import { PodioPeriodo } from './components/PodioPeriodo/PodioPeriodo'
import { SuaColocacao } from './components/SuaColocacao/SuaColocacao'
import { tituloPodio } from './conteudo'
import { useRanking } from './useRanking'
import styles from './index.module.scss'

export default function Ranking() {
  const [periodo, setPeriodo] = useState<Periodo>(Periodo_padrao)
  const { dados, carregando, erro } = useRanking(periodo)

  return (
    <main>
      <CabecalhoSimulados
        abaAtiva="ranking"
        titulo="Ranking"
        descricao="Ranking por tempo dedicado a simulados"
        acoes={<SeletorPeriodo valor={periodo} onMudar={setPeriodo} />}
      />

      {carregando && (
        <p className={styles.estado} aria-busy="true">
          Carregando o ranking…
        </p>
      )}

      {!carregando && (erro || !dados) && (
        <p className={styles.estado}>
          Não foi possível carregar o ranking. Tente novamente em instantes.
        </p>
      )}

      {!carregando && !erro && dados && (
        <div className={styles.corpo}>
          <PodioPeriodo
            titulo={tituloPodio(periodo)}
            totalParticipantes={dados.totalParticipantes}
            podio={dados.podio}
          />
          <SuaColocacao dados={dados} />
        </div>
      )}
    </main>
  )
}
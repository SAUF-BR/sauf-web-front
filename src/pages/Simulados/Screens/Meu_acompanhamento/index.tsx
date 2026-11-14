import { useState } from 'react'
import styles from './index.module.scss'
import { StatCard } from './components/StatCard'
import { EvolucaoAproveitamento } from './components/EvolucaoAproveitamento'
import { AcertosErrosCard } from './components/AcertosErrosCard'
import { AcertosCategoria } from './components/AcertosCategoria'
import { OndeFocarCard } from './components/OndeFocarCard'
import { ConstanciaCard } from './components/ConstanciaCard'
import { CabecalhoSimulados } from '../../compartilhados/CabecalhoSimulados/CabecalhoSimulados'
import { SeletorPeriodo } from '../../compartilhados/SeletorPeriodo/SeletorPeriodo'
import { Seletor, type OpcaoSeletor } from '../../compartilhados/Seletor/Seletor'
import { Periodo_padrao, type Periodo } from '../../compartilhados/conteudo'
import {
  mockAcertosErros,
  mockCategorias,
  mockConstancia,
  mockEvolucao,
  mockOndeFocar,
  mockStats,
} from './mock'

const OPCOES_VESTIBULAR: OpcaoSeletor<string>[] = [
  { valor: 'enem', rotulo: 'ENEM' },
  { valor: 'uem', rotulo: 'UEM', desabilitada: true, detalhe: 'em breve' },
  { valor: 'utfpr', rotulo: 'UTFPR', desabilitada: true, detalhe: 'em breve' },
  { valor: 'uel', rotulo: 'UEL', desabilitada: true, detalhe: 'em breve' },
]

const NADA = () => {}

export default function SimuladosMeuAcompanhamento() {
  const [periodo, setPeriodo] = useState<Periodo>(Periodo_padrao)

  return (
    <main className={styles.pagina}>
      <CabecalhoSimulados
        abaAtiva="acompanhamento"
        titulo="Meu acompanhamento"
        descricao="Sua evolução nos simulados"
        acoes={
          <div className={styles.filtros}>
            <SeletorPeriodo valor={periodo} onMudar={setPeriodo} />
            <Seletor
              rotulo="Vestibular"
              valor="enem"
              opcoes={OPCOES_VESTIBULAR}
              onMudar={NADA}
            />
          </div>
        }
      />

      <p className={styles.aviso} role="note">
        Dados de exemplo: o acompanhamento ainda não vem da API.
      </p>

      <section className={styles.statsGrid}>
        {mockStats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            variation={stat.variation}
            isPositive={stat.isPositive}
            previousValueText={stat.previousValueText}
          />
        ))}
      </section>

      <section className={styles.middleSection}>
        <EvolucaoAproveitamento
          comentario={mockEvolucao.comentario}
          simulados={mockEvolucao.simulados}
        />
        <AcertosErrosCard
          totalQuestoes={mockAcertosErros.totalQuestoes}
          porcentagemAcertos={mockAcertosErros.porcentagemAcertos}
          acertos={mockAcertosErros.acertos}
          erros={mockAcertosErros.erros}
          emBranco={mockAcertosErros.emBranco}
          comparativo={mockAcertosErros.comparativo}
        />
      </section>

      <section className={styles.bottomSection}>
        <AcertosCategoria categorias={mockCategorias} />

        <div className={styles.rightStack}>
          <OndeFocarCard itens={mockOndeFocar} />
          <ConstanciaCard diasEstudados={mockConstancia.diasEstudados} />
        </div>
      </section>
    </main>
  )
}

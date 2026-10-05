import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import { useState } from 'react'
import { StatCard } from './components/StatCard'
import { EvolucaoAproveitamento } from './components/EvolucaoAproveitamento'
import { AcertosErrosCard } from './components/AcertosErrosCard'
import { AcertosCategoria } from './components/AcertosCategoria'
import { OndeFocarCard } from './components/OndeFocarCard'
import { ConstanciaCard } from './components/ConstanciaCard'
import { Titulo } from '../../../../components/ui/Titulo/Titulo'
import { PeriodSelector, type PeriodoOpcao } from './components/PeriodSelector/PeriodSelector'

export default function SimuladosMeuAcompanhamento() {
  const [periodo, setPeriodo] = useState<PeriodoOpcao>('ultimo-mes')
  const [vestibular, setVestibular] = useState('todos')
        
  const mockStats = [    
  {
    id: 'aproveitamento',
    label: 'Aproveitamento Médio',
    value: '68%',
    variation: '9 p.p.',
    isPositive: true,
    previousValueText: 'Mês anterior: 59%',
  },
  {
    id: 'questoes',
    label: 'Questões Respondidas',
    value: 248,
    variation: '62',
    isPositive: true,
    previousValueText: 'Mês anterior: 186',
  },
  {
    id: 'simulados',
    label: 'Simulados Concluídos',
    value: 6,
    variation: '2',
    isPositive: true,
    previousValueText: 'Mês anterior: 4',
  },
  {                                                             
    id: 'acertos',
    label: 'Acertos',
    value: 169,
    variation: '59',
    isPositive: true,
    previousValueText: 'Mês anterior: 110',
  },
]

const mockEvolucao = {
  comentario: 'Você subiu 24 pontos percentuais desde o primeiro simulado e está acima da média da plataforma (56%).',
  simulados: [
    { data: '02/08', percentual: 48 },
    { data: '08/08', percentual: 52 },
    { data: '12/08', percentual: 55 },
    { data: '18/08', percentual: 61 },
    { data: '21/08', percentual: 64 },
    { data: '28/08', percentual: 72, destaque: true },
  ],
}

const mockAcertosErros = {
  totalQuestoes: 248,
  porcentagemAcertos: 68,
  acertos: 169,
  erros: 60,
  emBranco: 19,
  comparativo: {
    acertosAnterior: 110,
    errosAnterior: 64,
    emBrancoAnterior: 12,
  },
}
const mockCategorias = [
  { materia: 'Matemática', percentual: 81, variacao: '▲ 12', tipoVariacao: 'positivo' },
  { materia: 'Biologia', percentual: 74, variacao: '▲ 6', tipoVariacao: 'positivo' },
  { materia: 'Português', percentual: 67, variacao: '▲ 3', tipoVariacao: 'positivo' },
  { materia: 'Química', percentual: 62, variacao: '= 0', tipoVariacao: 'neutro' },
  { materia: 'História', percentual: 58, variacao: '▲ 8', tipoVariacao: 'positivo' },
  { materia: 'Geografia', percentual: 51, variacao: '▼ 4', tipoVariacao: 'negativo' },
  { materia: 'Física', percentual: 44, variacao: '▼ 7', tipoVariacao: 'negativo', alerta: true },
]

const mockOndeFocar = [
  {
    ordem: 1,
    materia: 'Física · 44%',
    descricao: 'Caiu 7 p.p. e é sua menor nota. 18 questões erradas de eletricidade.',
  },
  {
    ordem: 2,
    materia: 'Geografia · 51%',
    descricao: 'Queda de 4 p.p. concentrada em geografia agrária.',
  },
  {
    ordem: 3,
    materia: 'Questões em branco',
    descricao: 'Subiram de 12 para 19 — vale treinar com tempo cronometrado.',
  },
]

const mockConstancia = {
  semanas: [3, 4, 5, 6], // intensidade de estudo por semana para controle de cor/preenchimento
  diasEstudados: 18,
}

  return (
    <main>
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.topInfo}>
            <span className={styles.badge}>PLANO PREMIUM</span>
            <span className={styles.update}>Atualizado hoje, às 14h32</span>
          </div>

          <div className={styles.titleRow}>
            <Titulo 
              titulo={"Meu acompanhamento"} 
              subtitulo={""}
              size="Grande" 
            />
            
            <div className={styles.filters}>
              <div className={styles.periodGroup}>
                <PeriodSelector
                  periodoAtual={periodo}
                  onSelect={(novoPeriodo) => setPeriodo(novoPeriodo)}
                />
              </div>

              <select
                value={vestibular}
                onChange={(e) => setVestibular(e.target.value)}
                className={styles.select}
              >
                <option value="todos">Vestibular: todos</option>
                <option value="enem">ENEM</option>
                <option value="fuvest">FUVEST</option>
              </select>
            </div>
          </div>

          <nav className={styles.tabs}>
            <Link to="/simulados">Simulados</Link>
            <Link to="/simulados/acompanhamento" className={styles.activeTab}>
              Meu acompanhamento
            </Link>
            <Link to="/simulados/cronometro">Cronômetro</Link>
            <Link to="/simulados/ranking">Ranking</Link>
          </nav>
        </header>
      </div>
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

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { StatCard } from './components/StatCard/StatCard'
import { SimuladoCard, type SimuladoItemData } from './components/SimuladoCard/SimuladoCard'
import styles from './index.module.scss'

export type VestibularFiltro = 'todos' | 'ENEM' | 'UEM' | 'UTFPR' | 'UEL'
export type OrdenacaoFiltro = 'recente' | 'antigo' | 'maior_nota' | 'menor_nota'

export default function SimuladosMain() {
  const navigate = useNavigate()

  const [vestibularFiltro, setVestibularFiltro] = useState<VestibularFiltro>('todos')
  const [ordenacao, setOrdenacao] = useState<OrdenacaoFiltro>('recente')

  // Mocks dos estatísticas do topo
  const mockStats = {
    simuladosFeitos: 14,
    questoesRespondidas: 612,
    aproveitamentoMedio: '68%',
    melhorCategoria: 'Matemática · 81%',
  }

  // Mocks dos Simulados na lista
  const mockSimulados: SimuladoItemData[] = [
    {
      id: '1',
      titulo: 'Simulado ENEM · dia 2',
      status: 'concluido',
      data: '28 de agosto de 2026',
      dataTimestamp: 1787875200000,
      vestibular: 'ENEM',
      totalQuestoes: 45,
      duracao: '2h18 de duração',
      tags: ['Matemática', 'Ciências da Natureza'],
      porcentagemAcerto: 72,
      acertos: 32,
      erros: 13,
      categorias: [
        { nome: 'Matemática', acertos: 13, total: 15 },
        { nome: 'Biologia', acertos: 8, total: 12 },
        { nome: 'Química', acertos: 7, total: 10 },
        { nome: 'Física', acertos: 4, total: 8 },
      ],
    },
    {
      id: '2',
      titulo: 'Vestibular UEM · prova geral',
      status: 'concluido',
      data: '21 de agosto de 2026',
      dataTimestamp: 1787270400000,
      vestibular: 'UEM',
      totalQuestoes: 40,
      duracao: '1h52 de duração',
      tags: ['Matemática', 'Linguagens'],
      porcentagemAcerto: 64,
      acertos: 26,
      erros: 14,
      categorias: [
        { nome: 'Matemática', acertos: 9, total: 12 },
        { nome: 'Português', acertos: 8, total: 12 },
        { nome: 'História', acertos: 6, total: 10 },
        { nome: 'Geografia', acertos: 3, total: 6 },
      ],
    },
    {
      id: '3',
      titulo: 'Simulado ENEM · linguagens',
      status: 'concluido',
      data: '12 de agosto de 2026',
      dataTimestamp: 1786492800000,
      vestibular: 'ENEM',
      totalQuestoes: 20,
      duracao: '58 min de duração',
      tags: ['Linguagens'],
      porcentagemAcerto: 55,
      acertos: 11,
      erros: 9,
      categorias: [],
    },
  ]

  // Lógica de Filtro por Vestibular
  const simuladosFiltrados = mockSimulados.filter((item) => {
    if (vestibularFiltro === 'todos') return true
    return item.vestibular === vestibularFiltro
  })

  // Lógica de Ordenação
  const simuladosOrdenados = [...simuladosFiltrados].sort((a, b) => {
    if (ordenacao === 'recente') return b.dataTimestamp - a.dataTimestamp
    if (ordenacao === 'antigo') return a.dataTimestamp - b.dataTimestamp
    if (ordenacao === 'maior_nota') return b.porcentagemAcerto - a.porcentagemAcerto
    if (ordenacao === 'menor_nota') return a.porcentagemAcerto - b.porcentagemAcerto
    return 0
  })

  return (
    <main className={styles.pageWrapper}>
      {/* Header Superior */}
      <header className={styles.headerSection}>
        <div className={styles.headerContainer}>
          <div className={styles.topRow}>
            <div className={styles.titleGroup}>
              <div className={styles.badgePremium}>PLANO PREMIUM</div>
              <div className={styles.titleWrapper}>
                <h1 className={styles.title}>Simulados</h1>
                <span className={styles.subtitle}>Simulados do ENEM e de vestibulares</span>
              </div>
            </div>

            <button
              type="button"
              className={styles.createBtn}
              onClick={() => navigate('/simulados/configuracao')}
            >
              + Criar novo simulado
            </button>
          </div>

          <nav className={styles.tabsNav}>
            <Link to="/simulados/main" className={`${styles.tabLink} ${styles.activeTab}`}>
              Simulados
            </Link>
            <Link to="/simulados/acompanhamento" className={styles.tabLink}>
              Meu acompanhamento
            </Link>
            <Link to="/simulados/cronometro" className={styles.tabLink}>
              Cronômetro
            </Link>
            <Link to="/simulados/ranking" className={styles.tabLink}>
              Ranking
            </Link>
          </nav>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <section className={styles.mainContentSection}>
        <div className={styles.mainContentContainer}>
          {/* Topo: Cards de Estatísticas */}
          <div className={styles.statsGrid}>
            <StatCard label="SIMULADOS FEITOS" valor={mockStats.simuladosFeitos} />
            <StatCard label="QUESTÕES RESPONDIDAS" valor={mockStats.questoesRespondidas} />
            <StatCard label="APROVEITAMENTO MÉDIO" valor={mockStats.aproveitamentoMedio} destaqueColor="#15803d" />
            <StatCard label="MELHOR CATEGORIA" valor={mockStats.melhorCategoria} />
          </div>

          {/* Cabeçalho da Lista e Controles de Filtro */}
          <div className={styles.listHeaderRow}>
            <div>
              <h2 className={styles.sectionTitle}>Meus simulados</h2>
              <p className={styles.sectionSubtitle}>
                Revise as questões que você acertou e errou em cada tentativa
              </p>
            </div>

            <div className={styles.filterControls}>
              <select
                value={vestibularFiltro}
                onChange={(e) => setVestibularFiltro(e.target.value as VestibularFiltro)}
                className={styles.selectFilter}
              >
                <option value="todos">Vestibular: todos</option>
                <option value="ENEM">Vestibular: ENEM</option>
                <option value="UEM">Vestibular: UEM</option>
                <option value="UTFPR">Vestibular: UTFPR</option>
                <option value="UEL">Vestibular: UEL</option>
              </select>

              <select
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value as OrdenacaoFiltro)}
                className={styles.selectFilter}
              >
                <option value="recente">Ordenar: Mais recente</option>
                <option value="antigo">Ordenar: Mais antigo</option>
                <option value="maior_nota">Ordenar: Maior nota</option>
                <option value="menor_nota">Ordenar: Menor nota</option>
              </select>
            </div>
          </div>

          {/* Lista de Simulados */}
          <div className={styles.simuladosList}>
            {simuladosOrdenados.map((simulado) => (
              <SimuladoCard key={simulado.id} simulado={simulado} />
            ))}
          </div>

          {/* Card Banner CTA no Rodapé */}
          <div className={styles.bannerCta}>
            <div>
              <h3>Monte um simulado do jeito que você precisa</h3>
              <p>Escolha o vestibular, as categorias, a quantidade de questões e se quer tempo cronometrado.</p>
            </div>

            <button
              type="button"
              className={styles.bannerBtn}
              onClick={() => navigate('/simulados/configuracao')}
            >
              + Criar novo simulado
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
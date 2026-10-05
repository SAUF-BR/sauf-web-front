import { Link } from 'react-router-dom'
import { useState } from 'react'
import styles from './index.module.scss'
import { QuestaoBar, type StatusQuestao } from './components/QuestaoBar/QuestaoBar'
import { QuestaoCard, type QuestaoData } from './components/QuestaoCard/QuestaoCard'
import { Titulo } from '../../../../components/ui/Titulo/Titulo'
import { FilterPillButton } from './components/FilterPillButton/FilterPillButton'

export type FiltroStatus = 'todas' | 'acertos' | 'erros' | 'em_branco'

interface QuestaoMock {
  numero: number
  status: StatusQuestao
}


export default function SimuladosHistorico() {
  const mockHeader = {
    titulo: 'Simulado ENEM · Matemática e Física',
    concluidoEm: '2 de setembro de 2026',
    totalQuestoes: 20,
    tempoMinutos: 47,
    porcentagemAcerto: 70,
    acertos: 14,
    erros: 5,
    emBranco: 1,
  }

  const opcoesFiltro: Array<{ label: string; tipo: FiltroStatus; quantidade: number }> = [
  { label: 'Todas', tipo: 'todas', quantidade: mockHeader.totalQuestoes },
  { label: 'Acertos', tipo: 'acertos', quantidade: mockHeader.acertos },
  { label: 'Erros', tipo: 'erros', quantidade: mockHeader.erros },
  { label: 'Em branco', tipo: 'em_branco', quantidade: mockHeader.emBranco },
  ]

  const [visiveisCount, setVisiveisCount] = useState<number>(6)

  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>('todas')
  const [categoria, setCategoria] = useState('todas')
  const [questaoAtiva, setQuestaoAtiva] = useState<number>(1)

  // Lista mockada com os status exatos da imagem (20 questões)
  const mockQuestoes: QuestaoData[] = [
    {
      numero: 1,
      status: 'acerto',
      categoria: 'Matemática · Porcentagem',
      tempo: '45s respondida',
      enunciado: 'Qual é o valor de 20% de R$ 150,00?',
      respostaCorreta: { letra: 'A', texto: 'R$ 30,00' },
    },
    {
      numero: 2,
      status: 'acerto',
      categoria: 'Física · Velocidade Média',
      tempo: '1m02s respondida',
      enunciado: 'Um carro percorre 120 km em 2 horas. Qual a sua velocidade média?',
      respostaCorreta: { letra: 'C', texto: '60 km/h' },
    },
    {
      numero: 3,
      status: 'erro',
      categoria: 'Matemática · Geometria',
      tempo: '2m10s respondida',
      enunciado: 'Calcule a área de um triângulo com base 8 cm e altura 5 cm.',
      respostaUsuario: { letra: 'A', texto: '40 cm²' },
      respostaCorreta: { letra: 'B', texto: '20 cm²' },
    },
    {
      numero: 7,
      status: 'acerto',
      categoria: 'Matemática · Porcentagem',
      tempo: '1m14 respondida',
      enunciado: 'Um produto que custava R$ 240,00 recebeu desconto de 15% e, na semana seguinte, um novo desconto de 10% sobre o valor já reduzido. Qual é o preço final?',
      respostaCorreta: { letra: 'B', texto: 'R$ 183,60' },
    },
    {
      numero: 8,
      status: 'erro',
      categoria: 'Matemática · Função quadrática',
      tempo: '2m28 respondida',
      enunciado: 'Uma empresa de transporte cobra taxa fixa de R$ 12,00 mais R$ 2,50 por quilômetro. Um passageiro pagou R$ 37,00. Quantos quilômetros foram percorridos?',
      respostaUsuario: { letra: 'C', texto: '11 quilômetros' },
      respostaCorreta: { letra: 'B', texto: '10 quilômetros' },
    },
    {
      numero: 14,
      status: 'em_branco',
      categoria: 'Física · Eletricidade',
      tempo: 'tempo esgotado',
      enunciado: 'Um resistor de 20 Ω é submetido a uma tensão de 120 V. Qual é a potência dissipada por esse resistor?',
      respostaCorreta: { letra: 'D', texto: '720 W', subtexto: 'Resposta correta · P = V²/R' },
    },
    {
      numero: 15,
      status: 'em_branco',
      categoria: 'Física · Eletricidade',
      tempo: 'tempo esgotado',
      enunciado: 'Um resistor de 20 Ω é submetido a uma tensão de 120 V. Qual é a potência dissipada por esse resistor?',
      respostaCorreta: { letra: 'D', texto: '720 W', subtexto: 'Resposta correta · P = V²/R' },
    },
  ]

  const questoesFiltradas = mockQuestoes.filter((q) => {
    if (filtroStatus === 'acertos') return q.status === 'acerto'
    if (filtroStatus === 'erros') return q.status === 'erro'
    if (filtroStatus === 'em_branco') return q.status === 'em_branco'
    return true
  })

  const questoesExibidas = questoesFiltradas.slice(0, visiveisCount)

  const restantes = questoesFiltradas.length - visiveisCount

  const handleFiltroChange = (novoFiltro: FiltroStatus) => {
    setFiltroStatus(novoFiltro)
    setVisiveisCount(6)
  }

  return (
    <main className={styles.page}>
      <div className={styles.headerSection}>
        <div className={styles.headerContainer}>
         <div className={styles.leftInfo}>
            <div className={styles.breadcrumb}>
              <Link to="/simulados">Simulados</Link>
              <span>/</span>
              <span className={styles.currentBreadcrumb}>Revisão</span>
            </div>

            <Titulo 
              titulo={mockHeader.titulo} 
              subtitulo={`Concluído em ${mockHeader.concluidoEm} · ${mockHeader.totalQuestoes} questões · ${mockHeader.tempoMinutos} minutos`}
              size="Grande" 
            />
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.donutChart}>
              <div className={styles.donutHole}>
                <span>{mockHeader.porcentagemAcerto}%</span>
              </div>
            </div>

            <div className={styles.statsGroup}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>ACERTOS</span>
                <span className={`${styles.statValue} ${styles.greenValue}`}>
                  {mockHeader.acertos}
                </span>
              </div>

              <div className={styles.statItem}>
                <span className={styles.statLabel}>ERROS</span>
                <span className={`${styles.statValue} ${styles.redValue}`}>
                  {mockHeader.erros}
                </span>
              </div>

              <div className={styles.statItem}>
                <span className={styles.statLabel}>EM BRANCO</span>
                <span className={`${styles.statValue} ${styles.grayValue}`}>
                  {mockHeader.emBranco}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className={styles.filterBarSection}>
        <div className={styles.filterBarContainer}>
          <div className={styles.controlsRow}>
            <div className={styles.statusPills}>
              {opcoesFiltro.map((opcao) => (
                <FilterPillButton
                  key={opcao.tipo}
                  label={opcao.label}
                  quantidade={opcao.quantidade}
                  tipo={opcao.tipo}
                  filtroAtual={filtroStatus}
                  onSelect={handleFiltroChange}
                />
              ))}
            </div>

            <div className={styles.actionsRight}>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className={styles.categoriaSelect}
              >
                <option value="todas">Categoria: todas</option>
                <option value="matematica">Matemática</option>
                <option value="fisica">Física</option>
              </select>

              <button type="button" className={styles.refazerBtn}>
                Refazer só os erros
              </button>
            </div>
          </div>

          <div className={styles.questoesBarsRow}>
            {mockQuestoes.map((q) => (
              <QuestaoBar
                key={q.numero}
                numero={q.numero}
                status={q.status}
                isAtiva={questaoAtiva === q.numero}
                onClick={() => setQuestaoAtiva(q.numero)}
              />
            ))}
          </div>
        </div>
      </section>
      <section className={styles.questoesListSection}>
        <div className={styles.questoesContainer}>
          {questoesExibidas.map((questao) => (
            <QuestaoCard key={questao.numero} questao={questao} />
          ))}

          {restantes > 0 && (
            <button
              type="button"
              className={styles.loadMoreBtn}
              onClick={() => setVisiveisCount((prev) => prev + 6)}
            >
              Ver as outras {restantes} questões
            </button>
          )}
        </div>
      </section>
    </main>
  )
}

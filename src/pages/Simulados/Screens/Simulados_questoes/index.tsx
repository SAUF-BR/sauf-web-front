import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavNumberButton, type StatusQuestaoNav } from './components/NavNumberButton/NavNumberButton'
import { OptionRow, type OpcaoData } from './components/OptionRow/OptionRow'
import styles from './index.module.scss'

import { SimuladoHeader } from './components/SimuladoHeader/SimuladoHeader'

interface QuestaoSimulado {
  id: number
  materia: string
  assunto: string
  vestibularAno: string
  enunciadoContexto: string
  pergunta: string
  opcoes: OpcaoData[]
}

export default function SimuladosQuestoes() {
  const navigate = useNavigate()

  const mockQuestoes: QuestaoSimulado[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    materia: i % 2 === 0 ? 'Matemática' : 'Física',
    assunto: i % 2 === 0 ? 'Função quadrática' : 'Eletricidade',
    vestibularAno: 'ENEM 2024',
    enunciadoContexto:
      'Uma empresa de transporte cobra uma taxa fixa de R$ 12,00 por corrida, somada a R$ 2,50 por quilômetro rodado. Um passageiro pagou R$ 37,00 pela viagem.',
    pergunta: 'Quantos quilômetros foram percorridos nessa corrida?',
    opcoes: [
      { letra: 'A', texto: '9 quilômetros' },
      { letra: 'B', texto: '10 quilômetros' },
      { letra: 'C', texto: '11 quilômetros' },
      { letra: 'D', texto: '14 quilômetros' },
      { letra: 'E', texto: '16 quilômetros' },
    ],
  }))

  const [questaoAtualIndex, setQuestaoAtualIndex] = useState<number>(7) // Exemplo inicia na questão 8 (index 7)
  
  const [respostas, setRespostas] = useState<Record<number, string>>({})
  
  const [statusMap, setStatusMap] = useState<Record<number, StatusQuestaoNav>>({
    1: 'respondida', 2: 'respondida', 3: 'em_branco', 4: 'respondida',
    5: 'respondida', 6: 'respondida', 7: 'respondida',
  })

  const questaoAtual = mockQuestoes[questaoAtualIndex]
  const respostaSelecionada = respostas[questaoAtual.id]

  const respondidasCount = Object.values(statusMap).filter((s) => s === 'respondida').length
  const emBrancoCount = Object.values(statusMap).filter((s) => s === 'em_branco').length
  const restantesCount = mockQuestoes.length - respondidasCount - emBrancoCount

  const handleSelecionarOpcao = (letra: string) => {
    setRespostas((prev) => ({ ...prev, [questaoAtual.id]: letra }))
  }

  const handleAvancar = (salvarComoRespondida = true) => {
    if (salvarComoRespondida && respostaSelecionada) {
      setStatusMap((prev) => ({ ...prev, [questaoAtual.id]: 'respondida' }))
    } else if (!salvarComoRespondida) {
      setStatusMap((prev) => ({ ...prev, [questaoAtual.id]: 'em_branco' }))
    }

    if (questaoAtualIndex < mockQuestoes.length - 1) {
      setQuestaoAtualIndex((prev) => prev + 1)
    } else {
      navigate('/simulados/historico')
    }
  }

  const handleVoltar = () => {
    if (questaoAtualIndex > 0) {
      setQuestaoAtualIndex((prev) => prev - 1)
    }
  }

  return (
    <main className={styles.pageWrapper}>
      <SimuladoHeader
        tituloSimulado="Simulado ENEM · Matemática e Física"
        tempoRestanteFormatted="01:42"
      />
      <header className={styles.headerBar}>
        <div className={styles.headerContainer}>
          <div className={styles.progressTopRow}>
            <div className={styles.progressTitle}>
              <strong>Questão {questaoAtual.id} de {mockQuestoes.length}</strong>
              <div className={styles.progressBarTrack}>
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${((respondidasCount + emBrancoCount) / mockQuestoes.length) * 100}%` }}
                />
              </div>
            </div>

            <div className={styles.legendStats}>
              <span><span className={`${styles.dot} ${styles.greenDot}`} /> {respondidasCount} respondidas</span>
              <span><span className={`${styles.dot} ${styles.yellowDot}`} /> {emBrancoCount} em branco</span>
              <span><span className={`${styles.dot} ${styles.grayDot}`} /> {restantesCount} restantes</span>
            </div>
          </div>

          <div className={styles.numbersNavGrid}>
            {mockQuestoes.map((q) => (
              <NavNumberButton
                key={q.id}
                numero={q.id}
                status={statusMap[q.id] || 'pendente'}
                isAtiva={q.id === questaoAtual.id}
                onClick={() => setQuestaoAtualIndex(q.id - 1)}
              />
            ))}
          </div>
        </div>
      </header>

      <section className={styles.questionSection}>
        <div className={styles.questionContainer}>
          <div className={styles.tagsRow}>
            <span className={styles.tag}>{questaoAtual.materia}</span>
            <span className={styles.tag}>{questaoAtual.assunto}</span>
            <span className={styles.tag}>{questaoAtual.vestibularAno}</span>
          </div>

          <p className={styles.enunciadoContexto}>{questaoAtual.enunciadoContexto}</p>
          <h2 className={styles.perguntaText}>{questaoAtual.pergunta}</h2>

          <div className={styles.optionsList}>
            {questaoAtual.opcoes.map((opcao) => (
              <OptionRow
                key={opcao.letra}
                opcao={opcao}
                isSelecionada={respostaSelecionada === opcao.letra}
                onSelect={() => handleSelecionarOpcao(opcao.letra)}
              />
            ))}
          </div>

          <div className={styles.actionsFooter}>
            <button
              type="button"
              className={styles.prevBtn}
              onClick={handleVoltar}
              disabled={questaoAtualIndex === 0}
            >
              ← Questão anterior
            </button>

            <div className={styles.rightActions}>
              <button
                type="button"
                className={styles.whiteBtn}
                onClick={() => handleAvancar(false)}
              >
                Deixar em branco
              </button>

              <button
                type="button"
                className={`${styles.nextBtn} ${respostaSelecionada ? styles.activeNext : ''}`}
                onClick={() => handleAvancar(true)}
                disabled={!respostaSelecionada}
              >
                Responder e avançar →
              </button>
            </div>
          </div>

          <p className={styles.bottomFooterNote}>
            ● Você pode voltar em qualquer questão antes de finalizar o simulado.
          </p>
        </div>
      </section>
    </main>
  )
}
import { Link } from 'react-router-dom'
import { ArrowLeft, Timer, Hourglass } from 'lucide-react'
import { ROTAS } from '../../../../../../routes/paths'
import { Logo } from '../../../../../../components/logo/Logo'
import styles from './SimuladoHeader.module.scss'

interface SimuladoHeaderProps {
  tituloSimulado: string
  // Regressivo conta para baixo a partir do tempo de referência; crescente conta o tempo gasto (D-95)
  modo: 'regressivo' | 'crescente'
  // "01:42" e o rótulo que o acompanha ("restantes" / "nesta questão" / "além da referência")
  tempo: string
  rotuloTempo: string
  // Tempo do simulado inteiro, somando todas as questões
  tempoTotal: string
  // Poucos segundos para o fim da referência: destaca o cronômetro
  alerta: boolean
  // Já passou do tempo de referência: só muda o tom, nada é bloqueado
  passou: boolean
  desabilitado: boolean
  onFinalizar: () => void
  onSalvarSair: () => void
}

export function SimuladoHeader({
  tituloSimulado,
  modo,
  tempo,
  rotuloTempo,
  tempoTotal,
  alerta,
  passou,
  desabilitado,
  onFinalizar,
  onSalvarSair,
}: SimuladoHeaderProps) {
  const IconeQuestao = modo === 'regressivo' ? Hourglass : Timer

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftGroup}>
          <button
            type="button"
            className={styles.voltarBtn}
            onClick={onSalvarSair}
            disabled={desabilitado}
            aria-label="Voltar para Simulados (o progresso fica salvo)"
            title="Voltar para Simulados (o progresso fica salvo)"
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <Link to={ROTAS.simulados} className={styles.logoLink} aria-label="Simulados">
            <Logo variant="clara" />
          </Link>
          <span className={styles.simuladoTitle}>{tituloSimulado}</span>
        </div>

        <div className={styles.rightGroup}>
          <div className={styles.timers}>
            <div
              className={`${styles.timerBadge} ${alerta ? styles.timerAlerta : ''} ${
                passou ? styles.timerPassou : ''
              }`}
              role="timer"
              aria-label={`Questão: ${tempo} ${rotuloTempo}`}
            >
              <IconeQuestao size={14} aria-hidden="true" />
              <span className={styles.timerValor}>{tempo}</span>
              <span className={styles.timerRotulo}>{rotuloTempo}</span>
            </div>

            <div className={styles.timerTotal} role="timer" aria-label={`Total do simulado: ${tempoTotal}`}>
              <span className={styles.timerRotulo}>Total</span>
              <span className={styles.timerValor}>{tempoTotal}</span>
            </div>
          </div>

          <div className={styles.botoes}>
            <button
              type="button"
              className={styles.salvarSairBtn}
              onClick={onFinalizar}
              disabled={desabilitado}
            >
              Finalizar
            </button>

            <button
              type="button"
              className={styles.salvarSairBtn}
              onClick={onSalvarSair}
              disabled={desabilitado}
            >
              Salvar e sair
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

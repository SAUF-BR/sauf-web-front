import { Link } from 'react-router-dom'
import { ROTAS } from '../../../../../../routes/paths'
import { Logo } from '../../../../../../components/logo/Logo'
import styles from './SimuladoHeader.module.scss'

interface SimuladoHeaderProps {
  tituloSimulado: string
  // "01:42" e o rótulo que o acompanha ("restantes nesta questão" / "tempo nesta questão")
  tempo: string
  rotuloTempo: string
  // Poucos segundos restantes: destaca o cronômetro
  alerta: boolean
  desabilitado: boolean
  onFinalizar: () => void
  onSalvarSair: () => void
}

export function SimuladoHeader({
  tituloSimulado,
  tempo,
  rotuloTempo,
  alerta,
  desabilitado,
  onFinalizar,
  onSalvarSair,
}: SimuladoHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftGroup}>
          <Link to={ROTAS.simulados} className={styles.logoLink}>
            <span className={styles.whiteLogo}>
              <Logo variant="clara" />
            </span>
          </Link>
          <span className={styles.simuladoTitle}>{tituloSimulado}</span>
        </div>

        <div className={styles.rightGroup}>
          <div className={`${styles.timerBadge} ${alerta ? styles.timerAlerta : ''}`} role="timer">
            <span className={styles.yellowDot} />
            <span>
              {tempo} {rotuloTempo}
            </span>
          </div>

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
    </header>
  )
}

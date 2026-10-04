import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../../../../../../components/logo/Logo'
import styles from './SimuladoHeader.module.scss'

interface SimuladoHeaderProps {
  tituloSimulado: string
  tempoRestanteFormatted?: string
}

export function SimuladoHeader({
  tituloSimulado,
  tempoRestanteFormatted = '01:42',
}: SimuladoHeaderProps) {
  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftGroup}>
          <Link to="/simulados/main" className={styles.logoLink}>
            <span className={styles.whiteLogo}>
              <Logo />
            </span>
          </Link>
          <span className={styles.simuladoTitle}>{tituloSimulado}</span>
        </div>

        <div className={styles.rightGroup}>
          <div className={styles.timerBadge}>
            <span className={styles.yellowDot} />
            <span>{tempoRestanteFormatted} restantes nesta questão</span>
          </div>

          <button
            type="button"
            className={styles.salvarSairBtn}
            onClick={() => navigate('/simulados/main')}
          >
            Salvar e sair
          </button>
        </div>
      </div>
    </header>
  )
}
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ROTAS } from '../../../../routes/paths'
import styles from './BarraTopoTeste.module.scss'

type BarraTopoTesteProps = {
  numero: number
  total: number
  minutosRestantes: number
}

export function BarraTopoTeste({ numero, total, minutosRestantes }: BarraTopoTesteProps) {
  return (
    <div className={styles.barraTopo}>
      <div className={styles.conteudo}>
        <Link to={ROTAS.testeVocacional} className={styles.sair}>
          <span aria-hidden="true">←</span> Sair do teste
        </Link>

        <div
          className={styles.progresso}
          role="progressbar"
          aria-label="Progresso do teste"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={numero}
          style={{ '--percentual': `${(numero / total) * 100}%` } as CSSProperties}
        />

        <p className={styles.contador}>
          Pergunta {numero} de {total}
        </p>
        <p className={styles.tempo}>≈{minutosRestantes} min restantes</p>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { formatarInteiro } from '../../../../lib/utils'
import { ROTAS } from '../../../../routes/paths'
import styles from './CabecalhoListagem.module.scss'

type CabecalhoListagemProps = {
  totalInstituicoes: number
  totalNoEstado: { quantidade: number; local: string } | null
}

export function CabecalhoListagem({ totalInstituicoes, totalNoEstado }: CabecalhoListagemProps) {
  return (
    <div>
      <nav aria-label="Você está em" className={styles.trilha}>
        <ol className={styles.trilhaLista}>
          <li>
            <Link to={ROTAS.inicio} className={styles.trilhaLink}>
              Início
            </Link>
          </li>
          <li aria-current="page" className={styles.trilhaAtual}>
            Universidades
          </li>
        </ol>
      </nav>

      <h1 className={styles.titulo}>Universidades</h1>

      <p className={styles.contador}>
        <strong className={styles.contadorTotal}>
          {formatarInteiro(totalInstituicoes)} instituições
        </strong>
        {totalNoEstado && (
          <>
            {' · '}
            {formatarInteiro(totalNoEstado.quantidade)} {totalNoEstado.local}
          </>
        )}
      </p>
    </div>
  )
}

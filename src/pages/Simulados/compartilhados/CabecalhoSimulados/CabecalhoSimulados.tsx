import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../../../lib/utils'
import { Abas_simulados, Selo_plano, type AbaSimulados } from '../conteudo'
import styles from './CabecalhoSimulados.module.scss'

type CabecalhoSimuladosProps = {
  abaAtiva: AbaSimulados
  titulo: string
  descricao: string
  acoes?: ReactNode
}

export function CabecalhoSimulados({
  abaAtiva,
  titulo,
  descricao,
  acoes,
}: CabecalhoSimuladosProps) {
  return (
    <header className={styles.faixa}>
      <div className={styles.conteudo}>
        <div className={styles.topo}>
          <div>
            <p className={styles.contexto}>
              <span className={styles.selo}>{Selo_plano}</span>
              {descricao}
            </p>
            <h1 className={styles.titulo}>{titulo}</h1>
          </div>

          {acoes && <div className={styles.acoes}>{acoes}</div>}
        </div>

        <nav aria-label="Seções de simulados" className={styles.abas}>
          {Abas_simulados.map((aba) => {
            const ativa = aba.id === abaAtiva

            return (
              <Link
                key={aba.id}
                to={aba.rota}
                aria-current={ativa ? 'page' : undefined}
                className={cn(styles.aba, ativa && styles.abaAtiva)}
              >
                {aba.rotulo}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
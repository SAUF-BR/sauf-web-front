import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ROTAS } from '../../../../routes/paths'
import { cn } from '../../../../lib/utils'
import { useAssinaturaAtual, usePlanos } from '../../../../features/assinatura'
import { Trilha } from '../Trilha/Trilha'
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
  const { data: assinatura } = useAssinaturaAtual()
  const { data: planos } = usePlanos()
  const nomePlano = planos?.find((plano) => plano.id === assinatura?.plano)?.nome
  const selo = nomePlano ? `Plano ${nomePlano}` : Selo_plano
  const aba = Abas_simulados.find((item) => item.id === abaAtiva)
  const naPrincipal = abaAtiva === 'simulados'
  const trilha = naPrincipal
    ? [{ rotulo: 'Início', para: ROTAS.inicio }, { rotulo: 'Simulados' }]
    : [{ rotulo: 'Simulados', para: ROTAS.simulados }, { rotulo: aba?.rotulo ?? titulo }]

  return (
    <header className={styles.faixa}>
      <div className={styles.conteudo}>
        <Trilha
          itens={trilha}
          voltarPara={naPrincipal ? ROTAS.inicio : ROTAS.simulados}
          className={styles.trilha}
        />
        <div className={styles.topo}>
          <div>
            <p className={styles.contexto}>
              <span className={styles.selo}>{selo}</span>
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
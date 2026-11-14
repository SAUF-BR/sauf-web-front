import { Link } from 'react-router-dom'
import { ROTAS } from '../../../../../routes/paths'
import { NOME_AREA, type AproveitamentoArea } from '../../../../../features/simulados'
import { cn } from '../../../../../lib/utils'
import { calcularVariacao, formatarPontos, formatarPorcentagem } from '../../../compartilhados/conteudo'
import styles from './AcertosCategoria.module.scss'

// Abaixo disso a barra fica amarela
const Limite_alerta = 50

const Leitura_tendencia = { alta: 'subiu', baixa: 'caiu', estavel: 'sem variação' } as const

interface AcertosCategoriaProps {
  areas: AproveitamentoArea[]
}

export function AcertosCategoria({ areas }: AcertosCategoriaProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Acertos por área</h3>
          <p className={styles.subtitle}>
            Aproveitamento no período e variação em relação ao período anterior
          </p>
        </div>
        <Link to={ROTAS.simulados} className={styles.linkAction}>
          Ver meus simulados →
        </Link>
      </div>

      <ul className={styles.list}>
        {areas.map(({ area, aproveitamento }) => {
          const atual = aproveitamento.atual
          const variacao = calcularVariacao(aproveitamento, formatarPontos)

          return (
            <li key={area} className={styles.row}>
              <span className={styles.materiaName}>{NOME_AREA[area]}</span>

              <div className={styles.track} aria-hidden="true">
                {atual !== null && (
                  <div
                    className={cn(styles.fill, atual < Limite_alerta && styles.alertaFill)}
                    style={{ width: `${atual}%` }}
                  />
                )}
              </div>

              <span className={styles.percentual}>
                {atual === null ? (
                  <>
                    <span aria-hidden="true">—</span>
                    <span className={styles.somenteLeitor}>sem questões no período</span>
                  </>
                ) : (
                  formatarPorcentagem(Math.round(atual))
                )}
              </span>

              <span className={cn(styles.variacao, variacao && styles[variacao.sentido])}>
                {variacao && (
                  <>
                    <span aria-hidden="true">
                      {variacao.tendencia === 'alta' ? '▲' : variacao.tendencia === 'baixa' ? '▼' : '='}{' '}
                    </span>
                    <span className={styles.somenteLeitor}>{Leitura_tendencia[variacao.tendencia]} </span>
                    {variacao.texto}
                  </>
                )}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

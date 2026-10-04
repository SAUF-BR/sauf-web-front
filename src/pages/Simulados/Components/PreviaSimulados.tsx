import { Lock } from 'lucide-react'
import styles from './PreviaSimulados.module.scss'
import type { SimuladoPrevia } from '../Conteudo'
import { Card } from '../../../components/ui/Card/Card'

type PreviaSimuladosProps = {
  simulados: SimuladoPrevia[]
}

export function PreviaSimulados({ simulados }: PreviaSimuladosProps) {
  return (
    <Card className={styles.painel}>
      <div className={styles.cabecalho}>
        <h2 className={styles.titulo}>Meus simulados</h2>
        <span className={styles.rotulo}>prévia</span>
      </div>

      <ul className={styles.lista} aria-hidden="true">
        {simulados.map((simulado) => (
          <li key={simulado.id} className={styles.item}>
            <span className={styles.nota}>{simulado.aproveitamento}%</span>
            <div className={styles.info}>
              <p className={styles.itemTitulo}>{simulado.titulo}</p>
              <p className={styles.itemDetalhe}>{simulado.detalhe}</p>
            </div>
          </li>
        ))}

        <li className={`${styles.item} ${styles.esqueleto}`}>
          <span className={styles.nota} />
          <div className={styles.linhas}>
            <span className={styles.linha} />
            <span className={styles.linha} />
          </div>
        </li>
      </ul>

      <div className={styles.bloqueio}>
        <span className={styles.cadeado}>
          <Lock size="1.25em" aria-hidden="true" />
        </span>
        <p className={styles.bloqueioTexto}>Disponível com assinatura</p>
      </div>
    </Card>
  )
}
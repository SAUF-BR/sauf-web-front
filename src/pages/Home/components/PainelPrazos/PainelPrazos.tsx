import { Link } from 'react-router-dom'
import { Card } from '../../../../components/ui/Card/Card'
import type { Prazo } from '../../../../features/calendario'
import { formatarDiaMes } from '../../../../lib/utils'
import { ROTAS } from '../../../../routes/paths'
import styles from './PainelPrazos.module.scss'

type PainelPrazosProps = {
  prazos: Prazo[] | undefined
  carregando: boolean
}

export function PainelPrazos({ prazos, carregando }: PainelPrazosProps) {
  return (
    <Card className={styles.painel} aria-busy={carregando}>
      <div className={styles.cabecalho}>
        <h2 className={styles.titulo}>Próximos prazos</h2>
        <Link to={ROTAS.calendario} className={styles.verTodos}>
          Ver todos
        </Link>
      </div>

      {!carregando && prazos?.length === 0 && (
        <p className={styles.vazio}>Nenhum prazo próximo por enquanto.</p>
      )}

      <ul className={styles.lista}>
        {prazos?.map((prazo) => {
          const { dia, mes } = formatarDiaMes(prazo.data)

          return (
            <li key={prazo.id} className={styles.item}>
              <time dateTime={prazo.data} className={styles.data}>
                <span className={styles.dia}>{dia}</span>
                <span className={styles.mes}>{mes}</span>
              </time>
              <div className={styles.info}>
                <p className={styles.itemTitulo}>{prazo.titulo}</p>
                <p className={styles.itemDescricao}>{prazo.descricao}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

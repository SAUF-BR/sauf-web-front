import { Link } from 'react-router-dom'
import { cn, formatarTempoRelativo } from '../../../../lib/utils'
import type { Notificacao } from '../../types'
import styles from './NotificacaoItem.module.scss'

type NotificacaoItemProps = {
  notificacao: Notificacao
  onAbrirAcao?: () => void
}

export function NotificacaoItem({ notificacao, onAbrirAcao }: NotificacaoItemProps) {
  const { titulo, descricao, criadaEm, lida, acao } = notificacao

  return (
    <li className={cn(styles.item, lida ? styles.lida : styles.naoLida)}>
      <span className={styles.ponto} aria-hidden="true" />

      <div className={styles.conteudo}>
        <div className={styles.topo}>
          <h3 className={styles.titulo}>
            {titulo}
            {!lida && <span className={styles.oculto}> (não lida)</span>}
          </h3>
          <time dateTime={criadaEm} className={styles.tempo}>
            {formatarTempoRelativo(criadaEm)}
          </time>
        </div>

        <p className={styles.descricao}>{descricao}</p>

        {acao && (
          <Link to={acao.para} className={styles.acao} onClick={onAbrirAcao}>
            {acao.rotulo} <span aria-hidden="true">›</span>
          </Link>
        )}
      </div>
    </li>
  )
}

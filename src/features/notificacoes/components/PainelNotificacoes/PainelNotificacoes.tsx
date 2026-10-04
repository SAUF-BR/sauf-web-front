import { useEffect, useId, useRef, useState } from 'react'
import { Card } from '../../../../components/ui/Card/Card'
import { useMarcarTodasComoLidas, useNotificacoes } from '../../hooks'
import { contarNaoLidas } from '../../utils'
import { NotificacaoItem } from '../NotificacaoItem/NotificacaoItem'
import styles from './PainelNotificacoes.module.scss'

const LIMITE_INICIAL = 4

type PainelNotificacoesProps = {
  id: string
  onFechar: () => void
}

export function PainelNotificacoes({ id, onFechar }: PainelNotificacoesProps) {
  const tituloId = useId()
  const painelRef = useRef<HTMLDivElement>(null)
  const [mostrarTodas, setMostrarTodas] = useState(false)
  const { data: notificacoes = [], isPending, isError } = useNotificacoes()
  const marcarTodas = useMarcarTodasComoLidas()

  const naoLidas = contarNaoLidas(notificacoes)
  const visiveis = mostrarTodas ? notificacoes : notificacoes.slice(0, LIMITE_INICIAL)
  const temMais = notificacoes.length > LIMITE_INICIAL && !mostrarTodas

  useEffect(() => {
    painelRef.current?.focus()
  }, [])

  function renderizarConteudo() {
    if (isPending) return <p className={styles.mensagem}>Carregando notificações…</p>

    if (isError) {
      return (
        <p className={styles.mensagem} role="alert">
          Não foi possível carregar as notificações.
        </p>
      )
    }

    if (notificacoes.length === 0) {
      return <p className={styles.mensagem}>Você não tem notificações por enquanto.</p>
    }

    return (
      <ul className={styles.lista}>
        {visiveis.map((notificacao) => (
          <NotificacaoItem
            key={notificacao.id}
            notificacao={notificacao}
            onAbrirAcao={onFechar}
          />
        ))}
      </ul>
    )
  }

  return (
    <Card
      ref={painelRef}
      id={id}
      role="dialog"
      aria-labelledby={tituloId}
      tabIndex={-1}
      className={styles.painel}
    >
      <div className={styles.cabecalho}>
        <h2 id={tituloId} className={styles.titulo}>
          Notificações
        </h2>
        {naoLidas > 0 && (
          <>
            <span className={styles.contador}>
              {naoLidas}
              <span className={styles.oculto}> não lidas</span>
            </span>
            <button
              type="button"
              className={styles.marcarLidas}
              disabled={marcarTodas.isPending}
              onClick={() => marcarTodas.mutate()}
            >
              Marcar como lidas
            </button>
          </>
        )}
      </div>

      {renderizarConteudo()}

      {temMais && (
        <div className={styles.rodape}>
          <button type="button" className={styles.verTodas} onClick={() => setMostrarTodas(true)}>
            Ver todas as notificações
          </button>
        </div>
      )}
    </Card>
  )
}

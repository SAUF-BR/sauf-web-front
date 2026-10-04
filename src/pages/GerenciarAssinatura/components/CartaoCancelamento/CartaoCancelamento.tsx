import { useState } from 'react'
import { Button } from '../../../../components/ui/Botao/Botao'
import { Card } from '../../../../components/ui/Card/Card'
import type { Plano } from '../../../../features/assinatura'
import { formatarDataExtenso } from '../../../../lib/utils'
import styles from './CartaoCancelamento.module.scss'

type CartaoCancelamentoProps = {
  plano: Plano
  acessoAte: string
  cancelando: boolean
  onConfirmar: () => void
}

export function CartaoCancelamento({
  plano,
  acessoAte,
  cancelando,
  onConfirmar,
}: CartaoCancelamentoProps) {
  const [confirmando, setConfirmando] = useState(false)
  const data = formatarDataExtenso(acessoAte)

  return (
    <Card className={styles.cartao}>
      <h2 className={styles.titulo}>Cancelar assinatura</h2>
      <p className={styles.descricao}>
        Você mantém o acesso {plano.nome} até {data} e depois volta para o acesso gratuito, sem
        simulados.
      </p>

      {confirmando ? (
        <div className={styles.confirmacao}>
          <p className={styles.pergunta}>Tem certeza que deseja cancelar?</p>

          <div className={styles.acoes}>
            <Button className={styles.botaoConfirmar} disabled={cancelando} onClick={onConfirmar}>
              {cancelando ? 'Cancelando…' : 'Sim, cancelar'}
            </Button>
            <Button variant="outline" disabled={cancelando} onClick={() => setConfirmando(false)}>
              Manter assinatura
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.acoes}>
          <Button
            variant="outline"
            className={styles.botaoPerigo}
            onClick={() => setConfirmando(true)}
          >
            Cancelar assinatura
          </Button>
        </div>
      )}
    </Card>
  )
}

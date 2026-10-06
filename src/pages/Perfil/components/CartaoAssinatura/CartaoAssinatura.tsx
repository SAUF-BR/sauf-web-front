import { ArrowRight, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../../components/ui/Botao/Botao'
import { Card } from '../../../../components/ui/Card/Card'
import { Tag } from '../../../../components/ui/Tag/Tag'
import type { Assinatura, Plano } from '../../../../features/assinatura'
import { formatarDataExtenso, formatarMoeda } from '../../../../lib/utils'
import { ROTAS } from '../../../../routes/paths'
import styles from './CartaoAssinatura.module.scss'

type CartaoAssinaturaProps = {
  visitante?: boolean
  assinatura?: Assinatura | null
  plano?: Plano
}

// Resumo do plano no perfil. Trocar de plano e cancelar ficam na tela de assinatura.
export function CartaoAssinatura({ visitante = false, assinatura, plano }: CartaoAssinaturaProps) {
  const navigate = useNavigate()
  const ativa = !visitante && assinatura && plano ? { assinatura, plano } : null
  const cancelamentoAgendado = ativa?.assinatura.status === 'cancelamento-agendado'

  return (
    <Card className={`${styles.cartao} ${visitante ? styles.visitante : ''}`}>
      <span className={styles.icone} aria-hidden="true">
        <Plus size="1.125rem" />
      </span>

      <div className={styles.textos}>
        {ativa ? (
          <>
            <div className={styles.linhaTitulo}>
              <h3 className={styles.titulo}>Plano {ativa.plano.nome}</h3>
              <Tag variant={cancelamentoAgendado ? 'neutro' : 'destaque'}>
                {cancelamentoAgendado ? 'Cancelamento agendado' : 'Ativo'}
              </Tag>
            </div>
            <p className={styles.descricao}>
              {formatarMoeda(ativa.plano.precoMensal)} por mês ·{' '}
              {cancelamentoAgendado ? 'acesso até' : 'renova em'}{' '}
              {formatarDataExtenso(ativa.assinatura.renovaEm, { comAno: true })}
            </p>
          </>
        ) : (
          <>
            <h3 className={styles.titulo}>Nenhum plano ativo</h3>
            <p className={styles.descricao}>
              {visitante
                ? 'Entre na sua conta para ver e gerenciar sua assinatura.'
                : 'Assine para liberar os simulados do ENEM e dos vestibulares.'}
            </p>
          </>
        )}
      </div>

      <Button
        variant={ativa ? 'primary' : 'outline'}
        className={styles.acao}
        onClick={() => navigate(ROTAS.perfilAssinatura)}
      >
        {ativa ? 'Gerenciar assinatura' : 'Ver planos'}
        <ArrowRight size="1em" aria-hidden="true" />
      </Button>
    </Card>
  )
}

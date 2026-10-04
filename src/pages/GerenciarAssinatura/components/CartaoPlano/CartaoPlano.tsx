import { Check, Minus } from 'lucide-react'
import { Button } from '../../../../components/ui/Botao/Botao'
import { Card } from '../../../../components/ui/Card/Card'
import { Tag } from '../../../../components/ui/Tag/Tag'
import type {
  Plano,
  RecursoPlano,
  RelacaoPlano,
  SituacaoAssinatura,
} from '../../../../features/assinatura'
import { formatarDataExtenso, formatarMoeda } from '../../../../lib/utils'
import { ORDEM_RECURSOS, ROTULO_RECURSO } from '../../conteudo'
import styles from './CartaoPlano.module.scss'

type CartaoPlanoProps = {
  plano: Plano
  relacao: RelacaoPlano
  situacao: SituacaoAssinatura
  planoAtual?: Plano
  renovaEm?: string
  recursosNovos: RecursoPlano[]
  desabilitado?: boolean
  onEscolher: () => void
  onReativar: () => void
}

type Acao = {
  rotulo: string
  variante: 'primary' | 'outline'
  onClick?: () => void
  nota: string
}

// Texto do botão e da nota conforme a relação do plano com o plano atual.
// Sem onClick, o botão fica desabilitado (ex.: "Plano ativo").
function montarAcao({
  plano,
  relacao,
  situacao,
  planoAtual,
  renovaEm,
  onEscolher,
  onReativar,
}: CartaoPlanoProps): Acao {
  const diferenca = planoAtual ? Math.abs(plano.precoMensal - planoAtual.precoMensal) : 0
  const data = renovaEm ? formatarDataExtenso(renovaEm) : ''

  switch (relacao) {
    case 'assinar':
      return {
        rotulo: `Assinar ${plano.nome}`,
        variante: plano.selo ? 'primary' : 'outline',
        onClick: onEscolher,
        nota: 'Cancele quando quiser',
      }
    case 'atual':
      return situacao === 'cancelamento-agendado'
        ? {
            rotulo: 'Reativar assinatura',
            variante: 'primary',
            onClick: onReativar,
            nota: `Acesso até ${data}`,
          }
        : { rotulo: 'Plano ativo', variante: 'outline', nota: `Próxima cobrança em ${data}` }
    case 'upgrade':
      return {
        rotulo: `Fazer upgrade por ${formatarMoeda(plano.precoMensal)}`,
        variante: 'primary',
        onClick: onEscolher,
        nota: `Apenas ${formatarMoeda(diferenca)} a mais por mês`,
      }
    case 'downgrade':
      return {
        rotulo: `Mudar para ${plano.nome}`,
        variante: 'outline',
        onClick: onEscolher,
        nota: `Economize ${formatarMoeda(diferenca)} por mês`,
      }
  }
}

export function CartaoPlano(props: CartaoPlanoProps) {
  const { plano, relacao, recursosNovos, desabilitado } = props
  const atual = relacao === 'atual'
  const acao = montarAcao(props)
  const idInclui = `inclui-${plano.id}`

  return (
    <Card className={`${styles.cartao} ${atual ? styles.atual : ''}`}>
      <div className={styles.topo}>
        <div className={styles.identificacao}>
          <h2 className={styles.nome}>{plano.nome}</h2>
          {atual ? (
            <Tag variant="premium">Seu plano</Tag>
          ) : (
            plano.selo && <Tag variant="assinante">{plano.selo}</Tag>
          )}
        </div>

        <p className={styles.preco}>
          <span className={styles.valor}>{formatarMoeda(plano.precoMensal)}</span>
          <span className={styles.periodo}>/mês</span>
        </p>
        <p className={styles.descricao}>{plano.descricao}</p>
      </div>

      <div className={styles.corpo}>
        <p id={idInclui} className={styles.rotuloInclui}>
          Inclui
        </p>

        <ul aria-labelledby={idInclui} className={styles.recursos}>
          {ORDEM_RECURSOS.map((recurso) => {
            const incluido = plano.recursos.includes(recurso)
            const novo = recursosNovos.includes(recurso)

            return (
              <li
                key={recurso}
                className={`${styles.recurso} ${incluido ? '' : styles.ausente} ${novo ? styles.novo : ''}`}
              >
                <span className={styles.marcador} aria-hidden="true">
                  {incluido ? <Check size="0.875rem" /> : <Minus size="0.875rem" />}
                </span>
                {ROTULO_RECURSO[recurso]}
                {!incluido && <span className={styles.somenteLeitor}> (não incluso)</span>}
              </li>
            )
          })}
        </ul>

        <Button
          className={styles.acao}
          variant={acao.variante}
          fullWidth
          disabled={!acao.onClick || desabilitado}
          onClick={acao.onClick}
        >
          {acao.rotulo}
        </Button>
        <p className={styles.nota}>{acao.nota}</p>
      </div>
    </Card>
  )
}

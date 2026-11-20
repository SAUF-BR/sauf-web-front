import { Link } from 'react-router-dom'
import { Card } from '../../../../components/ui/Card/Card'
import { EstadoErro } from '../../../../components/ui/EstadoErro/EstadoErro'
import type { Prazo } from '../../../../features/calendario'
import { formatarDiaMes, formatarAnoMesIso, obterAnoMes } from '../../../../lib/utils'
import { ROTAS } from '../../../../routes/paths'
import styles from './PainelPrazos.module.scss'

type PainelPrazosProps = {
  prazos: Prazo[] | undefined
  carregando: boolean
  erro: boolean
  tentando: boolean
  onTentarDeNovo: () => void
}

export function PainelPrazos({
  prazos,
  carregando,
  erro,
  tentando,
  onTentarDeNovo,
}: PainelPrazosProps) {
  return (
    <Card className={styles.painel} aria-busy={carregando}>
      <div className={styles.cabecalho}>
        <h2 className={styles.titulo}>Próximos prazos</h2>
        <Link to={ROTAS.calendario} className={styles.verTodos}>
          Ver todos
        </Link>
      </div>

      {erro && (
        <EstadoErro
          compacto
          titulo="Não foi possível carregar os prazos"
          onTentarDeNovo={onTentarDeNovo}
          tentando={tentando}
        />
      )}

      {!carregando && prazos?.length === 0 && (
        <p className={styles.vazio}>Nenhum prazo próximo por enquanto.</p>
      )}

      <ul className={styles.lista}>
        {prazos?.map((prazo) => {
          const { dia, mes } = formatarDiaMes(prazo.data)
          const mesDoPrazo = formatarAnoMesIso(obterAnoMes(prazo.data))

          return (
            <li key={prazo.id} className={styles.item}>
              <time dateTime={prazo.data} className={styles.data}>
                <span className={styles.dia}>{dia}</span>
                <span className={styles.mes}>{mes}</span>
              </time>
              <div className={styles.info}>
                <Link
                  to={`${ROTAS.calendario}?mes=${mesDoPrazo}`}
                  className={styles.itemTitulo}
                >
                  {prazo.titulo}
                </Link>
                <p className={styles.itemDescricao}>{prazo.descricao}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

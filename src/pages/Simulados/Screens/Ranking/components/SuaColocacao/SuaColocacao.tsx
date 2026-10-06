import { Equal, Triangle } from 'lucide-react'
import { useId } from 'react'
import { cn, formatarInteiro } from '../../../../../../lib/utils'
import { formatarDias, formatarHoras } from '../../../../compartilhados/conteudo'
import {
  calcularMudancaPosicao,
  calcularProgresso,
  formatarPosicao,
  type DadosRanking,
} from '../../conteudo'
import styles from './SuaColocacao.module.scss'

type SuaColocacaoProps = {
  dados: DadosRanking
}

export function SuaColocacao({ dados }: SuaColocacaoProps) {
  const idTitulo = useId()
  const { colocacao, totalParticipantes, percentil, estatisticas } = dados
  const mudanca = calcularMudancaPosicao(colocacao)

  return (
    <section className={styles.card} aria-labelledby={idTitulo}>
      <h2 id={idTitulo} className={styles.rotulo}>
        Sua colocação
      </h2>

      <div className={styles.destaque}>
        <p className={styles.posicao}>{formatarPosicao(colocacao.posicao)}</p>
        <div>
          {mudanca && (
            <p className={cn(styles.mudanca, styles[mudanca.tendencia])}>
              {mudanca.tendencia === 'manteve' ? (
                <Equal size={12} strokeWidth={3} aria-hidden="true" />
              ) : (
                <Triangle
                  size={10}
                  fill="currentColor"
                  aria-hidden="true"
                  className={cn(mudanca.tendencia === 'caiu' && styles.paraBaixo)}
                />
              )}
              {mudanca.texto}
            </p>
          )}
          <p className={styles.total}>de {formatarInteiro(totalParticipantes)} participantes</p>
        </div>
      </div>

      <div className={styles.trilho} aria-hidden="true">
        <div className={styles.barra} style={{ width: `${calcularProgresso(dados)}%` }} />
      </div>

      {percentil && (
        <p className={styles.insight}>
          Você está entre os <strong>{percentil.percentual}% que mais estudam</strong>{' '}
          {percentil.regiao}.
        </p>
      )}

      <dl className={styles.estatisticas}>
        <div>
          <dt>Seu tempo</dt>
          <dd>{formatarHoras(estatisticas.segundos)}</dd>
        </div>
        <div>
          <dt>Simulados</dt>
          <dd>{formatarInteiro(estatisticas.simulados)}</dd>
        </div>
        <div>
          <dt>Ofensiva</dt>
          <dd>{formatarDias(estatisticas.ofensiva)}</dd>
        </div>
      </dl>
    </section>
  )
}
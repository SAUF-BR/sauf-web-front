import { Tag } from '../../../../../../components/ui/Tag/Tag'
import { cn } from '../../../../../../lib/utils'
import { Painel } from '../../../../compartilhados/Painel/Painel'
import { formatarHoras, formatarMinutosSegundos } from '../../../../compartilhados/conteudo'
import { Rotulo_tamanho, type TempoConfiguracao } from '../../conteudo'
import styles from './TempoPorConfiguracao.module.scss'

type TempoPorConfiguracaoProps = {
  configuracoes: TempoConfiguracao[]
}

export function TempoPorConfiguracao({ configuracoes }: TempoPorConfiguracaoProps) {
  const feitas = configuracoes.filter((config) => config.simulados > 0)
  const tempoTotal = feitas.reduce((soma, config) => soma + config.totalSegundos, 0)
  const preferido = feitas.reduce<TempoConfiguracao | null>(
    (maior, config) => (!maior || config.simulados > maior.simulados ? config : maior),
    null,
  )

  return (
    <Painel
      titulo="Tempo por configuração"
      subtitulo="Duração média e total acumulado em cada tamanho de simulado"
    >
      {feitas.length === 0 ? (
        <p className={styles.vazio}>Você ainda não fez simulados neste período.</p>
      ) : (
        <ul className={styles.lista}>
          {feitas.map((config) => {
            const percentual = tempoTotal > 0 ? (config.totalSegundos / tempoTotal) * 100 : 0
            const detalhes = [
              `${formatarMinutosSegundos(config.segundosPorQuestao)} por questão`,
              config === preferido && feitas.length > 1 ? 'seu formato preferido' : null,
              config.observacao,
            ].filter(Boolean)

            return (
              <li key={config.tamanho}>
                <div className={styles.linha}>
                  <span className={styles.nome}>
                    {Rotulo_tamanho[config.tamanho]} · {config.questoes} questões
                    <Tag>
                      {config.simulados} {config.simulados === 1 ? 'simulado' : 'simulados'}
                    </Tag>
                  </span>
                  <span className={styles.tempos}>
                    <strong>média {formatarHoras(config.mediaSegundos)}</strong> ·{' '}
                    {formatarHoras(config.totalSegundos)} no total
                  </span>
                </div>

                <div className={styles.trilho} aria-hidden="true">
                  <div
                    className={cn(styles.barra, styles[config.tamanho])}
                    style={{ width: `${percentual}%` }}
                  />
                </div>

                <p className={styles.detalhe}>{detalhes.join(' · ')}</p>
              </li>
            )
          })}
        </ul>
      )}
    </Painel>
  )
}
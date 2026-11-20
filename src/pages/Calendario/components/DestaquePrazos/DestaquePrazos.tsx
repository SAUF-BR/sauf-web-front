import { ROTULO_TIPO_EVENTO, type Prazo } from '../../../../features/calendario'
import { cn, formatarDiaMes } from '../../../../lib/utils'
import styles from './DestaquePrazos.module.scss'

type DestaquePrazosProps = {
  prazos: Prazo[] | undefined
  carregando: boolean
  erro: boolean
  onAbrir: (dataIso: string) => void
}

export function DestaquePrazos({ prazos, carregando, erro, onAbrir }: DestaquePrazosProps) {
  // Sem prazos (ou com erro) o cabeçalho fica só com o título: o calendário abaixo continua útil
  if (erro || (!carregando && !prazos?.length)) return null

  return (
    <section className={styles.destaque} aria-labelledby="destaque-prazos" aria-busy={carregando}>
      <h2 id="destaque-prazos" className={styles.titulo}>
        Próximos prazos
      </h2>

      <ul className={styles.lista}>
        {carregando
          ? Array.from({ length: 3 }, (_, i) => <li key={i} className={styles.esqueleto} />)
          : prazos?.map((prazo) => {
              const { dia, mes } = formatarDiaMes(prazo.data)
              const quem = prazo.instituicao?.sigla ?? prazo.instituicao?.nome ?? 'Nacional'

              return (
                <li key={prazo.id}>
                  <button
                    type="button"
                    className={cn(styles.cartao, styles[prazo.tipo])}
                    onClick={() => onAbrir(prazo.data)}
                  >
                    <time dateTime={prazo.data} className={styles.data}>
                      <span className={styles.dia}>{dia}</span>
                      <span className={styles.mes}>{mes}</span>
                    </time>
                    <span className={styles.info}>
                      <span className={styles.quando}>{prazo.descricao}</span>
                      <span className={styles.nome}>{prazo.titulo}</span>
                      <span className={styles.meta}>
                        <span className={styles.bolinha} aria-hidden="true" />
                        {ROTULO_TIPO_EVENTO[prazo.tipo]}, {quem}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
      </ul>
    </section>
  )
}

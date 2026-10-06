import { useId } from 'react'
import { Avatar } from '../../../../../../components/ui/Avatar/Avatar'
import { cn, formatarInteiro } from '../../../../../../lib/utils'
import { formatarHoras } from '../../../../compartilhados/conteudo'
import type { ParticipantePodio } from '../../conteudo'
import styles from './PodioPeriodo.module.scss'

type PodioPeriodoProps = {
  titulo: string
  totalParticipantes: number
  podio: ParticipantePodio[]
}

export function PodioPeriodo({ titulo, totalParticipantes, podio }: PodioPeriodoProps) {
  const idTitulo = useId()
  const ordenado = [...podio].sort((a, b) => a.posicao - b.posicao)

  return (
    <section className={styles.painel} aria-labelledby={idTitulo}>
      <div className={styles.topo}>
        <div>
          <h2 id={idTitulo} className={styles.titulo}>
            {titulo}
          </h2>
          <p className={styles.subtitulo}>Quem passou mais tempo em simulados no período</p>
        </div>
        <p className={styles.participantes}>{formatarInteiro(totalParticipantes)} participantes</p>
      </div>

      {ordenado.length === 0 ? (
        <p className={styles.vazio}>Ainda não há participantes neste período.</p>
      ) : (
        <ol className={styles.podio}>
          {ordenado.map((participante) => (
            <li
              key={participante.posicao}
              className={cn(styles.lugar, styles[`lugar${participante.posicao}`])}
            >
              <div className={styles.pessoa}>
                <span className={styles.foto}>
                  {participante.posicao === 1 && (
                    <span className={styles.medalha} aria-hidden="true">
                      1º
                    </span>
                  )}
                  <Avatar
                    nome={participante.nome}
                    fotoUrl={participante.fotoUrl}
                    className={styles.avatar}
                  />
                </span>
                <strong className={styles.nome}>{participante.nome}</strong>
                <span className={styles.local}>
                  {participante.cidade}, {participante.uf}
                </span>
              </div>

              <div className={styles.degrau}>
                <span className={styles.posicao}>
                  <span className={styles.somenteLeitor}>{participante.posicao}º lugar, </span>
                  <span aria-hidden="true">{participante.posicao}</span>
                </span>
                <span className={styles.tempo}>{formatarHoras(participante.segundos)}</span>
                {participante.posicao === 1 && (
                  <span className={styles.simulados}>{participante.simulados} simulados</span>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
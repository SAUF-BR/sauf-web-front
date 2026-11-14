import { Lock } from 'lucide-react'
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
  // Posições ocupadas por quem não aparece em público (sem permissão ou menor de idade)
  privadas: number[]
}

type Lugar = { posicao: number; participante: ParticipantePodio | null }

export function PodioPeriodo({ titulo, totalParticipantes, podio, privadas }: PodioPeriodoProps) {
  const idTitulo = useId()
  const lugares: Lugar[] = [
    ...podio.map((participante) => ({ posicao: participante.posicao, participante })),
    ...privadas.map((posicao) => ({ posicao, participante: null })),
  ].sort((a, b) => a.posicao - b.posicao)

  return (
    <section className={styles.painel} aria-labelledby={idTitulo}>
      <div className={styles.topo}>
        <div>
          <h2 id={idTitulo} className={styles.titulo}>
            {titulo}
          </h2>
          <p className={styles.subtitulo}>Quem passou mais tempo em simulados no período</p>
        </div>
        <p className={styles.participantes}>
          {formatarInteiro(totalParticipantes)}{' '}
          {totalParticipantes === 1 ? 'participante' : 'participantes'}
        </p>
      </div>

      {lugares.length === 0 ? (
        <p className={styles.vazio}>Ainda não há participantes neste período.</p>
      ) : (
        <ol className={styles.podio}>
          {lugares.map(({ posicao, participante }) => (
            <li key={posicao} className={cn(styles.lugar, styles[`lugar${posicao}`])}>
              {participante ? (
                <div className={styles.pessoa}>
                  <span className={styles.foto}>
                    {posicao === 1 && (
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
              ) : (
                <div className={cn(styles.pessoa, styles.privada)}>
                  <span className={styles.foto}>
                    <span className={styles.avatarPrivado}>
                      <Lock size={18} aria-hidden="true" />
                    </span>
                  </span>
                  <strong className={styles.nome}>Privado</strong>
                  <span className={styles.local}>perfil oculto</span>
                </div>
              )}

              <div className={styles.degrau}>
                <span className={styles.posicao}>
                  <span className={styles.somenteLeitor}>{posicao}º lugar, </span>
                  <span aria-hidden="true">{posicao}</span>
                </span>
                {participante && (
                  <span className={styles.tempo}>{formatarHoras(participante.segundos)}</span>
                )}
                {participante && posicao === 1 && (
                  <span className={styles.simulados}>
                    {participante.simulados} {participante.simulados === 1 ? 'simulado' : 'simulados'}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}

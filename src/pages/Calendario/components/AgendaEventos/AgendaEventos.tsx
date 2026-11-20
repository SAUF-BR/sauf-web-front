import { ExternalLink, X } from 'lucide-react'
import {
  ROTULO_TIPO_EVENTO,
  formatarPeriodo,
  type EventoCalendario,
} from '../../../../features/calendario'
import { cn } from '../../../../lib/utils'
import styles from './AgendaEventos.module.scss'

type AgendaEventosProps = {
  titulo: string
  eventos: EventoCalendario[]
  mensagemVazia: string
  // Só aparece quando um dia está selecionado: volta para a agenda do mês
  onLimpar?: () => void
}

export function AgendaEventos({ titulo, eventos, mensagemVazia, onLimpar }: AgendaEventosProps) {
  return (
    <section className={styles.agenda} aria-labelledby="agenda-titulo">
      <div className={styles.cabecalho}>
        <h3 id="agenda-titulo" className={styles.titulo} aria-live="polite">
          {titulo}
        </h3>
        {onLimpar && (
          <button type="button" className={styles.limpar} onClick={onLimpar}>
            <X size="1em" aria-hidden="true" />
            Ver o mês inteiro
          </button>
        )}
      </div>

      {eventos.length === 0 ? (
        <p className={styles.vazio}>{mensagemVazia}</p>
      ) : (
        <ul className={styles.lista}>
          {eventos.map((evento) => (
            <li key={evento.id} className={cn(styles.item, styles[evento.tipo])}>
              <p className={styles.meta}>
                <span className={styles.tipo}>{ROTULO_TIPO_EVENTO[evento.tipo]}</span>
                {evento.instituicao && (
                  <span className={styles.instituicao} title={evento.instituicao.nome}>
                    {evento.instituicao.sigla ?? evento.instituicao.nome}
                  </span>
                )}
              </p>
              <p className={styles.nome}>{evento.titulo}</p>
              <p className={styles.periodo}>{formatarPeriodo(evento)}</p>
              {evento.descricao && <p className={styles.descricao}>{evento.descricao}</p>}
              <a
                href={evento.fonteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.fonte}
              >
                Fonte oficial
                <ExternalLink size="0.875em" aria-hidden="true" />
                <span className={styles.oculto}> (abre em nova aba)</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

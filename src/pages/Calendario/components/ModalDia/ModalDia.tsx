import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react'
import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components/Modal'
import {
  ROTULO_TIPO_EVENTO,
  formatarDiaSemanaExtenso,
  formatarPeriodo,
  type EventoCalendario,
} from '../../../../features/calendario'
import { cn } from '../../../../lib/utils'
import styles from './ModalDia.module.scss'

type ModalDiaProps = {
  dataIso: string | null
  eventos: EventoCalendario[]
  carregando: boolean
  // null no primeiro (ou no último) dia do mês na tela
  anterior: string | null
  proximo: string | null
  onMudarDia: (dataIso: string) => void
  onFechar: () => void
}

// Foco preso, Esc e clique fora fecham, e o foco volta para o dia que abriu (react-aria)
export function ModalDia({
  dataIso,
  eventos,
  carregando,
  anterior,
  proximo,
  onMudarDia,
  onFechar,
}: ModalDiaProps) {
  return (
    <ModalOverlay
      isOpen={dataIso !== null}
      onOpenChange={(abrir) => !abrir && onFechar()}
      isDismissable
      className={styles.overlay}
    >
      <Modal className={styles.modal}>
        <Dialog className={styles.dialog}>
          {dataIso && (
            <>
              <header className={styles.cabecalho}>
                <div className={styles.navegacao}>
                  <button
                    type="button"
                    className={styles.icone}
                    disabled={!anterior}
                    aria-label={
                      anterior ? `Dia anterior, ${formatarDiaSemanaExtenso(anterior)}` : 'Dia anterior'
                    }
                    onClick={() => anterior && onMudarDia(anterior)}
                  >
                    <ChevronLeft size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={styles.icone}
                    disabled={!proximo}
                    aria-label={
                      proximo ? `Próximo dia, ${formatarDiaSemanaExtenso(proximo)}` : 'Próximo dia'
                    }
                    onClick={() => proximo && onMudarDia(proximo)}
                  >
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                </div>
                <button
                  type="button"
                  className={styles.icone}
                  onClick={onFechar}
                  aria-label="Fechar"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </header>

              <Heading slot="title" className={styles.titulo} aria-live="polite">
                {formatarDiaSemanaExtenso(dataIso)}
              </Heading>

              {carregando ? (
                <p className={styles.vazio}>Carregando as datas…</p>
              ) : eventos.length === 0 ? (
                <p className={styles.vazio}>
                  Nada marcado para este dia. Use as setas para ver os dias vizinhos.
                </p>
              ) : (
                <ul className={styles.lista}>
                  {eventos.map((evento) => (
                    <li key={evento.id} className={cn(styles.evento, styles[evento.tipo])}>
                      <div className={styles.meta}>
                        <span className={styles.tipo}>{ROTULO_TIPO_EVENTO[evento.tipo]}</span>
                        {evento.instituicao ? (
                          <span title={evento.instituicao.nome}>
                            {evento.instituicao.sigla ?? evento.instituicao.nome}
                          </span>
                        ) : (
                          <span>Nacional</span>
                        )}
                      </div>
                      <h3 className={styles.nome}>{evento.titulo}</h3>
                      <p className={styles.periodo}>{formatarPeriodo(evento)}</p>
                      {evento.descricao && <p className={styles.descricao}>{evento.descricao}</p>}
                      <a
                        href={evento.fonteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.fonte}
                      >
                        Ver na fonte oficial
                        <ExternalLink size="0.875em" aria-hidden="true" />
                        <span className={styles.oculto}> (abre em nova aba)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}

import { useEffect, useRef, type KeyboardEvent } from 'react'
import { AvisoErro } from '../../../../../../components/ui/AvisoErro/AvisoErro'
import styles from './ModalFinalizar.module.scss'

interface ModalFinalizarProps {
  totalQuestoes: number
  // Questões que ficarão em branco (pendentes e em branco)
  semResposta: number
  enviando: boolean
  erro: string | null
  onConfirmar: () => void
  onCancelar: () => void
}

function textoAviso(semResposta: number, total: number) {
  if (semResposta === 0) return `Você respondeu as ${total} questões.`
  if (semResposta === 1) return 'Uma questão ficará em branco.'
  return `${semResposta} questões ficarão em branco.`
}

export function ModalFinalizar({
  totalQuestoes,
  semResposta,
  enviando,
  erro,
  onConfirmar,
  onCancelar,
}: ModalFinalizarProps) {
  const cancelarRef = useRef<HTMLButtonElement>(null)
  const confirmarRef = useRef<HTMLButtonElement>(null)

  // Foco entra no modal e volta ao elemento anterior ao fechar
  useEffect(() => {
    const anterior = document.activeElement as HTMLElement | null
    cancelarRef.current?.focus()
    return () => anterior?.focus()
  }, [])

  const aoTeclar = (evento: KeyboardEvent<HTMLDivElement>) => {
    if (evento.key === 'Escape' && !enviando) {
      evento.stopPropagation()
      onCancelar()
      return
    }

    // Mantém o Tab dentro do modal
    if (evento.key === 'Tab') {
      const primeiro = cancelarRef.current
      const ultimo = confirmarRef.current
      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault()
        ultimo?.focus()
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault()
        primeiro?.focus()
      }
    }
  }

  return (
    <div
      className={styles.fundo}
      onKeyDown={aoTeclar}
      onMouseDown={(evento) => {
        if (evento.target === evento.currentTarget && !enviando) onCancelar()
      }}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-finalizar"
        aria-describedby="descricao-finalizar"
      >
        <h2 id="titulo-finalizar" className={styles.titulo}>
          Finalizar simulado?
        </h2>
        <p id="descricao-finalizar" className={styles.descricao}>
          {textoAviso(semResposta, totalQuestoes)} Depois de finalizar, não será possível alterar as
          respostas.
        </p>

        {erro && <AvisoErro>{erro}</AvisoErro>}

        <div className={styles.acoes}>
          <button
            ref={cancelarRef}
            type="button"
            className={styles.cancelar}
            onClick={onCancelar}
            disabled={enviando}
          >
            Continuar respondendo
          </button>
          <button
            ref={confirmarRef}
            type="button"
            className={styles.confirmar}
            onClick={onConfirmar}
            disabled={enviando}
          >
            {enviando ? 'Finalizando…' : 'Finalizar simulado'}
          </button>
        </div>
      </div>
    </div>
  )
}

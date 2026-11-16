import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components/Modal'
import styles from './Personalizar.module.scss'

interface ModalPersonalizarProps {
  aberto: boolean
  onFechar: () => void
  titulo: string
  descricao: string
  children: ReactNode
}

// Foco preso dentro, Esc e clique fora fecham, e o foco volta para o botão que abriu
export function ModalPersonalizar({ aberto, onFechar, titulo, descricao, children }: ModalPersonalizarProps) {
  return (
    <ModalOverlay
      isOpen={aberto}
      onOpenChange={(abrir) => !abrir && onFechar()}
      isDismissable
      className={styles.overlay}
    >
      <Modal className={styles.modal}>
        <Dialog className={styles.dialog}>
          <div className={styles.cabecalho}>
            <div>
              <Heading slot="title" className={styles.titulo}>
                {titulo}
              </Heading>
              <p className={styles.descricao}>{descricao}</p>
            </div>
            <button type="button" className={styles.fechar} onClick={onFechar} aria-label="Fechar">
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          {children}
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}

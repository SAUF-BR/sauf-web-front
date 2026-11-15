import { useCallback, useId, useRef, useState, type KeyboardEvent } from 'react'
import { Camera, ImageUp, Trash2 } from 'lucide-react'
import { Avatar } from '../../../../components/ui/Avatar/Avatar'
import { useClickFora } from '../../../../hooks/useClickFora'
import styles from './FotoPerfil.module.scss'

type FotoPerfilProps = {
  nome: string
  fotoUrl: string | null
  ocupado: boolean
  onEscolher: () => void
  onRemover: () => void
}

// Foto do perfil com o botão da câmera. Sem foto, o botão já abre o seletor de
// arquivo; com foto, abre um menu com "Alterar foto" e "Remover foto".
export function FotoPerfil({ nome, fotoUrl, ocupado, onEscolher, onRemover }: FotoPerfilProps) {
  const [menuAberto, setMenuAberto] = useState(false)
  const menuId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const botaoRef = useRef<HTMLButtonElement>(null)

  const fecharMenu = useCallback(() => setMenuAberto(false), [])
  useClickFora(containerRef, fecharMenu, menuAberto)

  function aoClicarCamera() {
    if (fotoUrl) {
      setMenuAberto((aberto) => !aberto)
    } else {
      onEscolher()
    }
  }

  function escolher(acao: () => void) {
    fecharMenu()
    acao()
  }

  function fecharComEsc(evento: KeyboardEvent) {
    if (evento.key !== 'Escape' || !menuAberto) return
    fecharMenu()
    botaoRef.current?.focus()
  }

  return (
    <div ref={containerRef} className={styles.foto} aria-busy={ocupado} onKeyDown={fecharComEsc}>
      <Avatar
        nome={nome}
        fotoUrl={fotoUrl}
        tamanho="grande"
        className={`${styles.avatar} ${ocupado ? styles.enviando : ''}`}
      />

      <button
        ref={botaoRef}
        type="button"
        className={styles.camera}
        onClick={aoClicarCamera}
        disabled={ocupado}
        aria-label={fotoUrl ? 'Alterar ou remover foto de perfil' : 'Adicionar foto de perfil'}
        aria-haspopup={fotoUrl ? 'menu' : undefined}
        aria-expanded={fotoUrl ? menuAberto : undefined}
        aria-controls={menuAberto ? menuId : undefined}
      >
        <Camera size="1rem" aria-hidden="true" />
      </button>

      {menuAberto && (
        <ul id={menuId} role="menu" className={styles.menu}>
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className={styles.itemMenu}
              onClick={() => escolher(onEscolher)}
              autoFocus
            >
              <ImageUp size="1rem" aria-hidden="true" />
              Alterar foto
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className={`${styles.itemMenu} ${styles.perigo}`}
              onClick={() => escolher(onRemover)}
            >
              <Trash2 size="1rem" aria-hidden="true" />
              Remover foto
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

import { useCallback, useId, useRef, useState, type KeyboardEvent } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Bell, Heart } from 'lucide-react'
import { useUsuarioAtual } from '../../../features/auth'
import { useTotalNotificacoesNaoLidas } from '../../../features/notificacoes'
import { PainelNotificacoes } from '../../../features/notificacoes/components/PainelNotificacoes/PainelNotificacoes'
import { useClickFora } from '../../../hooks/useClickFora'
import { ROTAS } from '../../../routes/paths'
import { Logo } from '../../logo/Logo'
import { Avatar } from '../../ui/Avatar/Avatar'

import { ITENS_NAVEGACAO } from './navegacao'
import styles from './Header.module.scss'

export function Header() {
  const { data: usuario, isPending: carregandoUsuario } = useUsuarioAtual()
  const { data: totalNaoLidas = 0 } = useTotalNotificacoesNaoLidas({ enabled: !!usuario })
  const [notificacoesAbertas, setNotificacoesAbertas] = useState(false)
  const painelNotificacoesId = useId()
  const notificacoesRef = useRef<HTMLDivElement>(null)
  const sinoRef = useRef<HTMLButtonElement>(null)

  const fecharNotificacoes = useCallback(() => setNotificacoesAbertas(false), [])
  useClickFora(notificacoesRef, fecharNotificacoes, notificacoesAbertas)

  function fecharComEsc(evento: KeyboardEvent) {
    if (evento.key !== 'Escape') return
    fecharNotificacoes()
    sinoRef.current?.focus()
  }

  return (
    <header className={styles.header}>
      <div className={styles.conteudo}>
        <Link to={ROTAS.inicio} className={styles.logo} aria-label="SAUF.BR — página inicial">
          <Logo variant="clara" />
        </Link>

        <nav aria-label="Navegação principal" className={styles.nav}>
          <ul className={styles.navLista}>
            {ITENS_NAVEGACAO.map((item) => (
              <li key={item.para}>
                <NavLink
                  to={item.para}
                  end={item.exato}
                  className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkAtivo : ''}`}
                >
                  {item.rotulo}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.acoes}>
          {usuario ? (
            <>
              <Link to={ROTAS.favoritos} className={styles.acao} aria-label="Favoritos">
                <Heart size="1em" fill="currentColor" className={styles.iconeFavoritos} />
              </Link>

              <div ref={notificacoesRef} className={styles.notificacoes} onKeyDown={fecharComEsc}>
                <button
                  ref={sinoRef}
                  type="button"
                  className={`${styles.acao} ${styles.acaoContorno}`}
                  aria-label={
                    totalNaoLidas > 0
                      ? `Notificações (${totalNaoLidas} não lidas)`
                      : 'Notificações'
                  }
                  aria-expanded={notificacoesAbertas}
                  aria-controls={painelNotificacoesId}
                  onClick={() => setNotificacoesAbertas((abertas) => !abertas)}
                >
                  <Bell size="1em" />
                  {totalNaoLidas > 0 && <span className={styles.indicador} aria-hidden="true" />}
                </button>

                {notificacoesAbertas && (
                  <PainelNotificacoes id={painelNotificacoesId} onFechar={fecharNotificacoes} />
                )}
              </div>

              <Link to={ROTAS.perfil} className={styles.perfil} aria-label="Meu perfil">
                <Avatar nome={usuario.nome} />
              </Link>
            </>
          ) : (
            !carregandoUsuario && (
              <Link to={ROTAS.login} className={styles.entrar}>
                Entrar
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  )
}

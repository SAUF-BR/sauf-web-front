import { Link, NavLink } from 'react-router-dom'
import { Bell, Heart } from 'lucide-react'
import { useUsuarioAtual } from '../../../features/auth'
import { useTotalNotificacoesNaoLidas } from '../../../features/notificacoes'
import { ROTAS } from '../../../routes/paths'
import { Logo } from '../../logo/Logo'
import { Avatar } from '../../ui/Avatar/Avatar'

import { ITENS_NAVEGACAO } from './navegacao'
import styles from './Header.module.scss'

export function Header() {
  const { data: usuario, isPending: carregandoUsuario } = useUsuarioAtual()
  const { data: totalNaoLidas = 0 } = useTotalNotificacoesNaoLidas({ enabled: !!usuario })

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

              <Link
                to={ROTAS.notificacoes}
                className={`${styles.acao} ${styles.acaoContorno}`}
                aria-label={
                  totalNaoLidas > 0
                    ? `Notificações (${totalNaoLidas} não lidas)`
                    : 'Notificações'
                }
              >
                <Bell size="1em" />
                {totalNaoLidas > 0 && <span className={styles.indicador} aria-hidden="true" />}
              </Link>

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

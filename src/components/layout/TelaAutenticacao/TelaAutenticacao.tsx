import type { ReactNode } from 'react'
import { AcessarComoVisitante } from '../../../features/auth/components/AcessarComoVisitante/AcessarComoVisitante'
import { Logo } from '../../logo/Logo'
import { Titulo } from '../../ui/Titulo/Titulo'
import styles from './TelaAutenticacao.module.scss'

type TelaAutenticacaoProps = {
  titulo: string
  subtitulo: string
  children: ReactNode
}

// Moldura das telas da conta sem o header da aplicação (esqueci minha senha):
// mesmo fundo e cartão da tela de login.
export function TelaAutenticacao({ titulo, subtitulo, children }: TelaAutenticacaoProps) {
  return (
    <main className={styles.fundo}>
      <div className={styles.cartao}>
        <header className={styles.cabecalho}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <Titulo titulo={titulo} subtitulo={subtitulo} size="Medio" />
        </header>

        <div className={styles.conteudo}>{children}</div>
        <AcessarComoVisitante />
      </div>
    </main>
  )
}

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ROTAS } from '../../../../routes/paths'
import styles from './LayoutPerfil.module.scss'

type LayoutPerfilProps = {
  foto: ReactNode
  titulo: string
  subtitulo: string
  extra?: ReactNode
  acoes: ReactNode
  visitante?: boolean
  children: ReactNode
}

// Estrutura comum às duas versões do perfil (logado e visitante): faixa de
// cabeçalho com foto, nome e ações, e a área de conteúdo abaixo.
export function LayoutPerfil({
  foto,
  titulo,
  subtitulo,
  extra,
  acoes,
  visitante = false,
  children,
}: LayoutPerfilProps) {
  return (
    <>
      <section className={styles.cabecalho} aria-labelledby="titulo-perfil">
        <div className={styles.cabecalhoConteudo}>
          <nav aria-label="Você está em" className={styles.trilha}>
            <Link to={ROTAS.inicio} className={styles.trilhaLink}>
              Início
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Minha conta</span>
          </nav>

          <div className={styles.identidade}>
            {foto}

            <div className={styles.textos}>
              <h1
                id="titulo-perfil"
                className={`${styles.titulo} ${visitante ? styles.tituloVisitante : ''}`}
              >
                {titulo}
              </h1>
              <p className={styles.subtitulo}>{subtitulo}</p>
              {extra}
            </div>

            <div className={styles.acoes}>{acoes}</div>
          </div>
        </div>
      </section>

      <div className={styles.conteudo}>{children}</div>
    </>
  )
}

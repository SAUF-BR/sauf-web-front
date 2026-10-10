
import { Link } from 'react-router-dom'
import type { Curso } from '../../../../features/cursos/types'
import {
  formatarDuracao,
  ROTULO_GRAU,
  ROTULO_MODALIDADE,
} from '../../../../features/cursos/utils'
import { ROTAS } from '../../../../routes/paths'
import styles from './CursoDetalheHeader.module.scss'
import { universidadesPorCursoMock } from '../../../../features/cursos/mocks'

interface CursoDetalheHeaderProps {
  curso: Curso
}

export function CursoDetalheHeader({ curso }: CursoDetalheHeaderProps) {
  return (
    <header className={styles.header}>
        <div className={styles.container}>
        <p className={styles.breadcrumb}>
            <Link to={ROTAS.inicio}>Início</Link>
            {' / '}
            <Link to={ROTAS.cursos}>Cursos</Link>
            {' / '}
            {curso.nome}
        </p>

        <div className={styles.principal}>
            <div className={styles.imagem}>
            {curso.imagemUrl ? (
                <img src={curso.imagemUrl} alt="" />
            ) : (
                <span aria-hidden="true">🎓</span>
            )}
            </div>

            <div className={styles.informacoes}>
            <h1>{curso.nome}</h1>
            <p className={styles.area}>{curso.area} | Ofertado em {universidadesPorCursoMock[curso.id] ?? 0} universidades</p>
                
            <div className={styles.tags}>
                <span>{ROTULO_GRAU[curso.grau]}</span>
                <span>{ROTULO_MODALIDADE[curso.modalidade]}</span>
                
            </div>
            </div>
        </div>
      </div>
    </header>
  )
}

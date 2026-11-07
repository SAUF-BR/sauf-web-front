import {
  cursosListagemMock,
  totalCursosMock,
} from '../../features/cursos/mocks'
import { CursoListCard } from './components/CursoListCard/CursoListCard'
import styles from './index.module.scss'
import { Titulo } from '../../components/ui/Titulo/Titulo'
import { FiltrosCursos } from './components/FiltroCursos/FiltroCursos'
import { Breadcrumb } from '../../components/ui/Breadcrumb/Breadcrumb'

export default function Cursos() {

  return (
    <main className={styles.page}>
      <header className={styles.pageHeader}>
        <Breadcrumb
          itens={[
            { rotulo: 'Início', para: '/' },
            { rotulo: 'Cursos' },
          ]}
        />
        <Titulo
          titulo="Cursos"
          subtitulo={`${totalCursosMock} cursos encontrados`}
        />
      </header>

      <aside>
        <FiltrosCursos />
      </aside>

      <section className={styles.grid}>
        {cursosListagemMock.map((curso) => (
          <CursoListCard
            key={curso.id}
            curso={curso}
          />
        ))}
      </section>
    </main>
  )
}
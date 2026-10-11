
import { useState } from 'react'
import { useCursosListagem } from '../../features/cursos/hooks'
import type { FiltrosCursosParams } from '../../features/cursos/api'
import { CursoListCard } from './components/CursoListCard/CursoListCard'
import styles from './index.module.scss'
import { Titulo } from '../../components/ui/Titulo/Titulo'
import { FiltrosCursos } from './components/FiltroCursos/FiltroCursos'
import { Breadcrumb } from '../../components/ui/Breadcrumb/Breadcrumb'

export default function Cursos() {
  const [paginaAtual, setPaginaAtual] = useState(0)
  const [filtros, setFiltros] = useState<FiltrosCursosParams>({})

  const { data, isLoading, isError } = useCursosListagem(
    paginaAtual,
    filtros,
  )

  function aplicarFiltros(novosFiltros: FiltrosCursosParams) {
    setFiltros(novosFiltros)
    setPaginaAtual(0)
  }

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
          subtitulo={
            isLoading
              ? 'Carregando cursos...'
              : `${data?.totalElements ?? 0} cursos encontrados`
          }
        />
      </header>

      <aside>
        <FiltrosCursos onAplicar={aplicarFiltros} />
      </aside>

      <section className={styles.grid}>
        {isLoading && <p>Carregando cursos...</p>}

        {isError && (
          <p>Não foi possível carregar os cursos. Tente novamente.</p>
        )}

        {data?.content.map((curso) => (
          <CursoListCard key={curso.id} curso={curso} />
        ))}

        {!isLoading && !isError && data?.content.length === 0 && (
          <p>Nenhum curso encontrado.</p>
        )}
      </section>

      {data && data.totalPages > 1 && (
        <nav className={styles.pagination} aria-label="Paginação dos cursos">
          <button
            type="button"
            className={styles.paginationButton}
            disabled={paginaAtual === 0 || isLoading}
            onClick={() => setPaginaAtual((pagina) => pagina - 1)}
          >
            Anterior
          </button>

          <span className={styles.paginationInfo}>
            Página {paginaAtual + 1} de {data.totalPages}
          </span>

          <button
            type="button"
            className={styles.paginationButton}
            disabled={paginaAtual >= data.totalPages - 1 || isLoading}
            onClick={() => setPaginaAtual((pagina) => pagina + 1)}
          >
            Próxima
          </button>
        </nav>
      )}
    </main>
  )
}

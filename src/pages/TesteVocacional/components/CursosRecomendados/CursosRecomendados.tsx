import { Link } from 'react-router-dom'
import { CursoCard, useCursosPorArea } from '../../../../features/cursos'
import {
  BotaoFavorito,
  useAlternarCursoFavorito,
  useCursosFavoritosIds,
} from '../../../../features/favoritos'
import { ROTAS } from '../../../../routes/paths'
import styles from './CursosRecomendados.module.scss'

type CursosRecomendadosProps = {
  area: string
}

export function CursosRecomendados({ area }: CursosRecomendadosProps) {
  const { data } = useCursosPorArea(area)
  const { data: favoritosIds } = useCursosFavoritosIds()
  const alternarFavorito = useAlternarCursoFavorito()

  return (
    <section aria-labelledby="cursos-recomendados">
      <div className={styles.cabecalho}>
        <div>
          <h2 id="cursos-recomendados" className={styles.titulo}>
            Cursos recomendados para você
          </h2>
          <p className={styles.subtitulo}>Baseado no seu resultado e na sua região</p>
        </div>

        {data && data.total > 0 && (
          <Link to={ROTAS.busca(area)} className={styles.verTodos}>
            Ver todos os {data.total} <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>

      <ul className={styles.grade}>
        {data?.cursos.map((curso) => {
          const favorito = favoritosIds?.has(curso.id) ?? false

          return (
            <li key={curso.id}>
              <CursoCard
                curso={curso}
                acao={
                  <BotaoFavorito
                    ativo={favorito}
                    nomeItem={curso.nome}
                    disabled={alternarFavorito.isPending}
                    onAlternar={() =>
                      alternarFavorito.mutate({ cursoId: curso.id, favoritar: !favorito })
                    }
                  />
                }
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

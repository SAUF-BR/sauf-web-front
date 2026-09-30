import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { listarPreferencias, useUsuarioAtual } from '../../features/auth'
import { useProximosPrazos } from '../../features/calendario'
import { CursoCard, useCursosRecomendados, useTotalCursos } from '../../features/cursos'
import {
  BotaoFavorito,
  useAlternarCursoFavorito,
  useCursosFavoritosIds,
} from '../../features/favoritos'
import { UniversidadeCard, useUniversidadesEmDestaque } from '../../features/universidades'
import { obterPrimeiroNome } from '../../lib/utils'
import { ROTAS } from '../../routes/paths'
import { AtalhosRapidos } from './components/AtalhosRapidos/AtalhosRapidos'
import { CabecalhoSecao } from './components/CabecalhoSecao/CabecalhoSecao'
import { HeroBusca } from './components/HeroBusca/HeroBusca'
import { PainelPrazos } from './components/PainelPrazos/PainelPrazos'
import { BUSCAS_POPULARES, montarAtalhos } from './conteudo'
import styles from './index.module.scss'

export default function Home() {
  const { data: usuario } = useUsuarioAtual()
  const { data: prazos, isPending: carregandoPrazos } = useProximosPrazos()
  const { data: totalCursos } = useTotalCursos()
  const { data: cursosRecomendados } = useCursosRecomendados()
  const { data: favoritosIds } = useCursosFavoritosIds({ enabled: !!usuario })
  const alternarFavorito = useAlternarCursoFavorito()
  const { data: universidades } = useUniversidadesEmDestaque()

  const preferencias = usuario ? listarPreferencias(usuario.preferencias) : []

  return (
    <main>
      <section className={styles.hero} aria-label="Busca">
        <div className={styles.heroConteudo}>
          <HeroBusca
            primeiroNome={usuario ? obterPrimeiroNome(usuario.nome) : undefined}
            buscasPopulares={BUSCAS_POPULARES}
          />
          <PainelPrazos prazos={prazos} carregando={carregandoPrazos} />
        </div>
      </section>

      <div className={styles.conteudo}>
        <AtalhosRapidos atalhos={montarAtalhos({ totalCursos })} />

        <section aria-labelledby="secao-cursos">
          <CabecalhoSecao
            id="secao-cursos"
            titulo={usuario ? 'Continue de onde parou' : 'Cursos em destaque'}
            subtitulo={
              preferencias.length > 0 &&
              `Baseado nas suas preferências: ${preferencias.join(' · ')}`
            }
            acao={
              usuario && (
                <Link to={ROTAS.perfil} className={styles.linkSecao}>
                  Editar preferências
                </Link>
              )
            }
          />

          <ul className={styles.gradeCursos}>
            {cursosRecomendados?.map((curso) => {
              const favorito = favoritosIds?.has(curso.id) ?? false

              return (
                <li key={curso.id}>
                  <CursoCard
                    curso={curso}
                    acao={
                      usuario && (
                        <BotaoFavorito
                          ativo={favorito}
                          nomeItem={curso.nome}
                          disabled={alternarFavorito.isPending}
                          onAlternar={() =>
                            alternarFavorito.mutate({ cursoId: curso.id, favoritar: !favorito })
                          }
                        />
                      )
                    }
                  />
                </li>
              )
            })}
          </ul>
        </section>

        <section aria-labelledby="secao-universidades">
          <CabecalhoSecao
            id="secao-universidades"
            titulo="Instituições em destaque"
            acao={
              universidades && (
                <Link to={ROTAS.universidades} className={styles.linkSecao}>
                  Ver as {universidades.totalElements} <ArrowRight size="1em" />
                </Link>
              )
            }
          />

          <ul className={styles.gradeUniversidades}>
            {universidades?.content.map((universidade) => (
              <li key={universidade.id}>
                <UniversidadeCard universidade={universidade} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}

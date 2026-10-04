import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formatarInteiro } from '../../lib/utils'
import { ROTAS } from '../../routes/paths'
import { CabecalhoUniversidade } from './components/CabecalhoUniversidade/CabecalhoUniversidade'
import { CursosPorArea } from './components/CursosPorArea/CursosPorArea'
import { ModalidadesOfertadas } from './components/ModalidadesOfertadas/ModalidadesOfertadas'
import {
  PainelFormasIngresso,
  PainelOndeFica,
  PainelProximoPrazo,
} from './components/PaineisLaterais/PaineisLaterais'
import { Abas_universidade } from './conteudo'
import { useUniversidadeDetalhe } from './useUniversidadeDetalhe'
import styles from './index.module.scss'

export default function UniversidadeDetalhe() {
  const { universidadeId = '' } = useParams()
  const { universidade, carregando, erro } = useUniversidadeDetalhe(universidadeId)

  // Só em memória por enquanto
  const [favorito, setFavorito] = useState(false)
  const [abaAtiva, setAbaAtiva] = useState(Abas_universidade[0].id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [universidadeId])

  if (carregando) {
    return (
      <main className={styles.estado} aria-busy="true">
        <p>Carregando universidade…</p>
      </main>
    )
  }

  if (erro || !universidade) {
    return (
      <main className={styles.estado}>
        <h1 className={styles.tituloSecao}>
          {erro ? 'Não foi possível carregar' : 'Universidade não encontrada'}
        </h1>
        <p>
          {erro
            ? 'Tivemos um problema ao buscar os dados. Tente novamente em instantes.'
            : 'Não encontramos essa universidade. Ela pode ter sido removida ou o endereço está errado.'}
        </p>
        <Link to={ROTAS.universidades}>Voltar para universidades</Link>
      </main>
    )
  }

  const indicadores = [
    { rotulo: 'Cursos de graduação', valor: universidade.totalCursos },
    { rotulo: 'Vagas por ano', valor: universidade.vagasPorAno },
  ]

  return (
    <main>
      <CabecalhoUniversidade
        universidade={universidade}
        favorito={favorito}
        onAlternarFavorito={() => setFavorito((atual) => !atual)}
      />

      <div className={styles.barraAbas}>
        <div className={styles.abas} role="tablist" aria-label="Seções da universidade">
          {Abas_universidade.map((aba) => (
            <button
              key={aba.id}
              type="button"
              role="tab"
              id={`aba-${aba.id}`}
              aria-selected={aba.id === abaAtiva}
              aria-controls={`painel-${aba.id}`}
              className={styles.aba}
              onClick={() => setAbaAtiva(aba.id)}
            >
              {aba.rotulo}
            </button>
          ))}
        </div>
      </div>

      {abaAtiva === 'visao-geral' && (
        <div
          role="tabpanel"
          id="painel-visao-geral"
          aria-labelledby="aba-visao-geral"
          className={styles.corpo}
        >
          <div className={styles.principal}>
            <dl className={styles.indicadores}>
              {indicadores.map(({ rotulo, valor }) => (
                <div key={rotulo} className={styles.indicador}>
                  <dt>{rotulo}</dt>
                  <dd>{valor !== null ? formatarInteiro(valor) : '—'}</dd>
                </div>
              ))}
            </dl>
            
            <section aria-labelledby="secao-sobre">
              <h2 id="secao-sobre" className={styles.tituloSecao}>
                Sobre a universidade
              </h2>
              <div className={styles.sobre}>
                {universidade.sobre.length > 0 ? (
                  universidade.sobre.map((paragrafo) => <p key={paragrafo}>{paragrafo}</p>)
                ) : (
                  <p className={styles.semDados}>
                    Ainda não temos uma descrição desta universidade.
                  </p>
                )}
              </div>
            </section>

            <section aria-labelledby="secao-modalidades">
              <h2 id="secao-modalidades" className={styles.tituloSecao}>
                Modalidades ofertadas
              </h2>
              <ModalidadesOfertadas modalidades={universidade.modalidades} />
            </section>

            <section aria-labelledby="secao-areas">
              <h2 id="secao-areas" className={styles.tituloSecao}>
                Cursos por área
              </h2>
              <CursosPorArea areas={universidade.cursosPorArea} />
            </section>
          </div>

          <aside className={styles.lateral} aria-label="Informações rápidas">
            <PainelOndeFica
              nome={universidade.nome}
              cidade={universidade.cidade}
              uf={universidade.uf}
              endereco={universidade.endereco}
              distanciaKm={universidade.distanciaKm}
            />
            <PainelFormasIngresso
              formas={universidade.formasIngresso}
              nota={universidade.notaFormasIngresso}
            />
            <PainelProximoPrazo prazo={universidade.proximoPrazo} />
          </aside>
        </div>
      )}
    </main>
  )
}
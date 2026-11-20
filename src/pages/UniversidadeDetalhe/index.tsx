import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Carregando } from '../../components/ui/Carregando/Carregando'
import { EstadoErro } from '../../components/ui/EstadoErro/EstadoErro'
import { useFavoritarUniversidade } from '../../features/favoritos'
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
  const { universidade, carregando, naoEncontrada, erro, mensagemErro, tentando, tentarDeNovo } =
    useUniversidadeDetalhe(universidadeId)

  const favoritos = useFavoritarUniversidade()
  const [abaAtiva, setAbaAtiva] = useState(Abas_universidade[0].id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [universidadeId])

  if (carregando) {
    return (
      <main className={styles.estado} aria-busy="true">
        <Carregando mensagem="Carregando universidade…" />
      </main>
    )
  }

  if (erro) {
    return (
      <main className={styles.estado}>
        <EstadoErro
          titulo="Não foi possível carregar a universidade"
          descricao={mensagemErro}
          onTentarDeNovo={tentarDeNovo}
          tentando={tentando}
        />
      </main>
    )
  }

  if (naoEncontrada || !universidade) {
    return (
      <main className={styles.estado}>
        <h1 className={styles.tituloSecao}>Universidade não encontrada</h1>
        <p>Não encontramos essa universidade. Ela pode ter sido removida ou o endereço está errado.</p>
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
        favorito={favoritos.ehFavorita(universidade.id)}
        onAlternarFavorito={() => favoritos.alternarFavorita(universidade.id)}
        erroFavorito={favoritos.erro}
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
            <PainelOndeFica nome={universidade.nome} endereco={universidade.enderecoSede} />
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
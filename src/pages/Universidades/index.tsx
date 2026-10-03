import { useState, type SyntheticEvent } from 'react'
import { BarraBusca } from '../../components/ui/BarraBusca/BarraBusca'
import {
  favoritosIniciaisMock,
  universidadesListagemMock,
} from '../../features/universidades/mockUniversidades'
import { CabecalhoListagem } from './components/CabecalhoListagem/CabecalhoListagem'
import { CardUniversidadeGrid } from './components/CardUniversidadeGrid/CardUniversidadeGrid'
import { FiltrosLaterais } from './components/FiltrosLaterais/FiltrosLaterais'
import { useFiltrosUniversidades } from './useFiltrosUniversidades'
import styles from './index.module.scss'

export default function Universidades() {
  const listagem = useFiltrosUniversidades(universidadesListagemMock)

  // Só em memória por enquanto
  const [favoritosIds, setFavoritosIds] = useState(() => new Set(favoritosIniciaisMock))

  function alternarFavorito(universidadeId: string) {
    setFavoritosIds((atual) => {
      const proximo = new Set(atual)

      if (!proximo.delete(universidadeId)) proximo.add(universidadeId)

      return proximo
    })
  }
  
  function limparBuscaSeVazia(evento: SyntheticEvent<HTMLDivElement>) {
    if (evento.target instanceof HTMLInputElement && evento.target.value === '') {
      listagem.buscar('')
    }
  }

  return (
    <main>
      <section className={styles.topo} aria-label="Busca de universidades">
        <div className={styles.topoConteudo}>
          <CabecalhoListagem
            totalInstituicoes={listagem.totalInstituicoes}
            totalNoEstado={listagem.totalNoEstado}
          />

          <div className={styles.busca} onInput={limparBuscaSeVazia}>
            <BarraBusca
              placeholder="Busque por nome da universidade"
              rotulo="Buscar universidade por nome"
              onBuscar={listagem.buscar}
            />
          </div>
        </div>
      </section>

      <div className={styles.corpo}>
        <div className={styles.corpoConteudo}>
          <aside className={styles.lateral} aria-label="Filtros">
            <FiltrosLaterais
              filtros={listagem.filtros}
              cidades={listagem.cidades}
              escopo={listagem.escopo}
              onAtualizar={listagem.atualizar}
              onAlternarCategoria={listagem.alternarCategoria}
              onAlternarModalidade={listagem.alternarModalidade}
              onLimpar={listagem.limpar}
            />
          </aside>

          <section className={styles.resultados} aria-label="Universidades encontradas">
            {listagem.resultados.length > 0 ? (
              <ul className={styles.grade}>
                {listagem.resultados.map((universidade) => (
                  <li key={universidade.id}>
                    <CardUniversidadeGrid
                      universidade={universidade}
                      favorito={favoritosIds.has(universidade.id)}
                      onAlternarFavorito={() => alternarFavorito(universidade.id)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.vazio} role="status">
                Nenhuma universidade encontrada. Tente outro nome ou remova alguns filtros.
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

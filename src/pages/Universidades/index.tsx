import { useState, type SyntheticEvent } from 'react'
import { AvisoErro } from '../../components/ui/AvisoErro/AvisoErro'
import { BarraBusca } from '../../components/ui/BarraBusca/BarraBusca'
import { Button } from '../../components/ui/Botao/Botao'
import { Carregando } from '../../components/ui/Carregando/Carregando'
import { EstadoErro } from '../../components/ui/EstadoErro/EstadoErro'
import { CabecalhoListagem } from './components/CabecalhoListagem/CabecalhoListagem'
import { CardUniversidadeGrid } from './components/CardUniversidadeGrid/CardUniversidadeGrid'
import { FiltrosLaterais } from './components/FiltrosLaterais/FiltrosLaterais'
import { useFiltrosUniversidades } from './useFiltrosUniversidades'
import styles from './index.module.scss'

export default function Universidades() {
  const listagem = useFiltrosUniversidades()

  // Só em memória por enquanto (favoritos ainda não estão na API)
  const [favoritosIds, setFavoritosIds] = useState(() => new Set<string>())

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

  function renderizarResultados() {
    if (listagem.carregando) {
      return <Carregando mensagem="Carregando universidades…" />
    }

    if (listagem.erro) {
      return (
        <EstadoErro
          titulo="Não foi possível carregar as universidades"
          descricao={listagem.mensagemErro}
          onTentarDeNovo={listagem.tentarDeNovo}
          tentando={listagem.tentando}
        />
      )
    }

    if (listagem.resultados.length === 0) {
      return (
        <p className={styles.vazio} role="status">
          Nenhuma universidade encontrada. Tente outro nome ou remova alguns filtros.
        </p>
      )
    }

    return (
      <>
        <ul
          className={`${styles.grade} ${listagem.atualizando ? styles.atualizando : ''}`}
          aria-busy={listagem.atualizando}
        >
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

        <div className={styles.rodapeLista}>
          <p className={styles.mostrando} role="status">
            Mostrando {listagem.resultados.length} de {listagem.totalResultados}
          </p>

          {listagem.erroCarregarMais && (
            <AvisoErro>Não foi possível carregar mais universidades.</AvisoErro>
          )}

          {listagem.temMais && (
            <Button
              variant="outline"
              onClick={listagem.carregarMais}
              disabled={listagem.carregandoMais || listagem.atualizando}
            >
              {botaoCarregarMais()}
            </Button>
          )}
        </div>
      </>
    )
  }

  function botaoCarregarMais() {
    if (listagem.carregandoMais) return 'Carregando…'
    if (listagem.erroCarregarMais) return 'Tentar de novo'
    return 'Carregar mais'
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
              contagens={listagem.contagens}
              onAtualizar={listagem.atualizar}
              onAlternarCategoria={listagem.alternarCategoria}
              onAlternarModalidade={listagem.alternarModalidade}
              onLimpar={listagem.limpar}
            />
          </aside>

          <section className={styles.resultados} aria-label="Universidades encontradas">
            {renderizarResultados()}
          </section>
        </div>
      </div>
    </main>
  )
}
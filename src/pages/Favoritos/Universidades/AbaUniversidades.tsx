import { Link } from 'react-router-dom'
import { Carregando } from '../../../components/ui/Carregando/Carregando'
import { EstadoErro } from '../../../components/ui/EstadoErro/EstadoErro'
import { Tag } from '../../../components/ui/Tag/Tag'
import { obterNomeCurto, ROTULO_TIPO_UNIVERSIDADE } from '../../../features/universidades'
import { formatarInteiro } from '../../../lib/utils'
import { ROTAS } from '../../../routes/paths'
import { AvisoRemocao } from '../components/AvisoRemocao/AvisoRemocao'
import { CardFavorito } from '../components/CardFavorito/CardFavorito'
import { ComparacaoRapida } from '../components/ComparacaoRapida/ComparacaoRapida'
import { PainelAlerta } from '../components/PainelAlerta/PainelAlerta'
import type { EstadoFavoritos } from '../useFavoritos'
import {
  formatarCampi,
  formatarModalidades,
  type OrdenacaoUniversidades,
  type UniversidadeFavorita,
} from './conteudo'
import styles from '../index.module.scss'

type AbaUniversidadesProps = {
  favoritos: EstadoFavoritos<UniversidadeFavorita, OrdenacaoUniversidades>
  carregando: boolean
  erro: boolean
  mensagemErro: string | undefined
  tentando: boolean
  onTentarDeNovo: () => void
  alertaAtivo: boolean
  onAlternarAlerta: () => void
}

export function AbaUniversidades({
  favoritos,
  carregando,
  erro,
  mensagemErro,
  tentando,
  onTentarDeNovo,
  alertaAtivo,
  onAlternarAlerta,
}: AbaUniversidadesProps) {
  function renderizarLista() {
    if (carregando) {
      return <Carregando mensagem="Carregando universidades favoritas…" compacto />
    }

    if (erro) {
      return (
        <EstadoErro
          titulo="Não foi possível carregar suas universidades favoritas"
          descricao={mensagemErro}
          onTentarDeNovo={onTentarDeNovo}
          tentando={tentando}
          compacto
        />
      )
    }

    if (favoritos.total === 0) {
      return (
        <div className={styles.vazio}>
          <p>Você ainda não tem universidades favoritas.</p>
          <Link to={ROTAS.universidades} className={styles.vazioLink}>
            Explorar universidades
          </Link>
        </div>
      )
    }

    return (
      <ul className={styles.cards}>
        {favoritos.resultados.map((universidade) => {
          const nomeCurto = obterNomeCurto(universidade)
          const detalhes = [
            `${universidade.cidade}, ${universidade.uf}`,
            universidade.totalCampi > 0 && formatarCampi(universidade.totalCampi),
            formatarModalidades(universidade.modalidades),
          ]
            .filter(Boolean)
            .join(' · ')

          return (
            <li key={universidade.id}>
              <CardFavorito
                nome={universidade.nome}
                nomeAcessivel={nomeCurto}
                imagem={{
                  src: universidade.logoUrl,
                  alt: `Logo ${nomeCurto}`,
                  placeholder: 'logo',
                }}
                tags={
                  <Tag variant={universidade.tipo === 'publica' ? 'destaque' : 'neutro'}>
                    {ROTULO_TIPO_UNIVERSIDADE[universidade.tipo]}
                  </Tag>
                }
                detalhes={detalhes}
                status={null}
                metricas={[
                  {
                    rotulo: 'Nota MEC',
                    valor: universidade.notaMec !== null ? String(universidade.notaMec) : '—',
                  },
                  { rotulo: 'Cursos', valor: formatarInteiro(universidade.totalCursos) },
                ]}
                link={{
                  para: ROTAS.universidadeDetalhe(universidade.id),
                  rotulo: 'Ver universidade',
                }}
                selecionado={favoritos.selecionados.has(universidade.id)}
                onAlternarSelecao={() => favoritos.alternarSelecao(universidade.id)}
                onRemover={() => favoritos.remover(universidade.id)}
              />
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <>
      <div className={styles.lista}>
        {renderizarLista()}

        <AvisoRemocao
          nomeItem={favoritos.ultimaRemocao ? obterNomeCurto(favoritos.ultimaRemocao) : null}
          onDesfazer={favoritos.desfazerRemocao}
        />
      </div>

      <aside className={styles.lateral} aria-label="Resumo das universidades favoritas">
        {favoritos.total > 0 && (
          <ComparacaoRapida
            mensagemVazia="Marque as universidades que você quer comparar."
            itens={favoritos.comparados.map((universidade) => ({
              id: universidade.id,
              rotulo: `${obterNomeCurto(universidade)} · cursos`,
              valor: universidade.totalCursos,
              valorTexto: formatarInteiro(universidade.totalCursos),
            }))}
          />
        )}

        <PainelAlerta
          titulo="Alerta de processos seletivos"
          descricao="Avisamos quando uma universidade favorita abrir inscrição ou publicar edital."
          ativo={alertaAtivo}
          onAlternar={onAlternarAlerta}
        />
      </aside>
    </>
  )
}
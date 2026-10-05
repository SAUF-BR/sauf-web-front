import { Link } from 'react-router-dom'
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
  formatarInsightProximidade,
  formatarModalidades,
  Raio_proximidade_km,
  type OrdenacaoUniversidades,
  type UniversidadeFavorita,
} from './conteudo'
import styles from '../index.module.scss'

type AbaUniversidadesProps = {
  favoritos: EstadoFavoritos<UniversidadeFavorita, OrdenacaoUniversidades>
  alertaAtivo: boolean
  onAlternarAlerta: () => void
}

export function AbaUniversidades({
  favoritos,
  alertaAtivo,
  onAlternarAlerta,
}: AbaUniversidadesProps) {
  const comparadas = favoritos.comparados
  const perto = comparadas.filter((universidade) => universidade.distanciaKm < Raio_proximidade_km)

  return (
    <>
      <div className={styles.lista}>
        {favoritos.total > 0 ? (
          <ul className={styles.cards}>
            {favoritos.resultados.map((universidade) => {
              const nomeCurto = obterNomeCurto(universidade)
              const detalhes = [
                `${universidade.cidade}, ${universidade.uf}`,
                formatarCampi(universidade.totalCampi),
                formatarModalidades(universidade.modalidades),
              ].join(' · ')

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
                    status={universidade.status}
                    metricas={[
                      { rotulo: 'Nota MEC', valor: String(universidade.notaMec) },
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
        ) : (
          <div className={styles.vazio}>
            <p>Você ainda não tem universidades favoritas.</p>
            <Link to={ROTAS.universidades} className={styles.vazioLink}>
              Explorar universidades
            </Link>
          </div>
        )}

        <AvisoRemocao
          nomeItem={favoritos.ultimaRemocao ? obterNomeCurto(favoritos.ultimaRemocao) : null}
          onDesfazer={favoritos.desfazerRemocao}
        />
      </div>

      <aside className={styles.lateral} aria-label="Resumo das universidades favoritas">
        {favoritos.total > 0 && (
          <ComparacaoRapida
            mensagemVazia="Marque as universidades que você quer comparar."
            itens={comparadas.map((universidade) => ({
              id: universidade.id,
              rotulo: `${obterNomeCurto(universidade)} · cursos`,
              valor: universidade.totalCursos,
              valorTexto: formatarInteiro(universidade.totalCursos),
            }))}
            rodape={
              comparadas.length > 0 && formatarInsightProximidade(perto.length, comparadas.length)
            }
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
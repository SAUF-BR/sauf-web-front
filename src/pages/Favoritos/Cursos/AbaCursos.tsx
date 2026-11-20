import { Link } from 'react-router-dom'
import { AvisoErro } from '../../../components/ui/AvisoErro/AvisoErro'
import { Carregando } from '../../../components/ui/Carregando/Carregando'
import { EstadoErro } from '../../../components/ui/EstadoErro/EstadoErro'
import { Tag } from '../../../components/ui/Tag/Tag'
import { ROTULO_MODALIDADE } from '../../../features/cursos'
import { obterNomeCurto } from '../../../features/universidades'
import { formatarInteiro, formatarNumero } from '../../../lib/utils'
import { ROTAS } from '../../../routes/paths'
import { AvisoRemocao } from '../components/AvisoRemocao/AvisoRemocao'
import { CardFavorito } from '../components/CardFavorito/CardFavorito'
import { ComparacaoRapida } from '../components/ComparacaoRapida/ComparacaoRapida'
import { PainelAlerta } from '../components/PainelAlerta/PainelAlerta'
import type { EstadoFavoritos } from '../useFavoritos'
import {
  formatarDuracao,
  grausDaOferta,
  Rotulo_grau,
  type CursoFavorito,
  type OrdenacaoCursos,
} from './conteudo'
import styles from '../index.module.scss'

type AbaCursosProps = {
  favoritos: EstadoFavoritos<CursoFavorito, OrdenacaoCursos>
  carregando: boolean
  erro: boolean
  mensagemErro: string | undefined
  tentando: boolean
  onTentarDeNovo: () => void
  erroAlteracao: string | null
  notaEnem: number | null
  alertaAtivo: boolean
  onAlternarAlerta: () => void
}

// O mesmo curso pode estar em várias universidades
function nomeComUniversidade(curso: CursoFavorito) {
  return `${curso.nome} · ${obterNomeCurto(curso.universidade)}`
}

export function AbaCursos({
  favoritos,
  carregando,
  erro,
  mensagemErro,
  tentando,
  onTentarDeNovo,
  erroAlteracao,
  notaEnem,
  alertaAtivo,
  onAlternarAlerta,
}: AbaCursosProps) {
  function renderizarLista() {
    if (carregando) {
      return <Carregando mensagem="Carregando cursos favoritos…" compacto />
    }

    if (erro) {
      return (
        <EstadoErro
          titulo="Não foi possível carregar seus cursos favoritos"
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
          <p>Você ainda não tem cursos favoritos.</p>
          <Link to={ROTAS.cursos} className={styles.vazioLink}>
            Explorar cursos
          </Link>
        </div>
      )
    }

    return (
      <ul className={styles.cards}>
        {favoritos.resultados.map((curso) => {
          const detalhes = [
            obterNomeCurto(curso.universidade),
            `${curso.cidade}, ${curso.uf}`,
            formatarDuracao(curso),
          ]
            .filter(Boolean)
            .join(' · ')

          return (
            <li key={curso.id}>
              <CardFavorito
                nome={curso.nome}
                nomeAcessivel={nomeComUniversidade(curso)}
                imagem={{ src: null, alt: `Foto do curso de ${curso.nome}`, placeholder: 'foto' }}
                tags={
                  <>
                    {grausDaOferta(curso).map((grau) => (
                      <Tag key={grau} variant="destaque">
                        {Rotulo_grau[grau]}
                      </Tag>
                    ))}
                    <Tag>{ROTULO_MODALIDADE[curso.modalidade]}</Tag>
                  </>
                }
                detalhes={detalhes}
                status={null}
                metricas={[
                  {
                    rotulo: 'Corte SISU',
                    valor: curso.notaCorteSisu !== null ? formatarNumero(curso.notaCorteSisu) : '—',
                  },
                  { rotulo: 'Vagas', valor: curso.vagas !== null ? formatarInteiro(curso.vagas) : '—' },
                ]}
                link={{ para: ROTAS.cursoDetalhe(curso.cursoId), rotulo: 'Ver curso' }}
                selecionado={favoritos.selecionados.has(curso.id)}
                onAlternarSelecao={() => favoritos.alternarSelecao(curso.id)}
                onRemover={() => favoritos.remover(curso.id)}
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
        {erroAlteracao && (
          <AvisoErro>Não foi possível atualizar seus favoritos. {erroAlteracao}</AvisoErro>
        )}

        {renderizarLista()}

        <AvisoRemocao
          nomeItem={favoritos.ultimaRemocao ? nomeComUniversidade(favoritos.ultimaRemocao) : null}
          onDesfazer={favoritos.desfazerRemocao}
        />
      </div>

      <aside className={styles.lateral} aria-label="Resumo dos cursos favoritos">
        {favoritos.total > 0 && (
          <ComparacaoRapida
            coresAlternadas
            mensagemVazia="Marque os cursos que você quer comparar."
            itens={favoritos.comparados.map((curso) => ({
              id: curso.id,
              rotulo: nomeComUniversidade(curso),
              valor: curso.notaCorteSisu,
              valorTexto:
                curso.notaCorteSisu !== null
                  ? formatarNumero(curso.notaCorteSisu)
                  : 'sem corte SISU',
            }))}
            rodape={
              notaEnem !== null && (
                <span>
                  Sua média no ENEM: <strong>{formatarNumero(notaEnem, 0)}</strong>
                </span>
              )
            }
          />
        )}

        <PainelAlerta
          titulo="Alerta de prazos"
          descricao="Avisamos por e-mail 5 dias antes de cada inscrição dos seus favoritos."
          ativo={alertaAtivo}
          onAlternar={onAlternarAlerta}
        />
      </aside>
    </>
  )
}
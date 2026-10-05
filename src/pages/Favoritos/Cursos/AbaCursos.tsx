import { Link } from 'react-router-dom'
import { Tag } from '../../../components/ui/Tag/Tag'
import { obterDestaqueCurso, ROTULO_GRAU, ROTULO_MODALIDADE } from '../../../features/cursos'
import { obterNomeCurto } from '../../../features/universidades'
import { formatarNumero } from '../../../lib/utils'
import { ROTAS } from '../../../routes/paths'
import { AvisoRemocao } from '../components/AvisoRemocao/AvisoRemocao'
import { CardFavorito } from '../components/CardFavorito/CardFavorito'
import { ComparacaoRapida } from '../components/ComparacaoRapida/ComparacaoRapida'
import { PainelAlerta } from '../components/PainelAlerta/PainelAlerta'
import type { EstadoFavoritos } from '../useFavoritos'
import {
  formatarSemestres,
  mediaEnemUsuarioMock,
  type CursoFavorito,
  type OrdenacaoCursos,
} from './conteudo'
import styles from '../index.module.scss'

type AbaCursosProps = {
  favoritos: EstadoFavoritos<CursoFavorito, OrdenacaoCursos>
  alertaAtivo: boolean
  onAlternarAlerta: () => void
}

function nomeComUniversidade(curso: CursoFavorito) {
  return `${curso.nome} · ${obterNomeCurto(curso.universidade)}`
}

export function AbaCursos({ favoritos, alertaAtivo, onAlternarAlerta }: AbaCursosProps) {
  return (
    <>
      <div className={styles.lista}>
        {favoritos.total > 0 ? (
          <ul className={styles.cards}>
            {favoritos.resultados.map((curso) => {
              const destaque = obterDestaqueCurso(curso)
              const detalhes = [
                obterNomeCurto(curso.universidade),
                `${curso.cidade}, ${curso.uf}`,
                formatarSemestres(curso.duracaoSemestres),
              ].join(' · ')

              return (
                <li key={curso.id}>
                  <CardFavorito
                    nome={curso.nome}
                    nomeAcessivel={nomeComUniversidade(curso)}
                    imagem={{
                      src: curso.imagemUrl,
                      alt: `Foto do curso de ${curso.nome}`,
                      placeholder: 'foto',
                    }}
                    tags={
                      <>
                        <Tag variant="destaque">{ROTULO_GRAU[curso.grau]}</Tag>
                        <Tag>{ROTULO_MODALIDADE[curso.modalidade]}</Tag>
                      </>
                    }
                    detalhes={detalhes}
                    status={curso.status}
                    metricas={destaque ? [destaque] : []}
                    link={{ para: ROTAS.cursoDetalhe(curso.id), rotulo: 'Ver curso' }}
                    selecionado={favoritos.selecionados.has(curso.id)}
                    onAlternarSelecao={() => favoritos.alternarSelecao(curso.id)}
                    onRemover={() => favoritos.remover(curso.id)}
                  />
                </li>
              )
            })}
          </ul>
        ) : (
          <div className={styles.vazio}>
            <p>Você ainda não tem cursos favoritos.</p>
            <Link to={ROTAS.cursos} className={styles.vazioLink}>
              Explorar cursos
            </Link>
          </div>
        )}

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
              rotulo: curso.nome,
              valor: curso.notaCorteSisu,
              valorTexto:
                curso.notaCorteSisu !== null
                  ? formatarNumero(curso.notaCorteSisu)
                  : 'sem corte SISU',
            }))}
            rodape={
              mediaEnemUsuarioMock !== null && (
                <span>
                  Sua média no ENEM: <strong>{formatarNumero(mediaEnemUsuarioMock, 0)}</strong>
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
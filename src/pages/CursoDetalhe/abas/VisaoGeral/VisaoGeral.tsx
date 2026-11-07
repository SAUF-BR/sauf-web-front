
import {
  detalhesCursoMock,
  vagasAnoRegiaoMock,
  notaAlunoMock,
} from '../../../../features/cursos/mocks'
import {
  formatarNumero,
  formatarInteiro,
} from '../../../../lib/utils/formatadores'
import styles from './VisaoGeral.module.scss'
import type { Curso } from '../../../../features/cursos/types'
import { Link } from 'react-router-dom'
import { ROTAS } from '../../../../routes/paths'
import { universidadesMock } from '../../../../features/universidades/mocks'
import { ROTULO_TIPO_UNIVERSIDADE } from '../../../../features/universidades/utils'
import {
  calcularChance,
} from '../../../../features/cursos/utils'
import { BotaoFavorito } from '../../../../features/favoritos/components/BotaoFavorito/BotaoFavorito'
import {
  useAlternarCursoFavorito,
  useCursosFavoritosIds,
} from '../../../../features/favoritos/hooks'


interface VisaoGeralProps {
  curso: Curso
}

export function VisaoGeral({ curso }: VisaoGeralProps) {
  const detalhes = detalhesCursoMock[curso.id]
  const universidadeCompleta = universidadesMock.find(
  (universidade) => universidade.id === curso.universidade.id,
)
const { data: favoritosIds } = useCursosFavoritosIds()
const alternarFavorito = useAlternarCursoFavorito()

const ativo = favoritosIds?.has(curso.id) ?? false

function handleAlternarFavorito() {
  alternarFavorito.mutate({
    cursoId: curso.id,
    favoritar: !ativo,
  })
}

const { diferencaNota, percentualNota, corChance } = calcularChance(
  curso.notaCorteSisu,
  notaAlunoMock,
)

  return (
    <div className={styles.layout}>
      <div className={styles.conteudoPrincipal}>
        <section className={styles.cardsInformativos}>
            <article className={styles.cardInformativo}>
                <span className={styles.cardRotulo}>DURAÇÃO</span>
                <div className={styles.cardValor}>
                <strong>{curso.duracaoSemestres}</strong>
                <span>semestres</span>
                </div>
            </article>

            <article className={styles.cardInformativo}>
                <span className={styles.cardRotulo}>NOTA DE CORTE</span>
                <strong className={styles.cardValorUnico}>
                {curso.notaCorteSisu !== null
                    ? formatarNumero(curso.notaCorteSisu)
                    : 'Não disponível'}
                </strong>
            </article>

            <article className={styles.cardInformativo}>
                <span className={styles.cardRotulo}>VAGAS/ANO NA REGIÃO</span>
                <strong className={styles.cardValorUnico}>
                {vagasAnoRegiaoMock[curso.id] !== undefined
                    ? formatarInteiro(vagasAnoRegiaoMock[curso.id])
                    : 'Não disponível'}
                </strong>
            </article>
        </section>

        <section className={styles.secao}>
          <h2>Sobre o curso</h2>
          <p>
            {detalhes?.descricao ??
              `O curso de ${curso.nome} faz parte da área de ${curso.area}. Consulte a instituição para conhecer a grade curricular e as características específicas da formação.`}
          </p>
        </section>

        <section className={styles.secao}>
          <h2>Instituição que ofertam o curso</h2>
            <Link
            to={ROTAS.universidadeDetalhe(curso.universidade.id)}
            className={styles.universidade}
            >
            <div className={styles.sigla}>
                {curso.universidade.sigla || 'UNI'}
            </div>

            <div>
                <h3>{curso.universidade.nome}</h3>
                <p>
                    {ROTULO_TIPO_UNIVERSIDADE[curso.universidade.tipo]}
                    {universidadeCompleta?.cidade &&
                        ` · ${universidadeCompleta.cidade}`}
                    {universidadeCompleta?.uf &&
                        `, ${universidadeCompleta.uf}`}
                </p>
                            </div>
            </Link>
        </section>
      </div>
    
    <div className={styles.colunaLateral}>
        <aside className={styles.chanceCard}>
            <p className={styles.chanceTitulo}>Sua chance estimada</p>

            <div className={styles.chanceResultado}>
                <strong>Média</strong>
                <span>
                    com nota{' '}
                    {formatarNumero(notaAlunoMock)}
                </span>
            </div>

                        
            <div
                className={styles.chanceBarra}
                role="progressbar"
                aria-label="Nota do aluno em relação à nota de corte"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percentualNota ?? 0}
                >
                <div
                    className={`${styles.chanceProgresso} ${styles[corChance]}`}
                    style={{ width: `${percentualNota ?? 0}%` }}
                />
            </div>


            <p className={styles.chanceDescricao}>
            {diferencaNota === null
                ? 'Não há nota de corte disponível para comparação.'
                : diferencaNota > 0
                ? `Faltam ${diferencaNota} pontos para atingir a nota de corte de referência.`
                : diferencaNota < 0
                    ? `Sua nota está ${Math.abs(diferencaNota)} pontos acima da nota de corte de referência.`
                    : 'Sua nota é igual à nota de corte de referência.'}
            </p>
        </aside>

        <Link
            to={ROTAS.formasDeIngresso}
            className={styles.botaoIngresso}
        >
            Como ingressar neste curso
        </Link>

       <BotaoFavorito
            ativo={ativo}
            nomeItem={curso.nome}
            onAlternar={handleAlternarFavorito}
            disabled={alternarFavorito.isPending}
            className={styles.botaoFavorito}
            mostrarTexto
        />
    </div>
      
    </div>
  )
}

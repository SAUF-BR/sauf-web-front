
import {
  detalhesCursoMock,
  vagasAnoRegiaoMock,
  notaAlunoMock,
} from '../../../../features/cursos/mocks'
import {
  formatarDuracao,
  ROTULO_GRAU,
  ROTULO_MODALIDADE,
} from '../../../../features/cursos/utils'
import styles from './VisaoGeral.module.scss'
import type { Curso } from '../../../../features/cursos/types'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROTAS } from '../../../../routes/paths'
import { universidadesMock } from '../../../../features/universidades/mocks'


interface VisaoGeralProps {
  curso: Curso
}

export function VisaoGeral({ curso }: VisaoGeralProps) {
  const detalhes = detalhesCursoMock[curso.id]
  const [salvo, setSalvo] = useState(false)
  const universidadeCompleta = universidadesMock.find(
  (universidade) => universidade.id === curso.universidade.id,
)

const diferencaNota =
  curso.notaCorteSisu !== null
    ? Math.round(curso.notaCorteSisu - notaAlunoMock)
    : null

const percentualNota =
  curso.notaCorteSisu !== null && curso.notaCorteSisu > 0
    ? Math.min(100, Math.max(0, (notaAlunoMock / curso.notaCorteSisu) * 100))
    : null

const corChance =
  percentualNota === null
    ? 'indisponivel'
    : percentualNota < 50
      ? 'baixa'
      : percentualNota < 70
        ? 'media'
        : 'alta'

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
                    ? curso.notaCorteSisu.toLocaleString('pt-BR', {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                    })
                    : 'Não disponível'}
                </strong>
            </article>

            <article className={styles.cardInformativo}>
                <span className={styles.cardRotulo}>VAGAS/ANO NA REGIÃO</span>
                <strong className={styles.cardValorUnico}>
                {vagasAnoRegiaoMock[curso.id] !== undefined
                    ? vagasAnoRegiaoMock[curso.id].toLocaleString('pt-BR')
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
                    {curso.universidade.tipo === 'publica'
                        ? 'Pública'
                        : curso.universidade.tipo === 'privada'
                        ? 'Privada'
                        : 'Instituição de ensino superior'}
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
                    {notaAlunoMock.toLocaleString('pt-BR', {
                        maximumFractionDigits: 1,
                    })}
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

        <button
            type="button"
            className={`${styles.botaoFavorito} ${
            salvo ? styles.favoritoSalvo : ''
            }`}
            onClick={() => setSalvo((estadoAtual) => !estadoAtual)}
            aria-pressed={salvo}
        >
            ♥ {salvo ? 'Salvo' : 'Salvar nos favoritos'}
        </button>

    </div>
      
    </div>
  )
}

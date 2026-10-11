
import type { Curso } from '../../../../features/cursos/types'
import { mercadoSalariosMock } from '../../../../features/cursos/mercadoSalariosMock'
import styles from './MercadoSalarios.module.scss'

interface MercadoSalariosProps {
  curso: Curso
}

function formatarSalario(valor: number) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  })
}

export function MercadoSalarios({ curso }: MercadoSalariosProps) {
  const dados = mercadoSalariosMock[curso.id]

  if (!dados) {
    return (
      <section className={styles.indisponivel}>
        <h2>Mercado e salários</h2>
        <p>
          Ainda não temos dados demonstrativos de mercado para este curso.
        </p>
      </section>
    )
  }

  const maiorSalario = Math.max(
    ...dados.areasAtuacao.map((area) => area.salarioMaximo),
  )

  return (
    <div className={styles.layout}>
      <section className={styles.conteudo}>
        <div className={styles.indicadores}>
          <article className={styles.indicador}>
            <span>Salário inicial médio</span>
            <strong>{formatarSalario(dados.salarioInicialMedio)}</strong>
          </article>

          <article className={styles.indicador}>
            <span>Média com 5 anos</span>
            <strong>{formatarSalario(dados.salarioMedioCincoAnos)}</strong>
          </article>

          <article className={styles.indicador}>
            <span>Empregabilidade em 12 meses</span>
            <strong className={styles.destaque}>
              {dados.empregabilidade12Meses}%
            </strong>
          </article>
        </div>

        <section className={styles.secao}>
          <h2>Faixa salarial por área de atuação</h2>

          <div className={styles.cardSalarios}>
            {dados.areasAtuacao.map((area, index) => (
              <div className={styles.areaSalario} key={area.nome}>
                <div className={styles.areaCabecalho}>
                  <span>{area.nome}</span>
                  <strong>
                    {formatarSalario(area.salarioMinimo)} –{' '}
                    {formatarSalario(area.salarioMaximo)}
                  </strong>
                </div>

                <div className={styles.barra}>
                  <div
                    className={`${styles.progresso} ${
                      styles[`cor${index % 4}`]
                    }`}
                    style={{
                      width: `${(area.salarioMaximo / maiorSalario) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}

          </div>
        </section>

        <section className={styles.secao}>
          <h2>Onde estão as vagas</h2>

          <div className={styles.distribuicao}>
            {dados.distribuicaoVagas.map((item) => (
              <article className={styles.vaga} key={item.setor}>
                <strong>{item.percentual}%</strong>
                <span>{item.setor}</span>
              </article>
            ))}
          </div>
        </section>
      </section>

      <aside className={styles.lateral}>
        <section className={styles.demanda}>
          <h3>Demanda no {dados.demandaRegional.regiao}</h3>

          <div className={styles.demandaResumo}>
            <strong>
              {dados.demandaRegional.variacaoPercentual > 0 ? '+' : ''}
              {dados.demandaRegional.variacaoPercentual}%
            </strong>
            <span>variação demonstrativa</span>
          </div>

          <div
            className={styles.grafico}
            aria-label="Gráfico demonstrativo de demanda"
          >
            {dados.demandaRegional.ultimosMeses.map((valor, index) => {
              const maiorValor = Math.max(
                ...dados.demandaRegional.ultimosMeses,
              )

              return (
                <div
                  key={`${index}-${valor}`}
                  className={styles.colunaGrafico}
                  style={{ height: `${(valor / maiorValor) * 100}%` }}
                />
              )
            })}
          </div>
        </section>

        {dados.registroProfissional && (
          <section className={styles.registro}>
            <h3>Registro profissional</h3>
            <p>{dados.registroProfissional.descricao}</p>

            {dados.registroProfissional.sigla && (
              <p>
                <span aria-hidden="true">•</span>{' '}
                {dados.registroProfissional.sigla} · registro profissional
              </p>
            )}

            {dados.registroProfissional.habilitacoes !== undefined && (
              <p>
                <span aria-hidden="true">•</span>{' '}
                {dados.registroProfissional.habilitacoes} habilitações
                possíveis
              </p>
            )}
          </section>
        )}
      </aside>
    </div>
  )
}

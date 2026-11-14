import { Suspense } from 'react'
import type { ResultadosQuestoes } from '../../../../../features/simulados'
import { formatarPorcentagem } from '../../../compartilhados/conteudo'
import { GraficoDistribuicao } from '../graficos'
import styles from './AcertosErrosCard.module.scss'

interface AcertosErrosProps {
  atual: ResultadosQuestoes
  anterior: ResultadosQuestoes
}

const Linhas: { chave: keyof ResultadosQuestoes; rotulo: string; ponto: string }[] = [
  { chave: 'acertos', rotulo: 'Acertos', ponto: 'dotAcerto' },
  { chave: 'erros', rotulo: 'Erros', ponto: 'dotErro' },
  { chave: 'emBranco', rotulo: 'Em branco', ponto: 'dotBranco' },
]

export function AcertosErrosCard({ atual, anterior }: AcertosErrosProps) {
  const total = atual.acertos + atual.erros + atual.emBranco
  const porcentagem = total === 0 ? 0 : Math.round((atual.acertos * 100) / total)

  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.title}>Acertos e erros</h3>
        <p className={styles.subtitle}>
          Total de {total} {total === 1 ? 'questão' : 'questões'} nos simulados concluídos
        </p>
      </div>

      <div className={styles.chartSection}>
        <div
          className={styles.donutContainer}
          role="img"
          aria-label={`${formatarPorcentagem(porcentagem)} de acertos`}
        >
          {total > 0 && (
            <Suspense fallback={null}>
              <GraficoDistribuicao resultados={atual} />
            </Suspense>
          )}
          <div className={styles.donutCenter} aria-hidden="true">
            <span className={styles.percentage}>{porcentagem}%</span>
            <span className={styles.label}>ACERTOS</span>
          </div>
        </div>

        <dl className={styles.legendList}>
          {Linhas.map((linha) => (
            <div key={linha.chave} className={styles.legendRow}>
              <dt>
                <span className={styles[linha.ponto]} aria-hidden="true" /> {linha.rotulo}
              </dt>
              <dd>{atual[linha.chave]}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={styles.comparativoBox}>
        <span className={styles.comparativoTitle}>COMPARADO AO PERÍODO ANTERIOR</span>

        {Linhas.map((linha) => (
          <div key={linha.chave} className={styles.comparativoRow}>
            <span>{linha.rotulo}</span>
            <span>
              <span className={styles.somenteLeitor}>de </span>
              {anterior[linha.chave]}
              <span aria-hidden="true"> → </span>
              <span className={styles.somenteLeitor}> para </span>
              <strong>{atual[linha.chave]}</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

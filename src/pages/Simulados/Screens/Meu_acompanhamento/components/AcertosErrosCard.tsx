import styles from './AcertosErrosCard.module.scss'

interface AcertosErrosProps {
  totalQuestoes: number
  porcentagemAcertos: number
  acertos: number
  erros: number
  emBranco: number
  comparativo: {
    acertosAnterior: number
    errosAnterior: number
    emBrancoAnterior: number
  }
}

export function AcertosErrosCard({
  totalQuestoes,
  porcentagemAcertos,
  acertos,
  erros,
  emBranco,
  comparativo,
}: AcertosErrosProps) {
  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.title}>Acertos e erros</h3>
        <p className={styles.subtitle}>Total de {totalQuestoes} questões no período</p>
      </div>

      <div className={styles.chartSection}>
        {/* Rosca construída com conic-gradient CSS */}
        <div className={styles.donutContainer}>
          <div className={styles.donutCenter}>
            <span className={styles.percentage}>{porcentagemAcertos}%</span>
            <span className={styles.label}>ACERTOS</span>
          </div>
        </div>

        <div className={styles.legendList}>
          <div className={styles.legendRow}>
            <span><span className={styles.dotAcerto} /> Acertos</span>
            <strong>{acertos}</strong>
          </div>
          <div className={styles.legendRow}>
            <span><span className={styles.dotErro} /> Erros</span>
            <strong>{erros}</strong>
          </div>
          <div className={styles.legendRow}>
            <span><span className={styles.dotBranco} /> Em branco</span>
            <strong>{emBranco}</strong>
          </div>
        </div>
      </div>

      <div className={styles.comparativoBox}>
        <span className={styles.comparativoTitle}>COMPARADO AO MÊS ANTERIOR</span>
        
        <div className={styles.comparativoRow}>
          <span>Acertos</span>
          <span>{comparativo.acertosAnterior} → <strong>{acertos}</strong></span>
        </div>
        <div className={styles.comparativoRow}>
          <span>Erros</span>
          <span>{comparativo.errosAnterior} → <strong>{erros}</strong></span>
        </div>
        <div className={styles.comparativoRow}>
          <span>Em branco</span>
          <span>{comparativo.emBrancoAnterior} → <strong>{emBranco}</strong></span>
        </div>
      </div>
    </div>
  )
}
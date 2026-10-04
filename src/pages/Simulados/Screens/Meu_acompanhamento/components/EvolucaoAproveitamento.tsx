import styles from './EvolucaoAproveitamento.module.scss'

interface SimuladoItem {
  data: string
  percentual: number
  destaque?: boolean
}

interface EvolucaoAproveitamentoProps {
  comentario: string
  simulados: SimuladoItem[]
}

export function EvolucaoAproveitamento({ comentario, simulados }: EvolucaoAproveitamentoProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Evolução do aproveitamento</h3>
          <p className={styles.subtitle}>
            Percentual de acertos por simulado, do mais antigo ao mais recente
          </p>
        </div>
        <div className={styles.legenda}>
          <span><span className={styles.dotVoce} /> Você</span>
          <span><span className={styles.linhaMedia} /> Média da plataforma</span>
        </div>
      </div>

      <div className={styles.chartArea}>
        <div className={styles.yAxis}>
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0</span>
        </div>

        <div className={styles.barsContainer}>
          {simulados.map((item) => (
            <div key={item.data} className={styles.barColumn}>
              <span className={`${styles.barValue} ${item.destaque ? styles.highlightValue : ''}`}>
                {item.percentual}%
              </span>
              <div className={styles.barTrack}>
                <div
                  className={`${styles.barFill} ${item.destaque ? styles.highlightBar : ''}`}
                  style={{ height: `${item.percentual}%` }}
                />
              </div>
              <span className={styles.barLabel}>{item.data}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footerNote}>
        <span className={styles.bulletNote}>●</span> {comentario}
      </div>
    </div>
  )
}
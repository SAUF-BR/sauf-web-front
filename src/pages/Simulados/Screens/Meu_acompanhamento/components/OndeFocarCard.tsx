import styles from './OndeFocarCard.module.scss'

interface FocoItem {
  ordem: number
  materia: string
  descricao: string
}

interface OndeFocarCardProps {
  itens: FocoItem[]
  onActionClick?: () => void
}

export function OndeFocarCard({ itens, onActionClick }: OndeFocarCardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Onde focar agora</h3>

      <div className={styles.list}>
        {itens.map((item) => (
          <div key={item.ordem} className={styles.item}>
            <span className={styles.badgeNumber}>{item.ordem}</span>
            <div>
              <strong className={styles.materiaTitle}>{item.materia}</strong>
              <p className={styles.descricao}>{item.descricao}</p>
            </div>
          </div>
        ))}
      </div>

      <button type="button" className={styles.actionBtn} onClick={onActionClick}>
        Criar simulado de Física
      </button>/* impementar depois -- vai levar para a tela de criação de simulado(simulados_configuração), com a matéria já selecionada */
    </div>
  )
}
import type { Tamanho } from '../../../../../../features/simulados'
import styles from './TamanhoCard.module.scss'

export interface TamanhoOpcao {
  id: Tamanho
  titulo: string
  questoes: number
  descricaoTempo: string
  subtexto: string
  sugerida?: boolean
}

interface TamanhoCardProps {
  opcao: TamanhoOpcao
  isSelecionado: boolean
  onSelect: () => void
}

export function TamanhoCard({ opcao, isSelecionado, onSelect }: TamanhoCardProps) {
  const { titulo, questoes, descricaoTempo, subtexto, sugerida } = opcao

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelecionado}
      className={`${styles.card} ${isSelecionado ? styles.selecionado : ''}`}
      onClick={onSelect}
    >
      <div className={styles.headerRow}>
        <div className={styles.titleWrapper}>
          <span className={styles.titulo}>{titulo}</span>
          {sugerida && <span className={styles.badgeSugerida}>SUGERIDA</span>}
        </div>
        <div className={`${styles.radioCircle} ${isSelecionado ? styles.radioChecked : ''}`} />
      </div>

      <div className={styles.questoesRow}>
        <strong className={styles.numeroQuestoes}>{questoes}</strong>
        <span className={styles.labelQuestoes}>questões</span>
      </div>

      <p className={styles.descricao}>
        {descricaoTempo} {subtexto}
      </p>
    </button>
  )
}

import styles from './OptionRow.module.scss'

export interface OpcaoData {
  letra: string
  texto: string
}

interface OptionRowProps {
  opcao: OpcaoData
  isSelecionada: boolean
  onSelect: () => void
}

export function OptionRow({ opcao, isSelecionada, onSelect }: OptionRowProps) {
  return (
    <button
      type="button"
      className={`${styles.row} ${isSelecionada ? styles.selecionada : ''}`}
      onClick={onSelect}
    >
      <span className={`${styles.circleLetra} ${isSelecionada ? styles.circleActive : ''}`}>
        {opcao.letra}
      </span>
      <span className={styles.textoOpcao}>{opcao.texto}</span>
      {isSelecionada && <span className={styles.badgeSuaResposta}>Sua resposta</span>}
    </button>
  )
}
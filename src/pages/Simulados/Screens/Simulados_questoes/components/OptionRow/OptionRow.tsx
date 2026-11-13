import { ConteudoQuestao } from '../../../../../../features/simulados'
import styles from './OptionRow.module.scss'

export interface OpcaoData {
  letra: string
  // Markdown simples do banco (pode ser só uma imagem)
  texto: string
}

interface OptionRowProps {
  opcao: OpcaoData
  isSelecionada: boolean
  disabled?: boolean
  onSelect: () => void
}

export function OptionRow({ opcao, isSelecionada, disabled, onSelect }: OptionRowProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelecionada}
      disabled={disabled}
      className={`${styles.row} ${isSelecionada ? styles.selecionada : ''}`}
      onClick={onSelect}
    >
      <span className={`${styles.circleLetra} ${isSelecionada ? styles.circleActive : ''}`}>
        {opcao.letra}
      </span>
      <ConteudoQuestao texto={opcao.texto} className={styles.textoOpcao} />
      {isSelecionada && <span className={styles.badgeSuaResposta}>Sua resposta</span>}
    </button>
  )
}

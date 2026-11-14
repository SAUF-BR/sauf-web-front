import { ConteudoQuestao } from '../../../../../../features/simulados'
import styles from './OptionRow.module.scss'

export interface OpcaoData {
  letra: string
  // Markdown simples do banco (pode ser só uma imagem)
  texto: string
}

interface OptionRowProps {
  // Nome do grupo de alternativas (um por questão), para as setas do teclado navegarem entre elas
  grupo: string
  opcao: OpcaoData
  isSelecionada: boolean
  disabled?: boolean
  onSelect: () => void
}

// Radio nativo escondido: o card inteiro é o rótulo, com teclado e leitor de tela de graça
export function OptionRow({ grupo, opcao, isSelecionada, disabled, onSelect }: OptionRowProps) {
  return (
    <label
      className={`${styles.row} ${isSelecionada ? styles.selecionada : ''} ${
        disabled ? styles.desabilitada : ''
      }`}
    >
      <input
        type="radio"
        name={grupo}
        value={opcao.letra}
        checked={isSelecionada}
        disabled={disabled}
        onChange={onSelect}
        className={styles.radio}
      />
      <span className={`${styles.circleLetra} ${isSelecionada ? styles.circleActive : ''}`}>
        {opcao.letra}
      </span>
      <ConteudoQuestao texto={opcao.texto} className={styles.textoOpcao} />
      {isSelecionada && <span className={styles.badgeSuaResposta}>Sua resposta</span>}
    </label>
  )
}

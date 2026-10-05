import type { Alternativa } from '../../../../features/testeVocacional'
import { cn } from '../../../../lib/utils'
import styles from './OpcaoResposta.module.scss'

type OpcaoRespostaProps = {
  nome: string
  alternativa: Alternativa
  selecionada: boolean
  onSelecionar: (alternativaId: string) => void
}

export function OpcaoResposta({ nome, alternativa, selecionada, onSelecionar }: OpcaoRespostaProps) {
  return (
    <label className={cn(styles.opcao, selecionada && styles.selecionada)}>
      <input
        type="radio"
        name={nome}
        value={alternativa.id}
        checked={selecionada}
        onChange={() => onSelecionar(alternativa.id)}
        className={styles.radio}
      />
      <span className={styles.letra} aria-hidden="true">
        {alternativa.letra}
      </span>
      <span className={styles.texto}>{alternativa.texto}</span>
      {selecionada && (
        <span className={styles.status} aria-hidden="true">
          Selecionado
        </span>
      )}
    </label>
  )
}

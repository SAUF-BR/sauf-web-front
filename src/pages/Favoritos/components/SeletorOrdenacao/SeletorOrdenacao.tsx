import { ChevronDown } from 'lucide-react'
import type { Opcao } from '../../conteudo'
import styles from './SeletorOrdenacao.module.scss'

type SeletorOrdenacaoProps<O extends string> = {
  valor: O
  opcoes: Opcao<O>[]
  onMudar: (valor: O) => void
}

export function SeletorOrdenacao<O extends string>({
  valor,
  opcoes,
  onMudar,
}: SeletorOrdenacaoProps<O>) {
  return (
    <label className={styles.ordenar}>
      <span className={styles.ordenarRotulo}>Ordenar:</span>
      <select
        className={styles.select}
        value={valor}
        onChange={(evento) => onMudar(evento.target.value as O)}
      >
        {opcoes.map((opcao) => (
          <option key={opcao.valor} value={opcao.valor}>
            {opcao.rotulo}
          </option>
        ))}
      </select>
      <ChevronDown size="1em" className={styles.seta} aria-hidden="true" />
    </label>
  )
}
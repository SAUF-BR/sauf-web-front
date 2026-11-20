import { ChevronDown } from 'lucide-react'
import { INSTITUICAO_NACIONAL, ROTULO_NACIONAL } from '../../../../features/calendario'
import styles from './FiltroInstituicao.module.scss'

export const TODAS_INSTITUICOES = 'todas'

type FiltroInstituicaoProps = {
  opcoes: { chave: string; total: number }[]
  valor: string
  onMudar: (valor: string) => void
}

function rotulo(chave: string) {
  return chave === INSTITUICAO_NACIONAL ? ROTULO_NACIONAL : chave
}

export function FiltroInstituicao({ opcoes, valor, onMudar }: FiltroInstituicaoProps) {
  return (
    <div className={styles.filtro}>
      <label htmlFor="filtro-instituicao" className={styles.titulo}>
        Instituição
      </label>
      <div className={styles.campo}>
        <select
          id="filtro-instituicao"
          className={styles.select}
          value={valor}
          onChange={(evento) => onMudar(evento.target.value)}
        >
          <option value={TODAS_INSTITUICOES}>Todas</option>
          {opcoes.map(({ chave, total }) => (
            <option key={chave} value={chave}>
              {rotulo(chave)} ({total})
            </option>
          ))}
        </select>
        <ChevronDown size="1em" className={styles.seta} aria-hidden="true" />
      </div>
    </div>
  )
}

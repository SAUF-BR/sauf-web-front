import { useId, useState } from 'react'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import {
  INSTITUICAO_NACIONAL,
  ROTULO_TIPO_EVENTO,
  TIPOS_EVENTO,
  type TipoEvento,
} from '../../../../features/calendario'
import { cn } from '../../../../lib/utils'
import styles from './BarraFiltros.module.scss'

export const TODAS_INSTITUICOES = 'todas'

type BarraFiltrosProps = {
  tipos: Set<TipoEvento>
  contagemTipos: Record<TipoEvento, number> | undefined
  instituicao: string
  opcoesInstituicao: { chave: string; total: number }[]
  totalDoAno: number | undefined
  onAlternarTipo: (tipo: TipoEvento) => void
  onMudarInstituicao: (chave: string) => void
  onLimpar: () => void
}

function rotuloInstituicao(chave: string) {
  return chave === INSTITUICAO_NACIONAL ? 'Nacionais' : chave
}

export function BarraFiltros({
  tipos,
  contagemTipos,
  instituicao,
  opcoesInstituicao,
  totalDoAno,
  onAlternarTipo,
  onMudarInstituicao,
  onLimpar,
}: BarraFiltrosProps) {
  const [aberta, setAberta] = useState(false)
  const idPainel = useId()
  const ativos =
    (tipos.size < TIPOS_EVENTO.length ? 1 : 0) + (instituicao !== TODAS_INSTITUICOES ? 1 : 0)

  return (
    <div className={styles.barra}>
      <div className={styles.topo}>
        <button
          type="button"
          className={styles.alternar}
          aria-expanded={aberta}
          aria-controls={idPainel}
          onClick={() => setAberta((atual) => !atual)}
        >
          <SlidersHorizontal size={16} aria-hidden="true" />
          Filtros
          {ativos > 0 && <span className={styles.selo}>{ativos}</span>}
          <ChevronDown size={16} aria-hidden="true" className={cn(styles.seta, aberta && styles.virada)} />
        </button>

        {ativos > 0 && (
          <button type="button" className={styles.limpar} onClick={onLimpar}>
            Limpar filtros ({ativos})
          </button>
        )}
      </div>

      <div id={idPainel} className={cn(styles.painel, aberta && styles.aberto)}>
        <fieldset className={styles.grupo}>
          <legend className={styles.rotulo}>Tipo</legend>
          <div className={styles.chips}>
            {TIPOS_EVENTO.map((tipo) => (
              <label key={tipo} className={cn(styles.chip, styles[tipo])}>
                <input
                  type="checkbox"
                  className={styles.entrada}
                  checked={tipos.has(tipo)}
                  onChange={() => onAlternarTipo(tipo)}
                />
                <span className={styles.bolinha} aria-hidden="true" />
                {ROTULO_TIPO_EVENTO[tipo]}
                {contagemTipos && <span className={styles.contagem}>{contagemTipos[tipo]}</span>}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.grupo}>
          <legend className={styles.rotulo}>Instituição</legend>
          <div className={styles.chips}>
            <label className={styles.chip}>
              <input
                type="radio"
                name="instituicao"
                className={styles.entrada}
                checked={instituicao === TODAS_INSTITUICOES}
                onChange={() => onMudarInstituicao(TODAS_INSTITUICOES)}
              />
              Todas
              {totalDoAno !== undefined && <span className={styles.contagem}>{totalDoAno}</span>}
            </label>
            {opcoesInstituicao.map(({ chave, total }) => (
              <label key={chave} className={styles.chip}>
                <input
                  type="radio"
                  name="instituicao"
                  className={styles.entrada}
                  checked={instituicao === chave}
                  onChange={() => onMudarInstituicao(chave)}
                />
                {rotuloInstituicao(chave)}
                <span className={styles.contagem}>{total}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  )
}

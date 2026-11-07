
import { useState } from 'react'
import { ROTULO_GRAU, ROTULO_MODALIDADE } from '../../../../features/cursos/utils'
import type { GrauAcademico, Modalidade } from '../../../../features/cursos/types'
import { GrupoFiltro } from '../GrupoFiltro/GrupoFiltro'
import styles from './FiltroCursos.module.scss'
import { SliderFaixa } from '../SliderFaixa/SliderFaixa'

const opcoesArea = [
  { valor: 'saude', rotulo: 'Saúde' },
  { valor: 'tecnologia', rotulo: 'Tecnologia' },
  { valor: 'engenharias', rotulo: 'Engenharias' },
  { valor: 'ciencias-sociais', rotulo: 'Ciências Sociais' },
  { valor: 'letras-e-arte', rotulo: 'Letras e Arte' },
]

const opcoesModalidade = Object.entries(ROTULO_MODALIDADE).map(
  ([valor, rotulo]) => ({
    valor: valor as Modalidade,
    rotulo,
  }),
)

const opcoesGrau = Object.entries(ROTULO_GRAU).map(
  ([valor, rotulo]) => ({
    valor: valor as GrauAcademico,
    rotulo,
  }),
)

const opcoesDuracao = [
  { valor: '8', rotulo: 'Até 8 semestres' },
  { valor: '10', rotulo: 'Até 10 semestres' },
  { valor: '12', rotulo: 'Até 12 semestres' },
]

export function FiltrosCursos() {
  const [notaCorte, setNotaCorte] = useState(0)

  return (
    <aside className={styles.filtros}>
      <form>
        <div className={styles.filtroCabecalho}>
          <h2>Filtro</h2>
          <button type="button" className={styles.botaoLimpar}>Limpar filtro</button>
        </div>

        <GrupoFiltro
          nome="area"
          titulo="Áreas de estudo"
          opcoes={opcoesArea}
        />

        <GrupoFiltro
          nome="modalidade"
          titulo="Modalidade"
          opcoes={opcoesModalidade}
        />

        <GrupoFiltro
          nome="categoria"
          titulo="Categoria"
          opcoes={opcoesGrau}
        />

        <fieldset>
            <legend>Nota de corte SISU</legend>

            <SliderFaixa
                min={0}
                max={720}
                valor={notaCorte}
                onChange={setNotaCorte}
            />
        </fieldset>

        <GrupoFiltro
          nome="duracao"
          titulo="Duração"
          opcoes={opcoesDuracao}
          tipo="radio"
        />

        <button type="submit">Aplicar filtros</button>
      </form>
    </aside>
  )
}

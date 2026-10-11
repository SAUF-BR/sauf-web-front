
import { useState } from 'react'
import { ROTULO_GRAU, ROTULO_MODALIDADE } from '../../../../features/cursos/utils'
import type { GrauAcademico, Modalidade } from '../../../../features/cursos/types'
import { useAreas } from '../../../../features/cursos/hooks'
import { GrupoFiltro } from '../GrupoFiltro/GrupoFiltro'
import styles from './FiltroCursos.module.scss'
import { SliderFaixa } from '../SliderFaixa/SliderFaixa'

import type { FiltrosCursosParams } from '../../../../features/cursos/api'

interface FiltrosCursosProps {
  onAplicar: (filtros: FiltrosCursosParams) => void
}

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

export function FiltrosCursos({ onAplicar }: FiltrosCursosProps) {
  const { data: areas, isLoading } = useAreas()

  const [area, setArea] = useState<string[]>([])
  const [modalidade, setModalidade] = useState<string[]>([])
  const [grau, setGrau] = useState<string[]>([])
  const [duracao, setDuracao] = useState<string[]>([])
  const [notaCorte, setNotaCorte] = useState(720)

  function limparFiltros() {
    setArea([])
    setModalidade([])
    setGrau([])
    setDuracao([])
    setNotaCorte(720)

    onAplicar({})
  }

  function aplicarFiltros(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    onAplicar({
      area: area[0],
      modalidade: modalidade[0],
      grau: grau[0],
      duracaoSemestres: duracao[0] ? Number(duracao[0]) : undefined,
      notaCorteMax: notaCorte < 720 ? notaCorte : undefined,
    })
  }

  return (
    <aside className={styles.filtros}>
      <form onSubmit={aplicarFiltros}>
        <div className={styles.filtroCabecalho}>
          <h2>Filtro</h2>
          <button
            type="button"
            className={styles.botaoLimpar}
            onClick={limparFiltros}
          >
            Limpar filtro
          </button>
        </div>

        <GrupoFiltro
          nome="area"
          titulo="Áreas de estudo"
          opcoes={(areas ?? []).map((item) => ({
            valor: item.id,
            rotulo: item.nome,
          }))}
          valoresSelecionados={area}
          onChange={setArea}
          tipo="radio"
        />

        {isLoading && <p>Carregando áreas...</p>}

        <GrupoFiltro
          nome="modalidade"
          titulo="Modalidade"
          opcoes={opcoesModalidade}
          valoresSelecionados={modalidade}
          onChange={setModalidade}
          tipo="radio"
        />

        <GrupoFiltro
          nome="grau"
          titulo="Categoria"
          opcoes={opcoesGrau}
          valoresSelecionados={grau}
          onChange={setGrau}
          tipo="radio"
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
          valoresSelecionados={duracao}
          onChange={setDuracao}
        />

        <button type="submit">Aplicar filtros</button>
      </form>
    </aside>
  )
}

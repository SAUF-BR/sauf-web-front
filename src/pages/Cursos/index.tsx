import {
  cursosListagemMock,
  universidadesPorCursoMock,
  totalCursosMock,
} from '../../features/cursos/mocks'
import { CursoListCard } from './components/CursoListCard/CursoListCard'
import styles from './index.module.scss'
import { useState } from 'react'
import { Titulo } from '../../components/ui/Titulo/Titulo'
import { ROTAS } from '../../routes/paths'
import { Link } from 'react-router-dom'

export default function Cursos() {

  const [notaCorte, setNotaCorte] = useState(0)

  return (
    <main className={styles.page}>
      <header className={styles.pageHeader}>
        <p className={styles.breadcrumb}>
          <Link to={ROTAS.inicio}>Início</Link>
          {' / '}  
          {' Cursos '}    
      </p>
        <Titulo
          titulo="Cursos"
          subtitulo={`${totalCursosMock} cursos encontrados`}
        />
      </header>

      <aside>
        <form>
          <div className={styles.filtroCabecalho}>
            <h2>Filtro</h2>

            <button type="button">Limpar filtro</button>
          </div>

          <fieldset>
            <legend>Áreas de estudo</legend>

            <label>
              <input type="checkbox" name="area" value="saude" />
              Saúde
            </label>

            <label>
              <input type="checkbox" name="area" value="tecnologia" />
              Tecnologia
            </label>

            <label>
              <input type="checkbox" name="area" value="engenharias" />
              Engenharias
            </label>

            <label>
              <input type="checkbox" name="area" value="ciencias-sociais" />
              Ciências Sociais
            </label>

            <label>
              <input type="checkbox" name="area" value="letras-e-arte" />
              Letras e Arte
            </label>
          </fieldset>

          <fieldset>
            <legend>Modalidade</legend>

            <label>
              <input type="checkbox" name="modalidade" value="presencial" />
              Presencial
            </label>

            <label>
              <input type="checkbox" name="modalidade" value="ead" />
              EAD
            </label>

            <label>
              <input
                type="checkbox"
                name="modalidade"
                value="semipresencial"
              />
              Semipresencial
            </label>
          </fieldset>

          <fieldset>
            <legend>Categoria</legend>

            <label>
              <input type="checkbox" name="categoria" value="bacharelado" />
              Bacharelado
            </label>

            <label>
              <input type="checkbox" name="categoria" value="licenciatura" />
              Licenciatura
            </label>

            <label>
              <input type="checkbox" name="categoria" value="tecnologo" />
              Tecnólogo
            </label>
          </fieldset>

          <fieldset>
            <legend>Nota de corte SISU</legend>

            <input
              type="range"
              name="notaCorte"
              min="0"
              max="720"
              value={notaCorte}
              onChange={(event) => setNotaCorte(Number(event.target.value))}
              style={{
                background: `linear-gradient(to right, #204B57 ${
                  (notaCorte / 720) * 100
                }%, #d9dedf ${(notaCorte / 720) * 100}%)`,
              }}
              />

            <div className={styles.sliderValores}>
              <span>{notaCorte}</span>
              <span>até 720</span>
            </div>
          </fieldset>

          <fieldset>
            <legend>Duração</legend>

            <label>
              <input
                type="radio"
                name="duracao"
                value="8"
                defaultChecked
              />
              Até 8 semestres
            </label>

            <label>
              <input type="radio" name="duracao" value="10" />
              Até 10 semestres
            </label>

            <label>
              <input type="radio" name="duracao" value="12" />
              Até 12 semestres
            </label>
          </fieldset>

          <button type="submit">Aplicar filtros</button>
        </form>
      </aside>

      <section className={styles.grid}>
        {cursosListagemMock.map((curso) => (
          <CursoListCard
            key={curso.id}
            curso={curso}
            universidadesNaRegiao={
              universidadesPorCursoMock[curso.id] ?? 0
            }
          />
        ))}
      </section>
    </main>
  )
}
import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import type { Curso } from '../../../../features/cursos/types'
import {
  cursosListagemMock,
  detalhesCursoMock,
  universidadesPorCursoMock,
} from '../../../../features/cursos/mocks'
import { formatarDuracao } from '../../../../features/cursos/utils'
import { CursoListCard } from '../../../Cursos/components/CursoListCard/CursoListCard'

import styles from './CursosParecidos.module.scss'

type CursosParecidosProps = {
  curso: Curso
}

export function CursosParecidos({ curso }: CursosParecidosProps) {
  const cursosParecidos = useMemo(
    () =>
      cursosListagemMock.filter(
        (outroCurso) =>
          outroCurso.id !== curso.id &&
          outroCurso.area === curso.area,
      ),
    [curso.id, curso.area],
  )

  const cursosComparacao = [curso, ...cursosParecidos]

  const [indiceAtual, setIndiceAtual] = useState(0)
  const [passo, setPasso] = useState(0)

  const carrosselRef = useRef<HTMLDivElement>(null)
  const listaRef = useRef<HTMLDivElement>(null)

  const quantidadeVisivel = 3
  const maxIndice = Math.max(
    0,
    cursosParecidos.length - quantidadeVisivel,
  )

  function obterAreaPrincipal(idCurso: string) {
    return detalhesCursoMock[idCurso]?.areasAtuacao[0] ?? 'Não informado'
  }

  useEffect(() => {
    const carrossel = carrosselRef.current
    const lista = listaRef.current

    if (!carrossel || !lista) return

    const atualizarPasso = () => {
      const primeiroCard = lista.querySelector<HTMLElement>(
        '[data-card-curso]',
      )

      if (!primeiroCard) return

      const estilosLista = window.getComputedStyle(lista)
      const gap = Number.parseFloat(estilosLista.gap) || 0

      setPasso(primeiroCard.getBoundingClientRect().width + gap)
    }

    atualizarPasso()

    const observador = new ResizeObserver(atualizarPasso)
    observador.observe(carrossel)

    return () => observador.disconnect()
  }, [cursosParecidos.length])

  useEffect(() => {
    setIndiceAtual(0)
  }, [curso.id])

  useEffect(() => {
    if (maxIndice === 0 || passo === 0) return

    const intervalo = window.setInterval(() => {
      setIndiceAtual((indice) =>
        indice >= maxIndice ? 0 : indice + 1,
      )
    }, 4000)

    return () => window.clearInterval(intervalo)
  }, [maxIndice, passo])

  function voltarCard() {
    setIndiceAtual((indice) =>
      indice <= 0 ? maxIndice : indice - 1,
    )
  }

  function avancarCard() {
    setIndiceAtual((indice) =>
      indice >= maxIndice ? 0 : indice + 1,
    )
  }

  return (
    <section className={styles.container}>
      <div className={styles.cabecalho}>
        <div>
          <h2>Cursos parecidos com {curso.nome}</h2>
          <p>
            Compare cursos da mesma área de conhecimento e veja as principais
            diferenças entre eles.
          </p>
        </div>
      </div>

      {cursosParecidos.length > 0 ? (
        <>
          <div className={styles.carrosselWrapper}>
            <button
              type="button"
              className={`${styles.seta} ${styles.setaEsquerda}`}
              onClick={voltarCard}
              aria-label="Ver cursos anteriores"
              disabled={maxIndice === 0}
            >
              <ChevronLeft size={20} />
            </button>

            <div className={styles.carrossel} ref={carrosselRef}>
              <div
                className={styles.listaCards}
                ref={listaRef}
                style={{
                  transform: `translateX(-${indiceAtual * passo}px)`,
                }}
              >
                {cursosParecidos.map((cursoParecido) => (
                  <article
                    className={styles.cardItem}
                    data-card-curso
                    key={cursoParecido.id}
                  >
                    <CursoListCard
                      curso={cursoParecido}
                      universidadesNaRegiao={
                        universidadesPorCursoMock[cursoParecido.id] ?? 0
                      }
                    />
                  </article>
                ))}
              </div>
            </div>

            <button
              type="button"
              className={`${styles.seta} ${styles.setaDireita}`}
              onClick={avancarCard}
              aria-label="Ver próximos cursos"
              disabled={maxIndice === 0}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <section className={styles.comparacao}>
            <h2>O que muda entre eles</h2>

            <div className={styles.tabelaContainer}>
              <table className={styles.tabela}>
                <thead>
                  <tr>
                    <th>Curso</th>
                    <th>Duração</th>
                    <th>Corte SISU</th>
                    <th>Atuação principal</th>
                  </tr>
                </thead>

                <tbody>
                  {cursosComparacao.map((cursoComparado) => (
                    <tr key={cursoComparado.id}>
                      <td>
                        <span className={styles.nomeCurso}>
                          {cursoComparado.nome}
                        </span>
                        {cursoComparado.id === curso.id && (
                          <span className={styles.atual}>Atual</span>
                        )}
                      </td>
                      <td>
                        {formatarDuracao(cursoComparado.duracaoSemestres)}
                      </td>
                      <td>
                        {cursoComparado.notaCorteSisu?.toLocaleString(
                          'pt-BR',
                          {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
                          },
                        ) ?? '—'}
                      </td>
                      <td>{obterAreaPrincipal(cursoComparado.id)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : (
        <p className={styles.vazio}>
          Ainda não há cursos parecidos disponíveis para comparação.
        </p>
      )}
    </section>
  )
}
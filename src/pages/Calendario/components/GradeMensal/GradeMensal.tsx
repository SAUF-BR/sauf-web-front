import type { CSSProperties, MouseEvent } from 'react'
import {
  ROTULO_TIPO_EVENTO,
  formatarPeriodo,
  montarSemanas,
  type EventoCalendario,
  type FaixaSemana,
} from '../../../../features/calendario'
import { cn, formatarDiaPorExtenso, obterDiasDaSemana, type AnoMes } from '../../../../lib/utils'
import styles from './GradeMensal.module.scss'

const DIAS_DA_SEMANA = obterDiasDaSemana()

// Acima disso a coluna mostra "+N" e o resto aparece no modal do dia
const MAXIMO_RAIAS = 3

type GradeMensalProps = {
  anoMes: AnoMes
  eventos: EventoCalendario[]
  eventosPorDia: Map<string, EventoCalendario[]>
  hojeIso: string
  carregando: boolean
  onAbrirDia: (dataIso: string) => void
}

function rotuloDoDia(dataIso: string, eventos: EventoCalendario[] = []) {
  const dia = formatarDiaPorExtenso(dataIso)
  if (eventos.length === 0) return `${dia}, sem eventos`
  const quantidade = eventos.length === 1 ? '1 evento' : `${eventos.length} eventos`
  return `${dia}, ${quantidade}: ${eventos.map((e) => e.titulo).join('; ')}`
}

function estiloDaFaixa(faixa: FaixaSemana): CSSProperties {
  return { gridColumn: `${faixa.inicio + 1} / ${faixa.fim + 2}`, gridRow: faixa.raia + 2 }
}

export function GradeMensal({
  anoMes,
  eventos,
  eventosPorDia,
  hojeIso,
  carregando,
  onAbrirDia,
}: GradeMensalProps) {
  const semanas = montarSemanas(eventos, anoMes, MAXIMO_RAIAS)

  // A barra fica por cima das células: o clique nela abre o dia que está sob o ponteiro.
  // Pelo teclado, cada dia já é um botão com os títulos no rótulo.
  function abrirDiaDaFaixa(evento: MouseEvent<HTMLDivElement>, faixa: FaixaSemana, datas: string[]) {
    const caixa = evento.currentTarget.getBoundingClientRect()
    const colunas = faixa.fim - faixa.inicio + 1
    const deslocamento = Math.floor(((evento.clientX - caixa.left) / caixa.width) * colunas)
    onAbrirDia(datas[faixa.inicio + Math.min(Math.max(deslocamento, 0), colunas - 1)])
  }

  return (
    <div className={styles.grade} aria-busy={carregando}>
      <div className={styles.diasDaSemana} aria-hidden="true">
        {DIAS_DA_SEMANA.map((dia) => (
          <span key={dia}>{dia}</span>
        ))}
      </div>

      <div className={styles.semanas}>
        {semanas.map(({ dias, faixas, ocultos }) => {
          const datas = dias.map((d) => d.dataIso)

          return (
            <div key={datas[0]} className={styles.semana}>
              {dias.map(({ dataIso, dia, doMesAtual }, coluna) => {
                const estilo = { gridColumn: coluna + 1 }

                if (!doMesAtual) {
                  return (
                    <div key={dataIso} className={cn(styles.dia, styles.foraDoMes)} style={estilo}>
                      <span className={styles.numero} aria-hidden="true">
                        {dia}
                      </span>
                    </div>
                  )
                }

                const hoje = dataIso === hojeIso
                return (
                  <button
                    key={dataIso}
                    type="button"
                    className={cn(styles.dia, hoje && styles.hoje)}
                    style={estilo}
                    aria-label={`${hoje ? 'Hoje, ' : ''}${rotuloDoDia(dataIso, eventosPorDia.get(dataIso))}`}
                    aria-current={hoje ? 'date' : undefined}
                    onClick={() => onAbrirDia(dataIso)}
                  >
                    <time dateTime={dataIso} className={styles.numero}>
                      {dia}
                    </time>
                  </button>
                )
              })}

              {faixas.map((faixa) => {
                const { evento } = faixa
                const umDia = faixa.inicio === faixa.fim && faixa.comecaNaSemana && faixa.terminaNaSemana

                return (
                  <div
                    key={evento.id}
                    aria-hidden="true"
                    title={`${evento.titulo}\n${ROTULO_TIPO_EVENTO[evento.tipo]}: ${formatarPeriodo(evento)}`}
                    className={cn(
                      styles.faixa,
                      styles[evento.tipo],
                      umDia ? styles.pilula : styles.periodo,
                      faixa.comecaNaSemana && styles.comeca,
                      faixa.terminaNaSemana && styles.termina,
                    )}
                    style={estiloDaFaixa(faixa)}
                    onClick={(e) => abrirDiaDaFaixa(e, faixa, datas)}
                  >
                    <span className={styles.texto}>{evento.titulo}</span>
                  </div>
                )
              })}

              {ocultos.map(
                (quantidade, coluna) =>
                  quantidade > 0 && (
                    <button
                      key={datas[coluna]}
                      type="button"
                      tabIndex={-1}
                      aria-hidden="true"
                      className={styles.mais}
                      style={{ gridColumn: coluna + 1, gridRow: MAXIMO_RAIAS + 2 }}
                      onClick={() => onAbrirDia(datas[coluna])}
                    >
                      +{quantidade}
                    </button>
                  ),
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

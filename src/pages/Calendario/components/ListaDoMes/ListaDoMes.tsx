import {
  formatarPeriodo,
  formatarDiaSemanaExtenso,
  type EventoCalendario,
} from '../../../../features/calendario'
import { cn, formatarAnoMesIso, formatarMesAno, type AnoMes } from '../../../../lib/utils'
import styles from './ListaDoMes.module.scss'

type ListaDoMesProps = {
  anoMes: AnoMes
  // Já filtrados e em ordem de início (eventosDoMes)
  eventos: EventoCalendario[]
  mensagemVazia: string
  onAbrirDia: (dataIso: string) => void
}

type Grupo = { chave: string; rotulo: string; dia: string; eventos: EventoCalendario[] }

// Agrupa pelo dia em que começa; o que começou no mês anterior abre a lista como "em andamento"
function agrupar(eventos: EventoCalendario[], anoMes: AnoMes) {
  const primeiro = `${formatarAnoMesIso(anoMes)}-01`
  const grupos: Grupo[] = []

  for (const evento of eventos) {
    const antes = evento.inicio < primeiro
    const chave = antes ? 'andamento' : evento.inicio
    let grupo = grupos.find((g) => g.chave === chave)
    if (!grupo) {
      grupo = {
        chave,
        rotulo: antes ? 'Já em andamento' : formatarDiaSemanaExtenso(evento.inicio),
        dia: antes ? primeiro : evento.inicio,
        eventos: [],
      }
      grupos.push(grupo)
    }
    grupo.eventos.push(evento)
  }

  return grupos
}

// "UTFPR" ou "UFSM, 2 de outubro a 16 de novembro de 2026" (o período só quando dura mais de um dia)
function detalhe(evento: EventoCalendario) {
  const quem = evento.instituicao?.sigla ?? evento.instituicao?.nome ?? 'Nacional'
  const periodo = evento.fim && evento.fim !== evento.inicio ? formatarPeriodo(evento) : null
  return periodo ? `${quem}, ${periodo}` : quem
}

export function ListaDoMes({ anoMes, eventos, mensagemVazia, onAbrirDia }: ListaDoMesProps) {
  const grupos = agrupar(eventos, anoMes)

  return (
    <section className={styles.lista} aria-labelledby="lista-do-mes">
      <h2 id="lista-do-mes" className={styles.titulo}>
        Em {formatarMesAno(anoMes).replace(/ de \d+$/, '').toLowerCase()}
        <span className={styles.total}>
          {eventos.length === 1 ? '1 data' : `${eventos.length} datas`}
        </span>
      </h2>

      {grupos.length === 0 ? (
        <p className={styles.vazio}>{mensagemVazia}</p>
      ) : (
        <ol className={styles.grupos}>
          {grupos.map((grupo) => (
            <li key={grupo.chave} className={styles.grupo}>
              <h3 className={styles.dia}>{grupo.rotulo}</h3>
              <ul className={styles.itens}>
                {grupo.eventos.map((evento) => (
                  <li key={evento.id}>
                    <button
                      type="button"
                      className={cn(styles.item, styles[evento.tipo])}
                      onClick={() => onAbrirDia(grupo.dia)}
                    >
                      <span className={styles.bolinha} aria-hidden="true" />
                      <span className={styles.nome}>{evento.titulo}</span>
                      <span className={styles.periodo}>{detalhe(evento)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}

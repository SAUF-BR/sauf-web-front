import { Card } from '../../../../components/ui/Card/Card'
import { Tag } from '../../../../components/ui/Tag/Tag'
import type { EventoCalendario } from '../../../../features/calendario'
import {
  cn,
  formatarDiaPorExtenso,
  montarGradeDoMes,
  obterDiasDaSemana,
  type AnoMes,
} from '../../../../lib/utils'
import { ChipEvento } from '../ChipEvento/ChipEvento'
import styles from './GradeMensal.module.scss'

const DIAS_DA_SEMANA = obterDiasDaSemana()

// Acima disso a célula mostra "+N" e o resto fica na agenda abaixo da grade
const MAXIMO_POR_DIA = 3

// O título de um período aparece no primeiro dia dele em cada linha da grade
// (início, dia 1 do mês ou domingo); nos outros dias fica só a barra colorida
function continuaDoDiaAnterior(evento: EventoCalendario, dataIso: string, dia: number) {
  const domingo = new Date(`${dataIso}T00:00:00Z`).getUTCDay() === 0
  return evento.inicio < dataIso && dia !== 1 && !domingo
}

type GradeMensalProps = {
  anoMes: AnoMes
  eventosPorDia: Map<string, EventoCalendario[]>
  hojeIso: string
  carregando: boolean
  compacto: boolean
  diaSelecionado: string | null
  onSelecionarDia: (dataIso: string) => void
}

export function GradeMensal({
  anoMes,
  eventosPorDia,
  hojeIso,
  carregando,
  compacto,
  diaSelecionado,
  onSelecionarDia,
}: GradeMensalProps) {
  return (
    <div className={styles.grade} aria-busy={carregando}>
      <ul className={styles.diasDaSemana} aria-hidden="true">
        {DIAS_DA_SEMANA.map((dia) => (
          <li key={dia}>{dia}</li>
        ))}
      </ul>

      <ol className={styles.dias}>
        {montarGradeDoMes(anoMes).map(({ dataIso, dia, doMesAtual }) => {
          const hoje = doMesAtual && dataIso === hojeIso
          const eventos = doMesAtual ? (eventosPorDia.get(dataIso) ?? []) : []
          const porExtenso = formatarDiaPorExtenso(dataIso)

          return (
            <li key={dataIso} aria-hidden={!doMesAtual || undefined}>
              <Card
                className={cn(
                  styles.celula,
                  !doMesAtual && styles.foraDoMes,
                  hoje && styles.hoje,
                  diaSelecionado === dataIso && styles.selecionado,
                )}
              >
                <div className={styles.topo}>
                  <time dateTime={dataIso} className={styles.numero}>
                    <span aria-hidden="true">{dia}</span>
                    <span className={styles.oculto}>{porExtenso}</span>
                  </time>
                  {hoje && (
                    <span className={styles.seloHoje}>
                      <Tag variant="destaque">Hoje</Tag>
                    </span>
                  )}
                </div>

                {eventos.length > 0 && (
                  <ul className={compacto ? styles.marcadores : styles.eventos}>
                    {(compacto ? eventos : eventos.slice(0, MAXIMO_POR_DIA)).map((evento) => (
                      <ChipEvento
                        key={evento.id}
                        evento={evento}
                        compacto={compacto}
                        continuacao={continuaDoDiaAnterior(evento, dataIso, dia)}
                      />
                    ))}
                  </ul>
                )}

                {!compacto && eventos.length > MAXIMO_POR_DIA && (
                  <span className={styles.mais} aria-hidden="true">
                    +{eventos.length - MAXIMO_POR_DIA}
                  </span>
                )}

                {eventos.length > 0 && (
                  <button
                    type="button"
                    className={styles.botaoDia}
                    aria-pressed={diaSelecionado === dataIso}
                    aria-label={`Ver ${eventos.length === 1 ? '1 evento' : `${eventos.length} eventos`} de ${porExtenso}`}
                    onClick={() => onSelecionarDia(dataIso)}
                  />
                )}
              </Card>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

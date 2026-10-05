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
                    {eventos.map((evento) => (
                      <ChipEvento key={evento.id} evento={evento} compacto={compacto} />
                    ))}
                  </ul>
                )}

                {compacto && eventos.length > 0 && (
                  <button
                    type="button"
                    className={styles.botaoDia}
                    aria-pressed={diaSelecionado === dataIso}
                    aria-label={`Ver eventos de ${porExtenso}`}
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

import { Suspense } from 'react'
import type { DadosAcompanhamento, Periodo } from '../../../../../features/simulados'
import { Esqueleto } from '../../../compartilhados/Esqueleto/Esqueleto'
import { formatarDias } from '../../../compartilhados/conteudo'
import { descreverBloco, rotuloBloco, Subtitulo_constancia } from '../conteudo'
import { GraficoConstancia } from '../graficos'
import styles from './ConstanciaCard.module.scss'

interface ConstanciaCardProps {
  constancia: DadosAcompanhamento['constancia']
  periodo: Periodo
}

export function ConstanciaCard({ constancia, periodo }: ConstanciaCardProps) {
  const blocos = constancia.semanas.map((bloco, i) => ({ ...bloco, rotulo: rotuloBloco(bloco, i, periodo) }))

  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.title}>Constância de estudo</h3>
        <p className={styles.subtitle}>{Subtitulo_constancia[periodo]}</p>
      </div>

      <div className={styles.chartArea} aria-hidden="true">
        <Suspense fallback={<Esqueleto altura="6rem" />}>
          <GraficoConstancia blocos={blocos} />
        </Suspense>
      </div>

      <table className={styles.somenteLeitor}>
        <caption>Dias com estudo</caption>
        <tbody>
          {constancia.semanas.map((bloco) => (
            <tr key={bloco.inicio}>
              <th scope="row">{descreverBloco(bloco, periodo)}</th>
              <td>
                {bloco.diasAtivos} de {formatarDias(bloco.dias)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.footer}>
        <strong>{constancia.diasAtivos}</strong>
        <span>
          de {formatarDias(constancia.diasNaJanela)} com estudo
          {constancia.ofensiva > 0 && ` · ofensiva de ${formatarDias(constancia.ofensiva)}`}
        </span>
      </div>
    </div>
  )
}

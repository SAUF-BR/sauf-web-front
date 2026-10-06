import { cn } from '../../../../../../lib/utils'
import { Painel } from '../../../../compartilhados/Painel/Painel'
import { formatarHoras } from '../../../../compartilhados/conteudo'
import type { HorasSemana } from '../../conteudo'
import styles from './HorasPorSemana.module.scss'

type HorasPorSemanaProps = {
  semanas: HorasSemana[]
}

export function HorasPorSemana({ semanas }: HorasPorSemanaProps) {
  const maior = Math.max(...semanas.map((semana) => semana.segundos), 0)
  const ordenadas = [...semanas].sort((a, b) => a.segundos - b.segundos)

  return (
    <Painel titulo="Horas por semana" subtitulo={`Últimas ${semanas.length} semanas`}>
      <ol className={styles.grafico}>
        {semanas.map((semana) => {
          const altura = maior > 0 ? Math.max((semana.segundos / maior) * 100, 4) : 4
          const nivel = Math.ceil(((ordenadas.indexOf(semana) + 1) / semanas.length) * 4)

          return (
            <li key={semana.rotulo} className={styles.coluna}>
              <span className={styles.valor}>{formatarHoras(semana.segundos)}</span>
              <span
                className={cn(styles.barra, styles[`nivel${nivel}`])}
                style={{ height: `${altura}%` }}
                aria-hidden="true"
              />
              <span className={styles.rotulo}>{semana.rotulo}</span>
            </li>
          )
        })}
      </ol>
    </Painel>
  )
}
import { Fragment, useEffect, useRef, type CSSProperties } from 'react'
import { cn } from '../../../../../../lib/utils'
import { Painel } from '../../../../compartilhados/Painel/Painel'
import { formatarDias, formatarHoras, type DiaEstudo } from '../../../../compartilhados/conteudo'
import { montarSemanas, nivelDoDia, resumirQuadro, type NivelDia } from '../../conteudo'
import styles from './QuadroOfensivas.module.scss'

type QuadroOfensivasProps = {
  dias: DiaEstudo[]
}

const Rotulos_linhas = ['seg', '', 'qua', '', 'sex', '', 'dom']
const Niveis: NivelDia[] = [0, 1, 2, 3, 4]

const Formato_data = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
})

function descreverDia(dia: DiaEstudo) {
  const data = Formato_data.format(new Date(dia.data))
  return dia.segundos > 0 ? `${data}: ${formatarHoras(dia.segundos)}` : `${data}: sem estudo`
}

export function QuadroOfensivas({ dias }: QuadroOfensivasProps) {
  const semanas = montarSemanas(dias)
  const resumo = resumirQuadro(dias)
  const rolagemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rolagem = rolagemRef.current
    if (rolagem) rolagem.scrollLeft = rolagem.scrollWidth
  }, [])

  return (
    <Painel
      titulo="Quadro de ofensivas"
      subtitulo="Cada quadrado é um dia. A cor fica mais forte conforme o tempo estudado."
      acoes={
        <div className={styles.legenda} aria-hidden="true">
          menos
          {Niveis.map((nivel) => (
            <span key={nivel} className={cn(styles.celula, styles[`nivel${nivel}`])} />
          ))}
          mais
        </div>
      }
    >
      <div ref={rolagemRef} className={styles.rolagem}>
        <div
          role="img"
          aria-label={`Quadro de dias estudados nos últimos 12 meses: ${formatarDias(resumo.diasComEstudo)} com estudo.`}
          className={styles.grade}
          style={{ '--semanas': semanas.length } as CSSProperties}
        >
          <span />
          {semanas.map((semana, coluna) => (
            <span key={coluna} className={styles.mes}>
              {semana.rotuloMes}
            </span>
          ))}

          {Rotulos_linhas.map((rotulo, linha) => (
            <Fragment key={linha}>
              <span className={styles.diaSemana}>{rotulo}</span>
              {semanas.map((semana, coluna) => {
                const dia = semana.dias[linha]

                return dia ? (
                  <span
                    key={coluna}
                    title={descreverDia(dia)}
                    className={cn(styles.celula, styles[`nivel${nivelDoDia(dia.segundos)}`])}
                  />
                ) : (
                  <span key={coluna} />
                )
              })}
            </Fragment>
          ))}
        </div>
      </div>

      <ul className={styles.destaques}>
        <li>
          <span className={cn(styles.ponto, styles.pontoVerde)} aria-hidden="true" />
          <strong>{formatarDias(resumo.diasComEstudo)}</strong> com estudo nos últimos 12 meses
        </li>
        {resumo.melhorSequencia && (
          <li>
            <span className={cn(styles.ponto, styles.pontoAmarelo)} aria-hidden="true" />
            Melhor sequência: <strong>{formatarDias(resumo.melhorSequencia.dias)}</strong> em{' '}
            {resumo.melhorSequencia.mes}
          </li>
        )}
        {resumo.diaMaisProdutivo && (
          <li>
            <span className={styles.ponto} aria-hidden="true" />
            Dia mais produtivo: <strong>{resumo.diaMaisProdutivo}</strong>
          </li>
        )}
      </ul>
    </Painel>
  )
}
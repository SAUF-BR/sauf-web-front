import { Suspense } from 'react'
import type { PontoEvolucao } from '../../../../../features/simulados'
import { Esqueleto } from '../../../compartilhados/Esqueleto/Esqueleto'
import { formatarPorcentagem } from '../../../compartilhados/conteudo'
import { comentarioEvolucao, rotuloDataHora } from '../conteudo'
import { GraficoEvolucao } from '../graficos'
import styles from './EvolucaoAproveitamento.module.scss'

interface EvolucaoAproveitamentoProps {
  simulados: PontoEvolucao[]
  mediaPlataforma: number | null
}

export function EvolucaoAproveitamento({ simulados, mediaPlataforma }: EvolucaoAproveitamentoProps) {
  const pontos = simulados.map((ponto) => ({ ...ponto, rotulo: rotuloDataHora(ponto.finalizadoEm) }))
  const comentario = comentarioEvolucao(simulados, mediaPlataforma)

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Evolução do aproveitamento</h3>
          <p className={styles.subtitle}>
            Percentual de acertos por simulado, do mais antigo ao mais recente
          </p>
        </div>
        <div className={styles.legenda} aria-hidden="true">
          <span><span className={styles.dotVoce} /> Você</span>
          {mediaPlataforma !== null && (
            <span><span className={styles.linhaMedia} /> Média da plataforma</span>
          )}
        </div>
      </div>

      {pontos.length === 0 ? (
        <p className={styles.vazio}>Nenhum simulado concluído no período.</p>
      ) : (
        <>
          <div className={styles.chartArea} aria-hidden="true">
            <Suspense fallback={<Esqueleto altura="12.5rem" />}>
              <GraficoEvolucao pontos={pontos} mediaPlataforma={mediaPlataforma} />
            </Suspense>
          </div>

          <table className={styles.somenteLeitor}>
            <caption>Aproveitamento por simulado</caption>
            <thead>
              <tr>
                <th scope="col">Concluído em</th>
                <th scope="col">Acertos</th>
              </tr>
            </thead>
            <tbody>
              {pontos.map((ponto) => (
                <tr key={ponto.id}>
                  <td>{ponto.rotulo}</td>
                  <td>{formatarPorcentagem(ponto.aproveitamento)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {comentario && (
        <div className={styles.footerNote}>
          <span className={styles.bulletNote} aria-hidden="true">●</span> {comentario}
        </div>
      )}
    </div>
  )
}

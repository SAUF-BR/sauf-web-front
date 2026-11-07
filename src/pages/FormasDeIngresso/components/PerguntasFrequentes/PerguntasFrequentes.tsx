type PerguntaFrequente = {
  pergunta: string
  resposta: string
}

type PerguntasFrequentesProps = {
  perguntas: PerguntaFrequente[]
}

import styles from '../FormasIngressoConteudo/FormasIngressoConteudo.module.scss'

export function PerguntasFrequentes({
  perguntas,
}: PerguntasFrequentesProps) {
  return (
    <section className={styles.secao} id="perguntas-frequentes">
      <h2>Perguntas frequentes</h2>

      <div className={styles.perguntas}>
        {perguntas.map((item) => (
          <details key={item.pergunta}>
            <summary>{item.pergunta}</summary>
            <p>{item.resposta}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
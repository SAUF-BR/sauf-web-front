import { AreaCarregando, Esqueleto } from '../../../../compartilhados/Esqueleto/Esqueleto'
import pagina from '../../index.module.scss'
import styles from './EsqueletoQuestao.module.scss'

const ALTERNATIVAS = 5

export function EsqueletoQuestao() {
  return (
    <main className={pagina.pageWrapper}>
      <AreaCarregando rotulo="Carregando o simulado…">
        <div className={styles.faixa} />

        <div className={pagina.headerBar}>
          <div className={pagina.headerContainer}>
            <Esqueleto largura="min(20rem, 70%)" altura="0.875rem" />
            <div className={styles.numeros}>
              {Array.from({ length: 10 }, (_, i) => (
                <Esqueleto key={i} largura="2.25rem" altura="2.25rem" />
              ))}
            </div>
          </div>
        </div>

        <div className={pagina.questionSection}>
          <div className={pagina.questionContainer}>
            <Esqueleto largura="9rem" altura="1.5rem" redondo />
            <Esqueleto altura="0.9375rem" />
            <Esqueleto altura="0.9375rem" />
            <Esqueleto largura="75%" altura="0.9375rem" />
            <div className={styles.alternativas}>
              {Array.from({ length: ALTERNATIVAS }, (_, i) => (
                <Esqueleto key={i} altura="3.5rem" />
              ))}
            </div>
          </div>
        </div>
      </AreaCarregando>
    </main>
  )
}

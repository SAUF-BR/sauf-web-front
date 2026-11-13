import type { StatusQuestao } from '../QuestaoBar/QuestaoBar'
import styles from './QuestaoCard.module.scss'

export interface OpcaoResposta {
  letra: string
  texto: string
  subtexto?: string
}

export interface QuestaoData {
  numero: number
  status: StatusQuestao
  categoria: string
  tempo: string
  enunciado: string
  respostaUsuario?: OpcaoResposta
  respostaCorreta: OpcaoResposta
}

interface QuestaoCardProps {
  questao: QuestaoData
}

export function QuestaoCard({ questao }: QuestaoCardProps) {
  const { numero, status, categoria, tempo, enunciado, respostaUsuario, respostaCorreta } = questao

  return (
    <div className={`${styles.card} ${styles[status]}`}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h3 className={styles.numero}>Questão {numero}</h3>
          
          <span className={`${styles.statusTag} ${styles[`tag_${status}`]}`}>
            {status === 'acerto' && 'Acertou'}
            {status === 'erro' && 'Errou'}
            {status === 'em_branco' && 'Em branco'}
          </span>

          <span className={styles.categoriaTag}>{categoria}</span>
        </div>

        <span className={styles.tempo}>{tempo}</span>
      </div>

      <p className={styles.enunciado}>{enunciado}</p>

      <div className={styles.respostasRow}>
        {status === 'acerto' && (
          <div className={`${styles.boxResposta} ${styles.boxCorreta}`}>
            <div className={styles.checkIcon}>✓</div>
            <div>
              <strong>{respostaCorreta.letra} · {respostaCorreta.texto}</strong>
              <span className={styles.subtexto}>Sua resposta · correta</span>
            </div>
          </div>
        )}

        {status === 'erro' && (
          <>
            {respostaUsuario && (
              <div className={`${styles.boxResposta} ${styles.boxIncorreta}`}>
                <div className={styles.erroIcon}>✕</div>
                <div>
                  <strong>{respostaUsuario.letra} · {respostaUsuario.texto}</strong>
                  <span className={styles.subtexto}>Sua resposta · incorreta</span>
                </div>
              </div>
            )}

            <div className={`${styles.boxResposta} ${styles.boxCorreta}`}>
              <div className={styles.checkIcon}>✓</div>
              <div>
                <strong>{respostaCorreta.letra} · {respostaCorreta.texto}</strong>
                <span className={styles.subtexto}>Resposta correta</span>
              </div>
            </div>
          </>
        )}

        {status === 'em_branco' && (
          <>
            <div className={`${styles.boxResposta} ${styles.boxEmBranco}`}>
              <div className={styles.circleIcon} />
              <div>
                <strong className={styles.textGray}>Você não respondeu</strong>
                <span className={styles.subtexto}>Questões em branco contam como erro na média</span>
              </div>
            </div>

            <div className={`${styles.boxResposta} ${styles.boxCorreta}`}>
              <div className={styles.checkIcon}>✓</div>
              <div>
                <strong>{respostaCorreta.letra} · {respostaCorreta.texto}</strong>
                <span className={styles.subtexto}>
                  {respostaCorreta.subtexto || 'Resposta correta'}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
import { useState } from 'react'
import {
  ConteudoQuestao,
  etiquetaQuestao,
  type QuestaoRevisao,
} from '../../../../../../features/simulados'
import { formatarTempoQuestao } from '../../../../../../lib/utils/formatadores'
import styles from './QuestaoCard.module.scss'

interface QuestaoCardProps {
  questao: QuestaoRevisao
  isAtiva?: boolean
}

// Texto-base maior que isso começa recolhido
const LIMITE_TEXTO_BASE = 320

const ROTULO_STATUS = {
  acerto: 'Acertou',
  erro: 'Errou',
  em_branco: 'Em branco',
} as const

export function QuestaoCard({ questao, isAtiva = false }: QuestaoCardProps) {
  const [textoAberto, setTextoAberto] = useState(false)
  const {
    ordem,
    area,
    ano,
    textoBase,
    comando,
    alternativas,
    resultado,
    tempoEsgotado,
    alternativaMarcada,
    alternativaCorreta,
    tempoSegundos,
  } = questao

  const marcada = alternativas.find((alt) => alt.rotulo === alternativaMarcada)
  const correta = alternativas.find((alt) => alt.rotulo === alternativaCorreta)
  const textoLongo = textoBase !== null && textoBase.length > LIMITE_TEXTO_BASE

  return (
    <div
      id={`questao-${ordem}`}
      className={`${styles.card} ${styles[resultado]} ${isAtiva ? styles.ativa : ''}`}
    >
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h3 className={styles.numero}>Questão {ordem}</h3>

          <span className={`${styles.statusTag} ${styles[`tag_${resultado}`]}`}>
            {tempoEsgotado ? 'Tempo esgotado' : ROTULO_STATUS[resultado]}
          </span>

          <span className={styles.categoriaTag}>{etiquetaQuestao(area, ano)}</span>
        </div>

        <span className={styles.tempo}>
          {tempoEsgotado ? 'tempo esgotado' : formatarTempoQuestao(tempoSegundos)}
        </span>
      </div>

      {textoBase && (
        <div className={styles.textoBaseBloco}>
          <ConteudoQuestao
            texto={textoBase}
            className={textoLongo && !textoAberto ? styles.textoRecolhido : undefined}
          />
          {textoLongo && (
            <button
              type="button"
              className={styles.verTexto}
              aria-expanded={textoAberto}
              onClick={() => setTextoAberto((aberto) => !aberto)}
            >
              {textoAberto ? 'Recolher texto' : 'Ver texto completo'}
            </button>
          )}
        </div>
      )}

      <ConteudoQuestao texto={comando} className={styles.enunciado} />

      <div className={styles.respostasRow}>
        {resultado === 'erro' && marcada && (
          <div className={`${styles.boxResposta} ${styles.boxIncorreta}`}>
            <div className={styles.erroIcon}>✕</div>
            <div>
              <ConteudoQuestao texto={`${marcada.rotulo} · ${marcada.texto}`} className={styles.altTexto} />
              <span className={styles.subtexto}>Sua resposta · incorreta</span>
            </div>
          </div>
        )}

        {resultado === 'em_branco' && (
          <div className={`${styles.boxResposta} ${styles.boxEmBranco}`}>
            <div className={styles.circleIcon} />
            <div>
              <strong className={styles.textGray}>Você não respondeu</strong>
              <span className={styles.subtexto}>Questões em branco contam como erro na média</span>
            </div>
          </div>
        )}

        {correta && (
          <div className={`${styles.boxResposta} ${styles.boxCorreta}`}>
            <div className={styles.checkIcon}>✓</div>
            <div>
              <ConteudoQuestao texto={`${correta.rotulo} · ${correta.texto}`} className={styles.altTexto} />
              <span className={styles.subtexto}>
                {resultado === 'acerto' ? 'Sua resposta · correta' : 'Resposta correta'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

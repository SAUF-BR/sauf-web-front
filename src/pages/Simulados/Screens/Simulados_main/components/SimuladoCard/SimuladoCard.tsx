import { useNavigate } from 'react-router-dom'
import { ROTAS } from '../../../../../../routes/paths'
import { NOME_AREA, type SimuladoResumo } from '../../../../../../features/simulados'
import { formatarData, formatarDuracao, formatarQuantidade } from '../../../../../../lib/utils/formatadores'
import styles from './SimuladoCard.module.scss'

interface SimuladoCardProps {
  simulado: SimuladoResumo
}

export function SimuladoCard({ simulado }: SimuladoCardProps) {
  const navigate = useNavigate()
  const isConcluido = simulado.status === 'concluido'
  const data = simulado.finalizadoEm ?? simulado.iniciadoEm

  // Abre a Configuração já preenchida com a mesma configuração deste simulado
  const refazer = () =>
    navigate(ROTAS.simuladosConfiguracao, {
      state: {
        tamanho: simulado.tamanho ?? 'media',
        areas: simulado.areas,
        cronometrado: simulado.cronometrado,
      },
    })

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.infoGroup}>
          <div className={styles.badgePercent}>
            {isConcluido && simulado.porcentagemAcerto !== null ? (
              <>
                <strong>{Math.round(simulado.porcentagemAcerto)}%</strong>
                <span>ACERTOS</span>
              </>
            ) : (
              <>
                <strong>
                  {simulado.respondidas}/{simulado.totalQuestoes}
                </strong>
                <span>RESPONDIDAS</span>
              </>
            )}
          </div>

          <div className={styles.detailsText}>
            <div className={styles.titleRow}>
              <h3 className={styles.titulo}>{simulado.titulo}</h3>
              <span
                className={`${styles.statusTag} ${isConcluido ? styles.tagConcluido : styles.tagAndamento}`}
              >
                {isConcluido ? 'Concluído' : 'Em andamento'}
              </span>
            </div>

            <p className={styles.metaData}>
              {formatarData(data)} · {formatarQuantidade(simulado.totalQuestoes, 'questão', 'questões')} ·{' '}
              {formatarDuracao(simulado.duracaoSegundos)} de duração
            </p>

            <div className={styles.tagsRow}>
              {simulado.areas.map((area) => (
                <span key={area} className={styles.tagPill}>
                  {NOME_AREA[area]}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.actionsGroup}>
          {isConcluido && (
            <div className={styles.statsNumbers}>
              <div className={styles.statBox}>
                <span className={styles.statLabel}>ACERTOS</span>
                <strong className={`${styles.statValue} ${styles.greenText}`}>
                  {simulado.acertos}
                </strong>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statLabel}>ERROS</span>
                <strong className={`${styles.statValue} ${styles.redText}`}>
                  {simulado.erros}
                </strong>
              </div>
            </div>
          )}

          <div className={styles.buttonsColumn}>
            {isConcluido ? (
              <>
                <button
                  type="button"
                  className={styles.revisarBtn}
                  onClick={() => navigate(ROTAS.simuladosRevisao(simulado.id))}
                >
                  Revisar questões
                </button>
                <button type="button" className={styles.refazerBtn} onClick={refazer}>
                  Refazer
                </button>
              </>
            ) : (
              <button
                type="button"
                className={styles.revisarBtn}
                onClick={() => navigate(ROTAS.simuladosQuestoes(simulado.id))}
              >
                Continuar
              </button>
            )}
          </div>
        </div>
      </div>

      {simulado.porArea.length > 0 && (
        <div className={styles.categoriasSection}>
          <span className={styles.categoriasLabel}>POR CATEGORIA</span>
          <div className={styles.categoriasGrid}>
            {simulado.porArea.map((item) => {
              const pct = item.total > 0 ? Math.round((item.acertos / item.total) * 100) : 0

              return (
                <div key={item.area} className={styles.catItem}>
                  <div className={styles.catHeader}>
                    <span className={styles.catName}>{NOME_AREA[item.area]}</span>
                    <span className={styles.catRatio}>
                      {item.acertos}/{item.total}
                    </span>
                  </div>
                  <div className={styles.track}>
                    <div
                      className={`${styles.fill} ${pct < 60 ? styles.alertaFill : ''}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

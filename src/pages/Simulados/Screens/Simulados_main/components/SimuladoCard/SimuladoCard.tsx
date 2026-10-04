import { useNavigate } from 'react-router-dom'
import styles from './SimuladoCard.module.scss'

export interface CategoriaDesempenho {
  nome: string
  acertos: number
  total: number
}

export interface SimuladoItemData {
  id: string
  titulo: string
  status: 'concluido' | 'em_andamento'
  data: string
  dataTimestamp: number
  vestibular: 'ENEM' | 'UEM' | 'UTFPR' | 'UEL'
  totalQuestoes: number
  duracao: string
  tags: string[]
  porcentagemAcerto: number
  acertos: number
  erros: number
  categorias: CategoriaDesempenho[]
}

interface SimuladoCardProps {
  simulado: SimuladoItemData
}

export function SimuladoCard({ simulado }: SimuladoCardProps) {
  const navigate = useNavigate()
  const isConcluido = simulado.status === 'concluido'

  return (
    <div className={styles.card}>
      {/* Linha Superior */}
      <div className={styles.topRow}>
        {/* Esquerda: Badge de % e Informações */}
        <div className={styles.infoGroup}>
          <div className={styles.badgePercent}>
            <strong>{simulado.porcentagemAcerto}%</strong>
            <span>ACERTOS</span>
          </div>

          <div className={styles.detailsText}>
            <div className={styles.titleRow}>
              <h3 className={styles.titulo}>{simulado.titulo}</h3>
              <span className={`${styles.statusTag} ${isConcluido ? styles.tagConcluido : styles.tagAndamento}`}>
                {isConcluido ? 'Concluído' : 'Em andamento'}
              </span>
            </div>

            <p className={styles.metaData}>
              {simulado.data} · {simulado.totalQuestoes} questões · {simulado.duracao}
            </p>

            <div className={styles.tagsRow}>
              {simulado.tags.map((tag) => (
                <span key={tag} className={styles.tagPill}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Direita: Estatísticas Rápidas + Botões de Ação */}
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
                  onClick={() => navigate('/simulados/historico')}
                >
                  Revisar questões
                </button>
                <button
                  type="button"
                  className={styles.refazerBtn}
                  onClick={() => navigate('/simulados/questoes')}
                >
                  Refazer
                </button>
              </>
            ) : (
              <button
                type="button"
                className={styles.revisarBtn}
                onClick={() => navigate('/simulados/questoes')}
              >
                Continuar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Linha Inferior: Por Categoria */}
      {simulado.categorias.length > 0 && (
        <div className={styles.categoriasSection}>
          <span className={styles.categoriasLabel}>POR CATEGORIA</span>
          <div className={styles.categoriasGrid}>
            {simulado.categorias.map((cat) => {
              const pct = Math.round((cat.acertos / cat.total) * 100)
              const isAlerta = pct < 60
              return (
                <div key={cat.nome} className={styles.catItem}>
                  <div className={styles.catHeader}>
                    <span className={styles.catName}>{cat.nome}</span>
                    <span className={styles.catRatio}>
                      {cat.acertos}/{cat.total}
                    </span>
                  </div>
                  <div className={styles.track}>
                    <div
                      className={`${styles.fill} ${isAlerta ? styles.alertaFill : ''}`}
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
import { Link } from 'react-router-dom'
import styles from './AcertosCategoria.module.scss'

interface CategoriaItem {
  materia: string
  percentual: number
  variacao: string
  tipoVariacao: 'positivo' | 'negativo' | 'neutro' | string
  alerta?: boolean
}

interface AcertosCategoriaProps {
  categorias: CategoriaItem[]
}

export function AcertosCategoria({ categorias }: AcertosCategoriaProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Acertos por categoria</h3>
          <p className={styles.subtitle}>
            Aproveitamento no período e variação em relação ao mês anterior
          </p>
        </div>
        <Link to="/simulados/questoes" className={styles.linkAction}>
          Ver questões erradas →
        </Link>
      </div>

      <div className={styles.list}>
        {categorias.map((item) => (
          <div key={item.materia} className={styles.row}>
            <span className={styles.materiaName}>{item.materia}</span>

            <div className={styles.track}>
              <div
                className={`${styles.fill} ${item.alerta ? styles.alertaFill : ''}`}
                style={{ width: `${item.percentual}%` }}
              />
            </div>

            <span className={styles.percentual}>{item.percentual}%</span>

            <span
              className={`${styles.variacao} ${
                item.tipoVariacao === 'positivo'
                  ? styles.pos
                  : item.tipoVariacao === 'negativo'
                  ? styles.neg
                  : styles.neutro
              }`}
            >
              {item.variacao}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
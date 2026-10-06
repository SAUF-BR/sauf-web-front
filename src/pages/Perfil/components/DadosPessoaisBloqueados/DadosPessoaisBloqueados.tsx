import styles from './DadosPessoaisBloqueados.module.scss'

// Mesmos campos do formulário, só com barras cinzas no lugar dos valores
const CAMPOS = [
  { rotulo: 'Nome completo', largura: '12rem' },
  { rotulo: 'E-mail', largura: '16rem' },
  { rotulo: 'Senha', largura: '8rem' },
  { rotulo: 'Nota do ENEM', largura: '5rem', opcional: true },
]

export function DadosPessoaisBloqueados() {
  return (
    <div className={styles.grade} aria-hidden="true">
      {CAMPOS.map((campo) => (
        <div key={campo.rotulo}>
          <div className={styles.rotulos}>
            <span className={styles.rotulo}>{campo.rotulo}</span>
            {campo.opcional && <span className={styles.opcional}>opcional</span>}
          </div>

          <div className={styles.caixa}>
            <span className={styles.barra} style={{ width: campo.largura }} />
          </div>
        </div>
      ))}
    </div>
  )
}


import styles from './NavegacaoAbas.module.scss'

export type AbaCurso = 'visao-geral' | 'mercado-salarios' | 'cursos-parecidos'

interface NavegacaoAbasProps {
  abaAtiva: AbaCurso
  onChange: (aba: AbaCurso) => void
}

const abas: { id: AbaCurso; titulo: string }[] = [
  { id: 'visao-geral', titulo: 'Visão geral' },
  { id: 'mercado-salarios', titulo: 'Mercado e salários' },
  { id: 'cursos-parecidos', titulo: 'Cursos parecidos' },
]

export function NavegacaoAbas({ abaAtiva, onChange }: NavegacaoAbasProps) {
  return (
    <nav className={styles.navegacao} aria-label="Seções do curso">
      {abas.map((aba) => (
        <button
          key={aba.id}
          type="button"
          className={`${styles.aba} ${
            abaAtiva === aba.id ? styles.ativa : ''
          }`}
          aria-current={abaAtiva === aba.id ? 'page' : undefined}
          onClick={() => onChange(aba.id)}
        >
          {aba.titulo}
        </button>
      ))}
    </nav>
  )
}

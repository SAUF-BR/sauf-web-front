import type { FormaIngressoId } from '../../../../features/formasIngresso/types'

import styles from './FormasIngressoAside.module.scss'

type FormaIngressoOpcao = {
  id: FormaIngressoId
  nome: string
  descricao: string
}

type FormasIngressoAsideProps = {
  formaSelecionada: FormaIngressoId
  onSelecionar: (id: FormaIngressoId) => void
}

const opcoes: FormaIngressoOpcao[] = [
  {
    id: 'prouni',
    nome: 'PROUni',
    descricao: 'Bolsa em faculdade privada',
  },
  {
    id: 'sisu',
    nome: 'SISU',
    descricao: 'Vaga pública pelo ENEM',
  },
  {
    id: 'fies',
    nome: 'FIES',
    descricao: 'Financiamento estudantil',
  },
  {
    id: 'enem',
    nome: 'ENEM',
    descricao: 'A prova que abre as portas',
  },
]

export function FormasIngressoAside({
  formaSelecionada,
  onSelecionar,
}: FormasIngressoAsideProps) {
  return (
    <aside className={styles.aside}>
      <p className={styles.titulo}>Formas de ingresso</p>

      <nav className={styles.opcoes} aria-label="Formas de ingresso">
        {opcoes.map((opcao) => (
          <button
            key={opcao.id}
            type="button"
            className={`${styles.opcao} ${
              formaSelecionada === opcao.id ? styles.ativa : ''
            }`}
            onClick={() => onSelecionar(opcao.id)}
            aria-current={formaSelecionada === opcao.id ? 'page' : undefined}
          >
            <span className={styles.nome}>{opcao.nome}</span>
            <span className={styles.descricao}>{opcao.descricao}</span>
          </button>
        ))}
      </nav>

      <div className={styles.nestaPagina}>
        <p className={styles.titulo}>Nesta página</p>
        <a href="#o-que-e">O que é</a>
        <a href="#quem-pode-participar">Quem pode participar</a>
        <a href="#como-se-inscrever">Como se inscrever</a>
        <a href="#prazos">Prazos</a>
        <a href="#perguntas-frequentes">Perguntas frequentes</a>
      </div>
    </aside>
  )
}
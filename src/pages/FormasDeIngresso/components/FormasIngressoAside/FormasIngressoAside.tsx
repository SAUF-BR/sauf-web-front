import { formasIngressoMock } from '../../../../features/formasIngresso/mocks'
import type { FormaIngressoId } from '../../../../features/formasIngresso/types'
import { SECOES } from '../../../../features/formasIngresso/secoes'

import styles from './FormasIngressoAside.module.scss'

type FormasIngressoAsideProps = {
  formaSelecionada: FormaIngressoId
  onSelecionar: (id: FormaIngressoId) => void
}

export function FormasIngressoAside({
  formaSelecionada,
  onSelecionar,
}: FormasIngressoAsideProps) {
  return (
    <aside className={styles.aside}>
      <p className={styles.titulo}>Formas de ingresso</p>

      <nav className={styles.opcoes} aria-label="Formas de ingresso">
        {formasIngressoMock.map((forma) => (
          <button
            key={forma.id}
            type="button"
            className={`${styles.opcao} ${
              formaSelecionada === forma.id ? styles.ativa : ''
            }`}
            onClick={() => onSelecionar(forma.id)}
           aria-pressed={formaSelecionada === forma.id} >
            <span className={styles.nome}>{forma.nome}</span>
            <span className={styles.descricao}>{forma.subtitulo}</span>
          </button>
        ))}
      </nav>

      <div className={styles.nestaPagina}>
        <p className={styles.titulo}>Nesta página</p>

        {SECOES.map((secao) => (
          <a key={secao.id} href={`#${secao.id}`}>
            {secao.titulo}
          </a>
        ))}
      </div>
    </aside>
  )
}
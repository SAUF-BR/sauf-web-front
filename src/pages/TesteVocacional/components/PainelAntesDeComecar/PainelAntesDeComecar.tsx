import { Card } from '../../../../components/ui/Card/Card'
import { ITENS_ANTES_DE_COMECAR } from '../../conteudo'
import styles from './PainelAntesDeComecar.module.scss'

export function PainelAntesDeComecar() {
  return (
    <Card className={styles.painel}>
      <h2 className={styles.titulo}>Antes de começar</h2>

      <ul className={styles.lista}>
        {ITENS_ANTES_DE_COMECAR.map(({ id, indicador: Indicador, titulo, descricao }) => (
          <li key={id} className={styles.item}>
            <span className={styles.indicador} aria-hidden="true">
              {typeof Indicador === 'string' ? Indicador : <Indicador size="1em" fill="currentColor" />}
            </span>
            <div>
              <h3 className={styles.itemTitulo}>{titulo}</h3>
              <p className={styles.itemDescricao}>{descricao}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}

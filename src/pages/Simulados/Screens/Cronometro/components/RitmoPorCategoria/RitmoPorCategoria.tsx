import { cn } from '../../../../../../lib/utils'
import { Painel } from '../../../../compartilhados/Painel/Painel'
import { formatarMinutosSegundos } from '../../../../compartilhados/conteudo'
import type { RitmoCategoria } from '../../conteudo'
import styles from './RitmoPorCategoria.module.scss'

type RitmoPorCategoriaProps = {
  categorias: RitmoCategoria[]
}

export function RitmoPorCategoria({ categorias }: RitmoPorCategoriaProps) {
  const ordenadas = [...categorias].sort((a, b) => b.segundosPorQuestao - a.segundosPorQuestao)
  const maisLenta = ordenadas[0]
  const maisRapida = ordenadas[ordenadas.length - 1]
  const comparar = ordenadas.length > 1

  return (
    <Painel titulo="Ritmo por categoria">
      {ordenadas.length === 0 ? (
        <p className={styles.vazio}>Ainda não há tempo registrado por categoria.</p>
      ) : (
        <div>
          <dl>
            {ordenadas.map((item) => (
              <div key={item.categoria} className={styles.item}>
                <dt>{item.categoria}</dt>
                <dd className={cn(comparar && item === maisLenta && styles.lenta)}>
                  {formatarMinutosSegundos(item.segundosPorQuestao)}
                </dd>
              </div>
            ))}
          </dl>

          {comparar && (
            <p className={styles.insight}>
              {maisLenta.categoria} consome{' '}
              {formatarMinutosSegundos(
                maisLenta.segundosPorQuestao - maisRapida.segundosPorQuestao,
              )}{' '}
              mais que {maisRapida.categoria} por questão.
            </p>
          )}
        </div>
      )}
    </Painel>
  )
}
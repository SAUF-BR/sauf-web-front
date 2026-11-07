import type { FormaIngresso } from '../../../../features/formasIngresso/types'
import styles from '../FormasIngressoConteudo/FormasIngressoConteudo.module.scss'
import { Tag } from '../../../../components/ui/Tag/Tag'

type CabecalhoFormaProps = {
  categoria: FormaIngresso['categoria']
  atualizadoEm: FormaIngresso['atualizadoEm']
  nome: FormaIngresso['nome']
  descricao: FormaIngresso['descricao']
}

export function CabecalhoForma({
  categoria,
  atualizadoEm,
  nome,
  descricao,
}: CabecalhoFormaProps) {
  return (
    <>
      <div className={styles.identificacao}>
        <Tag variant="destaque">{categoria}</Tag>
        <span className={styles.atualizacao}>
          Atualizado em {atualizadoEm}
        </span>
      </div>

      <h1 id="o-que-e">{nome}</h1>
      <p className={styles.descricao}>{descricao}</p>
    </>
  )
}
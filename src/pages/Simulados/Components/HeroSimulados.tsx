import { Button } from '../../../components/ui/Botao/Botao'
import { Tag } from '../../../components/ui/Tag/Tag'
import { formatarMoeda } from '../../../lib/utils'
import styles from './HeroSimulados.module.scss'

type HeroSimuladosProps = {
  precoInicial: number
}

export function HeroSimulados({ precoInicial }: HeroSimuladosProps) {
  return (
    <div className={styles.hero}>
      <div className={styles.selo}>
        <Tag variant="assinante">Recurso de assinantes</Tag>
        <span className={styles.preco}>A partir de {formatarMoeda(precoInicial)} por mês</span>
      </div>

      <h1 className={styles.titulo}>
        Treine com simulados
        <span className={styles.linha}>
          de verdade e <em className={styles.destaque}>acompanhe sua evolução</em>
        </span>
      </h1>

      <p className={styles.descricao}>
        Monte simulados do ENEM e dos vestibulares das universidades, revise o que acertou e
        errou por categoria e acompanhe seu progresso ao longo dos meses.
      </p>

      <Button className={styles.cta}>
        Assinar para acessar
      </Button>
    </div>
  )
}
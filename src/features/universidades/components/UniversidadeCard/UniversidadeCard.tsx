import { Link } from 'react-router-dom'
import { Imagem } from '../../../../components/ui/Imagem/Imagem'
import { formatarInteiro } from '../../../../lib/utils'
import { ROTAS } from '../../../../routes/paths'
import type { Universidade } from '../../types'
import { obterNomeCurto, ROTULO_TIPO_UNIVERSIDADE } from '../../utils'
import styles from './UniversidadeCard.module.scss'

type UniversidadeCardProps = {
  universidade: Universidade
}

export function UniversidadeCard({ universidade }: UniversidadeCardProps) {
  const nomeCurto = obterNomeCurto(universidade)

  return (
    <Link
      to={ROTAS.universidadeDetalhe(universidade.id)}
      className={styles.card}
      title={universidade.nome}
    >
      <Imagem
        src={universidade.logoUrl}
        alt={`Logo ${nomeCurto}`}
        rotuloPlaceholder="logo"
        className={styles.logo}
      />
      <div className={styles.info}>
        <h3 className={styles.nome}>{nomeCurto}</h3>
        <p className={styles.detalhes}>
          {ROTULO_TIPO_UNIVERSIDADE[universidade.tipo]} ·{' '}
          {formatarInteiro(universidade.totalCursos)} cursos
        </p>
      </div>
    </Link>
  )
}

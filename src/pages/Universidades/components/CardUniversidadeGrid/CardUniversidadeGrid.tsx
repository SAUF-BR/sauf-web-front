import { Link } from 'react-router-dom'
import { Card } from '../../../../components/ui/Card/Card'
import { Imagem } from '../../../../components/ui/Imagem/Imagem'
import { Tag } from '../../../../components/ui/Tag/Tag'
import { ROTULO_MODALIDADE } from '../../../../features/cursos'
import { BotaoFavorito } from '../../../../features/favoritos'
import { obterNomeCurto, ROTULO_TIPO_UNIVERSIDADE } from '../../../../features/universidades'
import type { UniversidadeListagem } from '../../../../features/universidades/mockUniversidades'
import { formatarInteiro } from '../../../../lib/utils'
import { ROTAS } from '../../../../routes/paths'
import styles from './CardUniversidadeGrid.module.scss'

type CardUniversidadeGridProps = {
  universidade: UniversidadeListagem
  favorito: boolean
  onAlternarFavorito: () => void
}

export function CardUniversidadeGrid({
  universidade,
  favorito,
  onAlternarFavorito,
}: CardUniversidadeGridProps) {
  const nomeCurto = obterNomeCurto(universidade)

  return (
    <Card className={styles.card}>
      <div className={styles.cabecalho}>
        <Imagem
          src={universidade.logoUrl}
          alt={`Logo ${nomeCurto}`}
          rotuloPlaceholder="logo"
          className={styles.logo}
        />

        <div className={styles.info}>
          <h3 className={styles.nome} title={universidade.nome}>
            {nomeCurto}
          </h3>
          <p className={styles.local}>
            {ROTULO_TIPO_UNIVERSIDADE[universidade.tipo]} · {universidade.cidade}, {universidade.uf}
          </p>
        </div>

        <BotaoFavorito
          ativo={favorito}
          nomeItem={nomeCurto}
          onAlternar={onAlternarFavorito}
          className={styles.favorito}
        />
      </div>

      <ul className={styles.badges} aria-label="Características da universidade">
        <li>
          <span className={styles.notaMec}>Nota MEC {universidade.notaMec}</span>
        </li>
        {universidade.modalidades.map((modalidade) => (
          <li key={modalidade}>
            <Tag>{ROTULO_MODALIDADE[modalidade]}</Tag>
          </li>
        ))}
      </ul>

      <div className={styles.cursos}>
        <span className={styles.cursosRotulo}>Cursos</span>
        <span className={styles.cursosValor}>{formatarInteiro(universidade.totalCursos)}</span>
      </div>

      <Link
        to={ROTAS.universidadeDetalhe(universidade.id)}
        className={styles.botao}
        aria-label={`Ver universidade ${nomeCurto}`}
      >
        Ver universidade
      </Link>
    </Card>
  )
}

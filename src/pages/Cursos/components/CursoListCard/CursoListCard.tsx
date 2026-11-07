import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

import { Card } from '../../../../components/ui/Card/Card'
import { Imagem } from '../../../../components/ui/Imagem/Imagem'
import { Tag } from '../../../../components/ui/Tag/Tag'
import { BotaoFavorito } from '../../../../features/favoritos/components/BotaoFavorito/BotaoFavorito'
import {
  useAlternarCursoFavorito,
  useCursosFavoritosIds,
} from '../../../../features/favoritos/hooks'

import { ROTAS } from '../../../../routes/paths'
import type { Curso } from '../../../../features/cursos/types'
import {
  formatarDuracao,
  ROTULO_MODALIDADE,
} from '../../../../features/cursos/utils'

import styles from './CursoListCard.module.scss'

type CursoListCardProps = {
  curso: Curso
}

export function CursoListCard({
  curso,
}: CursoListCardProps) {
  const { data: favoritosIds } = useCursosFavoritosIds()
  const alternarFavorito = useAlternarCursoFavorito()

  const ativo = favoritosIds?.has(curso.id) ?? false

  function handleAlternarFavorito() {
    alternarFavorito.mutate({
      cursoId: curso.id,
      favoritar: !ativo,
    })
  }

  return (
    <Card className={styles.card}>
      <div className={styles.imagemContainer}>
        <Imagem
          src={curso.imagemUrl}
          alt={`Foto do curso de ${curso.nome}`}
          rotuloPlaceholder="foto do curso 16:9"
          className={styles.imagem}
        />

        <BotaoFavorito
          ativo={ativo}
          nomeItem={curso.nome}
          onAlternar={handleAlternarFavorito}
          disabled={alternarFavorito.isPending}
          className={styles.favorito}
        />
      </div>

      <div className={styles.corpo}>
        <h3 className={styles.nome}>{curso.nome}</h3>

        <div className={styles.tags}>
          <Tag>{ROTULO_MODALIDADE[curso.modalidade]}</Tag>
          <Tag>{formatarDuracao(curso.duracaoSemestres)}</Tag>
        </div>

        <p className={styles.ofertas}>
          {curso.totalOfertas ?? 0} universidades ofertam este curso
        </p>

        <div className={styles.rodape}>
          <div>
            <span className={styles.destaqueRotulo}>
              Nota de corte SISU
            </span>

            <span className={styles.destaqueValor}>
              {curso.notaCorteSisu ?? '—'}
            </span>
          </div>

          <Link
            to={ROTAS.cursoDetalhe(curso.id)}
            className={styles.link}
          >
            Ver detalhes
            <ChevronRight size="1em" />
          </Link>
        </div>
      </div>
    </Card>
  )
}
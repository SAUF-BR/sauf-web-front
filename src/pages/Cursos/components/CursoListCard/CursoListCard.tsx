import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

import { Card } from '../../../../components/ui/Card/Card'
import { Imagem } from '../../../../components/ui/Imagem/Imagem'
import { Tag } from '../../../../components/ui/Tag/Tag'
import { BotaoFavorito } from '../../../../features/favoritos/components/BotaoFavorito/BotaoFavorito'

import { ROTAS } from '../../../../routes/paths'
import type { Curso } from '../../../../features/cursos/types'
import {
  formatarDuracao,
  ROTULO_MODALIDADE,
} from '../../../../features/cursos/utils'

import styles from './CursoListCard.module.scss'

type CursoListCardProps = {
  curso: Curso
  universidadesNaRegiao: number
}



export function CursoListCard({curso, universidadesNaRegiao,}: CursoListCardProps) {

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
          ativo={false}
          nomeItem={curso.nome}
          onAlternar={() => {}}
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
            {universidadesNaRegiao} universidades ofertam na sua região
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
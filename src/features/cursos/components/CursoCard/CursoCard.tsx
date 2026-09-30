import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Card } from '../../../../components/ui/Card/Card'
import { Imagem } from '../../../../components/ui/Imagem/Imagem'
import { Tag } from '../../../../components/ui/Tag/Tag'
import { ROTAS } from '../../../../routes/paths'
import type { Curso } from '../../types'
import {
  formatarDuracao,
  obterDestaqueCurso,
  ROTULO_GRAU,
  ROTULO_MODALIDADE,
} from '../../utils'
import styles from './CursoCard.module.scss'

type CursoCardProps = {
  curso: Curso
  // Ação exibida ao lado do nome (ex.: botão de favoritar).
  acao?: ReactNode
}

export function CursoCard({ curso, acao }: CursoCardProps) {
  const destaque = obterDestaqueCurso(curso)

  return (
    <Card className={styles.card}>
      <Imagem
        src={curso.imagemUrl}
        alt={`Foto do curso de ${curso.nome}`}
        rotuloPlaceholder="foto do curso 16:9"
        className={styles.imagem}
      />

      <div className={styles.corpo}>
        <div className={styles.cabecalho}>
          <div>
            <h3 className={styles.nome}>{curso.nome}</h3>
            <p className={styles.universidade}>{curso.universidade.nome}</p>
          </div>
          {acao && <div className={styles.acao}>{acao}</div>}
        </div>

        <ul className={styles.tags} aria-label="Características do curso">
          <li>
            <Tag variant="destaque">{ROTULO_GRAU[curso.grau]}</Tag>
          </li>
          <li>
            <Tag>{ROTULO_MODALIDADE[curso.modalidade]}</Tag>
          </li>
          <li>
            <Tag>{formatarDuracao(curso.duracaoSemestres)}</Tag>
          </li>
        </ul>

        <div className={styles.rodape}>
          {destaque && (
            <div>
              <span className={styles.destaqueRotulo}>{destaque.rotulo}</span>
              <span className={styles.destaqueValor}>{destaque.valor}</span>
            </div>
          )}

          <Link
            to={ROTAS.cursoDetalhe(curso.id)}
            className={styles.link}
            aria-label={`Ver curso de ${curso.nome} — ${curso.universidade.nome}`}
          >
            Ver curso <ChevronRight size="1em" />
          </Link>
        </div>
      </div>
    </Card>
  )
}

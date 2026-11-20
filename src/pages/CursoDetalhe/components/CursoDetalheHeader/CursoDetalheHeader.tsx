
import { Breadcrumb } from '../../../../components/ui/Breadcrumb/Breadcrumb'
import type { Curso } from '../../../../features/cursos/types'
import {
  ROTULO_GRAU,
  ROTULO_MODALIDADE,
} from '../../../../features/cursos/utils'
import { ROTAS } from '../../../../routes/paths'
import styles from './CursoDetalheHeader.module.scss'
import { Imagem } from '../../../../components/ui/Imagem/Imagem'
import { Tag } from '../../../../components/ui/Tag/Tag'

interface CursoDetalheHeaderProps {
  curso: Curso
}

export function CursoDetalheHeader({
  curso,
}: CursoDetalheHeaderProps) {
  return (
    <header className={styles.header}>
        <div className={styles.container}>
        <Breadcrumb
          itens={[
            { rotulo: 'Início', para: ROTAS.inicio },
            { rotulo: 'Cursos', para: ROTAS.cursos },
            { rotulo: curso.nome },
          ]}
          className={styles.breadcrumb}
        />

        <div className={styles.principal}>
            <Imagem
              src={curso.imagemUrl}
              alt={`Imagem do curso ${curso.nome}`}
              rotuloPlaceholder="🎓"
              className={styles.imagem}
            />

            <div className={styles.informacoes}>
            <h1>{curso.nome}</h1>
            <p className={styles.area}>{curso.area} | Ofertado em {curso.totalUniversidades} universidades</p>
                
            <div className={styles.tags}>
              {curso.graus.map((grau) => (
                <Tag key={grau} variant="destaque">{ROTULO_GRAU[grau]}</Tag>
              ))}
              {curso.modalidades.map((modalidade) => (
                <Tag key={modalidade} variant="neutro">{ROTULO_MODALIDADE[modalidade]}</Tag>
              ))}
            </div>
            </div>
        </div>
      </div>
    </header>
  )
}

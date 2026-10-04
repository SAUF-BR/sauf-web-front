import { Check, Minus } from 'lucide-react'
import {
  Ordem_modalidades,
  Rotulo_modalidade_detalhe,
  type ModalidadeOfertada,
} from '../../conteudo'
import styles from './ModalidadesOfertadas.module.scss'

type ModalidadesOfertadasProps = {
  modalidades: ModalidadeOfertada[]
}

export function ModalidadesOfertadas({ modalidades }: ModalidadesOfertadasProps) {
  return (
    <ul className={styles.grade}>
      {Ordem_modalidades.map((modalidade) => {
        const dados = modalidades.find((m) => m.modalidade === modalidade)
        const disponivel = dados?.disponivel ?? false
        const totalCursos = dados?.totalCursos ?? null

        const descricao =
          dados?.descricao ??
          (disponivel ? null : 'A universidade não oferta cursos nesta modalidade.')

        return (
          <li
            key={modalidade}
            className={`${styles.card} ${disponivel ? '' : styles.indisponivel}`}
          >
            <div className={styles.topo}>
              <h3 className={styles.nome}>{Rotulo_modalidade_detalhe[modalidade]}</h3>
              <span
                className={styles.indicador}
                role="img"
                aria-label={disponivel ? 'Disponível' : 'Não disponível'}
              >
                {disponivel ? <Check size={12} strokeWidth={3} /> : <Minus size={12} />}
              </span>
            </div>

            {totalCursos !== null && (
              <p className={styles.contador}>
                <strong>{totalCursos}</strong> {totalCursos === 1 ? 'curso' : 'cursos'}
              </p>
            )}

            {descricao && <p className={styles.descricao}>{descricao}</p>}
          </li>
        )
      })}
    </ul>
  )
}
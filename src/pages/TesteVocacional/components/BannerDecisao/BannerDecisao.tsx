import { Button } from '../../../../components/ui/Botao/Botao'
import styles from './BannerDecisao.module.scss'

type BannerDecisaoProps = {
  rotuloAcao: string
  onComecar: () => void
}

export function BannerDecisao({ rotuloAcao, onComecar }: BannerDecisaoProps) {
  return (
    <section className={styles.banner} aria-labelledby="banner-decisao">
      <div>
        <h2 id="banner-decisao" className={styles.titulo}>
          O teste não decide por você
        </h2>
        <p className={styles.texto}>
          É um ponto de partida para explorar cursos que você talvez não conhecesse. A escolha
          final é sua, e vale conversar com professores e profissionais da área.
        </p>
      </div>

      <Button className={styles.botao} onClick={onComecar}>
        {rotuloAcao} <span aria-hidden="true">→</span>
      </Button>
    </section>
  )
}

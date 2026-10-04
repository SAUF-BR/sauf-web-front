import { Button } from '../../../components/ui/Botao/Botao'
import type { Plano } from '../Conteudo'
import styles from './BannerAssinatura.module.scss'
import { CartaoPlano } from './CartaoPlano'

type BannerAssinaturaProps = {
  planos: Plano[]
}

export function BannerAssinatura({ planos }: BannerAssinaturaProps) {
  return (
    <section className={styles.banner} aria-labelledby="banner-assinatura">
      <div className={styles.topo}>
        <div className={styles.texto}>
          <h2 id="banner-assinatura" className={styles.titulo}>
            Você ainda não tem uma assinatura ativa
          </h2>
          <p className={styles.descricao}>
            Para criar simulados e revisar suas respostas é preciso assinar um dos planos. O
            Basic já libera os simulados do ENEM; o Premium inclui acompanhamento, cronômetro e
            ranking.
          </p>
        </div>

        <Button>Escolher um plano</Button>
      </div>

      <ul className={styles.planos}>
        {planos.map((plano) => (
          <li key={plano.id}>
            <CartaoPlano plano={plano} />
          </li>
        ))}
      </ul>
    </section>
  )
}
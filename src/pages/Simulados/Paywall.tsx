import { CabecalhoSecao } from '../Home/components/CabecalhoSecao/CabecalhoSecao'
import styles from './Paywall.module.scss'
import { BannerAssinatura } from './Components/BannerAssinatura'
import { CartaoRecurso } from './Components/CartaoRecurso'
import { HeroSimulados } from './Components/HeroSimulados'
import { PreviaSimulados } from './Components/PreviaSimulados'
import { PLANOS, PRECO_INICIAL, PREVIA, RECURSOS } from './Conteudo'

export default function Paywall() {
  return (
    <main>
      <section className={styles.hero} aria-label="Apresentação de Simulados">
        <div className={styles.heroConteudo}>
          <HeroSimulados precoInicial={PRECO_INICIAL} />
          <PreviaSimulados simulados={PREVIA} />
        </div>
      </section>

      <div className={styles.conteudo}>
        <section aria-labelledby="secao-recursos">
          <CabecalhoSecao
            id="secao-recursos"
            titulo="O que você encontra aqui"
            subtitulo="Quatro áreas dentro de Simulados"
          />

          <ul className={styles.gradeRecursos}>
            {RECURSOS.map((recurso) => (
              <li key={recurso.id}>
                <CartaoRecurso recurso={recurso} />
              </li>
            ))}
          </ul>
        </section>

        <BannerAssinatura planos={PLANOS} />
      </div>
    </main>
  )
}

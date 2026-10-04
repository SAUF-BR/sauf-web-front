import { useNavigate } from 'react-router-dom'
import { Breadcrumb } from '../../components/ui/Breadcrumb/Breadcrumb'
import { Tag } from '../../components/ui/Tag/Tag'
import { useUsuarioAtual } from '../../features/auth'
import { temProgressoSalvo, useProgressoTeste } from '../../features/testeVocacional'
import { ROTAS } from '../../routes/paths'
import { BannerDecisao } from './components/BannerDecisao/BannerDecisao'
import { ComoFunciona } from './components/ComoFunciona/ComoFunciona'
import { PainelAntesDeComecar } from './components/PainelAntesDeComecar/PainelAntesDeComecar'
import styles from './index.module.scss'

export default function TesteVocacional() {
  const navigate = useNavigate()
  const { data: usuario } = useUsuarioAtual()
  const { data: progresso } = useProgressoTeste({ enabled: !!usuario })
  const continuar = temProgressoSalvo(progresso)

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroConteudo}>
          <div className={styles.apresentacao}>
            <Breadcrumb
              itens={[{ rotulo: 'Início', para: ROTAS.inicio }, { rotulo: 'Teste vocacional' }]}
            />

            <p className={styles.selo}>
              <span className={styles.seloTag}>
                <Tag variant="destaque">Gratuito</Tag>
              </span>
              Sem prova, sem nota, sem julgamento
            </p>

            <h1 className={styles.titulo}>
              Descubra as áreas que combinam com <em className={styles.destaque}>você</em>
            </h1>

            <p className={styles.descricao}>
              São 20 perguntas sobre o que você gosta de fazer, como estuda e o que espera do
              futuro profissional. No fim, mostramos suas áreas de maior afinidade e os cursos que
              combinam com o seu perfil.
            </p>

            <p className={styles.aviso}>
              Você pode pausar e voltar depois — suas respostas ficam salvas.
            </p>
          </div>

          <PainelAntesDeComecar />
        </div>
      </section>

      <div className={styles.conteudo}>
        <ComoFunciona />
        <BannerDecisao
          rotuloAcao={continuar ? 'Continuar de onde parei' : 'Vamos lá'}
          onComecar={() => navigate(ROTAS.testeVocacionalPerguntas)}
        />
      </div>
    </main>
  )
}

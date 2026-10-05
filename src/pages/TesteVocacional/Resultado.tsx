import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Botao/Botao'
import { ROTULO_AREA, useRefazerTeste, useResultadoTeste } from '../../features/testeVocacional'
import { ROTAS } from '../../routes/paths'
import { CursosRecomendados } from './components/CursosRecomendados/CursosRecomendados'
import { PainelAfinidades } from './components/PainelAfinidades/PainelAfinidades'
import styles from './Resultado.module.scss'

export default function Resultado() {
  const navigate = useNavigate()
  const { data: resultado, isPending, isError } = useResultadoTeste()
  const refazer = useRefazerTeste()

  if (isPending) return <p className={styles.mensagem}>Carregando seu resultado…</p>

  if (isError) {
    return (
      <p className={styles.mensagem} role="alert">
        Não foi possível carregar o resultado. Tente novamente em instantes.
      </p>
    )
  }

  if (!resultado) return <Navigate to={ROTAS.testeVocacional} replace />

  const area = ROTULO_AREA[resultado.areaPrincipal]

  function refazerTeste() {
    refazer.mutate(undefined, {
      onSuccess: () => navigate(ROTAS.testeVocacionalPerguntas),
    })
  }

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroConteudo}>
          <div className={styles.apresentacao}>
            <p className={styles.sobretitulo}>
              Resultado do teste vocacional · {resultado.totalRespostas} respostas
            </p>
            <h1 className={styles.titulo}>
              Sua área de maior afinidade é <em className={styles.destaque}>{area}</em>
            </h1>
            <p className={styles.descricao}>{resultado.descricao}</p>

            <div className={styles.acoes}>
              <Button onClick={() => navigate(ROTAS.busca(area))}>Ver cursos de {area}</Button>
              <Button variant="outline" disabled={refazer.isPending} onClick={refazerTeste}>
                Refazer o teste
              </Button>
            </div>
          </div>

          <PainelAfinidades afinidades={resultado.afinidades} concluidoEm={resultado.concluidoEm} />
        </div>
      </section>

      <div className={styles.conteudo}>
        <CursosRecomendados area={area} />
      </div>
    </main>
  )
}

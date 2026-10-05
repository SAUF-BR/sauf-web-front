import { useSearchParams } from 'react-router-dom'
import { Card } from '../../components/ui/Card/Card'
import {
  estimarMinutosRestantes,
  obterNumeroParaContinuar,
  useProgressoTeste,
  useQuestionario,
  useSalvarResposta,
} from '../../features/testeVocacional'
import { BarraTopoTeste } from './components/BarraTopoTeste/BarraTopoTeste'
import { GradeProgresso } from './components/GradeProgresso/GradeProgresso'
import { NavegacaoPergunta } from './components/NavegacaoPergunta/NavegacaoPergunta'
import { OpcaoResposta } from './components/OpcaoResposta/OpcaoResposta'
import styles from './Perguntas.module.scss'

export default function Perguntas() {
  const [searchParams, setSearchParams] = useSearchParams()
  const questionario = useQuestionario()
  const progresso = useProgressoTeste()
  const salvarResposta = useSalvarResposta()

  if (questionario.isPending || progresso.isPending) {
    return <p className={styles.mensagem}>Carregando o teste…</p>
  }

  if (questionario.isError || progresso.isError) {
    return (
      <p className={styles.mensagem} role="alert">
        Não foi possível carregar o teste. Tente novamente em instantes.
      </p>
    )
  }

  const perguntas = questionario.data
  const { respostas } = progresso.data
  const total = perguntas.length

  const numeroNaUrl = Number(searchParams.get('pergunta'))
  const numero =
    Number.isInteger(numeroNaUrl) && numeroNaUrl >= 1 && numeroNaUrl <= total
      ? numeroNaUrl
      : obterNumeroParaContinuar(perguntas, respostas)

  const pergunta = perguntas[numero - 1]
  const alternativaSelecionada = respostas[pergunta.id] ?? null
  const ultima = numero === total

  function irPara(novoNumero: number) {
    setSearchParams({ pergunta: String(novoNumero) })
    window.scrollTo({ top: 0 })
  }

  function selecionar(alternativaId: string) {
    salvarResposta.mutate({ perguntaId: pergunta.id, alternativaId })
  }

  function pular() {
    if (!(pergunta.id in respostas)) {
      salvarResposta.mutate({ perguntaId: pergunta.id, alternativaId: null })
    }
    if (!ultima) irPara(numero + 1)
  }

  return (
    <main>
      <BarraTopoTeste
        numero={numero}
        total={total}
        minutosRestantes={estimarMinutosRestantes(total - numero + 1)}
      />

      <div className={styles.corpo}>
        <section className={styles.pergunta} aria-labelledby="enunciado">
          <p className={styles.categoria}>{pergunta.categoria}</p>
          <h1 id="enunciado" className={styles.enunciado}>
            {pergunta.enunciado}
          </h1>
          <p className={styles.instrucao}>{pergunta.instrucao}</p>

          <div role="radiogroup" aria-labelledby="enunciado" className={styles.opcoes}>
            {pergunta.alternativas.map((alternativa) => (
              <OpcaoResposta
                key={alternativa.id}
                nome={pergunta.id}
                alternativa={alternativa}
                selecionada={alternativa.id === alternativaSelecionada}
                onSelecionar={selecionar}
              />
            ))}
          </div>

          <NavegacaoPergunta
            podeVoltar={numero > 1}
            podeAvancar={!!alternativaSelecionada && !ultima}
            ultima={ultima}
            onAnterior={() => irPara(numero - 1)}
            onPular={pular}
            onProxima={() => irPara(numero + 1)}
          />
        </section>

        <aside className={styles.lateral}>
          <GradeProgresso perguntas={perguntas} numeroAtual={numero} respostas={respostas} />

          <Card className={styles.comoUsamos}>
            <h2 className={styles.comoUsamosTitulo}>Como usamos isso</h2>
            <p className={styles.comoUsamosTexto}>
              O resultado indica áreas de afinidade e recomenda cursos. Ele não substitui
              orientação profissional.
            </p>
          </Card>
        </aside>
      </div>
    </main>
  )
}

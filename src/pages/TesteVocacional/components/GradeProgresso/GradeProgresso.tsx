import { Card } from '../../../../components/ui/Card/Card'
import {
  obterStatusPergunta,
  type Pergunta,
  type Respostas,
  type StatusPergunta,
} from '../../../../features/testeVocacional'
import { cn } from '../../../../lib/utils'
import styles from './GradeProgresso.module.scss'

const ROTULO_STATUS: Record<StatusPergunta, string> = {
  respondida: 'respondida',
  atual: 'pergunta atual',
  pendente: 'pendente',
}

type GradeProgressoProps = {
  perguntas: Pergunta[]
  numeroAtual: number
  respostas: Respostas
}

export function GradeProgresso({ perguntas, numeroAtual, respostas }: GradeProgressoProps) {
  return (
    <Card className={styles.painel}>
      <h2 className={styles.titulo}>Seu progresso</h2>

      <ol className={styles.grade}>
        {perguntas.map((pergunta) => {
          const status = obterStatusPergunta(pergunta, numeroAtual, respostas)

          return (
            <li key={pergunta.id} className={cn(styles.quadrado, styles[status])}>
              <span className={styles.oculto}>
                Pergunta {pergunta.numero}: {ROTULO_STATUS[status]}
              </span>
            </li>
          )
        })}
      </ol>

      <p className={styles.nota}>
        Suas respostas são salvas automaticamente. Você pode voltar depois de onde parou.
      </p>
    </Card>
  )
}

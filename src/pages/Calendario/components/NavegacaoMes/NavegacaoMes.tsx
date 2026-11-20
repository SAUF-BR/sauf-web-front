import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../../../../components/ui/Botao/Botao'
import { formatarMesAno, somarMeses, type AnoMes } from '../../../../lib/utils'
import styles from './NavegacaoMes.module.scss'

type NavegacaoMesProps = {
  anoMes: AnoMes
  mesAtual: AnoMes
  onMudarMes: (anoMes: AnoMes) => void
}

export function NavegacaoMes({ anoMes, mesAtual, onMudarMes }: NavegacaoMesProps) {
  const anterior = somarMeses(anoMes, -1)
  const proximo = somarMeses(anoMes, 1)
  const noMesAtual = anoMes.ano === mesAtual.ano && anoMes.mes === mesAtual.mes

  return (
    <div className={styles.navegacao}>
      <Button
        variant="outline"
        className={styles.botao}
        aria-label={`Mês anterior: ${formatarMesAno(anterior)}`}
        onClick={() => onMudarMes(anterior)}
      >
        <ChevronLeft size="1.125rem" aria-hidden="true" />
      </Button>

      <h2 className={styles.mes} aria-live="polite">
        {formatarMesAno(anoMes)}
      </h2>

      <Button
        variant="outline"
        className={styles.botao}
        aria-label={`Próximo mês: ${formatarMesAno(proximo)}`}
        onClick={() => onMudarMes(proximo)}
      >
        <ChevronRight size="1.125rem" aria-hidden="true" />
      </Button>

      {!noMesAtual && (
        <Button
          variant="outline"
          className={styles.hoje}
          aria-label={`Voltar para o mês atual, ${formatarMesAno(mesAtual)}`}
          onClick={() => onMudarMes(mesAtual)}
        >
          Hoje
        </Button>
      )}
    </div>
  )
}

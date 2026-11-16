import { Minus, Plus } from 'lucide-react'
import { Button, Group, Input, Label, NumberField, Text } from 'react-aria-components/NumberField'
import { cn } from '../../../../../lib/utils'
import styles from './Personalizar.module.scss'

interface CampoQuantidadeProps {
  rotulo: string
  valor: number
  minimo: number
  maximo: number
  // Ex.: "até 135 disponíveis"
  detalhe?: string
  invalido?: boolean
  onMudar: (valor: number) => void
  className?: string
}

// Número com - e +; setas do teclado também mudam o valor e ele fica sempre entre o mínimo e o máximo
export function CampoQuantidade({
  rotulo,
  valor,
  minimo,
  maximo,
  detalhe,
  invalido = false,
  onMudar,
  className,
}: CampoQuantidadeProps) {
  return (
    <NumberField
      value={valor}
      minValue={minimo}
      maxValue={maximo}
      step={1}
      formatOptions={{ maximumFractionDigits: 0 }}
      isInvalid={invalido}
      onChange={(novo) => onMudar(Number.isNaN(novo) ? minimo : novo)}
      className={cn(styles.campo, className)}
    >
      <Label className={styles.campoRotulo}>{rotulo}</Label>
      <Group className={styles.campoGrupo}>
        <Button slot="decrement" className={styles.passo} aria-label={`Diminuir ${rotulo}`}>
          <Minus size={16} aria-hidden="true" />
        </Button>
        <Input className={styles.campoInput} />
        <Button slot="increment" className={styles.passo} aria-label={`Aumentar ${rotulo}`}>
          <Plus size={16} aria-hidden="true" />
        </Button>
      </Group>
      {detalhe && (
        <Text slot="description" className={styles.campoDetalhe}>
          {detalhe}
        </Text>
      )}
    </NumberField>
  )
}

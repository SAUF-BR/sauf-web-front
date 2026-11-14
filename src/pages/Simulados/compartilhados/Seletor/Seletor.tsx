import { Check, ChevronDown } from 'lucide-react'
import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components/Select'
import { cn } from '../../../../lib/utils'
import styles from './Seletor.module.scss'

export interface OpcaoSeletor<V extends string> {
  valor: V
  rotulo: string
  // Ex.: "em breve"; a opção aparece, mas não pode ser escolhida
  desabilitada?: boolean
  detalhe?: string
}

interface SeletorProps<V extends string> {
  // Prefixo do botão ("Ordenar") e nome do campo para o leitor de tela
  rotulo: string
  valor: V
  opcoes: OpcaoSeletor<V>[]
  onMudar: (valor: V) => void
  className?: string
}

// Lista suspensa com o visual do protótipo (no lugar do <select> nativo), com teclado e leitor de tela
export function Seletor<V extends string>({
  rotulo,
  valor,
  opcoes,
  onMudar,
  className,
}: SeletorProps<V>) {
  const desabilitadas = opcoes.flatMap((opcao) => (opcao.desabilitada ? [opcao.valor] : []))

  return (
    <Select
      aria-label={rotulo}
      value={valor}
      onChange={(chave) => {
        if (chave !== null) onMudar(chave as V)
      }}
      disabledKeys={desabilitadas}
      className={cn(styles.seletor, className)}
    >
      <Button className={styles.gatilho}>
        <span className={styles.rotulo}>{rotulo}:</span>
        <SelectValue className={styles.valor} />
        <ChevronDown size={16} aria-hidden="true" className={styles.seta} />
      </Button>

      <Popover className={styles.popover} placement="bottom end" offset={6}>
        <ListBox className={styles.lista}>
          {opcoes.map((opcao) => (
            <ListBoxItem
              key={opcao.valor}
              id={opcao.valor}
              textValue={opcao.rotulo}
              className={styles.item}
            >
              {({ isSelected }) => (
                <>
                  <span className={styles.itemRotulo}>{opcao.rotulo}</span>
                  {opcao.detalhe && <span className={styles.itemDetalhe}>{opcao.detalhe}</span>}
                  {isSelected && <Check size={16} aria-hidden="true" className={styles.marca} />}
                </>
              )}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  )
}

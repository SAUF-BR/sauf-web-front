import { useId, type SubmitEvent } from 'react'
import { Search } from 'lucide-react'
import { Button } from '../Botao/Botao'
import styles from './BarraBusca.module.scss'

type BarraBuscaProps = {
  placeholder: string
  rotulo?: string
  textoBotao?: string
  defaultValue?: string
  onBuscar: (termo: string) => void
}

export function BarraBusca({
  placeholder,
  rotulo = 'Buscar',
  textoBotao = 'Buscar',
  defaultValue,
  onBuscar,
}: BarraBuscaProps) {
  const inputId = useId()

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const termo = new FormData(event.currentTarget).get('termo')
    onBuscar(String(termo ?? '').trim())
  }

  return (
    <form role="search" className={styles.barra} onSubmit={handleSubmit}>
      <label htmlFor={inputId} className={styles.rotuloOculto}>
        {rotulo}
      </label>
      <Search size="1em" className={styles.icone} />
      <input
        id={inputId}
        name="termo"
        type="search"
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete="off"
        className={styles.input}
      />
      <Button type="submit" className={styles.botao}>
        {textoBotao}
      </Button>
    </form>
  )
}

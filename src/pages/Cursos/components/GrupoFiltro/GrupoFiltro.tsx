
import styles from './GrupoFiltro.module.scss'

interface OpcaoFiltro {
  valor: string
  rotulo: string
}

interface GrupoFiltroProps {
  nome: string
  titulo: string
  opcoes: OpcaoFiltro[]
  tipo?: 'checkbox' | 'radio'
  valoresSelecionados: string[]
  onChange: (valores: string[]) => void
}

export function GrupoFiltro({
  nome,
  titulo,
  opcoes,
  tipo = 'checkbox',
  valoresSelecionados,
  onChange,
}: GrupoFiltroProps) {
  function alterarSelecao(valor: string) {
    if (tipo === 'radio') {
      onChange([valor])
      return
    }

    const selecionados = valoresSelecionados.includes(valor)
      ? valoresSelecionados.filter((item) => item !== valor)
      : [...valoresSelecionados, valor]

    onChange(selecionados)
  }

  return (
    <fieldset className={styles.grupo}>
      <legend>{titulo}</legend>

      {opcoes.map((opcao) => (
        <label key={opcao.valor}>
          <input
            type={tipo}
            name={nome}
            value={opcao.valor}
            checked={valoresSelecionados.includes(opcao.valor)}
            onChange={() => alterarSelecao(opcao.valor)}
          />
          {opcao.rotulo}
        </label>
      ))}
    </fieldset>
  )
}

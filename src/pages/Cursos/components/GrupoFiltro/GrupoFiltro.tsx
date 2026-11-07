
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
}

export function GrupoFiltro({
  nome,
  titulo,
  opcoes,
  tipo = 'checkbox',
}: GrupoFiltroProps) {
  return (
    <fieldset className={styles.grupo}>
      <legend>{titulo}</legend>

      {opcoes.map((opcao) => (
        <label key={opcao.valor}>
          <input
            type={tipo}
            name={nome}
            value={opcao.valor}
            defaultChecked={tipo === 'radio' && opcao.valor === '8'}
          />
          {opcao.rotulo}
        </label>
      ))}
    </fieldset>
  )
}

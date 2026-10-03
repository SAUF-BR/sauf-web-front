import { useId } from 'react'
import { Check, ChevronDown, X } from 'lucide-react'
import type { Modalidade } from '../../../../features/cursos'
import type { TipoUniversidade } from '../../../../features/universidades'
import type { UniversidadeListagem } from '../../../../features/universidades/mockUniversidades'
import { ESTADOS_BR, formatarInteiro } from '../../../../lib/utils'
import {
  Opcoes_categoria,
  Opcoes_estado,
  Opcoes_modalidade,
  Opcoes_nota_mec,
  Rotulo_chip_nota_mec,
  type Filtros,
  type Opcao,
} from '../../conteudo'
import styles from './FiltrosLaterais.module.scss'

type FiltrosLateraisProps = {
  filtros: Filtros
  cidades: string[]
  escopo: UniversidadeListagem[]
  onAtualizar: (parcial: Partial<Filtros>) => void
  onAlternarCategoria: (categoria: TipoUniversidade) => void
  onAlternarModalidade: (modalidade: Modalidade) => void
  onLimpar: () => void
}

export function FiltrosLaterais({
  filtros,
  cidades,
  escopo,
  onAtualizar,
  onAlternarCategoria,
  onAlternarModalidade,
  onLimpar,
}: FiltrosLateraisProps) {
  const chips: { id: string; rotulo: string; remover: () => void }[] = []

  if (filtros.estado) {
    chips.push({
      id: 'estado',
      rotulo: ESTADOS_BR[filtros.estado],
      remover: () => onAtualizar({ estado: '', cidade: '' }),
    })
  }

  if (filtros.cidade) {
    chips.push({ id: 'cidade', rotulo: filtros.cidade, remover: () => onAtualizar({ cidade: '' }) })
  }

  Opcoes_categoria.filter((opcao) => filtros.categorias.includes(opcao.valor)).forEach((opcao) =>
    chips.push({
      id: opcao.valor,
      rotulo: opcao.rotulo,
      remover: () => onAlternarCategoria(opcao.valor),
    }),
  )

  const rotuloNotaMec = Rotulo_chip_nota_mec[filtros.notaMec]

  if (rotuloNotaMec) {
    chips.push({
      id: 'notaMec',
      rotulo: rotuloNotaMec,
      remover: () => onAtualizar({ notaMec: 'todas' }),
    })
  }

  Opcoes_modalidade.filter((opcao) => filtros.modalidades.includes(opcao.valor)).forEach((opcao) =>
    chips.push({
      id: opcao.valor,
      rotulo: opcao.rotulo,
      remover: () => onAlternarModalidade(opcao.valor),
    }),
  )

  return (
    <div className={styles.painel}>
      <div className={styles.cabecalho}>
        <h2 className={styles.titulo}>Filtros</h2>
        {chips.length > 0 && (
          <button type="button" className={styles.limpar} onClick={onLimpar}>
            Limpar ({chips.length})
          </button>
        )}
      </div>

      {chips.length > 0 && (
        <ul className={styles.chips} aria-label="Filtros aplicados">
          {chips.map((chip) => (
            <li key={chip.id}>
              <button
                type="button"
                className={styles.chip}
                onClick={chip.remover}
                aria-label={`Remover filtro ${chip.rotulo}`}
              >
                {chip.rotulo}
                <X size="1em" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.localizacao}>
        <CampoSelect
          rotulo="Estado"
          valor={filtros.estado}
          opcoes={Opcoes_estado}
          opcaoVazia="Todos os estados"
          onChange={(estado) => onAtualizar({ estado, cidade: '' })}
        />
        <CampoSelect
          rotulo="Cidade"
          valor={filtros.cidade}
          opcoes={cidades.map((cidade) => ({ valor: cidade, rotulo: cidade }))}
          opcaoVazia="Todas as cidades"
          onChange={(cidade) => onAtualizar({ cidade })}
          disabled={!filtros.estado}
        />
      </div>

      <GrupoCheckbox
        titulo="Categoria"
        opcoes={Opcoes_categoria}
        selecionados={filtros.categorias}
        contar={(tipo) => escopo.filter((u) => u.tipo === tipo).length}
        onAlternar={onAlternarCategoria}
      />

      <fieldset className={styles.grupo}>
        <legend className={styles.rotulo}>Nota MEC</legend>
        <div className={styles.botoes}>
          {Opcoes_nota_mec.map((opcao) => {
            const ativo = opcao.valor === filtros.notaMec

            return (
              <button
                key={opcao.valor}
                type="button"
                aria-pressed={ativo}
                className={`${styles.botao} ${ativo ? styles.ativo : ''}`}
                onClick={() => onAtualizar({ notaMec: opcao.valor })}
              >
                {opcao.rotulo}
              </button>
            )
          })}
        </div>
      </fieldset>

      <GrupoCheckbox
        titulo="Modalidade ofertada"
        opcoes={Opcoes_modalidade}
        selecionados={filtros.modalidades}
        contar={(modalidade) => escopo.filter((u) => u.modalidades.includes(modalidade)).length}
        onAlternar={onAlternarModalidade}
      />
    </div>
  )
}

type CampoSelectProps<T extends string> = {
  rotulo: string
  valor: T | ''
  opcoes: Opcao<T>[]
  opcaoVazia: string
  onChange: (valor: T | '') => void
  disabled?: boolean
}

function CampoSelect<T extends string>({
  rotulo,
  valor,
  opcoes,
  opcaoVazia,
  onChange,
  disabled,
}: CampoSelectProps<T>) {
  const id = useId()

  return (
    <div className={styles.campo}>
      <label htmlFor={id} className={styles.rotulo}>
        {rotulo}
      </label>

      <div className={styles.seletor}>
        <select
          id={id}
          className={styles.select}
          value={valor}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value as T | '')}
        >
          <option value="">{opcaoVazia}</option>
          {opcoes.map((opcao) => (
            <option key={opcao.valor} value={opcao.valor}>
              {opcao.rotulo}
            </option>
          ))}
        </select>
        <ChevronDown size="1em" className={styles.seta} aria-hidden="true" />
      </div>
    </div>
  )
}
// Grupo de checkboxes com a quantidade de universidades ao lado de cada opção
type GrupoCheckboxProps<T extends string> = {
  titulo: string
  opcoes: Opcao<T>[]
  selecionados: T[]
  contar: (valor: T) => number
  onAlternar: (valor: T) => void
}

function GrupoCheckbox<T extends string>({
  titulo,
  opcoes,
  selecionados,
  contar,
  onAlternar,
}: GrupoCheckboxProps<T>) {
  return (
    <fieldset className={styles.grupo}>
      <legend className={styles.rotulo}>{titulo}</legend>

      <ul>
        {opcoes.map((opcao) => (
          <li key={opcao.valor}>
            <label className={styles.linha}>
              <input
                type="checkbox"
                className={styles.input}
                checked={selecionados.includes(opcao.valor)}
                onChange={() => onAlternar(opcao.valor)}
              />
              <span className={styles.caixa} aria-hidden="true">
                <Check size="1em" strokeWidth={3} />
              </span>
              <span className={styles.opcao}>{opcao.rotulo}</span>
              <span className={styles.contagem}>{formatarInteiro(contar(opcao.valor))}</span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  )
}
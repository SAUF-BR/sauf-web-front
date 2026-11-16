import { useState } from 'react'
import { NOME_AREA, type Area } from '../../../../../features/simulados'
import { formatarInteiro } from '../../../../../lib/utils/formatadores'
import { CampoQuantidade } from './CampoQuantidade'
import { ModalPersonalizar } from './ModalPersonalizar'
import { somar, type Quantidades } from './distribuicao'
import styles from './Personalizar.module.scss'

interface ModalCategoriasProps {
  aberto: boolean
  areas: { id: Area; questoesDisponiveis: number }[]
  inicial: Quantidades
  limite: number
  descreverTempo: (questoes: number) => string
  onConfirmar: (quantidades: Quantidades) => void
  onFechar: () => void
}

export function ModalCategorias({ aberto, onFechar, ...resto }: ModalCategoriasProps) {
  return (
    <ModalPersonalizar
      aberto={aberto}
      onFechar={onFechar}
      titulo="Questões por categoria"
      descricao="Escolha quantas questões quer de cada categoria. O tamanho do simulado passa a ser a soma."
    >
      <Conteudo onFechar={onFechar} {...resto} />
    </ModalPersonalizar>
  )
}

function Conteudo({
  areas,
  inicial,
  limite,
  descreverTempo,
  onConfirmar,
  onFechar,
}: Omit<ModalCategoriasProps, 'aberto'>) {
  const [quantidades, setQuantidades] = useState<Quantidades>(() =>
    Object.fromEntries(
      areas.map((area) => [area.id, Math.min(inicial[area.id] ?? 0, area.questoesDisponiveis)]),
    ),
  )
  const total = somar(quantidades)
  const passou = total > limite

  let erro = ''
  if (total === 0) erro = 'Escolha ao menos 1 questão em alguma categoria.'
  else if (passou) erro = `O simulado pode ter até ${limite} questões. Tire ${total - limite} para continuar.`

  return (
    <>
      <div className={styles.gradeAreas}>
        {areas.map((area) => (
          <CampoQuantidade
            key={area.id}
            rotulo={NOME_AREA[area.id]}
            valor={quantidades[area.id] ?? 0}
            minimo={0}
            maximo={Math.min(area.questoesDisponiveis, limite)}
            detalhe={`${formatarInteiro(area.questoesDisponiveis)} disponíveis`}
            onMudar={(valor) => setQuantidades((atual) => ({ ...atual, [area.id]: valor }))}
          />
        ))}
      </div>

      <p className={`${styles.total} ${passou ? styles.totalPassou : ''}`} aria-live="polite">
        <span>Total</span>
        <strong>
          {total} de até {limite} questões
        </strong>
        {total > 0 && <span className={styles.totalTempo}>cerca de {descreverTempo(total)}</span>}
      </p>
      {erro && (
        <p className={styles.erro} role="alert">
          {erro}
        </p>
      )}

      <div className={styles.rodape}>
        <button type="button" className={styles.secundario} onClick={onFechar}>
          Cancelar
        </button>
        <button
          type="button"
          className={styles.primario}
          disabled={erro !== ''}
          onClick={() => {
            onConfirmar(quantidades)
            onFechar()
          }}
        >
          Usar esta distribuição
        </button>
      </div>
    </>
  )
}

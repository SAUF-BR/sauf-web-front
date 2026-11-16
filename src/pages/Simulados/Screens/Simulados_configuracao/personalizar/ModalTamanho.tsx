import { useState } from 'react'
import { CampoQuantidade } from './CampoQuantidade'
import { ModalPersonalizar } from './ModalPersonalizar'
import styles from './Personalizar.module.scss'

interface ModalTamanhoProps {
  aberto: boolean
  inicial: number
  // Menor entre o limite da API e o que cabe nas categorias marcadas
  maximo: number
  limite: number
  descreverTempo: (questoes: number) => string
  onConfirmar: (questoes: number) => void
  onFechar: () => void
}

export function ModalTamanho({ aberto, onFechar, ...resto }: ModalTamanhoProps) {
  return (
    <ModalPersonalizar
      aberto={aberto}
      onFechar={onFechar}
      titulo="Tamanho personalizado"
      descricao="Escolha quantas questões o simulado vai ter. Elas são divididas entre as categorias marcadas."
    >
      {/* Montado só com o modal aberto: cada abertura começa do valor atual */}
      <Conteudo onFechar={onFechar} {...resto} />
    </ModalPersonalizar>
  )
}

function Conteudo({
  inicial,
  maximo,
  limite,
  descreverTempo,
  onConfirmar,
  onFechar,
}: Omit<ModalTamanhoProps, 'aberto'>) {
  const [questoes, setQuestoes] = useState(Math.min(Math.max(inicial, 1), Math.max(maximo, 1)))
  const semEspaco = maximo < 1

  return (
    <>
      <CampoQuantidade
        rotulo="Número de questões"
        valor={questoes}
        minimo={1}
        maximo={Math.max(maximo, 1)}
        detalhe={`De 1 a ${maximo}. Cerca de ${descreverTempo(questoes)}.`}
        onMudar={setQuestoes}
        className={styles.campoGrande}
      />

      {!semEspaco && maximo < limite && (
        <p className={styles.nota} role="note">
          Com as categorias marcadas, cabem até {maximo} questões sem repetir. Para chegar a {limite},
          marque mais categorias.
        </p>
      )}
      {semEspaco && (
        <p className={styles.erro} role="alert">
          Marque ao menos uma categoria antes de escolher o tamanho.
        </p>
      )}

      <div className={styles.rodape}>
        <button type="button" className={styles.secundario} onClick={onFechar}>
          Cancelar
        </button>
        <button
          type="button"
          className={styles.primario}
          disabled={semEspaco}
          onClick={() => {
            onConfirmar(questoes)
            onFechar()
          }}
        >
          Usar {questoes} {questoes === 1 ? 'questão' : 'questões'}
        </button>
      </div>
    </>
  )
}

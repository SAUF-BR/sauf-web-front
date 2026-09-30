import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { EtapaDados, type DadosCadastro } from './components/EtapaDados/EtapaDados'
import { EtapaTermos } from './components/EtapaTermos/EtapaTermos'
import styles from './index.module.scss'

export default function Cadastro() {
  const [etapa, setEtapa] = useState<1 | 2>(1)
  const { register } = useForm<DadosCadastro>()

  return (
    <main className={styles.fundoMaior}>
      <div className={styles.fundoMenor}>
        <div className={`${styles.painel} ${etapa === 1 ? '' : styles.oculto}`} inert={etapa !== 1}>
          <EtapaDados etapaAtual={etapa} register={register} onContinuar={() => setEtapa(2)} />
        </div>
        <div className={`${styles.painel} ${etapa === 2 ? '' : styles.oculto}`} inert={etapa !== 2}>
          <EtapaTermos etapaAtual={etapa} onVoltar={() => setEtapa(1)} />
        </div>
      </div>
    </main>
  )
}

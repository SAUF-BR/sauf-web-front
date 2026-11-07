import type { FormaIngresso } from '../../../../features/formasIngresso/types'

import { CabecalhoForma } from '../CabecalhoForma/CabecalhoForma'
import { IndicadoresForma } from '../IndicadoresForma/IndicadoresForma'
import { RequisitosForma } from '../RequisitosForma/RequisitosForma'
import { EtapasInscricao } from '../EtapasInscricao/EtapasInscricao'
import { PrazosForma } from '../PrazosForma/PrazosForma'
import { PerguntasFrequentes } from '../PerguntasFrequentes/PerguntasFrequentes'
import { LinksOficiais } from '../LinksOficiais/LinksOficiais'

import styles from './FormasIngressoConteudo.module.scss'

type FormasIngressoConteudoProps = {
  forma: FormaIngresso
}

export function FormasIngressoConteudo({
  forma,
}: FormasIngressoConteudoProps) {
  return (
    <section className={styles.conteudo}>
      <CabecalhoForma
        categoria={forma.categoria}
        atualizadoEm={forma.atualizadoEm}
        nome={forma.nome}
        descricao={forma.descricao}
      />

      <IndicadoresForma indicadores={forma.indicadores} />

      <RequisitosForma requisitos={forma.requisitos} />

      <EtapasInscricao etapas={forma.etapas} />

      <PrazosForma prazos={forma.prazos} />

      <PerguntasFrequentes perguntas={forma.perguntasFrequentes} />

      <LinksOficiais links={forma.linksOficiais} />

    </section>
  )
}
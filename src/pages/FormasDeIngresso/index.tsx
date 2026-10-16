import styles from './index.module.scss'

import { useState } from 'react'

import { formasIngressoMock } from '../../features/formasIngresso/mocks'
import type { FormaIngressoId } from '../../features/formasIngresso/types'
import { FormasIngressoAside } from './components/FormasIngressoAside/FormasIngressoAside'
import { FormasIngressoConteudo } from './components/FormasIngressoConteudo/FormasIngressoConteudo'


export function FormasIngresso() {
  const [formaSelecionada, setFormaSelecionada] =
    useState<FormaIngressoId>('prouni')

  const formaAtual = formasIngressoMock.find(
    (forma) => forma.id === formaSelecionada,
  )

  return (
    <main className={styles.pagina}>
      <FormasIngressoAside
        formaSelecionada={formaSelecionada}
        onSelecionar={setFormaSelecionada}
      />

      {formaAtual ? (
        <FormasIngressoConteudo forma={formaAtual} />
      ) : (
        <section className={styles.indisponivel}>
          <h1>Conteúdo indisponível</h1>
          <p>Não encontramos informações para esta forma de ingresso.</p>
        </section>
      )}
    </main>
  )
}
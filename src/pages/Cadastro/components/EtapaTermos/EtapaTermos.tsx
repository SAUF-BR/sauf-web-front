import { useState } from 'react'
import { Logo } from '../../../../components/logo/Logo'
import { Button } from '../../../../components/ui/Botao/Botao'
import { Titulo } from '../../../../components/ui/Titulo/Titulo'
import { BarraProgresso } from '../BarraProgresso/BarraProgresso'
import styles from './EtapaTermos.module.scss'

const secoes = [
  {
    titulo: '1. Dados que coletamos',
    texto:
      'Coletamos nome, e-mail e as preferências que você informa no questionário vocacional para recomendar cursos e avisar sobre prazos de ingresso.',
  },
  {
    titulo: '2. Como usamos seus dados',
    texto:
      'Os dados servem apenas para personalizar a sua experiência dentro do SAUF. Não vendemos, alugamos nem compartilhamos informações pessoais com instituições parceiras.',
  },
  {
    titulo: '3. Seus direitos',
    texto:
      'Você pode consultar, corrigir ou excluir seus dados a qualquer momento nas configurações da conta, conforme a LGPD.',
  },
]

type EtapaTermosProps = {
  etapaAtual: number
  onVoltar: () => void
}

export function EtapaTermos({ etapaAtual, onVoltar }: EtapaTermosProps) {
  const [aceito, setAceito] = useState(false)

  return (
    <>
      <header className={styles.cabecalho}>
        <div className={styles.topoLinha}>
          <span className={styles.etapa}>Etapa 2 de 2</span>
          <Logo />
        </div>

        <div className={styles.progresso}>
          <BarraProgresso atual={etapaAtual} total={2} />
        </div>

        <Titulo
          titulo="Termos de uso e privacidade"
          subtitulo="Última atualização: 12 de agosto de 2026 · leitura de 3 minutos"
          size="Medio"
        />
      </header>

      <div
        className={styles.termos}
        role="region"
        aria-label="Termos de uso e política de privacidade"
        tabIndex={0}
      >
        {secoes.map((secao) => (
          <section key={secao.titulo} className={styles.secao}>
            <h2 className={styles.secaoTitulo}>{secao.titulo}</h2>
            <p className={styles.secaoTexto}>{secao.texto}</p>
          </section>
        ))}
      </div>

      <footer className={styles.rodape}>
        <label className={styles.aceite}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={aceito}
            onChange={(e) => setAceito(e.target.checked)}
          />
          <span>
            Li e concordo com os <strong>termos de uso</strong> e com a{' '}
            <strong>política de privacidade</strong>.
          </span>
        </label>

        <div className={styles.acoes}>
          <Button variant="outline" className={styles.botaoCancelar} onClick={onVoltar}>
            Cancelar
          </Button>
          <Button className={styles.botaoCriar} disabled={!aceito}>
            Aceitar e criar conta
          </Button>
        </div>
      </footer>
    </>
  )
}

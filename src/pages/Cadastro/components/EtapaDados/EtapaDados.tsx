import { Link } from 'react-router-dom'
import type { UseFormRegister } from 'react-hook-form'
import { Logo } from '../../../../components/logo/Logo'
import { Button } from '../../../../components/ui/Botao/Botao'
import { TextInput } from '../../../../components/ui/TextInput/TextInput'
import { Titulo } from '../../../../components/ui/Titulo/Titulo'
import { BarraProgresso } from '../BarraProgresso/BarraProgresso'
import styles from './EtapaDados.module.scss'

export type DadosCadastro = {
  nome: string
  email: string
  senha: string
}

type EtapaDadosProps = {
  etapaAtual: number
  register: UseFormRegister<DadosCadastro>
  onContinuar: () => void
}

export function EtapaDados({ etapaAtual, register, onContinuar }: EtapaDadosProps) {
  return (
    <div className={styles.conteudo}>
      <header className={styles.topo}>
        <div className={styles.topoLinha}>
          <Logo />
          <span className={styles.etapa}>Etapa 1 de 2</span>
        </div>

        <BarraProgresso atual={etapaAtual} total={2} />
      </header>

      <Titulo
        titulo="Criar sua conta"
        subtitulo="Leva menos de um minuto. Usamos seus dados só para personalizar as recomendações."
        size="Medio"
      />

      <div className={styles.form}>
        <TextInput
          label="Nome Completo"
          type="text"
          autoComplete="name"
          {...register('nome')}
        />
        <TextInput
          label="E-mail"
          type="email"
          autoComplete="email"
          {...register('email')}
        />
        <TextInput
          label="Senha"
          type="password"
          autoComplete="new-password"
          {...register('senha')}
        />
      </div>

      <Button fullWidth className={styles.botaoContinuar} onClick={onContinuar}>
        Continuar
      </Button>

      <div className={styles.acessar}>
        <span>Já tem conta?</span>
        <Link to="/login" viewTransition className={styles.acessarLink}>Entrar</Link>
      </div>
    </div>
  )
}

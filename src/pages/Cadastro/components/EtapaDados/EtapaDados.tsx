import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Logo } from '../../../../components/logo/Logo'
import { AvisoErro } from '../../../../components/ui/AvisoErro/AvisoErro'
import { Button } from '../../../../components/ui/Botao/Botao'
import { CampoSenha } from '../../../../components/ui/CampoSenha/CampoSenha'
import { TextInput } from '../../../../components/ui/TextInput/TextInput'
import { Titulo } from '../../../../components/ui/Titulo/Titulo'
import { validarEmail, validarSenha } from '../../../../features/auth'
import { AcessarComoVisitante } from '../../../../features/auth/components/AcessarComoVisitante/AcessarComoVisitante'
import { RequisitosSenha } from '../../../../features/auth/components/RequisitosSenha/RequisitosSenha'
import { ROTAS } from '../../../../routes/paths'
import { BarraProgresso } from '../BarraProgresso/BarraProgresso'
import styles from './EtapaDados.module.scss'

export type CamposCadastro = {
  nome: string
  email: string
  senha: string
}

type EtapaDadosProps = {
  etapaAtual: number
  register: UseFormRegister<CamposCadastro>
  errors: FieldErrors<CamposCadastro>
  senha: string
  // Conferindo se o e-mail já tem conta (antes da etapa dos termos)
  conferindo: boolean
  // Falha ao conferir (conexão ou servidor)
  erro: string | null
  onContinuar: () => void
}

export function EtapaDados({
  etapaAtual,
  register,
  errors,
  senha,
  conferindo,
  erro,
  onContinuar,
}: EtapaDadosProps) {
  // Enter em qualquer campo também continua
  function aoEnviar(evento: FormEvent) {
    evento.preventDefault()
    onContinuar()
  }

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

      <form className={styles.form} onSubmit={aoEnviar} noValidate>
        <TextInput
          label="Nome Completo"
          type="text"
          autoComplete="name"
          error={errors.nome?.message}
          {...register('nome', {
            validate: (nome) => nome.trim().length >= 3 || 'Informe seu nome completo',
          })}
        />
        <TextInput
          label="E-mail"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email', { validate: validarEmail })}
        />
        <div>
          <CampoSenha
            label="Senha"
            autoComplete="new-password"
            error={errors.senha?.message}
            {...register('senha', { validate: validarSenha })}
          />
          {/* Os requisitos ficam sempre à vista e são marcados conforme a pessoa digita */}
          <RequisitosSenha senha={senha} />
        </div>

        {erro && <AvisoErro>{erro}</AvisoErro>}

        <Button type="submit" fullWidth className={styles.botaoContinuar} disabled={conferindo}>
          {conferindo ? 'Conferindo…' : 'Continuar'}
        </Button>
      </form>

      <div className={styles.acessar}>
        <span>Já tem conta?</span>
        <Link to={ROTAS.login} viewTransition className={styles.acessarLink}>Entrar</Link>
      </div>
      {/* Só uma linha de texto, sem separador, para o cartão caber na tela */}
      <div className={styles.visitante}>
        <AcessarComoVisitante compacto />
      </div>
    </div>
  )
}

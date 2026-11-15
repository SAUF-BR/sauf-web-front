import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { MailCheck } from 'lucide-react'
import { TelaAutenticacao } from '../../components/layout/TelaAutenticacao/TelaAutenticacao'
import { AvisoErro } from '../../components/ui/AvisoErro/AvisoErro'
import { Button } from '../../components/ui/Botao/Botao'
import { TextInput } from '../../components/ui/TextInput/TextInput'
import { useEntrarComCodigo, useEsqueciSenha, validarEmail } from '../../features/auth'
import { ErroApi } from '../../lib/api/erros'
import { ROTAS } from '../../routes/paths'
import styles from '../../components/layout/TelaAutenticacao/ConteudoAutenticacao.module.scss'

type CamposEmail = {
  email: string
}

type CamposCodigo = {
  codigo: string
}

// "Esqueci minha senha" em duas etapas: o e-mail recebe um código de 6 dígitos e, com o
// código certo, a pessoa entra e cria a senha nova no perfil (sem precisar da atual).
export default function EsqueciSenha() {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string | null>(null)
  const pedir = useEsqueciSenha()
  const entrar = useEntrarComCodigo()

  const formEmail = useForm<CamposEmail>({ defaultValues: { email: '' } })
  const formCodigo = useForm<CamposCodigo>({ defaultValues: { codigo: '' } })

  const pedirCodigo = formEmail.handleSubmit((campos) => {
    const destino = campos.email.trim()
    pedir.mutate(destino, { onSuccess: () => setEmail(destino) })
  })

  const enviarCodigo = formCodigo.handleSubmit((campos) => {
    if (!email) return
    entrar.mutate(
      { email, codigo: campos.codigo.trim() },
      {
        // O perfil abre já com o formulário "Criar nova senha"
        onSuccess: () => navigate(ROTAS.perfil, { replace: true }),
        onError: (erro) => {
          const mensagem = erro instanceof ErroApi ? erro.campos.codigo : undefined
          if (mensagem) formCodigo.setError('codigo', { message: mensagem })
        },
      },
    )
  })

  function reenviar() {
    if (!email) return
    formCodigo.reset()
    entrar.reset()
    pedir.mutate(email)
  }

  function trocarEmail() {
    setEmail(null)
    pedir.reset()
    entrar.reset()
    formCodigo.reset()
  }

  // Etapa 2: digitar o código
  if (email) {
    const erroSemCampo =
      entrar.isError && !(entrar.error instanceof ErroApi && entrar.error.campos.codigo)

    return (
      <TelaAutenticacao
        titulo="Digite o código"
        subtitulo="Se houver uma conta com esse e-mail, enviamos um código de 6 números. Ele vale por 10 minutos."
      >
        <p className={styles.sucesso} role="status">
          <MailCheck size="1rem" aria-hidden="true" />
          <span>
            Enviado para <strong>{email}</strong>. Confira também a caixa de spam.
          </span>
        </p>

        <form className={styles.form} onSubmit={enviarCodigo} noValidate>
          <TextInput
            label="Código"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="000000"
            className={styles.codigo}
            error={formCodigo.formState.errors.codigo?.message}
            {...formCodigo.register('codigo', {
              validate: (valor) => /^\d{6}$/.test(valor.trim()) || 'O código tem 6 números',
            })}
          />

          {erroSemCampo && <AvisoErro>{entrar.error.message}</AvisoErro>}
          {pedir.isError && <AvisoErro>{pedir.error.message}</AvisoErro>}

          <Button type="submit" fullWidth disabled={entrar.isPending}>
            {entrar.isPending ? 'Conferindo…' : 'Entrar'}
          </Button>
        </form>

        <div className={styles.acoes}>
          <button type="button" className={styles.botaoLink} onClick={reenviar} disabled={pedir.isPending}>
            {pedir.isPending ? 'Enviando…' : 'Reenviar código'}
          </button>
          <button type="button" className={styles.botaoLink} onClick={trocarEmail}>
            Usar outro e-mail
          </button>
        </div>
      </TelaAutenticacao>
    )
  }

  // Etapa 1: informar o e-mail
  return (
    <TelaAutenticacao
      titulo="Esqueci minha senha"
      subtitulo="Informe o e-mail da sua conta. Enviaremos um código para você entrar e criar uma senha nova."
    >
      <form className={styles.form} onSubmit={pedirCodigo} noValidate>
        <TextInput
          label="E-mail"
          type="email"
          autoComplete="email"
          error={formEmail.formState.errors.email?.message}
          {...formEmail.register('email', { validate: validarEmail })}
        />

        {pedir.isError && <AvisoErro>{pedir.error.message}</AvisoErro>}

        <Button type="submit" fullWidth disabled={pedir.isPending}>
          {pedir.isPending ? 'Enviando…' : 'Enviar código'}
        </Button>
      </form>

      <p className={styles.rodape}>
        Lembrou a senha? <Link to={ROTAS.login} className={styles.link}>Entrar</Link>
      </p>
    </TelaAutenticacao>
  )
}

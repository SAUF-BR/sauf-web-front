import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useLocation, useNavigate, type Location } from 'react-router-dom'
import { Logo } from '../../components/logo/Logo'
import { AvisoErro } from '../../components/ui/AvisoErro/AvisoErro'
import { Button } from '../../components/ui/Botao/Botao'
import { CampoSenha } from '../../components/ui/CampoSenha/CampoSenha'
import { TextInput } from '../../components/ui/TextInput/TextInput'
import { Titulo } from '../../components/ui/Titulo/Titulo'
import {
  limparSessaoExpirada,
  sessaoAcabouDeExpirar,
  useEntrar,
  useUsuarioAtual,
  validarEmail,
} from '../../features/auth'
import { AcessarComoVisitante } from '../../features/auth/components/AcessarComoVisitante/AcessarComoVisitante'
import { ROTAS } from '../../routes/paths'
import styles from './index.module.scss'

type CamposLogin = {
  email: string
  senha: string
}

// O PrivateRoute manda para cá guardando a tela que a pessoa tentava abrir
function destinoDepoisDeEntrar(estado: unknown) {
  const de = (estado as { de?: Location } | null)?.de
  return de ? `${de.pathname}${de.search}${de.hash}` : ROTAS.inicio
}

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const destino = destinoDepoisDeEntrar(location.state)
  const { data: usuario } = useUsuarioAtual()
  const entrar = useEntrar()

  // Caiu aqui porque a sessão expirou no meio do uso (ver QueryProvider)
  const [sessaoExpirada] = useState(sessaoAcabouDeExpirar)
  useEffect(() => limparSessaoExpirada(), [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CamposLogin>({ defaultValues: { email: '', senha: '' } })

  const enviar = handleSubmit((campos) => {
    entrar.mutate(
      { email: campos.email.trim(), senha: campos.senha },
      { onSuccess: () => navigate(destino, { replace: true }) },
    )
  })

  // Quem já entrou não precisa ver o login
  if (usuario && !entrar.isPending && !entrar.isSuccess) {
    return <Navigate to={destino} replace />
  }

  return (
    <main className={styles.fundoMaior}>
      <div className={styles.fundoMenor}>
        <header className={styles.cabecalho}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <Titulo
            titulo='Entrar na sua conta'
            subtitulo='Acompanhe prazos, favoritos e o seu teste vocacional.'
            size="Medio"
          />
        </header>

        <form className={styles.form} onSubmit={enviar} noValidate>
          <TextInput
            label="E-mail"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email', { validate: validarEmail })}
          />
          <CampoSenha
            label="Senha"
            autoComplete="current-password"
            error={errors.senha?.message}
            labelAction={
              <Link to={ROTAS.esqueciSenha} className={styles.esqueciSenha}>
                Esqueci minha senha
              </Link>
            }
            {...register('senha', { required: 'Informe sua senha' })}
          />

          {sessaoExpirada && !entrar.isError && (
            <p className={styles.aviso} role="status">
              Sua sessão expirou. Entre de novo para continuar.
            </p>
          )}

          {/* Senha errada, sem internet, API fora do ar ou erro no servidor: a mensagem
              já vem pronta do ErroApi (lib/api/erros.ts) */}
          {entrar.isError && <AvisoErro>{entrar.error.message}</AvisoErro>}

          <Button type="submit" fullWidth className={styles.botaoEntrar} disabled={entrar.isPending}>
            {entrar.isPending ? 'Entrando…' : 'Entrar'}
          </Button>
          <div className={styles.cadastro}>
            <span>Primeiro acesso?</span>
            <Link to={ROTAS.cadastro} viewTransition className={styles.cadastroLink}>Criar conta</Link>
          </div>
        </form>
        <AcessarComoVisitante />
      </div>
    </main>
  )
}

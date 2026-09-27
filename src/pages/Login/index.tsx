import { Logo } from '../../components/logo/Logo'
import { Titulo } from '../../components/ui/Titulo/Titulo'
import styles from './index.module.scss'
import { TextInput } from '../../components/ui/TextInput/TextInput'
import { Button } from '../../components/ui/Botao/Botao'

export default function Login() {
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
          />
        </header>

        <div className={styles.form}>
          <TextInput
            label="E-mail"
            type="email"
            autoComplete="email"
          />
          <TextInput
            label="Senha"
            type="password"
            autoComplete="current-password"
            labelAction={
              <a href="/esqueci-senha" className={styles.esqueciSenha}>
                Esqueci minha senha
              </a>
            }
          />
          <Button type="submit" fullWidth className={styles.botaoEntrar}>Entrar</Button>
          <div className={styles.divider}>
            <span>ou</span>
          </div>
          <Button variant="outline" fullWidth>Entrar com Google</Button>
          <div className={styles.cadastro}>
            <span>Primeiro acesso?</span>
            <span className={styles.cadastroLink}>Criar conta</span>
          </div>
        </div>
      </div>
    </main>
  )
}

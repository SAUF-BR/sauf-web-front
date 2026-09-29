import { Logo } from '../../components/logo/Logo'
import { Button } from '../../components/ui/Botao/Botao'
import { TextInput } from '../../components/ui/TextInput/TextInput'
import { Titulo } from '../../components/ui/Titulo/Titulo'
import styles from './index.module.scss'
import { Link } from 'react-router-dom' 

export default function Cadastro() {
  return (
    <main className={styles.fundoMaior}>
      <div className={styles.fundoMenor}>
        <header className={styles.topo}>
          <div className={styles.topoLinha}>
            <Logo />
            <span className={styles.etapa}>Etapa 1 de 2</span>
          </div>

          <div className={styles.progresso}>
            <div className={styles.segmentoAtivo} />
            <div className={styles.segmento} />
          </div>
        </header>
        <Titulo
            titulo='Criar sua conta'
            subtitulo='Leva menos de um minuto. Usamos seus dados só para personalizar as recomendações.'
            size = 'Medio'
          />
        <div className={styles.form}>
          <TextInput
            label="Nome Completo"
            type="text"
          />
          <TextInput
            label="E-mail"
            type="email"
            autoComplete="email"
          />
          <TextInput
            label="Senha"
            type="password"
          />
        </div>
        <Button type="submit" fullWidth className={styles.botaoContinuar}>Continuar</Button>
        <div className={styles.acessar}>
            <span>Já tem conta?</span>
            <Link to="/login" viewTransition className={styles.acessarLink}>Entrar</Link>
          </div>
      </div>
    </main>
  )
}

import { Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../../components/ui/Botao/Botao'
import { ROTAS } from '../../../../routes/paths'
import styles from './BloqueioLogin.module.scss'

export function BloqueioLogin() {
  const navigate = useNavigate()

  return (
    <section className={styles.bloqueio} aria-labelledby="titulo-bloqueio">
      <span className={styles.cadeado} aria-hidden="true">
        <Lock size="1.25rem" />
      </span>

      <h2 id="titulo-bloqueio" className={styles.titulo}>
        Entre para ver e editar seus dados
      </h2>
      <p className={styles.descricao}>
        Com a conta ativa você acompanha prazos dos favoritos, informa sua nota do ENEM e gerencia
        seu plano.
      </p>

      <div className={styles.acoes}>
        <Button onClick={() => navigate(ROTAS.login)}>Entrar</Button>
        <Button variant="outline" onClick={() => navigate(ROTAS.cadastro)}>
          Criar conta
        </Button>
      </div>

      <p className={styles.nota}>Criar conta é gratuito e leva menos de um minuto.</p>
    </section>
  )
}

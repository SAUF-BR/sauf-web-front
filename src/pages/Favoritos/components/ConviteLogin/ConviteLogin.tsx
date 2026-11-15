import { Heart } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../../../../components/ui/Botao/Botao'
import { ROTAS } from '../../../../routes/paths'
import styles from './ConviteLogin.module.scss'

export function ConviteLogin() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <section className={styles.convite} aria-labelledby="titulo-convite-favoritos">
      <span className={styles.icone} aria-hidden="true">
        <Heart size="1.25rem" />
      </span>

      <h2 id="titulo-convite-favoritos" className={styles.titulo}>
        Entre para ver seus favoritos
      </h2>
      <p className={styles.descricao}>
        Com uma conta você salva cursos e universidades, compara as opções e acompanha os prazos.
      </p>

      <div className={styles.acoes}>
        <Button onClick={() => navigate(ROTAS.login, { state: { de: location } })}>Entrar</Button>
        <Button variant="outline" onClick={() => navigate(ROTAS.cadastro)}>
          Criar conta
        </Button>
      </div>
    </section>
  )
}
import { useUsuarioAtual } from '../../features/auth'
import { ErroConta } from '../../features/auth/components/ErroConta/ErroConta'
import { PerfilLogado } from './components/PerfilLogado/PerfilLogado'
import { PerfilVisitante } from './components/PerfilVisitante/PerfilVisitante'
import styles from './index.module.scss'

export default function Perfil() {
  const { data: usuario, isPending, isError } = useUsuarioAtual()

  // Enquanto carrega não dá para saber se a pessoa entrou; sem isso a tela
  // "piscaria" como visitante
  if (isPending) {
    return <main className={styles.carregando} aria-busy="true" />
  }

  // Falha ao consultar a conta (conexão ou servidor): avisa em vez de mostrar como visitante
  if (isError && usuario === undefined) {
    return (
      <main>
        <ErroConta />
      </main>
    )
  }

  // Único ponto de decisão da tela: o bloqueio de quem não entrou acontece aqui,
  // e não por redirecionamento, para o visitante ver o convite para entrar
  return <main>{usuario ? <PerfilLogado usuario={usuario} /> : <PerfilVisitante />}</main>
}

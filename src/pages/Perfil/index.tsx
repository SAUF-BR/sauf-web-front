import { useUsuarioAtual } from '../../features/auth'
import { PerfilLogado } from './components/PerfilLogado/PerfilLogado'
import { PerfilVisitante } from './components/PerfilVisitante/PerfilVisitante'
import styles from './index.module.scss'

export default function Perfil() {
  const { data: usuario, isPending } = useUsuarioAtual()

  // Enquanto carrega não dá para saber se a pessoa entrou; sem isso a tela
  // "piscaria" como visitante
  if (isPending) {
    return <main className={styles.carregando} aria-busy="true" />
  }

  // Único ponto de decisão da tela: o bloqueio de quem não entrou acontece aqui,
  // e não por redirecionamento, para o visitante ver o convite para entrar
  return <main>{usuario ? <PerfilLogado usuario={usuario} /> : <PerfilVisitante />}</main>
}

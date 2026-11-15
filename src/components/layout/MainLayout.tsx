import { Outlet, ScrollRestoration } from 'react-router-dom'
import { AceiteAtualizacao } from '../../features/documentos/components/AceiteAtualizacao/AceiteAtualizacao'
import { Header } from './Header/Header'
import styles from './MainLayout.module.scss'

export function MainLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
      <ScrollRestoration />
      {/* Conta com Termos de Uso ou Política de Privacidade novos para aceitar (D-93 da API) */}
      <AceiteAtualizacao />
    </div>
  )
}

import { Outlet } from 'react-router-dom'
import { Header } from './Header/Header'
import styles from './MainLayout.module.scss'

export function MainLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
    </div>
  )
}

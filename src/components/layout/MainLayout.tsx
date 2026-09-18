import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'

export function MainLayout() {
  return (
    <div className={styles.layout}>
      <Outlet />
    </div>
  )
}

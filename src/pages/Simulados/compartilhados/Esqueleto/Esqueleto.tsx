import type { CSSProperties, ReactNode } from 'react'
import { cn } from '../../../../lib/utils'
import styles from './Esqueleto.module.scss'

type EsqueletoProps = {
  className?: string
  largura?: CSSProperties['width']
  altura?: CSSProperties['height']
  redondo?: boolean
}

// Bloco cinza no lugar de um texto, número ou imagem que ainda está carregando
export function Esqueleto({ className, largura, altura, redondo = false }: EsqueletoProps) {
  return (
    <span
      className={cn(styles.bloco, redondo && styles.redondo, className)}
      style={{ width: largura, height: altura }}
    />
  )
}

type AreaCarregandoProps = {
  // Lido pelo leitor de tela no lugar dos blocos
  rotulo: string
  children: ReactNode
  className?: string
}

// Agrupa os blocos: um único aviso de carregamento para o leitor de tela
export function AreaCarregando({ rotulo, children, className }: AreaCarregandoProps) {
  return (
    <div role="status">
      <span className={styles.somenteLeitor}>{rotulo}</span>
      <div aria-hidden="true" className={className}>
        {children}
      </div>
    </div>
  )
}

// Card com o mesmo contorno dos cards de conteúdo
export function CartaoEsqueleto({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(styles.cartao, className)}>{children}</div>
}

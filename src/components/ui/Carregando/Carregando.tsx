import styles from './Carregando.module.scss'

type CarregandoProps = {
  mensagem?: string
  // 'compacto' cabe dentro de um card ou seção; o padrão ocupa a área da página
  compacto?: boolean
  className?: string
}

export function Carregando({ mensagem = 'Carregando…', compacto = false, className }: CarregandoProps) {
  const classes = [styles.carregando, compacto ? styles.compacto : '', className ?? ''].join(' ')

  return (
    <div role="status" className={classes}>
      <span className={styles.circulo} aria-hidden="true" />
      <span className={styles.mensagem}>{mensagem}</span>
    </div>
  )
}

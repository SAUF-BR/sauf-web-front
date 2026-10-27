import { CircleAlert, RefreshCw } from 'lucide-react'
import { Button } from '../Botao/Botao'
import styles from './EstadoErro.module.scss'

type EstadoErroProps = {
  titulo?: string
  descricao?: string
  // Sem onTentarDeNovo, o botão não aparece
  onTentarDeNovo?: () => void
  tentando?: boolean
  // 'compacto' cabe dentro de um card ou seção; o padrão ocupa a área da página
  compacto?: boolean
  className?: string
}

export function EstadoErro({
  titulo = 'Não foi possível carregar',
  descricao = 'Verifique sua conexão e tente novamente em instantes.',
  onTentarDeNovo,
  tentando = false,
  compacto = false,
  className,
}: EstadoErroProps) {
  const classes = [styles.erro, compacto ? styles.compacto : '', className ?? ''].join(' ')

  return (
    <div role="alert" className={classes}>
      <CircleAlert className={styles.icone} aria-hidden="true" />

      <div className={styles.textos}>
        <p className={styles.titulo}>{titulo}</p>
        <p className={styles.descricao}>{descricao}</p>
      </div>

      {onTentarDeNovo && (
        <Button variant="outline" onClick={onTentarDeNovo} disabled={tentando}>
          <RefreshCw className={tentando ? styles.girando : ''} size={16} aria-hidden="true" />
          {tentando ? 'Tentando…' : 'Tentar de novo'}
        </Button>
      )}
    </div>
  )
}

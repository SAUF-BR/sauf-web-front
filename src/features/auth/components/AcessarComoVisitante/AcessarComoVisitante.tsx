import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROTAS } from '../../../../routes/paths'
import styles from './AcessarComoVisitante.module.scss'

type AcessarComoVisitanteProps = {
  // Só o link, para ficar na mesma linha de outro texto (ex.: "Já tem conta? Entrar")
  compacto?: boolean
}

// Saída das telas sem header (login, cadastro, esqueci a senha): volta ao início sem
// entrar na conta. Vai sempre para o início, e não para a tela que pediu login, para
// não cair de novo no login.
export function AcessarComoVisitante({ compacto = false }: AcessarComoVisitanteProps) {
  const link = (
    <Link to={ROTAS.inicio} replace viewTransition className={styles.link}>
      {!compacto && <ArrowLeft size="0.875rem" aria-hidden="true" />}
      Acessar como visitante
    </Link>
  )

  return compacto ? link : <div className={styles.rodape}>{link}</div>
}

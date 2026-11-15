import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Breadcrumb, type ItemBreadcrumb } from '../../../../components/ui/Breadcrumb/Breadcrumb'
import { cn } from '../../../../lib/utils'
import styles from './Trilha.module.scss'

type TrilhaProps = {
  itens: ItemBreadcrumb[]
  // Para onde o botão leva quando a tela foi aberta direto (sem página anterior no app)
  voltarPara: string
  // Faixa escura (tela de questões): texto claro
  clara?: boolean
  className?: string
}

// Botão de voltar + trilha de navegação, no topo das telas de simulados
export function Trilha({ itens, voltarPara, clara = false, className }: TrilhaProps) {
  const navigate = useNavigate()

  const voltar = () => {
    // O react-router guarda a posição no histórico em history.state.idx
    const posicao = (window.history.state as { idx?: number } | null)?.idx ?? 0
    if (posicao > 0) navigate(-1)
    else navigate(voltarPara)
  }

  return (
    <div className={cn(styles.trilha, clara && styles.clara, className)}>
      <button type="button" className={styles.voltar} onClick={voltar}>
        <ArrowLeft size={18} aria-hidden="true" />
        <span>Voltar</span>
      </button>
      <Breadcrumb itens={itens} className={styles.migalhas} />
    </div>
  )
}

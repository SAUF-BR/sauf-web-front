import { User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../../components/ui/Botao/Botao'
import { Tag } from '../../../../components/ui/Tag/Tag'
import { ROTAS } from '../../../../routes/paths'
import { BloqueioLogin } from '../BloqueioLogin/BloqueioLogin'
import { CartaoAssinatura } from '../CartaoAssinatura/CartaoAssinatura'
import { CartaoSair } from '../CartaoSair/CartaoSair'
import { DadosPessoaisBloqueados } from '../DadosPessoaisBloqueados/DadosPessoaisBloqueados'
import { LayoutPerfil } from '../LayoutPerfil/LayoutPerfil'
import { SecaoPerfil } from '../SecaoPerfil/SecaoPerfil'
import styles from './PerfilVisitante.module.scss'

// Perfil de quem não entrou: mostra a estrutura da página bloqueada e convida a
// entrar ou criar conta.
export function PerfilVisitante() {
  const navigate = useNavigate()

  return (
    <LayoutPerfil
      visitante
      foto={
        <span className={styles.foto} aria-hidden="true">
          <User size="2.5rem" />
        </span>
      }
      titulo="Visitante"
      subtitulo="Entre na sua conta para ver seus dados, sua nota do ENEM e o seu plano."
      extra={
        <div className={styles.tags}>
          <Tag>Sem plano ativo</Tag>
          <Tag>Nenhum favorito salvo</Tag>
        </div>
      }
      acoes={
        <>
          <Button variant="outline" onClick={() => navigate(ROTAS.cadastro)}>
            Criar conta
          </Button>
          <Button onClick={() => navigate(ROTAS.login)}>Entrar</Button>
        </>
      }
    >
      <BloqueioLogin />

      <SecaoPerfil id="secao-dados" titulo="Dados pessoais" aviso="Disponível após entrar">
        <DadosPessoaisBloqueados />
      </SecaoPerfil>

      <SecaoPerfil
        id="secao-assinatura"
        titulo="Assinatura"
        observacao="Trocar de plano e cancelar a assinatura ficam na tela de assinatura."
      >
        <CartaoAssinatura visitante />
      </SecaoPerfil>

      <CartaoSair descricao="Nenhuma sessão ativa neste dispositivo." desabilitado />
    </LayoutPerfil>
  )
}

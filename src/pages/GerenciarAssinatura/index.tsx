import { Link } from 'react-router-dom'
import {
  compararPlano,
  obterSituacao,
  recursosNovos,
  useAssinaturaAtual,
  useCancelarAssinatura,
  usePlanos,
  useReativarAssinatura,
  useTrocarPlano,
} from '../../features/assinatura'
import { ROTAS } from '../../routes/paths'
import { CartaoCancelamento } from './components/CartaoCancelamento/CartaoCancelamento'
import { CartaoPlano } from './components/CartaoPlano/CartaoPlano'
import { ResumoAssinatura } from './components/ResumoAssinatura/ResumoAssinatura'
import { TEXTOS_CABECALHO } from './conteudo'
import styles from './index.module.scss'

export default function GerenciarAssinatura() {
  const { data: planos } = usePlanos()
  const { data: assinatura, isPending } = useAssinaturaAtual()
  const trocarPlano = useTrocarPlano()
  const cancelar = useCancelarAssinatura()
  const reativar = useReativarAssinatura()

  // Enquanto carrega não dá para saber a situação; sem isso a tela "piscaria"
  // como se a pessoa não tivesse assinatura
  if (isPending) {
    return <main className={styles.carregando} aria-busy="true" />
  }

  // Único ponto de decisão da tela: tudo abaixo depende só destes valores
  const situacao = obterSituacao(assinatura)
  const planoAtual = planos?.find((plano) => plano.id === assinatura?.plano)
  const textos = TEXTOS_CABECALHO[situacao === 'sem-assinatura' ? 'semAssinatura' : 'assinante']
  const ocupado = trocarPlano.isPending || reativar.isPending

  return (
    <main>
      <section className={styles.cabecalho}>
        <div className={styles.cabecalhoConteudo}>
          <div>
            <nav aria-label="Você está em" className={styles.trilha}>
              <Link to={ROTAS.perfil} className={styles.trilhaLink}>
                Minha conta
              </Link>
              <span aria-hidden="true"> / </span>
              <span aria-current="page">Assinatura</span>
            </nav>

            <h1 className={styles.titulo}>{textos.titulo}</h1>
            <p className={styles.descricao}>{textos.descricao}</p>
          </div>

          {assinatura && planoAtual && (
            <ResumoAssinatura assinatura={assinatura} plano={planoAtual} />
          )}
        </div>
      </section>

      <div className={styles.conteudo}>
        <ul className={styles.planos}>
          {planos?.map((plano, _indice, todos) => (
            <li key={plano.id}>
              <CartaoPlano
                plano={plano}
                relacao={compararPlano(plano, planoAtual)}
                situacao={situacao}
                planoAtual={planoAtual}
                renovaEm={assinatura?.renovaEm}
                recursosNovos={recursosNovos(plano, todos)}
                desabilitado={ocupado}
                onEscolher={() => trocarPlano.mutate(plano.id)}
                onReativar={() => reativar.mutate()}
              />
            </li>
          ))}
        </ul>

        {situacao === 'ativa' && assinatura && planoAtual && (
          <div className={styles.rodape}>
            <CartaoCancelamento
              plano={planoAtual}
              acessoAte={assinatura.renovaEm}
              cancelando={cancelar.isPending}
              onConfirmar={() => cancelar.mutate()}
            />
          </div>
        )}
      </div>
    </main>
  )
}

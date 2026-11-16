import { EstadoConsulta } from '../../components/ui/EstadoConsulta/EstadoConsulta'
import {
  compararPlano,
  obterSituacao,
  planoGratuito,
  recursosNovos,
  useAssinaturaAtual,
  useCancelarAssinatura,
  usePlanos,
  useReativarAssinatura,
  useTrocarPlano,
} from '../../features/assinatura'
import { ROTAS } from '../../routes/paths'
import { Trilha } from '../Simulados/compartilhados/Trilha/Trilha'
import { CartaoCancelamento } from './components/CartaoCancelamento/CartaoCancelamento'
import { CartaoPlano } from './components/CartaoPlano/CartaoPlano'
import { ResumoAssinatura } from './components/ResumoAssinatura/ResumoAssinatura'
import { TEXTOS_CABECALHO } from './conteudo'
import styles from './index.module.scss'

export default function GerenciarAssinatura() {
  const consultaPlanos = usePlanos()
  const consultaAssinatura = useAssinaturaAtual()
  const trocarPlano = useTrocarPlano()
  const cancelar = useCancelarAssinatura()
  const reativar = useReativarAssinatura()
  const ocupado = trocarPlano.isPending || reativar.isPending || cancelar.isPending

  return (
    <main>
      {/* Até as duas consultas chegarem não dá para saber a situação; sem isso a tela
          "piscaria" como se a pessoa não tivesse assinatura */}
      <EstadoConsulta
        consultas={[consultaPlanos, consultaAssinatura]}
        mensagemCarregando="Carregando sua assinatura…"
        tituloErro="Não foi possível carregar os planos"
        className={styles.estado}
      >
        {([planos, assinatura]) => {
          // Único ponto de decisão da tela: tudo abaixo depende só destes valores
          const situacao = obterSituacao(assinatura)
          const planoAtual = planos.find((plano) => plano.id === assinatura?.plano)
          const planoFree = planos.find(planoGratuito)
          const textos =
            TEXTOS_CABECALHO[situacao === 'sem-assinatura' ? 'semAssinatura' : 'assinante']

          // O erro aparece no cartão onde a pessoa clicou: o plano escolhido ou,
          // para reativar, o plano atual
          function erroDoCartao(planoId: string) {
            if (trocarPlano.isError && trocarPlano.variables === planoId) {
              return trocarPlano.error.message
            }
            if (reativar.isError && planoId === planoAtual?.id) return reativar.error.message
            if (cancelar.isError && planoId === planoFree?.id) return cancelar.error.message
          }

          // Voltar ao Free é cancelar o plano pago: o Free não se assina
          function escolher(plano: (typeof planos)[number]) {
            if (planoGratuito(plano)) cancelar.mutate()
            else trocarPlano.mutate(plano.id)
          }

          return (
            <>
              <section className={styles.cabecalho}>
                <div className={styles.cabecalhoConteudo}>
                  <div>
                    {/* Volta para a tela anterior; aberta direto, leva ao perfil */}
                    <Trilha
                      itens={[{ rotulo: 'Minha conta', para: ROTAS.perfil }, { rotulo: 'Assinatura' }]}
                      voltarPara={ROTAS.perfil}
                      semFundo
                    />

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
                  {planos.map((plano, _indice, todos) => (
                    <li key={plano.id}>
                      <CartaoPlano
                        plano={plano}
                        relacao={compararPlano(plano, planoAtual)}
                        situacao={situacao}
                        planoAtual={planoAtual}
                        renovaEm={assinatura?.renovaEm}
                        recursosNovos={recursosNovos(plano, todos)}
                        desabilitado={ocupado}
                        erro={erroDoCartao(plano.id)}
                        onEscolher={() => escolher(plano)}
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
                      erro={cancelar.error?.message}
                      onConfirmar={() => cancelar.mutate()}
                    />
                  </div>
                )}
              </div>
            </>
          )
        }}
      </EstadoConsulta>
    </main>
  )
}

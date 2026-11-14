import { useState } from 'react'
import { ClipboardList } from 'lucide-react'
import { ROTAS } from '../../../../routes/paths'
import { useNavigate } from 'react-router-dom'
import { StatCard } from './components/StatCard/StatCard'
import { SimuladoCard } from './components/SimuladoCard/SimuladoCard'
import styles from './index.module.scss'
import { Seletor, type OpcaoSeletor } from '../../compartilhados/Seletor/Seletor'
import { CabecalhoSimulados } from '../../compartilhados/CabecalhoSimulados/CabecalhoSimulados'
import { EstadoConsulta } from '../../../../components/ui/EstadoConsulta/EstadoConsulta'
import { EsqueletoLista, EsqueletoResumo } from './components/EsqueletoSimulados/EsqueletoSimulados'
import {
  NOME_AREA,
  useResumoSimulados,
  useSimulados,
  type OrdemSimulados,
} from '../../../../features/simulados'
import { formatarPorcentagem } from '../../../../lib/utils/formatadores'

const POR_PAGINA = 12

// Só o ENEM tem questões por enquanto; os outros aparecem como "em breve"
const OPCOES_VESTIBULAR: OpcaoSeletor<string>[] = [
  { valor: 'enem', rotulo: 'ENEM' },
  { valor: 'uem', rotulo: 'UEM', desabilitada: true, detalhe: 'em breve' },
  { valor: 'utfpr', rotulo: 'UTFPR', desabilitada: true, detalhe: 'em breve' },
  { valor: 'uel', rotulo: 'UEL', desabilitada: true, detalhe: 'em breve' },
]

const OPCOES_ORDEM: OpcaoSeletor<OrdemSimulados>[] = [
  { valor: 'recente', rotulo: 'Mais recente' },
  { valor: 'antigo', rotulo: 'Mais antigo' },
  { valor: 'maior_nota', rotulo: 'Maior nota' },
  { valor: 'menor_nota', rotulo: 'Menor nota' },
]

const NADA = () => {}

export default function SimuladosMain() {
  const navigate = useNavigate()

  const [ordem, setOrdem] = useState<OrdemSimulados>('recente')
  const [pagina, setPagina] = useState(0)

  const resumo = useResumoSimulados()
  const simulados = useSimulados({ ordem, page: pagina, size: POR_PAGINA })

  const criarSimulado = () => navigate(ROTAS.simuladosConfiguracao)
  // Sem nenhum simulado, o estado vazio já convida a criar; o banner do rodapé sairia repetido
  const semSimulados = simulados.data?.totalElements === 0

  return (
    <main className={styles.pageWrapper}>
      <CabecalhoSimulados
        abaAtiva="simulados"
        titulo="Simulados"
        descricao="Simulados do ENEM e de vestibulares"
        acoes={
          <button type="button" className={styles.createBtn} onClick={criarSimulado}>
            + Criar novo simulado
          </button>
        }
      />

      <section className={styles.mainContentSection}>
        <div className={styles.mainContentContainer}>
          <EstadoConsulta
            consultas={[resumo]}
            compacto
            carregando={<EsqueletoResumo className={styles.statsGrid} />}
            tituloErro="Não foi possível carregar seu resumo"
          >
            {([dados]) => (
              <div className={styles.statsGrid}>
                <StatCard label="SIMULADOS FEITOS" valor={dados.simuladosFeitos} />
                <StatCard label="QUESTÕES RESPONDIDAS" valor={dados.questoesRespondidas} />
                <StatCard
                  label="APROVEITAMENTO MÉDIO"
                  valor={
                    dados.aproveitamentoMedio === null
                      ? '—'
                      : formatarPorcentagem(dados.aproveitamentoMedio)
                  }
                  destaqueColor="#15803d"
                />
                <StatCard
                  label="MELHOR CATEGORIA"
                  valor={
                    dados.melhorArea === null
                      ? '—'
                      : `${NOME_AREA[dados.melhorArea.area]} · ${formatarPorcentagem(dados.melhorArea.porcentagem)}`
                  }
                />
              </div>
            )}
          </EstadoConsulta>

          <div className={styles.listHeaderRow}>
            <div>
              <h2 className={styles.sectionTitle}>Meus simulados</h2>
              <p className={styles.sectionSubtitle}>
                Revise as questões que você acertou e errou em cada tentativa
              </p>
            </div>

            <div className={styles.filterControls}>
              <Seletor
                rotulo="Vestibular"
                valor="enem"
                opcoes={OPCOES_VESTIBULAR}
                onMudar={NADA}
              />

              <Seletor
                rotulo="Ordenar"
                valor={ordem}
                opcoes={OPCOES_ORDEM}
                onMudar={(novaOrdem) => {
                  setOrdem(novaOrdem)
                  setPagina(0)
                }}
              />
            </div>
          </div>

          <EstadoConsulta
            consultas={[simulados]}
            compacto
            carregando={<EsqueletoLista />}
            tituloErro="Não foi possível carregar seus simulados"
          >
            {([lista]) =>
              lista.content.length === 0 ? (
                <div className={styles.vazio}>
                  <span className={styles.vazioIcone} aria-hidden="true">
                    <ClipboardList size={28} />
                  </span>
                  <h3>Você ainda não fez nenhum simulado</h3>
                  <p>
                    Monte o primeiro em menos de um minuto: escolha o tamanho, as áreas do ENEM e
                    se quer cronômetro. Depois é só acompanhar seu desempenho por aqui.
                  </p>
                  <button type="button" className={styles.bannerBtn} onClick={criarSimulado}>
                    + Criar meu primeiro simulado
                  </button>
                </div>
              ) : (
                <>
                  <div className={styles.simuladosList}>
                    {lista.content.map((simulado) => (
                      <SimuladoCard key={simulado.id} simulado={simulado} />
                    ))}
                  </div>

                  {lista.totalPages > 1 && (
                    <nav className={styles.paginacao} aria-label="Paginação dos simulados">
                      <button
                        type="button"
                        disabled={lista.page <= 0}
                        onClick={() => setPagina(lista.page - 1)}
                      >
                        Anterior
                      </button>
                      <span>
                        Página {lista.page + 1} de {lista.totalPages}
                      </span>
                      <button
                        type="button"
                        disabled={lista.page + 1 >= lista.totalPages}
                        onClick={() => setPagina(lista.page + 1)}
                      >
                        Próxima
                      </button>
                    </nav>
                  )}
                </>
              )
            }
          </EstadoConsulta>

          {!semSimulados && (
            <div className={styles.bannerCta}>
              <div>
                <h3>Monte um simulado do jeito que você precisa</h3>
                <p>Escolha o vestibular, as categorias, a quantidade de questões e se quer tempo cronometrado.</p>
              </div>

              <button type="button" className={styles.bannerBtn} onClick={criarSimulado}>
                + Criar novo simulado
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

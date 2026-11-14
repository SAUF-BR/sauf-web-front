import { lazy, Suspense, type ReactNode } from 'react'
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { MainLayout } from '../components/layout/MainLayout'
import { PrivateRoute } from '../routes/PrivateRoute'
import { SemAssinaturaRoute } from '../routes/SemAssinaturaRoute'
import { SubscriberRoute } from '../routes/SubscriberRoute'
import { ROTAS } from '../routes/paths'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'
import Cursos from '../pages/Cursos'
import CursoDetalhe from '../pages/CursoDetalhe'
import Universidades from '../pages/Universidades'
import UniversidadeDetalhe from '../pages/UniversidadeDetalhe'
import { FormasIngresso } from '../pages/FormasDeIngresso'
import Calendario from '../pages/Calendario'
import TesteVocacional from '../pages/TesteVocacional'
import Perguntas from '../pages/TesteVocacional/Perguntas'
import ResultadoTeste from '../pages/TesteVocacional/Resultado'
import Paywall from '../pages/Simulados/Paywall'
import Favoritos from '../pages/Favoritos'
import Notificacoes from '../pages/Notificacoes'
import Perfil from '../pages/Perfil'
import GerenciarAssinatura from '../pages/GerenciarAssinatura'
import NotFound from '../pages/NotFound'
import { Carregando } from '../components/ui/Carregando/Carregando'

// Telas de simulados (só para assinantes, com o react-markdown) em arquivos separados:
// quem não assina não baixa esse código
const SimuladosMain = lazy(() => import('../pages/Simulados/Screens/Simulados_main'))
const SimuladosConfiguracao = lazy(() => import('../pages/Simulados/Screens/Simulados_configuracao'))
const SimuladosQuestoes = lazy(() => import('../pages/Simulados/Screens/Simulados_questoes'))
const SimuladosRevisao = lazy(() => import('../pages/Simulados/Screens/Simulados_historico'))
const SimuladosMeuAcompanhamento = lazy(() => import('../pages/Simulados/Screens/Meu_acompanhamento'))
const Cronometro = lazy(() => import('../pages/Simulados/Screens/Cronometro'))
const Ranking = lazy(() => import('../pages/Simulados/Screens/Ranking'))

function SobDemanda({ children }: { children: ReactNode }) {
  return <Suspense fallback={<Carregando mensagem="Abrindo…" />}>{children}</Suspense>
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Telas de autenticação: tela cheia, sem o header da aplicação */}
      <Route path={ROTAS.login} element={<Login />} />
      <Route path={ROTAS.cadastro} element={<Cadastro />} />

      {/* Simulado em andamento: header próprio, mas exige assinatura */}
      <Route element={<SubscriberRoute />}>
        <Route path={ROTAS.simuladosQuestoes(':id')} element={<SobDemanda><SimuladosQuestoes /></SobDemanda>} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path={ROTAS.inicio} element={<Home />} />

        <Route path={ROTAS.cursos} element={<Cursos />} />
        <Route path={ROTAS.cursoDetalhe(':cursoId')} element={<CursoDetalhe />} />

        <Route path={ROTAS.universidades} element={<Universidades />} />
        <Route
          path={ROTAS.universidadeDetalhe(':universidadeId')}
          element={<UniversidadeDetalhe />}
        />

        <Route path={ROTAS.formasDeIngresso} element={<FormasIngresso />} />
        <Route path={ROTAS.calendario} element={<Calendario />} />

        {/* Teste vocacional: apresentação pública, perguntas e resultado exigem login */}
        <Route path={ROTAS.testeVocacional} element={<TesteVocacional />} />
        <Route element={<PrivateRoute />}>
          <Route path={ROTAS.testeVocacionalPerguntas} element={<Perguntas />} />
          <Route path={ROTAS.testeVocacionalResultado} element={<ResultadoTeste />} />
        </Route>

        {/* Simulados: a tela principal exige assinatura ativa; quem não assina vê o
            paywall (e quem assina é redirecionado dele para os simulados). */}
        <Route element={<SubscriberRoute />}>
          <Route path={ROTAS.simulados} element={<SobDemanda><SimuladosMain /></SobDemanda>} />
          <Route path={ROTAS.simuladosMain} element={<Navigate to={ROTAS.simulados} replace />} />
          <Route path={ROTAS.simuladosConfiguracao} element={<SobDemanda><SimuladosConfiguracao /></SobDemanda>} />
          <Route path={ROTAS.simuladosRevisao(':id')} element={<SobDemanda><SimuladosRevisao /></SobDemanda>} />
          <Route path={ROTAS.simuladosAcompanhamento} element={<SobDemanda><SimuladosMeuAcompanhamento /></SobDemanda>} />
          <Route path={ROTAS.simuladosCronometro} element={<SobDemanda><Cronometro /></SobDemanda>} />
          <Route path={ROTAS.simuladosRanking} element={<SobDemanda><Ranking /></SobDemanda>} />
        </Route>
        <Route element={<SemAssinaturaRoute />}>
          <Route path={ROTAS.simuladosPaywall} element={<Paywall />} />
        </Route>

        <Route path={ROTAS.favoritos} element={<Favoritos />} />
        <Route path={ROTAS.notificacoes} element={<Notificacoes />} />
        <Route path={ROTAS.perfil} element={<Perfil />} />
        <Route path={ROTAS.perfilAssinatura} element={<GerenciarAssinatura />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </>,
  ),
)

export function AppRouter() {
  return <RouterProvider router={router} />
}

import {
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
import FormasDeIngresso from '../pages/FormasDeIngresso'
import Calendario from '../pages/Calendario'
import TesteVocacional from '../pages/TesteVocacional'
import Perguntas from '../pages/TesteVocacional/Perguntas'
import Simulados from '../pages/Simulados'
import Paywall from '../pages/Simulados/Paywall'
import SimuladosMain from '../pages/Simulados/Screens/Simulados_main'
import SimuladosConfiguracao from '../pages/Simulados/Screens/Simulados_configuração'
import SimuladosQuestões from '../pages/Simulados/Screens/Simulados_questões'
import SimuladosHistórico from '../pages/Simulados/Screens/Simulados_histórico'
import SimuladosMeuAcompanhamento from '../pages/Simulados/Screens/Meu_acompanhamento'
import Cronometro from '../pages/Simulados/Screens/Cronometro'
import Ranking from '../pages/Simulados/Screens/Ranking'
import Favoritos from '../pages/Favoritos'
import Notificacoes from '../pages/Notificacoes'
import Perfil from '../pages/Perfil'
import GerenciarAssinatura from '../pages/GerenciarAssinatura'
import NotFound from '../pages/NotFound'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Telas de autenticação: tela cheia, sem o header da aplicação */}
      <Route path={ROTAS.login} element={<Login />} />
      <Route path={ROTAS.cadastro} element={<Cadastro />} />

      <Route element={<MainLayout />}>
        <Route path={ROTAS.inicio} element={<Home />} />

        <Route path={ROTAS.cursos} element={<Cursos />} />
        <Route path={ROTAS.cursoDetalhe(':cursoId')} element={<CursoDetalhe />} />

        <Route path={ROTAS.universidades} element={<Universidades />} />
        <Route
          path={ROTAS.universidadeDetalhe(':universidadeId')}
          element={<UniversidadeDetalhe />}
        />

        <Route path={ROTAS.formasDeIngresso} element={<FormasDeIngresso />} />
        <Route path={ROTAS.calendario} element={<Calendario />} />

        {/* Teste vocacional: apresentação pública, perguntas exigem login */}
        <Route path={ROTAS.testeVocacional} element={<TesteVocacional />} />
        <Route element={<PrivateRoute />}>
          <Route path={ROTAS.testeVocacionalPerguntas} element={<Perguntas />} />
        </Route>

        {/* Simulados: a tela principal exige assinatura ativa; quem não assina vê o
            paywall (e quem assina é redirecionado dele para os simulados). */}
        <Route element={<SubscriberRoute />}>
          <Route path={ROTAS.simulados} element={<Simulados />} />
          <Route path={ROTAS.simuladosMain} element={<SimuladosMain />} />
          <Route path={ROTAS.simuladosConfiguracao} element={<SimuladosConfiguracao />} />
          <Route path={ROTAS.simuladosQuestoes} element={<SimuladosQuestões />} />
          <Route path={ROTAS.simuladosHistorico} element={<SimuladosHistórico />} />
          <Route path={ROTAS.simuladosAcompanhamento} element={<SimuladosMeuAcompanhamento />} />
          <Route path={ROTAS.simuladosCronometro} element={<Cronometro />} />
          <Route path={ROTAS.simuladosRanking} element={<Ranking />} />
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

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from '../components/layout/MainLayout'
import { PrivateRoute } from '../routes/PrivateRoute'
import { SubscriberRoute } from '../routes/SubscriberRoute'

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
import SimuladosConteudo from '../pages/Simulados/SimuladosConteudo'
import Favoritos from '../pages/Favoritos'
import Notificacoes from '../pages/Notificacoes'
import Perfil from '../pages/Perfil'
import GerenciarAssinatura from '../pages/GerenciarAssinatura'
import NotFound from '../pages/NotFound'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          <Route path="/cursos" element={<Cursos />} />
          <Route path="/cursos/:cursoId" element={<CursoDetalhe />} />

          <Route path="/universidades" element={<Universidades />} />
          <Route path="/universidades/:universidadeId" element={<UniversidadeDetalhe />} />

          <Route path="/formas-de-ingresso" element={<FormasDeIngresso />} />
          <Route path="/calendario" element={<Calendario />} />

          {/* Teste vocacional: apresentação pública, perguntas exigem login */}
          <Route path="/teste-vocacional" element={<TesteVocacional />} />
          <Route element={<PrivateRoute />}>
            <Route path="/teste-vocacional/perguntas" element={<Perguntas />} />
          </Route>

          {/* Simulados: apresentação e paywall públicos, conteúdo exige assinatura ativa */}
          <Route path="/simulados" element={<Simulados />} />
          <Route path="/simulados/paywall" element={<Paywall />} />
          <Route element={<SubscriberRoute />}>
            <Route path="/simulados/conteudo" element={<SimuladosConteudo />} />
          </Route>

          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/perfil/assinatura" element={<GerenciarAssinatura />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

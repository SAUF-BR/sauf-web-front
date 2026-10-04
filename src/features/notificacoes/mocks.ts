import { ROTAS } from '../../routes/paths'
import type { Notificacao } from './types'

// Dados mockados — remover quando a API estiver disponível.

const HORA_EM_MS = 60 * 60 * 1000

function horasAtras(horas: number) {
  return new Date(Date.now() - horas * HORA_EM_MS).toISOString()
}

export const notificacoesMock: Notificacao[] = [
  {
    id: 'n-01',
    titulo: 'Inscrições do ENEM abertas',
    descricao: 'Você tem até 8 de novembro para se inscrever.',
    criadaEm: horasAtras(2),
    lida: false,
    acao: { rotulo: 'Ver guia do ENEM', para: ROTAS.formasDeIngresso },
  },
  {
    id: 'n-02',
    titulo: 'Prazo de um favorito',
    descricao: 'Biomedicina · o vestibular da UEM encerra em 7 dias.',
    criadaEm: horasAtras(24),
    lida: false,
    acao: { rotulo: 'Ver curso', para: ROTAS.cursoDetalhe('c-biomedicina-uem') },
  },
  {
    id: 'n-03',
    titulo: 'Resultado do teste vocacional',
    descricao: 'Sua área sugerida é Tecnologia. Veja os cursos recomendados.',
    criadaEm: '2026-06-26T14:00:00-03:00',
    lida: false,
  },
  {
    id: 'n-04',
    titulo: 'Novo evento em Maringá',
    descricao: 'Feira de profissões da UEM, com inscrição gratuita.',
    criadaEm: '2026-05-17T10:00:00-03:00',
    lida: true,
  },
  {
    id: 'n-05',
    titulo: 'Resultado do SISU',
    descricao: 'A lista da primeira chamada já está disponível.',
    criadaEm: '2026-02-03T09:00:00-03:00',
    lida: true,
    acao: { rotulo: 'Ver calendário', para: ROTAS.calendario },
  },
  {
    id: 'n-06',
    titulo: 'Bem-vindo ao SAUF.BR',
    descricao: 'Complete seu perfil para receber recomendações de cursos.',
    criadaEm: '2026-01-20T16:30:00-03:00',
    lida: true,
    acao: { rotulo: 'Ir para o perfil', para: ROTAS.perfil },
  },
]

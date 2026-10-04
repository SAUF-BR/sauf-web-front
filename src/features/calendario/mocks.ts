import type { EventoCalendario, Prazo } from './types'

// Dados mockados — remover quando a API estiver disponível.

export const proximosPrazosMock: Prazo[] = [
  {
    id: 'p-prouni-2sem',
    titulo: 'Inscrições PROUni 2º semestre',
    data: '2026-10-04',
    descricao: 'Encerra em 7 dias',
  },
  {
    id: 'p-vestibular-uem',
    titulo: 'Vestibular UEM — prova 1',
    data: '2026-10-18',
    descricao: 'Maringá · presencial',
  },
  {
    id: 'p-resultado-fies',
    titulo: 'Resultado FIES',
    data: '2026-11-06',
    descricao: 'Você acompanha 2 cursos',
  },
]

export const eventosCalendarioMock: EventoCalendario[] = [
  { id: 'e-01', titulo: 'Inscrições SISU', tipo: 'inscricao', data: '2026-06-02' },
  { id: 'e-02', titulo: 'Resultado SISU', tipo: 'resultado', data: '2026-06-23' },
  { id: 'e-03', titulo: 'Inscrições PROUni', tipo: 'inscricao', data: '2026-09-01' },
  { id: 'e-04', titulo: 'Resultado 1ª chamada', tipo: 'resultado', data: '2026-09-01' },
  { id: 'e-05', titulo: 'Comprovação PROUni', tipo: 'inscricao', data: '2026-09-02' },
  { id: 'e-06', titulo: 'Feira de profissões UEM', tipo: 'feira', data: '2026-09-04' },
  { id: 'e-07', titulo: 'Vestibular UEM · prova 1', tipo: 'prova', data: '2026-09-05' },
  { id: 'e-08', titulo: 'Vestibular UEM · prova 2', tipo: 'prova', data: '2026-09-06' },
  { id: 'e-09', titulo: 'Inscrições UniCesumar', tipo: 'inscricao', data: '2026-09-08' },
  { id: 'e-10', titulo: 'Fim da comprovação', tipo: 'inscricao', data: '2026-09-09' },
  { id: 'e-11', titulo: 'Portas abertas UTFPR', tipo: 'feira', data: '2026-09-12' },
  { id: 'e-12', titulo: 'Resultado FIES', tipo: 'resultado', data: '2026-09-14' },
  { id: 'e-13', titulo: 'Lista de espera PROUni', tipo: 'resultado', data: '2026-09-15' },
  { id: 'e-14', titulo: 'Vestibular UniCesumar', tipo: 'prova', data: '2026-09-18' },
  { id: 'e-15', titulo: 'Inscrições ENEM', tipo: 'inscricao', data: '2026-09-21' },
  { id: 'e-16', titulo: 'Webinar bolsas', tipo: 'feira', data: '2026-09-24' },
  { id: 'e-17', titulo: 'Fim insc. UniCesumar', tipo: 'inscricao', data: '2026-09-26' },
  { id: 'e-18', titulo: 'Prova UTFPR', tipo: 'prova', data: '2026-09-29' },
  { id: 'e-19', titulo: 'Inscrições Vestibular UEL', tipo: 'inscricao', data: '2026-10-01' },
  { id: 'e-20', titulo: 'Fim inscrições PROUni', tipo: 'inscricao', data: '2026-10-04' },
  { id: 'e-21', titulo: 'Feira de cursos PUCPR', tipo: 'feira', data: '2026-10-10' },
  { id: 'e-22', titulo: 'Vestibular UEL · 1ª fase', tipo: 'prova', data: '2026-10-18' },
  { id: 'e-23', titulo: 'Resultado UniCesumar', tipo: 'resultado', data: '2026-10-23' },
  { id: 'e-24', titulo: 'Mostra de profissões UFPR', tipo: 'feira', data: '2026-10-23' },
  { id: 'e-25', titulo: 'ENEM · 1º dia', tipo: 'prova', data: '2026-11-08' },
  { id: 'e-26', titulo: 'ENEM · 2º dia', tipo: 'prova', data: '2026-11-15' },
  { id: 'e-27', titulo: 'Resultado Vestibular UEL', tipo: 'resultado', data: '2026-12-11' },
]

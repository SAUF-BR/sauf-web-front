import type { Modalidade } from '../../features/cursos'

export type Aba = { id: string; rotulo: string }

export const Abas_universidade: Aba[] = [{ id: 'visao-geral', rotulo: 'Visão geral' }]

export const Ordem_modalidades: Modalidade[] = ['presencial', 'semipresencial', 'ead']

export const Rotulo_modalidade_detalhe: Record<Modalidade, string> = {
  presencial: 'Presencial',
  semipresencial: 'Semipresencial',
  ead: 'A distância (EaD)',
}
import {
  CalendarDays,
  DoorOpen,
  FilePenLine,
  GraduationCap,
  Landmark,
  Lightbulb,
  type LucideIcon,
} from 'lucide-react'
import { formatarInteiro } from '../../lib/utils'
import { ROTAS } from '../../routes/paths'

// Conteúdo editorial da Home (textos e atalhos). Dados vindos da API ficam nos
// hooks das features, não aqui.

// TODO: avaliar se as buscas populares virão da API (ex.: termos mais buscados)
export const BUSCAS_POPULARES = ['Medicina', 'Nota de corte SISU', 'EaD em Pedagogia']

export type VarianteAtalho = 'amarelo' | 'verde' | 'azul' | 'neutro'

export type Atalho = {
  id: string
  titulo: string
  descricao?: string
  para: string
  variante: VarianteAtalho
  icone: LucideIcon
}

type DadosAtalhos = {
  totalCursos?: number
}

export function montarAtalhos({ totalCursos }: DadosAtalhos): Atalho[] {
  return [
    {
      id: 'simulados',
      titulo: 'Acessar simulados',
      descricao: 'Treine para o ENEM',
      para: ROTAS.simulados,
      variante: 'amarelo',
      icone: FilePenLine,
    },
    {
      id: 'cursos',
      titulo: 'Explorar cursos',
      descricao: totalCursos !== undefined ? `${formatarInteiro(totalCursos)} cursos` : undefined,
      para: ROTAS.cursos,
      variante: 'verde',
      icone: GraduationCap,
    },
    {
      id: 'teste-vocacional',
      titulo: 'Teste vocacional',
      descricao: '12 minutos',
      para: ROTAS.testeVocacional,
      variante: 'azul',
      icone: Lightbulb,
    },
    {
      id: 'formas-de-ingresso',
      titulo: 'Formas de ingresso',
      para: ROTAS.formasDeIngresso,
      variante: 'neutro',
      icone: DoorOpen,
    },
    {
      id: 'universidades',
      titulo: 'Universidades',
      para: ROTAS.universidades,
      variante: 'neutro',
      icone: Landmark,
    },
    {
      id: 'calendario',
      titulo: 'Calendário',
      para: ROTAS.calendario,
      variante: 'neutro',
      icone: CalendarDays,
    },
  ]
}

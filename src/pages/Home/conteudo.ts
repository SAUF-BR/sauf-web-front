import { formatarInteiro } from '../../lib/utils'
import { ROTAS } from '../../routes/paths'

// Conteúdo editorial da Home (textos e atalhos). Dados vindos da API ficam nos
// hooks das features, não aqui.

// TODO: avaliar se as buscas populares virão da API (ex.: termos mais buscados)
export const BUSCAS_POPULARES = ['Medicina', 'Nota de corte SISU', 'EaD em Pedagogia']

export type VarianteAtalho = 'verde' | 'azul' | 'neutro'

export type Atalho = {
  id: string
  titulo: string
  descricao?: string
  para: string
  variante: VarianteAtalho
}

type DadosAtalhos = {
  totalCursos?: number
}

export function montarAtalhos({ totalCursos }: DadosAtalhos): Atalho[] {
  return [
    {
      id: 'cursos',
      titulo: 'Explorar cursos',
      descricao: totalCursos !== undefined ? `${formatarInteiro(totalCursos)} cursos` : undefined,
      para: ROTAS.cursos,
      variante: 'verde',
    },
    {
      id: 'teste-vocacional',
      titulo: 'Teste vocacional',
      descricao: '12 minutos',
      para: ROTAS.testeVocacional,
      variante: 'azul',
    },
    { id: 'formas-de-ingresso', titulo: 'Formas de ingresso', para: ROTAS.formasDeIngresso, variante: 'neutro' },
    { id: 'universidades', titulo: 'Universidades', para: ROTAS.universidades, variante: 'neutro' },
    { id: 'calendario', titulo: 'Calendário', para: ROTAS.calendario, variante: 'neutro' },
  ]
}

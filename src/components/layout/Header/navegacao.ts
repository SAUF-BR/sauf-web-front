import { ROTAS } from '../../../routes/paths'

export type ItemNavegacao = {
  rotulo: string
  para: string
  exato?: boolean
}

export const ITENS_NAVEGACAO: ItemNavegacao[] = [
  { rotulo: 'Início', para: ROTAS.inicio, exato: true },
  { rotulo: 'Cursos', para: ROTAS.cursos },
  { rotulo: 'Universidades', para: ROTAS.universidades },
  // Sem `exato`: fica ativo em todas as rotas /simulados/*
  { rotulo: 'Simulados', para: ROTAS.simulados },
  { rotulo: 'Formas de ingresso', para: ROTAS.formasDeIngresso },
]

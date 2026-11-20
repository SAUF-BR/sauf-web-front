import type { CursoFavoritoApi, GrauOferta } from '../../../features/favoritos'
import { compararComNulos, type Comparador, type Opcao } from '../conteudo'

export type CursoFavorito = CursoFavoritoApi & { nome: string; cursoId: string }

export function paraCursoFavorito(oferta: CursoFavoritoApi): CursoFavorito {
  return { ...oferta, nome: oferta.curso.nome, cursoId: oferta.curso.id }
}

export type OrdenacaoCursos = 'corte' | 'nome'

export const Opcoes_ordenacao_cursos: Opcao<OrdenacaoCursos>[] = [
  { valor: 'corte', rotulo: 'Corte SISU' },
  { valor: 'nome', rotulo: 'Nome (A–Z)' },
]

export const Ordenacao_padrao_cursos: OrdenacaoCursos = 'corte'

export const Comparadores_cursos: Record<OrdenacaoCursos, Comparador<CursoFavorito>> = {
  corte: (a, b) => compararComNulos(a.notaCorteSisu, b.notaCorteSisu, (x, y) => y - x),
  nome: () => 0,
}

export const Rotulo_grau: Record<GrauOferta, string> = {
  bacharelado: 'Bacharelado',
  licenciatura: 'Licenciatura',
  tecnologo: 'Tecnólogo',
  bacharelado_e_licenciatura: 'Bacharelado e licenciatura',
}

export function grausDaOferta(curso: CursoFavorito) {
  return [...new Set(curso.opcoes.map((opcao) => opcao.grau))]
}

export function formatarDuracao(curso: CursoFavorito) {
  const total = curso.duracaoSemestres

  if (total !== null) return `${total} ${total === 1 ? 'semestre' : 'semestres'}`

  return curso.duracaoTexto
}
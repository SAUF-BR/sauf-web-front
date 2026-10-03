import { useState } from 'react'
import type { UniversidadeListagem } from '../../features/universidades/mockUniversidades'
import { Filtros_vazios, formatarLocalEstado, type Filtros } from './conteudo'

// busca sem diferenciar maiúsculas nem acentos
function normalizar(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function alternarItem<T>(lista: T[], item: T) {
  return lista.includes(item) ? lista.filter((i) => i !== item) : [...lista, item]
}

// filtra o mock no navegador
export function useFiltrosUniversidades(universidades: UniversidadeListagem[]) {
  const [filtros, setFiltros] = useState<Filtros>(Filtros_vazios)
  const [busca, setBusca] = useState('')

  // Base dos contadores dos filtros: considera busca, estado e cidade
  const escopo = universidades.filter(
    (u) =>
      normalizar(`${u.nome} ${u.sigla ?? ''}`).includes(normalizar(busca)) &&
      (!filtros.estado || u.uf === filtros.estado) &&
      (!filtros.cidade || u.cidade === filtros.cidade),
  )

  // O que aparece na grade: o escopo, filtrado por categoria, nota do MEC e modalidade.
  const resultados = escopo.filter(
    (u) =>
      (filtros.categorias.length === 0 || filtros.categorias.includes(u.tipo)) &&
      (filtros.notaMec === 'todas' ||
        (filtros.notaMec === '4-5' ? u.notaMec >= 4 : u.notaMec === 3)) &&
      (filtros.modalidades.length === 0 ||
        filtros.modalidades.some((modalidade) => u.modalidades.includes(modalidade))),
  )

  const cidades = filtros.estado
    ? Array.from(
        new Set(universidades.filter((u) => u.uf === filtros.estado).map((u) => u.cidade)),
      ).sort((a, b) => a.localeCompare(b, 'pt-BR'))
    : []

  const totalNoEstado = filtros.estado
    ? {
        quantidade: universidades.filter((u) => u.uf === filtros.estado).length,
        local: formatarLocalEstado(filtros.estado),
      }
    : null

  return {
    filtros,
    escopo,
    resultados,
    cidades,
    totalInstituicoes: universidades.length,
    totalNoEstado,
    buscar: setBusca,
    atualizar: (parcial: Partial<Filtros>) => setFiltros((atual) => ({ ...atual, ...parcial })),
    alternarCategoria: (categoria: Filtros['categorias'][number]) =>
      setFiltros((atual) => ({ ...atual, categorias: alternarItem(atual.categorias, categoria) })),
    alternarModalidade: (modalidade: Filtros['modalidades'][number]) =>
      setFiltros((atual) => ({ ...atual, modalidades: alternarItem(atual.modalidades, modalidade) })),
    limpar: () => setFiltros(Filtros_vazios),
  }
}
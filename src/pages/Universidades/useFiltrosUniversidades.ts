import { useState } from 'react'
import {
  useCidadesComUniversidade,
  useContagensUniversidades,
  useUniversidades,
  type ContagensUniversidades,
  type FiltrosUniversidadesApi,
} from '../../features/universidades'
import { Filtros_vazios, formatarLocalEstado, type Filtros } from './conteudo'

function alternarItem<T>(lista: T[], item: T) {
  return lista.includes(item) ? lista.filter((i) => i !== item) : [...lista, item]
}

function somarTipos(contagens: ContagensUniversidades | undefined) {
  return contagens ? contagens.tipo.publica + contagens.tipo.privada : 0
}

export function useFiltrosUniversidades() {
  const [filtros, setFiltros] = useState<Filtros>(Filtros_vazios)
  const [busca, setBusca] = useState('')

  const filtrosApi: FiltrosUniversidadesApi = {
    busca,
    uf: filtros.estado || undefined,
    cidade: filtros.cidade || undefined,
    tipos: filtros.categorias,
    modalidades: filtros.modalidades,
    notaMec: filtros.notaMec === 'todas' ? undefined : filtros.notaMec,
  }

  const lista = useUniversidades(filtrosApi)
  const contagens = useContagensUniversidades(filtrosApi)
  const cidades = useCidadesComUniversidade(filtros.estado)

  const totalGeral = useContagensUniversidades({})
  const totalEstado = useContagensUniversidades({ uf: filtros.estado || undefined })

  const resultados = lista.data?.pages.flatMap((pagina) => pagina.content) ?? []

  return {
    filtros,
    resultados,
    totalResultados: lista.data?.pages[0]?.totalElements ?? 0,
    contagens: contagens.data,
    cidades: cidades.data ?? [],
    totalInstituicoes: somarTipos(totalGeral.data),
    totalNoEstado: filtros.estado
      ? { quantidade: somarTipos(totalEstado.data), local: formatarLocalEstado(filtros.estado) }
      : null,
    carregando: lista.isPending,
    erro: lista.isError,
    tentarDeNovo: () => lista.refetch(),
    temMais: lista.hasNextPage,
    carregandoMais: lista.isFetchingNextPage,
    carregarMais: () => lista.fetchNextPage(),
    buscar: setBusca,
    atualizar: (parcial: Partial<Filtros>) => setFiltros((atual) => ({ ...atual, ...parcial })),
    alternarCategoria: (categoria: Filtros['categorias'][number]) =>
      setFiltros((atual) => ({ ...atual, categorias: alternarItem(atual.categorias, categoria) })),
    alternarModalidade: (modalidade: Filtros['modalidades'][number]) =>
      setFiltros((atual) => ({ ...atual, modalidades: alternarItem(atual.modalidades, modalidade) })),
    limpar: () => setFiltros(Filtros_vazios),
  }
}
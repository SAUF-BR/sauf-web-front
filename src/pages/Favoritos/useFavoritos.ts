import { useEffect, useMemo, useState } from 'react'
import { Tempo_aviso_remocao_ms, type Comparador } from './conteudo'

type ItemFavorito = { id: string; nome: string }

type Remocao<T> = {
  item: T
  posicao: number
  estavaSelecionado: boolean
}

type OpcoesFavoritos<T, O extends string> = {
  iniciais: T[]
  comparadores: Record<O, Comparador<T>>
  ordenacaoPadrao: O
  selecionadosIniciais?: string[]
}

//Estado: ordenação, seleção para a Comparação rápida e remoção com desfazer. Só em memória 
export function useFavoritos<T extends ItemFavorito, O extends string>({
  iniciais,
  comparadores,
  ordenacaoPadrao,
  selecionadosIniciais = [],
}: OpcoesFavoritos<T, O>) {
  const [favoritos, setFavoritos] = useState(iniciais)
  const [ordenacao, setOrdenacao] = useState(ordenacaoPadrao)
  const [selecionados, setSelecionados] = useState(() => new Set(selecionadosIniciais))
  const [ultimaRemocao, setUltimaRemocao] = useState<Remocao<T> | null>(null)

  const resultados = useMemo(
    () =>
      [...favoritos].sort(
        (a, b) => comparadores[ordenacao](a, b) || a.nome.localeCompare(b.nome, 'pt-BR'),
      ),
    [favoritos, ordenacao, comparadores],
  )

  const comparados = resultados.filter((item) => selecionados.has(item.id))

  useEffect(() => {
    if (!ultimaRemocao) return

    const temporizador = setTimeout(() => setUltimaRemocao(null), Tempo_aviso_remocao_ms)
    return () => clearTimeout(temporizador)
  }, [ultimaRemocao])

  function alternarSelecao(id: string) {
    setSelecionados((atual) => {
      const proximo = new Set(atual)

      if (!proximo.delete(id)) proximo.add(id)

      return proximo
    })
  }

  function remover(id: string) {
    const posicao = favoritos.findIndex((item) => item.id === id)
    if (posicao === -1) return

    setUltimaRemocao({ item: favoritos[posicao], posicao, estavaSelecionado: selecionados.has(id) })
    setFavoritos((atual) => atual.filter((item) => item.id !== id))
    setSelecionados((atual) => {
      const proximo = new Set(atual)
      proximo.delete(id)
      return proximo
    })
  }

  function desfazerRemocao() {
    if (!ultimaRemocao) return

    const { item, posicao, estavaSelecionado } = ultimaRemocao

    setFavoritos((atual) => [...atual.slice(0, posicao), item, ...atual.slice(posicao)])

    if (estavaSelecionado) {
      setSelecionados((atual) => new Set(atual).add(item.id))
    }

    setUltimaRemocao(null)
  }

  return {
    resultados,
    total: favoritos.length,
    ordenacao,
    ordenar: setOrdenacao,
    selecionados,
    comparados,
    alternarSelecao,
    remover,
    ultimaRemocao: ultimaRemocao?.item ?? null,
    desfazerRemocao,
  }
}

export type EstadoFavoritos<T extends ItemFavorito, O extends string> = ReturnType<
  typeof useFavoritos<T, O>
>
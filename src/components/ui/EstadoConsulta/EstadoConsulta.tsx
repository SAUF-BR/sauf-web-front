import type { ReactNode } from 'react'
import type { UseQueryResult } from '@tanstack/react-query'
import { Carregando } from '../Carregando/Carregando'
import { EstadoErro } from '../EstadoErro/EstadoErro'

type Consulta = UseQueryResult<unknown, Error>

// [UseQueryResult<Plano[]>, UseQueryResult<Assinatura | null>] → [Plano[], Assinatura | null]
type DadosDas<T extends readonly Consulta[]> = {
  [K in keyof T]: T[K] extends UseQueryResult<infer Dados, Error> ? Dados : never
}

type EstadoConsultaProps<T extends readonly Consulta[]> = {
  consultas: T
  // Só é chamado quando todas as consultas têm dados
  children: (dados: DadosDas<T>) => ReactNode
  mensagemCarregando?: string
  // Substitui o Carregando padrão (ex.: um esqueleto no formato do conteúdo)
  carregando?: ReactNode
  tituloErro?: string
  descricaoErro?: string
  compacto?: boolean
  className?: string
}

/**
 * Mostra carregando, erro (com "Tentar de novo") ou o conteúdo de uma ou mais
 * consultas do React Query. Uso:
 *
 *   <EstadoConsulta consultas={[usePlanos(), useAssinaturaAtual()]}>
 *     {([planos, assinatura]) => <Lista planos={planos} assinatura={assinatura} />}
 *   </EstadoConsulta>
 */
export function EstadoConsulta<const T extends readonly Consulta[]>({
  consultas,
  children,
  mensagemCarregando,
  carregando,
  tituloErro,
  descricaoErro,
  compacto = false,
  className,
}: EstadoConsultaProps<T>) {
  // Erro numa atualização em segundo plano não esconde dados que já estão na tela
  const comErro = consultas.filter((consulta) => consulta.isError && consulta.data === undefined)

  // Ao tentar de novo, a consulta sem dados volta a "pending" e o Carregando aparece
  if (comErro.length > 0) {
    return (
      <EstadoErro
        titulo={tituloErro}
        descricao={descricaoErro}
        onTentarDeNovo={() => comErro.forEach((consulta) => void consulta.refetch())}
        compacto={compacto}
        className={className}
      />
    )
  }

  if (consultas.some((consulta) => consulta.isPending)) {
    return carregando ?? (
      <Carregando mensagem={mensagemCarregando} compacto={compacto} className={className} />
    )
  }

  return children(consultas.map((consulta) => consulta.data) as DadosDas<T>)
}

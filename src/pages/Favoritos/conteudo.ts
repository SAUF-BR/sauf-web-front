export type AbaFavoritos = 'cursos' | 'universidades'

export type Opcao<T extends string> = { valor: T; rotulo: string }

export type Comparador<T> = (a: T, b: T) => number


export type StatusFavorito =
  | { tipo: 'prazo'; processo: string; encerraEm: string } 
  | { tipo: 'info'; texto: string } 
  | { tipo: 'neutro'; texto: string } 

export type Metrica = { rotulo: string; valor: string }

export const Tempo_aviso_remocao_ms = 10000

function diasAte(dataIso: string) {
  const hoje = new Date()
  const hojeUtc = Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())

  return Math.round((new Date(dataIso).getTime() - hojeUtc) / 86_400_000)
}

export function formatarStatus(status: StatusFavorito) {
  if (status.tipo !== 'prazo') return status.texto

  const dias = diasAte(status.encerraEm)

  if (dias < 0) return `${status.processo} encerrado`
  if (dias === 0) return `${status.processo} encerra hoje`
  if (dias === 1) return `${status.processo} encerra amanhã`

  return `${status.processo} encerra em ${dias} dias`
}

export function compararComNulos<T>(a: T | null, b: T | null, comparar: Comparador<T>) {
  if (a === b) return 0
  if (a === null) return 1
  if (b === null) return -1

  return comparar(a, b)
}

function prazoAberto(status: StatusFavorito | null) {
  if (status?.tipo !== 'prazo') return null

  const hoje = new Date().toISOString().slice(0, 10)
  return status.encerraEm >= hoje ? status.encerraEm : null
}

export function compararPrazo(
  a: { status: StatusFavorito | null },
  b: { status: StatusFavorito | null },
) {
  return compararComNulos(prazoAberto(a.status), prazoAberto(b.status), (x, y) =>
    x.localeCompare(y),
  )
}

// Apoio aos mocks
export function daquiA(dias: number) {
  const hoje = new Date()
  const data = new Date(Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + dias))

  return data.toISOString().slice(0, 10)
}
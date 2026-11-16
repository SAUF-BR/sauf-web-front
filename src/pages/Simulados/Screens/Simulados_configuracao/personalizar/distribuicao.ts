import { ORDEM_AREAS, type Area } from '../../../../../features/simulados'

export type Quantidades = Partial<Record<Area, number>>

// Divide igual entre as áreas e o resto vai para as primeiras (lc, ch, cn, mt), como a API (D-81)
export function dividir(total: number, areas: Area[]): Quantidades {
  const ordenadas = ORDEM_AREAS.filter((area) => areas.includes(area))
  const partes: Quantidades = {}
  ordenadas.forEach((area, i) => {
    partes[area] = Math.floor(total / ordenadas.length) + (i < total % ordenadas.length ? 1 : 0)
  })
  return partes
}

export function somar(quantidades: Quantidades) {
  return Object.values(quantidades).reduce((soma, n) => soma + (n ?? 0), 0)
}

// Maior total que cabe nas áreas marcadas sem repetir questão (cada área recebe a sua parte)
export function maximoComAreas(areas: Area[], disponiveis: Record<Area, number>, limite: number) {
  for (let total = limite; total > 0; total--) {
    const partes = dividir(total, areas)
    if (Object.entries(partes).every(([area, n]) => (n ?? 0) <= disponiveis[area as Area])) return total
  }
  return 0
}

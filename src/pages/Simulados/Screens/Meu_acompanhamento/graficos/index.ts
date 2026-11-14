import { lazy } from 'react'

// O Recharts fica num pedaço separado do JS, baixado só quando um gráfico aparece
const carregar = () => import('./Graficos')

export const GraficoEvolucao = lazy(() => carregar().then((m) => ({ default: m.GraficoEvolucao })))
export const GraficoDistribuicao = lazy(() =>
  carregar().then((m) => ({ default: m.GraficoDistribuicao })),
)
export const GraficoConstancia = lazy(() => carregar().then((m) => ({ default: m.GraficoConstancia })))

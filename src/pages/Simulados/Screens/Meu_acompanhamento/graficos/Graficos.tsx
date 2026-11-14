import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { useMediaQuery } from '../../../../../hooks/useMediaQuery'
import type { BlocoConstancia, PontoEvolucao, ResultadosQuestoes } from '../../../../../features/simulados'
import cores from './cores.module.scss'

// Único módulo que importa o Recharts: a tela carrega este arquivo sob demanda (React.lazy)

function useSemAnimacao() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

const Fonte_eixo = { fontSize: 11, fill: cores.texto }

type GraficoEvolucaoProps = {
  pontos: (PontoEvolucao & { rotulo: string })[]
  mediaPlataforma: number | null
}

export function GraficoEvolucao({ pontos, mediaPlataforma }: GraficoEvolucaoProps) {
  const semAnimacao = useSemAnimacao()
  const estreito = useMediaQuery('(max-width: 480px)')
  const ultimo = pontos.length - 1
  // Em tela estreita os números se encostam; fica só o do último simulado
  const dados = pontos.map((ponto, i) => ({
    ...ponto,
    rotuloValor: !estreito || i === ultimo || pontos.length <= 6 ? `${Math.round(ponto.aproveitamento)}%` : '',
  }))

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={dados} margin={{ top: 20, right: 4, bottom: 0, left: -18 }} accessibilityLayer={false}>
        <XAxis dataKey="rotulo" tickLine={false} axisLine={{ stroke: cores.borda }} tick={Fonte_eixo} interval="preserveStartEnd" />
        <YAxis
          domain={[0, 100]}
          ticks={[0, 25, 50, 75, 100]}
          tickFormatter={(valor: number) => `${valor}%`}
          tickLine={false}
          axisLine={false}
          tick={Fonte_eixo}
        />
        {mediaPlataforma !== null && (
          <ReferenceLine y={mediaPlataforma} stroke={cores.media} strokeDasharray="4 4" ifOverflow="extendDomain" />
        )}
        <Bar dataKey="aproveitamento" radius={[4, 4, 0, 0]} maxBarSize={42} isAnimationActive={!semAnimacao}>
          {pontos.map((ponto, i) => (
            <Cell key={ponto.id} fill={i === ultimo ? cores.verde : cores.verdeSuave} />
          ))}
          <LabelList dataKey="rotuloValor" position="top" style={{ fontSize: 11, fill: cores.texto }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function GraficoDistribuicao({ resultados }: { resultados: ResultadosQuestoes }) {
  const semAnimacao = useSemAnimacao()
  const fatias = [
    { nome: 'acertos', valor: resultados.acertos, cor: cores.verde },
    { nome: 'erros', valor: resultados.erros, cor: cores.amarelo },
    { nome: 'emBranco', valor: resultados.emBranco, cor: cores.vazio },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart accessibilityLayer={false}>
        <Pie
          data={fatias}
          dataKey="valor"
          nameKey="nome"
          innerRadius="70%"
          outerRadius="100%"
          startAngle={90}
          endAngle={-270}
          stroke="none"
          isAnimationActive={!semAnimacao}
        >
          {fatias.map((fatia) => (
            <Cell key={fatia.nome} fill={fatia.cor} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

type GraficoConstanciaProps = {
  blocos: (BlocoConstancia & { rotulo: string })[]
}

// Quanto mais dias ativos no bloco, mais escura a barra
function corDoBloco({ dias, diasAtivos }: BlocoConstancia) {
  const proporcao = dias === 0 ? 0 : diasAtivos / dias
  if (proporcao === 0) return cores.vazio
  if (proporcao < 0.4) return cores.nivel2
  if (proporcao < 0.7) return cores.nivel3
  return cores.verde
}

export function GraficoConstancia({ blocos }: GraficoConstanciaProps) {
  const semAnimacao = useSemAnimacao()
  // Barra vazia ainda aparece, para mostrar o bloco sem estudo
  const dados = blocos.map((bloco) => ({ ...bloco, altura: Math.max(bloco.diasAtivos / Math.max(bloco.dias, 1), 0.06) }))

  return (
    <ResponsiveContainer width="100%" height={96}>
      <BarChart data={dados} margin={{ top: 4, right: 0, bottom: 0, left: 0 }} accessibilityLayer={false}>
        <XAxis dataKey="rotulo" tickLine={false} axisLine={false} tick={Fonte_eixo} interval={0} />
        <YAxis hide domain={[0, 1]} />
        <Bar dataKey="altura" radius={[4, 4, 4, 4]} isAnimationActive={!semAnimacao}>
          {dados.map((bloco) => (
            <Cell key={bloco.inicio} fill={corDoBloco(bloco)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

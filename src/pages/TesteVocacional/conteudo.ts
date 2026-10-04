import { Heart, Lock, type LucideIcon } from 'lucide-react'

export type ItemAntesDeComecar = {
  id: string
  indicador: string | LucideIcon
  titulo: string
  descricao: string
}

export const ITENS_ANTES_DE_COMECAR: ItemAntesDeComecar[] = [
  {
    id: 'perguntas',
    indicador: '20',
    titulo: 'Perguntas de múltipla escolha',
    descricao: 'Uma por tela, sem resposta certa ou errada.',
  },
  {
    id: 'tempo',
    indicador: "12'",
    titulo: 'Cerca de 12 minutos',
    descricao: 'Dá para responder no celular, no intervalo da aula.',
  },
  {
    id: 'recomendacoes',
    indicador: Heart,
    titulo: 'Recomendações personalizadas',
    descricao: 'Os cursos sugeridos entram na sua página inicial.',
  },
  {
    id: 'privacidade',
    indicador: Lock,
    titulo: 'Suas respostas são privadas',
    descricao: 'Não compartilhamos nada com instituições.',
  },
]

export type PassoComoFunciona = {
  numero: string
  titulo: string
  descricao: string
}

export const PASSOS_COMO_FUNCIONA: PassoComoFunciona[] = [
  {
    numero: '01',
    titulo: 'Você responde',
    descricao: 'Perguntas sobre interesses, rotina de estudo e o tipo de trabalho que te motiva.',
  },
  {
    numero: '02',
    titulo: 'Calculamos afinidades',
    descricao:
      'Suas respostas são cruzadas com as três grandes áreas: tecnologia, saúde e educação.',
  },
  {
    numero: '03',
    titulo: 'Você recebe cursos',
    descricao:
      'Uma lista de cursos com nota de corte e universidades que ofertam na sua região.',
  },
]

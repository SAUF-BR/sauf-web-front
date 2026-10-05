import type { AreaVocacional, LetraAlternativa, Pergunta } from './types'

// Dados mockados — remover quando a API estiver disponível.

const INSTRUCAO = 'Escolha a opção mais próxima do seu dia a dia. Não existe resposta certa.'
const LETRAS: LetraAlternativa[] = ['A', 'B', 'C', 'D']

const INTERESSES = 'Interesses e rotina de estudo'
const TRABALHO = 'Estilo de trabalho'
const FUTURO = 'Expectativas para o futuro'

function pergunta(
  numero: number,
  categoria: string,
  enunciado: string,
  alternativas: [string, AreaVocacional][],
): Pergunta {
  const id = `p-${String(numero).padStart(2, '0')}`

  return {
    id,
    numero,
    categoria,
    enunciado,
    instrucao: INSTRUCAO,
    alternativas: alternativas.map(([texto, area], indice) => ({
      id: `${id}-${LETRAS[indice].toLowerCase()}`,
      letra: LETRAS[indice],
      texto,
      area,
    })),
  }
}

export const perguntasMock: Pergunta[] = [
  pergunta(1, INTERESSES, 'Qual matéria da escola você estuda com mais vontade?', [
    ['Matemática', 'tecnologia'],
    ['Biologia', 'saude'],
    ['Português e redação', 'educacao'],
    ['Física', 'tecnologia'],
  ]),
  pergunta(2, INTERESSES, 'No tempo livre, o que mais prende a sua atenção?', [
    ['Jogos, aplicativos e como eles são feitos', 'tecnologia'],
    ['Séries e vídeos sobre medicina e corpo humano', 'saude'],
    ['Ajudar amigos a estudar para uma prova', 'educacao'],
    ['Esportes e cuidados com a saúde', 'saude'],
  ]),
  pergunta(3, INTERESSES, 'Como você prefere aprender algo novo?', [
    ['Testando na prática até funcionar', 'tecnologia'],
    ['Observando alguém mais experiente', 'saude'],
    ['Lendo e depois explicando com as minhas palavras', 'educacao'],
    ['Montando esquemas e resumos', 'educacao'],
  ]),
  pergunta(4, INTERESSES, 'Que tipo de notícia você abre primeiro?', [
    ['Lançamentos de tecnologia e inteligência artificial', 'tecnologia'],
    ['Descobertas científicas sobre saúde', 'saude'],
    ['Mudanças na educação e no ENEM', 'educacao'],
    ['Novas startups e empresas', 'tecnologia'],
  ]),
  pergunta(5, INTERESSES, 'Em um trabalho em grupo, qual parte você assume?', [
    ['Montar a apresentação e as planilhas', 'tecnologia'],
    ['Cuidar para que todos estejam bem e participando', 'saude'],
    ['Apresentar o trabalho para a turma', 'educacao'],
    ['Pesquisar e organizar as fontes', 'educacao'],
  ]),
  pergunta(6, INTERESSES, 'Qual desafio você acharia mais divertido?', [
    ['Descobrir por que um programa está dando erro', 'tecnologia'],
    ['Entender o que causa um sintoma', 'saude'],
    ['Fazer alguém com dificuldade aprender um conteúdo', 'educacao'],
    ['Montar um circuito ou robô simples', 'tecnologia'],
  ]),
  pergunta(7, INTERESSES, 'Qual dessas atividades te dá mais satisfação?', [
    ['Entender como um sistema funciona por dentro e melhorá-lo', 'tecnologia'],
    ['Cuidar de pessoas e acompanhar a evolução delas', 'saude'],
    ['Resolver problemas com lógica, dados e tecnologia', 'tecnologia'],
    ['Explicar um assunto até a outra pessoa entender de verdade', 'educacao'],
  ]),
  pergunta(8, TRABALHO, 'Onde você se imagina trabalhando no dia a dia?', [
    ['Em um escritório ou de casa, no computador', 'tecnologia'],
    ['Em um hospital, clínica ou laboratório', 'saude'],
    ['Em uma escola ou universidade', 'educacao'],
    ['Em um laboratório de pesquisa', 'saude'],
  ]),
  pergunta(9, TRABALHO, 'Você prefere trabalhar…', [
    ['Concentrado, com tempo para resolver problemas complexos', 'tecnologia'],
    ['Em contato direto com pacientes', 'saude'],
    ['Conversando com grupos de pessoas', 'educacao'],
    ['Em equipe, criando produtos juntos', 'tecnologia'],
  ]),
  pergunta(10, TRABALHO, 'Qual rotina parece mais com você?', [
    ['Cada dia um problema diferente para resolver', 'tecnologia'],
    ['Plantões, atendimentos e cuidado contínuo', 'saude'],
    ['Planejar aulas e acompanhar turmas', 'educacao'],
    ['Acompanhar a evolução de cada pessoa', 'educacao'],
  ]),
  pergunta(11, TRABALHO, 'O que te deixaria mais orgulhoso no fim do dia?', [
    ['Ver um sistema que eu construí funcionando', 'tecnologia'],
    ['Saber que ajudei alguém a se recuperar', 'saude'],
    ['Perceber que um aluno finalmente entendeu', 'educacao'],
    ['Ter automatizado uma tarefa chata', 'tecnologia'],
  ]),
  pergunta(12, TRABALHO, 'Como você lida com situações de pressão?', [
    ['Analiso os dados com calma antes de agir', 'tecnologia'],
    ['Mantenho a calma e cuido de quem precisa', 'saude'],
    ['Organizo as pessoas para resolverem juntas', 'educacao'],
    ['Ajo rápido e ajusto depois', 'saude'],
  ]),
  pergunta(13, TRABALHO, 'Qual ferramenta você gostaria de dominar?', [
    ['Uma linguagem de programação', 'tecnologia'],
    ['Equipamentos de diagnóstico', 'saude'],
    ['Técnicas de ensino e oratória', 'educacao'],
    ['Ferramentas de análise de dados', 'tecnologia'],
  ]),
  pergunta(14, TRABALHO, 'Que tipo de problema você prefere resolver?', [
    ['Problemas lógicos, com uma solução exata', 'tecnologia'],
    ['Problemas que envolvem o bem-estar das pessoas', 'saude'],
    ['Problemas de comunicação e convivência', 'educacao'],
    ['Problemas de aprendizagem', 'educacao'],
  ]),
  pergunta(15, FUTURO, 'Daqui a dez anos, o que você quer ter construído?', [
    ['Um produto digital usado por muita gente', 'tecnologia'],
    ['Uma carreira cuidando da saúde das pessoas', 'saude'],
    ['Uma trajetória formando outras pessoas', 'educacao'],
    ['Minha própria empresa de tecnologia', 'tecnologia'],
  ]),
  pergunta(16, FUTURO, 'O que mais pesa na escolha de uma profissão?', [
    ['Mercado em crescimento e bons salários', 'tecnologia'],
    ['Fazer diferença na vida das pessoas', 'saude'],
    ['Compartilhar conhecimento', 'educacao'],
    ['Estabilidade e propósito', 'saude'],
  ]),
  pergunta(17, FUTURO, 'Como você se vê estudando na faculdade?', [
    ['Em laboratórios de informática e projetos práticos', 'tecnologia'],
    ['Em aulas práticas, estágios e atendimentos', 'saude'],
    ['Em estágios em escolas e projetos sociais', 'educacao'],
    ['Em grupos de pesquisa', 'saude'],
  ]),
  pergunta(18, FUTURO, 'Qual impacto você quer deixar na sua cidade?', [
    ['Serviços públicos mais rápidos e digitais', 'tecnologia'],
    ['Mais acesso a atendimento de saúde', 'saude'],
    ['Escolas melhores para todos', 'educacao'],
    ['Mais oportunidades para os jovens', 'educacao'],
  ]),
  pergunta(19, FUTURO, 'Se pudesse fazer um curso extra agora, qual seria?', [
    ['Programação para iniciantes', 'tecnologia'],
    ['Primeiros socorros', 'saude'],
    ['Didática e oratória', 'educacao'],
    ['Robótica', 'tecnologia'],
  ]),
  pergunta(20, FUTURO, 'Qual frase combina mais com você?', [
    ['“Gosto de entender como as coisas funcionam.”', 'tecnologia'],
    ['“Gosto de cuidar das pessoas.”', 'saude'],
    ['“Gosto de ensinar o que eu sei.”', 'educacao'],
    ['“Gosto de criar coisas novas.”', 'tecnologia'],
  ]),
]

export const descricaoAreaMock: Record<AreaVocacional, string> = {
  tecnologia:
    'Suas respostas indicam preferência por raciocínio lógico, trabalho com dados e construção de soluções. Perfis assim se adaptam bem a cursos que combinam matemática aplicada e projeto.',
  saude:
    'Suas respostas indicam interesse em cuidar de pessoas e entender o corpo humano. Perfis assim se adaptam bem a cursos com muita prática, estágios e contato direto com pacientes.',
  educacao:
    'Suas respostas indicam gosto por comunicar, explicar e acompanhar a evolução de outras pessoas. Perfis assim se adaptam bem a licenciaturas e cursos ligados à formação.',
}

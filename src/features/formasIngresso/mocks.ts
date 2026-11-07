import type { FormaIngresso } from './types'

export const formasIngressoMock: FormaIngresso[] = [
  {
    id: 'prouni',
    nome: 'PROUni',
    subtitulo: 'Bolsa em faculdade privada',
    categoria: 'Guia de ingresso',
    atualizadoEm: '13/10/2026',
    descricao:
      'O Programa Universidade para Todos oferece bolsas de estudo integrais, que cobrem 100% da mensalidade, e parciais, que cobrem 50%, em instituições privadas de ensino superior. A seleção considera o desempenho no ENEM e os critérios de participação do programa.',
    linksOficiais: [
      {
        titulo: 'Portal oficial do PROUni',
        url: 'https://acessounico.mec.gov.br/prouni',
        descricao:
          'Acesse o sistema de inscrição, consulte as bolsas disponíveis e acompanhe o processo seletivo.',
      },
      {
        titulo: 'Informações gerais sobre o programa',
        url: 'https://www.gov.br/mec/pt-br/prouni',
        descricao:
          'Conheça o funcionamento do PROUni, o público atendido e as orientações do Ministério da Educação.',
      },
      {
        titulo: 'Quem pode participar',
        url: 'https://www.gov.br/mec/pt-br/prouni/publico',
        descricao:
          'Consulte as condições de escolaridade, renda e participação previstas para os candidatos.',
      },
      {
        titulo: 'Como funciona a seleção',
        url: 'https://www.gov.br/mec/pt-br/prouni/como-funciona',
        descricao:
          'Entenda a escolha dos cursos, a classificação, as chamadas e a comprovação das informações.',
      },
      {
        titulo: 'Perguntas frequentes do MEC',
        url: 'https://www.gov.br/mec/pt-br/acesso-a-informacao/perguntas-frequentes/programa-universidade-para-todos-prouni',
        descricao:
          'Encontre respostas oficiais sobre regras, inscrições, bolsas e participação.',
      },
      {
        titulo: 'Legislação do PROUni',
        url: 'https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2005/lei/l11096.htm',
        descricao:
          'Consulte a Lei nº 11.096/2005, que instituiu o programa.',
      },
    ],
    indicadores: [
      {
        titulo: 'Média mínima no ENEM',
        valor: '450 pontos',
      },
      {
        titulo: 'Renda por pessoa — bolsa integral',
        valor: 'Até 1,5 salário mínimo',
      },
      {
        titulo: 'Renda por pessoa — bolsa parcial',
        valor: 'Até 3 salários mínimos',
      },
    ],
    requisitos: [
      'Ter concluído o ensino médio.',
      'Ter participado de uma das duas edições mais recentes do ENEM consideradas no processo seletivo.',
      'Ter obtido média mínima de 450 pontos nas cinco provas do ENEM e nota acima de zero na redação.',
      'Não ter participado do ENEM na condição de treineiro.',
      'Não possuir diploma de curso superior e atender a pelo menos uma das condições de escolaridade ou público previstas pelo programa.',
      'Para a bolsa integral, comprovar renda familiar bruta mensal de até 1,5 salário mínimo por pessoa. Para a bolsa parcial, o limite é de até 3 salários mínimos por pessoa.',
    ],
    etapas: [
      {
        titulo: 'Acesse o Acesso Único',
        descricao:
          'Entre no portal oficial do PROUni usando sua conta gov.br.',
      },
      {
        titulo: 'Preencha seus dados',
        descricao:
          'Confira seus dados pessoais e informe os dados solicitados sobre seu grupo familiar e perfil de participação.',
      },
      {
        titulo: 'Escolha até 2 opções',
        descricao:
          'Selecione até duas opções de instituição, curso e turno, em ordem de preferência, entre as bolsas disponíveis.',
      },
      {
        titulo: 'Acompanhe o resultado',
        descricao:
          'Verifique as chamadas e, se for pré-selecionado, apresente os documentos solicitados pela instituição dentro do prazo.',
      },
    ],
    prazos: [
      {
        titulo: 'Inscrições',
        inicio: null,
        fim: null,
        status: 'sem-data',
      },
      {
        titulo: 'Resultado da 1ª chamada',
        inicio: null,
        fim: null,
        status: 'sem-data',
      },
      {
        titulo: 'Resultado da 2ª chamada',
        inicio: null,
        fim: null,
        status: 'sem-data',
      },
      {
        titulo: 'Lista de espera',
        inicio: null,
        fim: null,
        status: 'sem-data',
      },
    ],
    perguntasFrequentes: [
      {
        pergunta: 'Qual é a diferença entre bolsa integral e parcial?',
        resposta:
          'A bolsa integral cobre 100% do valor da mensalidade. A bolsa parcial cobre 50%, e o estudante é responsável pela parte restante.',
      },
      {
        pergunta: 'Posso escolher mais de um curso?',
        resposta:
          'Sim. Durante a inscrição, o candidato pode escolher até duas opções de instituição, curso e turno, em ordem de preferência, entre as bolsas disponíveis para seu perfil.',
      },
      {
        pergunta: 'A inscrição no PROUni é paga?',
        resposta:
          'Não. A inscrição no processo seletivo é gratuita e realizada pela internet, no portal Acesso Único.',
      },
      {
        pergunta: 'Quem estudou em escola particular pode participar?',
        resposta:
          'Sim. Existem condições de participação que contemplam diferentes trajetórias escolares, incluindo quem estudou em instituição privada. É necessário verificar se o candidato se enquadra nas regras do programa.',
      },
      {
        pergunta: 'Professor da rede pública precisa comprovar renda?',
        resposta:
          'Professores da rede pública em exercício na educação básica, integrantes do quadro permanente e concorrendo a bolsas em cursos de licenciatura ou pedagogia podem ter dispensa do limite de renda, conforme as regras aplicáveis.',
      },
      {
        pergunta: 'Se eu for pré-selecionado, já recebo a bolsa?',
        resposta:
          'A pré-seleção não encerra todas as etapas. O candidato precisa comprovar as informações declaradas e cumprir os procedimentos exigidos pela instituição de ensino.',
      },
    ],
  },

  
{
  id: 'fies',
  nome: 'FIES',
  subtitulo: 'Financiamento para faculdade privada',
  categoria: 'Guia de ingresso',
  atualizadoEm: '13/10/2026',
  descricao:
    'O Fundo de Financiamento Estudantil (FIES) é um programa do Ministério da Educação que financia cursos superiores não gratuitos em instituições privadas participantes, desde que os cursos tenham avaliação positiva no Sistema Nacional de Avaliação da Educação Superior (Sinaes). O programa foi instituído pela Lei nº 10.260, de 12 de julho de 2001.',
  linksOficiais: [
    {
      titulo: 'Portal oficial do FIES',
      url: 'https://www.gov.br/mec/pt-br/fies',
      descricao:
        'Consulte informações gerais, orientações e comunicados do Ministério da Educação sobre o programa.',
    },
    {
      titulo: 'Inscrição no FIES',
      url: 'https://acessounico.mec.gov.br/fies',
      descricao:
        'Acesse o sistema oficial para realizar a inscrição e acompanhar o processo seletivo.',
    },
    {
      titulo: 'Passo a passo da inscrição',
      url: 'https://www.gov.br/mec/pt-br/fies/passo-a-passo-para-inscricao-no-fies',
      descricao:
        'Confira as orientações oficiais para preencher a inscrição no FIES.',
    },
    {
      titulo: 'Perguntas frequentes do MEC',
      url: 'https://www.gov.br/mec/pt-br/acesso-a-informacao/perguntas-frequentes/fundo-de-financiamento-estudantil-fies',
      descricao:
        'Consulte respostas sobre requisitos, renda familiar, seleção, financiamento e contratação.',
    },
    {
      titulo: 'Resolução do FIES Social',
      url: 'https://www.gov.br/fnde/pt-br/acesso-a-informacao/legislacao/resolucoes/2024/resolucao-no-58-de-8-de-fevereiro-de-2024-resolucao-no-58-de-8-de-fevereiro-de-2024-dou-imprensa-nacional.pdf',
      descricao:
        'Leia a resolução que instituiu as regras do FIES Social.',
    },
    {
      titulo: 'Lei nº 10.260/2001',
      url: 'https://www.planalto.gov.br/ccivil_03/leis/leis_2001/l10260.htm',
      descricao:
        'Consulte a legislação que instituiu o Fundo de Financiamento Estudantil.',
    },
  ],
  indicadores: [
    {
      titulo: 'Nota mínima no ENEM',
      valor: '450 pontos de média',
    },
    {
      titulo: 'Renda por pessoa — FIES',
      valor: 'Até 3 salários mínimos',
    },
    {
      titulo: 'Renda por pessoa — FIES Social',
      valor: 'Até 0,5 salário mínimo + CadÚnico ativo',
    },
  ],
  requisitos: [
    'Ter participado de uma edição do ENEM a partir de 2010, com notas válidas para o processo seletivo.',
    'Ter obtido média aritmética igual ou superior a 450 pontos nas cinco provas do ENEM e nota superior a zero na redação.',
    'Não ter realizado o ENEM na condição de treineiro.',
    'Comprovar renda familiar mensal bruta por pessoa de até três salários mínimos para concorrer às vagas regulares do FIES.',
    'Para o FIES Social, estar inscrito no CadÚnico, com cadastro ativo e renda familiar por pessoa de até meio salário mínimo.',
    'Atender às demais condições e restrições previstas no edital do processo seletivo vigente.',
  ],
  etapas: [
    {
      titulo: 'Acesse o sistema oficial',
      descricao:
        'Entre no portal de inscrição do FIES usando sua conta gov.br.',
    },
    {
      titulo: 'Preencha seus dados',
      descricao:
        'Informe seus dados pessoais, e-mail, composição familiar e rendimentos dos integrantes do grupo familiar.',
    },
    {
      titulo: 'Escolha até 3 opções',
      descricao:
        'Selecione até três opções de curso, instituição e turno, conforme a oferta disponível e as regras do processo seletivo.',
    },
    {
      titulo: 'Acompanhe a classificação',
      descricao:
        'Consulte os resultados e acompanhe sua situação no sistema. A nota de corte é apenas uma referência e não garante a pré-seleção.',
    },
    {
      titulo: 'Complete a inscrição e valide os dados',
      descricao:
        'Se for pré-selecionado, cumpra as etapas e os prazos do edital, incluindo a validação das informações pela instituição e os procedimentos para contratação do financiamento.',
    },
  ],
  prazos: [
    {
      titulo: 'Período de inscrições',
      inicio: null,
      fim: null,
      status: 'sem-data',
    },
    {
      titulo: 'Resultado da seleção',
      inicio: null,
      fim: null,
      status: 'sem-data',
    },
    {
      titulo: 'Complementação da inscrição',
      inicio: null,
      fim: null,
      status: 'sem-data',
    },
    {
      titulo: 'Lista de espera',
      inicio: null,
      fim: null,
      status: 'sem-data',
    },
  ],
  perguntasFrequentes: [
    {
      pergunta: 'O FIES é uma bolsa de estudos?',
      resposta:
        'Não. O FIES é um financiamento estudantil. O valor financiado deverá ser pago conforme as condições do contrato, enquanto a parte da mensalidade não coberta pelo financiamento continua sendo responsabilidade do estudante.',
    },
    {
      pergunta: 'Qual é a diferença entre o FIES e o FIES Social?',
      resposta:
        'O FIES Social é uma modalidade destinada a estudantes de baixa renda inscritos no CadÚnico, com cadastro ativo e renda familiar por pessoa de até meio salário mínimo. Para quem atende aos critérios, pode haver financiamento de até 100% dos encargos educacionais, respeitados os limites estabelecidos pelo programa.',
    },
    {
      pergunta: 'Como é calculada a renda familiar mensal bruta por pessoa?',
      resposta:
        'O cálculo da renda familiar mensal bruta per capita é feito com base na soma da renda bruta de todos os membros do grupo familiar, dividida pelo número total de pessoas pertencentes ao referido grupo familiar.',
    },
    {
      pergunta: 'Posso escolher mais de um curso?',
      resposta:
        'Sim. Durante a inscrição, o candidato pode escolher até três opções de curso, instituição e turno, conforme a oferta disponível e as regras do processo seletivo vigente.',
    },
    {
      pergunta: 'A inscrição no FIES é paga?',
      resposta:
        'Não. A inscrição no processo seletivo é gratuita e realizada pela internet, no sistema oficial do FIES.',
    },
    {
      pergunta: 'A aprovação garante o financiamento?',
      resposta:
        'Não necessariamente. A pré-seleção é seguida por outras etapas, como a complementação das informações, a validação dos dados e os procedimentos necessários para contratar o financiamento, conforme o edital.',
    },
    {
      pergunta: 'Quem já concluiu uma graduação pode participar?',
      resposta:
        'Pode ser possível, desde que o candidato atenda às condições do edital vigente e às regras de prioridade e elegibilidade do programa.',
    },
    {
      pergunta: 'Quem tem bolsa parcial do PROUni pode participar do FIES?',
      resposta:
        'Sim, em determinadas condições, o bolsista parcial do PROUni pode utilizar o FIES para financiar a parte da mensalidade não coberta pela bolsa. É necessário atender às regras vigentes e verificar as condições de acumulação dos benefícios.',
    },
  ],
},


{
  id: 'sisu',
  nome: 'SISU',
  subtitulo: 'Ingresso em universidades públicas',
  categoria: 'Guia de ingresso',
  atualizadoEm: '13/10/2026',
  descricao:
    'O Sistema de Seleção Unificada (Sisu) é uma iniciativa do Governo Federal, desenvolvida pelo Ministério da Educação (MEC), que permite concorrer a vagas em instituições públicas de educação superior de todo o país. A classificação considera as notas do ENEM, os pesos definidos para cada curso, as modalidades de concorrência e a quantidade de vagas disponíveis.',
  linksOficiais: [
    {
      titulo: 'Portal oficial do SISU',
      url: 'https://www.gov.br/mec/pt-br/sisu',
      descricao:
        'Consulte informações gerais, orientações e comunicados oficiais sobre o programa.',
    },
    {
      titulo: 'Inscrição no SISU',
      url: 'https://sisualuno.mec.gov.br/',
      descricao:
        'Acesse o sistema oficial para realizar a inscrição e acompanhar suas opções de curso.',
    },
    {
      titulo: 'Portal Único de Acesso',
      url: 'https://acessounico.mec.gov.br/sisu',
      descricao:
        'Consulte o cronograma, as informações do processo seletivo e os editais da edição vigente.',
    },
    {
      titulo: 'Perguntas frequentes do MEC',
      url: 'https://www.gov.br/mec/pt-br/acesso-a-informacao/perguntas-frequentes/sisu',
      descricao:
        'Encontre respostas oficiais sobre inscrições, notas, modalidades de concorrência e matrícula.',
    },
    {
      titulo: 'Lei de Cotas',
      url: 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12711.htm',
      descricao:
        'Consulte a legislação sobre a reserva de vagas nas instituições federais de educação superior.',
    },
    {
      titulo: 'Recuperação da conta gov.br',
      url: 'https://sso.acesso.gov.br/login',
      descricao:
        'Acesse o sistema de autenticação caso precise recuperar o acesso à sua conta.',
    },
  ],
  indicadores: [
    {
      titulo: 'Opções de curso',
      valor: 'Até 2 opções',
    },
    {
      titulo: 'Taxa de inscrição',
      valor: 'Gratuita',
    },
    {
      titulo: 'Nota do ENEM',
      valor: 'Redação acima de zero em pelo menos uma edição válida',
    },
  ],
  requisitos: [
    'Ter participado de pelo menos uma das três últimas edições do ENEM consideradas pelo processo seletivo vigente.',
    'Ter obtido nota superior a zero na redação em pelo menos uma dessas edições.',
    'Não ter participado como treineiro na edição do ENEM utilizada para concorrer.',
    'Possuir conta gov.br para acessar o sistema de inscrição.',
    'Preencher corretamente os dados pessoais, sociais e econômicos solicitados.',
    'Atender aos critérios específicos do curso e da modalidade de concorrência escolhida, incluindo eventuais notas mínimas estabelecidas pela instituição.',
  ],
  etapas: [
    {
      titulo: 'Acesse o sistema',
      descricao:
        'Entre no portal oficial do SISU usando sua conta gov.br. O sistema recupera automaticamente as notas válidas do ENEM.',
    },
    {
      titulo: 'Preencha seus dados',
      descricao:
        'Confira seus dados pessoais e informe as informações sociais e econômicas solicitadas para identificar as modalidades de concorrência compatíveis com seu perfil.',
    },
    {
      titulo: 'Escolha até 2 cursos',
      descricao:
        'Selecione a primeira e, se desejar, a segunda opção de curso. Confira instituição, campus, turno, grau, pesos das provas e modalidades disponíveis.',
    },
    {
      titulo: 'Acompanhe a classificação parcial',
      descricao:
        'Durante as inscrições, acompanhe as notas de corte e sua classificação parcial. Você pode alterar suas opções até o encerramento do prazo, mas somente a última inscrição confirmada será considerada.',
    },
    {
      titulo: 'Confira o resultado e a matrícula',
      descricao:
        'Consulte o resultado da chamada regular. Se não for selecionado em nenhuma opção, poderá manifestar interesse na lista de espera para uma única opção, dentro do prazo previsto.',
    },
  ],
  prazos: [
    {
      titulo: 'Período de inscrições',
      inicio: null,
      fim: null,
      status: 'sem-data',
    },
    {
      titulo: 'Resultado da chamada regular',
      inicio: null,
      fim: null,
      status: 'sem-data',
    },
    {
      titulo: 'Manifestação de interesse na lista de espera',
      inicio: null,
      fim: null,
      status: 'sem-data',
    },
    {
      titulo: 'Convocações e matrículas',
      inicio: null,
      fim: null,
      status: 'sem-data',
    },
  ],
  perguntasFrequentes: [
    {
      pergunta: 'Quem pode se inscrever no SISU?',
      resposta:
        'Pode participar quem realizou pelo menos uma das três últimas edições do ENEM consideradas pelo processo seletivo, obteve nota superior a zero na redação em pelo menos uma delas e não participou como treineiro na edição utilizada para concorrer. Também é necessário observar as condições do edital vigente.',
    },
    {
      pergunta: 'A inscrição no SISU é paga?',
      resposta:
        'Não. A inscrição é gratuita e realizada pela internet, no sistema oficial do SISU.',
    },
    {
      pergunta: 'Posso escolher mais de um curso?',
      resposta:
        'Sim. É possível selecionar até duas opções de curso, em ordem de preferência, entre as vagas disponíveis.',
    },
    {
      pergunta: 'Posso alterar minhas opções depois de me inscrever?',
      resposta:
        'Sim. Durante o período de inscrições, você pode alterar as opções quantas vezes desejar. Ao final do prazo, será considerada somente a última inscrição registrada e confirmada.',
    },
    {
      pergunta: 'O que é a nota de corte?',
      resposta:
        'É uma referência baseada nas notas dos candidatos inscritos, na quantidade de vagas e na modalidade de concorrência. A classificação parcial e a nota de corte são temporárias e não garantem a seleção.',
    },
    {
      pergunta: 'Como funcionam as cotas?',
      resposta:
        'O SISU contempla modalidades de concorrência previstas na Lei de Cotas e ações afirmativas próprias das instituições participantes. O candidato deve informar seus dados corretamente, selecionar as modalidades compatíveis com seu perfil e comprovar os requisitos quando solicitado pela instituição.',
    },
    {
      pergunta: 'Preciso apresentar documentos durante a inscrição?',
      resposta:
        'Em geral, não é necessário apresentar documentos para realizar a inscrição no sistema. Se for selecionado, você deverá seguir as orientações da instituição e apresentar a documentação exigida para a matrícula e para comprovar os requisitos da modalidade de concorrência.',
    },
    {
      pergunta: 'Como funciona a lista de espera?',
      resposta:
        'Quem não for selecionado em nenhuma opção na chamada regular pode manifestar interesse na lista de espera para uma única opção, dentro do prazo definido no cronograma. Depois, deve acompanhar as convocações diretamente nos canais oficiais da instituição.',
    },
    {
      pergunta: 'Posso escolher em qual semestre vou começar a estudar?',
      resposta:
        'Não necessariamente. O semestre de início depende da oferta definida pela instituição para a vaga e da classificação obtida pelo candidato.',
    },
  ],
},


{
  id: 'enem',
  nome: 'ENEM',
  subtitulo: 'Sua nota como porta de entrada para a graduação',
  categoria: 'Guia de ingresso',
  atualizadoEm: '13/10/2026',
  descricao:
    'O Exame Nacional do Ensino Médio (Enem) foi criado em 1998 para avaliar o desempenho escolar ao final da educação básica. Desde 2009, também é utilizado como forma de acesso à educação superior. Sua nota pode ser utilizada em processos seletivos como SISU, PROUni e FIES, conforme as regras de cada programa, além de ser aceita por instituições portuguesas conveniadas com o Inep.',
  linksOficiais: [
    {
      titulo: 'Portal oficial do ENEM',
      url: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem',
      descricao:
        'Consulte informações oficiais sobre o exame, suas provas, resultados e orientações aos participantes.',
    },
    {
      titulo: 'Página do participante',
      url: 'https://enem.inep.gov.br/participante/',
      descricao:
        'Acesse o sistema do participante para acompanhar informações relacionadas à inscrição e ao exame.',
    },
    {
      titulo: 'Editais e publicações do Inep',
      url: 'https://www.gov.br/inep/pt-br/assuntos/noticias/enem',
      descricao:
        'Acompanhe comunicados, publicações e informações sobre as edições do ENEM.',
    },
    {
      titulo: 'Sistema de Seleção Unificada (SISU)',
      url: 'https://acessounico.mec.gov.br/sisu',
      descricao:
        'Consulte as condições para utilizar sua nota do ENEM na seleção para vagas em instituições públicas.',
    },
    {
      titulo: 'Programa Universidade para Todos (PROUni)',
      url: 'https://acessounico.mec.gov.br/prouni',
      descricao:
        'Consulte as regras para concorrer a bolsas de estudo em instituições privadas.',
    },
    {
      titulo: 'Fundo de Financiamento Estudantil (FIES)',
      url: 'https://acessounico.mec.gov.br/fies',
      descricao:
        'Confira as condições para utilizar sua nota do ENEM na seleção para financiamento estudantil.',
    },
    {
      titulo: 'Instituições portuguesas conveniadas',
      url: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/enem-portugal',
      descricao:
        'Consulte informações do Inep sobre o uso dos resultados do ENEM em instituições de educação superior portuguesas conveniadas.',
    },
  ],
  indicadores: [
    {
      titulo: 'Dias de aplicação',
      valor: '2 dias',
    },
    {
      titulo: 'Questões objetivas',
      valor: '180 questões',
    },
    {
      titulo: 'Áreas do conhecimento',
      valor: '4 áreas + redação',
    },
  ],
  requisitos: [
    'Ler o edital da edição vigente para conhecer as regras, os prazos e os procedimentos de inscrição.',
    'Realizar a inscrição dentro do período estabelecido, seguindo as orientações do Inep.',
    'Informar corretamente os dados solicitados e acompanhar a situação da inscrição na Página do Participante.',
    'Consultar o cartão de confirmação para verificar os locais e horários de aplicação.',
    'No dia das provas, cumprir as regras do edital, incluindo os documentos aceitos e os materiais permitidos.',
    'Quem ainda não concluiu o ensino médio pode participar como treineiro; nessa condição, os resultados são destinados à autoavaliação e não podem ser utilizados para ingresso no ensino superior na forma reservada aos participantes regulares.',
  ],
  etapas: [
    {
      titulo: 'Leia o edital',
      descricao:
        'Consulte o edital da edição vigente para verificar o calendário, os critérios de participação, os procedimentos de inscrição e as regras de aplicação.',
    },
    {
      titulo: 'Faça sua inscrição',
      descricao:
        'Acesse o sistema oficial durante o período de inscrições, informe os dados solicitados e siga as orientações para concluir o procedimento.',
    },
    {
      titulo: 'Acompanhe sua inscrição',
      descricao:
        'Verifique a situação da inscrição e acompanhe as publicações do Inep. Se necessário, consulte as orientações sobre atendimento especializado e nome social.',
    },
    {
      titulo: 'Consulte o local de prova',
      descricao:
        'Confira o cartão de confirmação e organize-se para chegar ao local com antecedência, seguindo os horários e as orientações oficiais.',
    },
    {
      titulo: 'Realize as provas',
      descricao:
        'O exame é aplicado em dois dias e reúne questões objetivas de quatro áreas do conhecimento, além de uma redação dissertativo-argumentativa.',
    },
    {
      titulo: 'Consulte seus resultados',
      descricao:
        'Após a divulgação oficial, acesse a Página do Participante para consultar as notas e verificar como utilizá-las nos processos seletivos compatíveis com seu perfil.',
    },
  ],
  prazos: [
    {
      titulo: 'Publicação do edital',
      inicio: null,
      fim: null,
      status: 'sem-data',
    },
    {
      titulo: 'Período de inscrições',
      inicio: null,
      fim: null,
      status: 'sem-data',
    },
    {
      titulo: 'Aplicação das provas',
      inicio: null,
      fim: null,
      status: 'sem-data',
    },
    {
      titulo: 'Divulgação dos resultados',
      inicio: null,
      fim: null,
      status: 'sem-data',
    },
  ],
  perguntasFrequentes: [
    {
      pergunta: 'Para que serve o ENEM?',
      resposta:
        'O exame avalia o desempenho dos participantes ao final da educação básica e permite utilizar os resultados em diferentes processos de acesso à educação superior, conforme as regras de cada programa ou instituição.',
    },
    {
      pergunta: 'Quem pode fazer o ENEM?',
      resposta:
        'Pessoas que já concluíram ou estão concluindo o ensino médio podem realizar o exame. Quem ainda não concluiu essa etapa também pode participar como treineiro, mas os resultados são destinados à autoavaliação.',
    },
    {
      pergunta: 'Como a prova é organizada?',
      resposta:
        'O exame é aplicado em dois dias e abrange Linguagens, Códigos e suas Tecnologias; Ciências Humanas e suas Tecnologias; Ciências da Natureza e suas Tecnologias; Matemática e suas Tecnologias. São 180 questões objetivas e uma redação.',
    },
    {
      pergunta: 'A inscrição é gratuita?',
      resposta:
        'A possibilidade de isenção da taxa depende dos critérios e dos procedimentos previstos no edital vigente. Quem não se enquadra nas condições de isenção deve observar o valor e as instruções oficiais para pagamento.',
    },
    {
      pergunta: 'Como funciona a redação?',
      resposta:
        'A redação consiste na produção de um texto dissertativo-argumentativo a partir de uma situação-problema, conforme os critérios de avaliação estabelecidos pelo Inep.',
    },
    {
      pergunta: 'Posso usar minha nota para entrar em uma universidade pública?',
      resposta:
        'Sim. A nota pode ser utilizada no SISU para concorrer a vagas em instituições públicas participantes, desde que você atenda às condições do processo seletivo vigente.',
    },
    {
      pergunta: 'Posso utilizar minha nota para conseguir uma bolsa ou financiamento?',
      resposta:
        'Sim. A nota pode ser utilizada em processos seletivos do PROUni e do FIES, desde que você cumpra os critérios específicos de cada programa e da edição vigente.',
    },
    {
      pergunta: 'Posso usar a nota do ENEM para estudar em Portugal?',
      resposta:
        'Algumas instituições portuguesas possuem acordos de cooperação com o Inep e aceitam os resultados do ENEM. É necessário consultar a lista de instituições conveniadas e as condições de ingresso de cada uma.',
    },
    {
      pergunta: 'É possível solicitar atendimento especializado?',
      resposta:
        'Sim. O exame prevê atendimento especializado, tratamento pelo nome social e recursos de acessibilidade para participantes que atendam aos critérios e sigam os procedimentos definidos no edital.',
    },
  ],
},

]


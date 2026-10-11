
export interface DadosMercadoSalarios {
  salarioInicialMedio: number
  salarioMedioCincoAnos: number
  empregabilidade12Meses: number
  areasAtuacao: {
    nome: string
    salarioMinimo: number
    salarioMaximo: number
  }[]
  demandaRegional: {
    regiao: string
    variacaoPercentual: number
    ultimosMeses: number[]
  }
  distribuicaoVagas: {
    setor: string
    percentual: number
  }[]
  registroProfissional: {
    exigido: boolean
    descricao: string
    sigla?: string
    habilitacoes?: number
  } | null
}

export const mercadoSalariosMock: Record<string, DadosMercadoSalarios> = {
  'c-biomedicina-uem': {
    salarioInicialMedio: 3480,
    salarioMedioCincoAnos: 6120,
    empregabilidade12Meses: 78,
    areasAtuacao: [
      {
        nome: 'Análises clínicas',
        salarioMinimo: 3200,
        salarioMaximo: 7400,
      },
      {
        nome: 'Pesquisa e docência',
        salarioMinimo: 2900,
        salarioMaximo: 9100,
      },
      {
        nome: 'Indústria farmacêutica',
        salarioMinimo: 4100,
        salarioMaximo: 11800,
      },
      {
        nome: 'Vigilância sanitária',
        salarioMinimo: 3800,
        salarioMaximo: 8600,
      },
    ],
    demandaRegional: {
      regiao: 'Paraná',
      variacaoPercentual: 12,
      ultimosMeses: [5, 6, 5.5, 7, 8, 10],
    },
    distribuicaoVagas: [
      { setor: 'Laboratórios de análises clínicas', percentual: 38 },
      { setor: 'Hospitais e clínicas', percentual: 24 },
      { setor: 'Indústria e biotecnologia', percentual: 21 },
      { setor: 'Setor público e pesquisa', percentual: 17 },
    ],
    registroProfissional: {
      exigido: true,
      descricao:
        'A atuação exige registro no Conselho Regional de Biomedicina após a formação.',
      sigla: 'CRBM',
      habilitacoes: 35,
    },
  },
}

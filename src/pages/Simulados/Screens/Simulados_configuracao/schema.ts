import { z } from 'zod'

const quantidadePorArea = z.number().int().min(0).optional()

// Campos sem as regras entre eles; serve também para ler a configuração vinda de outra tela
export const camposConfiguracao = z.object({
  tamanho: z.enum(['rapida', 'media', 'longa']),
  // Tamanho personalizado (1 a 100); nulo usa o tamanho pronto
  quantidade: z.number().int().min(1).max(100).nullable(),
  // Questões por categoria; quando existe, o total é a soma e as áreas marcadas não contam
  quantidades: z
    .object({ lc: quantidadePorArea, ch: quantidadePorArea, cn: quantidadePorArea, mt: quantidadePorArea })
    .nullable(),
  banca: z.literal('enem'),
  areas: z.array(z.enum(['lc', 'ch', 'cn', 'mt'])),
  cronometrado: z.boolean(),
  segundosPorQuestao: z.number().int().min(60).max(600),
})

export const schemaConfiguracao = camposConfiguracao.superRefine((dados, ctx) => {
  if (dados.quantidades === null && dados.areas.length === 0) {
    ctx.addIssue({ code: 'custom', path: ['areas'], message: 'Escolha pelo menos uma área' })
  }
})

export type ConfiguracaoSimulado = z.infer<typeof camposConfiguracao>

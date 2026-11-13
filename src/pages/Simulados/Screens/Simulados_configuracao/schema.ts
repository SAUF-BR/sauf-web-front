import { z } from 'zod'

export const schemaConfiguracao = z.object({
  tamanho: z.enum(['rapida', 'media', 'longa']),
  banca: z.literal('enem'),
  areas: z.array(z.enum(['lc', 'ch', 'cn', 'mt'])).min(1, 'Escolha pelo menos uma área'),
  cronometrado: z.boolean(),
  segundosPorQuestao: z.number().int().min(60).max(600),
})

export type ConfiguracaoSimulado = z.infer<typeof schemaConfiguracao>

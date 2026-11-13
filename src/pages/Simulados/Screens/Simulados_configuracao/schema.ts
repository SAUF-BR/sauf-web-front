import { z } from 'zod'

export const schemaConfiguracao = z.object({
  tamanho: z.enum(['rapida', 'media', 'longa']),
  banca: z.literal('enem'),
  areas: z.array(z.enum(['lc', 'ch', 'cn', 'mt'])).min(1, 'Escolha pelo menos uma área'),
  cronometrado: z.boolean(),
})

export type ConfiguracaoSimulado = z.infer<typeof schemaConfiguracao>

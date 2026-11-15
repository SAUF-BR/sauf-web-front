import { apiClient } from '../../lib/api/client'
import { endpoints } from '../../lib/api/endpoints'
import type { AceiteDocumento, DocumentoLegal } from './types'

export async function getDocumentosVigentes(): Promise<DocumentoLegal[]> {
  const { data } = await apiClient.get<DocumentoLegal[]>(endpoints.documentos.vigentes)
  return data
}

// Aceite de uma versão nova (tela "Atualizamos nossos termos"); exige login
export async function aceitarDocumentos(aceites: AceiteDocumento[]): Promise<void> {
  await apiClient.post(endpoints.documentos.aceites, { aceites })
}

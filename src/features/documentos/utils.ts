import { formatarDataExtenso } from '../../lib/utils'
import type { DocumentoLegal, TipoDocumento } from './types'

export const NOME_DOCUMENTO: Record<TipoDocumento, string> = {
  'termos-uso': 'Termos de Uso',
  'politica-privacidade': 'Política de Privacidade',
}

/** "Versão 1.0.0 · Última atualização: 15 de novembro de 2026 · leitura de 5 minutos" */
export function descreverDocumento(documento: DocumentoLegal) {
  const data = formatarDataExtenso(`${documento.vigenteDesde}T12:00:00Z`, { comAno: true })
  const minutos = documento.minutosLeitura === 1 ? '1 minuto' : `${documento.minutosLeitura} minutos`
  return `Versão ${documento.versao} · Última atualização: ${data} · leitura de ${minutos}`
}

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AvisoErro } from '../../../../components/ui/AvisoErro/AvisoErro'
import { Button } from '../../../../components/ui/Botao/Botao'
import { Carregando } from '../../../../components/ui/Carregando/Carregando'
import { EstadoErro } from '../../../../components/ui/EstadoErro/EstadoErro'
import { useSair, useUsuarioAtual } from '../../../auth/hooks'
import { useAceitarDocumentos, useDocumentosVigentes } from '../../hooks'
import type { DocumentoLegal } from '../../types'
import { NOME_DOCUMENTO } from '../../utils'
import { LeitorDocumentos } from '../LeitorDocumentos/LeitorDocumentos'
import styles from './AceiteAtualizacao.module.scss'

const chave = (documento: DocumentoLegal) => `${documento.tipo}@${documento.versao}`

/**
 * "Atualizamos nossos termos": aparece por cima de tudo quando a pessoa logada ainda não
 * aceitou a versão vigente de algum documento (D-93). Só some depois do aceite (ou ao sair).
 */
export function AceiteAtualizacao() {
  const { data: usuario } = useUsuarioAtual()
  const pendentes = usuario?.documentosPendentes ?? []

  if (pendentes.length === 0) return null
  return <JanelaAceite tipos={pendentes} />
}

function JanelaAceite({ tipos }: { tipos: string[] }) {
  const navigate = useNavigate()
  const consulta = useDocumentosVigentes()
  const aceitar = useAceitarDocumentos()
  const sair = useSair({ onSuccess: () => navigate('/', { replace: true }) })
  const [aceitos, setAceitos] = useState<Record<string, boolean>>({})

  const documentos = (consulta.data ?? []).filter((documento) => tipos.includes(documento.tipo))
  const todosAceitos = documentos.length > 0 && documentos.every((documento) => aceitos[chave(documento)])
  const resumos = documentos.filter((documento) => documento.resumoAlteracoes)

  // A página de trás não rola enquanto a janela está aberta
  useEffect(() => {
    const anterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = anterior
    }
  }, [])

  return (
    <div className={styles.fundo}>
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-aceite-atualizacao"
        className={styles.janela}
      >
        <header className={styles.cabecalho}>
          <h2 id="titulo-aceite-atualizacao" className={styles.titulo} tabIndex={-1} autoFocus>
            Atualizamos nossos termos
          </h2>
          <p className={styles.subtitulo}>
            Para continuar usando o SAUF, leia e aceite{' '}
            {documentos.map((documento) => NOME_DOCUMENTO[documento.tipo]).join(' e ') || 'os documentos'}.
          </p>
          {resumos.map((documento) => (
            <p key={documento.tipo} className={styles.resumo}>
              <strong>O que mudou em {NOME_DOCUMENTO[documento.tipo]}:</strong> {documento.resumoAlteracoes}
            </p>
          ))}
        </header>

        <div className={styles.corpo}>
          {consulta.isPending && <Carregando mensagem="Carregando os termos…" compacto />}
          {consulta.isError && (
            <EstadoErro
              titulo="Não foi possível carregar os termos"
              descricao={consulta.error.message}
              onTentarDeNovo={() => void consulta.refetch()}
              tentando={consulta.isFetching}
              compacto
            />
          )}
          {consulta.isSuccess && <LeitorDocumentos documentos={documentos} />}
        </div>

        <footer className={styles.rodape}>
          {documentos.map((documento) => (
            <label key={chave(documento)} className={styles.aceite}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={Boolean(aceitos[chave(documento)])}
                onChange={(e) => setAceitos((atual) => ({ ...atual, [chave(documento)]: e.target.checked }))}
              />
              <span>
                Li e aceito {documento.tipo === 'termos-uso' ? 'os' : 'a'}{' '}
                <strong>{NOME_DOCUMENTO[documento.tipo]}</strong> (versão {documento.versao}).
              </span>
            </label>
          ))}

          {aceitar.isError && <AvisoErro>{aceitar.error.message}</AvisoErro>}
          {sair.isError && <AvisoErro>{sair.error.message}</AvisoErro>}

          <div className={styles.acoes}>
            <Button variant="outline" onClick={() => sair.mutate()} disabled={sair.isPending || aceitar.isPending}>
              {sair.isPending ? 'Saindo…' : 'Sair da conta'}
            </Button>
            <Button
              className={styles.botaoAceitar}
              disabled={!todosAceitos || aceitar.isPending}
              onClick={() =>
                aceitar.mutate(documentos.map((documento) => ({ tipo: documento.tipo, versao: documento.versao })))
              }
            >
              {aceitar.isPending ? 'Salvando…' : 'Aceitar e continuar'}
            </Button>
          </div>
        </footer>
      </section>
    </div>
  )
}

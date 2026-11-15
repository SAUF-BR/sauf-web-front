import { useState } from 'react'
import { Logo } from '../../../../components/logo/Logo'
import { AvisoErro } from '../../../../components/ui/AvisoErro/AvisoErro'
import { Button } from '../../../../components/ui/Botao/Botao'
import { Carregando } from '../../../../components/ui/Carregando/Carregando'
import { EstadoErro } from '../../../../components/ui/EstadoErro/EstadoErro'
import {
  NOME_DOCUMENTO,
  useDocumentosVigentes,
  type AceiteDocumento,
  type DocumentoLegal,
} from '../../../../features/documentos'
import { LeitorDocumentos } from '../../../../features/documentos/components/LeitorDocumentos/LeitorDocumentos'
import { BarraProgresso } from '../BarraProgresso/BarraProgresso'
import styles from './EtapaTermos.module.scss'

const chave = (documento: DocumentoLegal) => `${documento.tipo}@${documento.versao}`

type EtapaTermosProps = {
  etapaAtual: number
  criando: boolean
  erro: string | null
  onVoltar: () => void
  // As versões exatas que a tela mostrou vão para a API (D-93)
  onCriar: (aceites: AceiteDocumento[]) => void
}

// Etapa 2 do cadastro: os Termos de Uso e a Política de Privacidade vigentes, vindos da API,
// com um aceite para cada documento (como o próprio texto dos termos pede).
export function EtapaTermos({ etapaAtual, criando, erro, onVoltar, onCriar }: EtapaTermosProps) {
  const consulta = useDocumentosVigentes()
  // Chave = tipo + versão: se o texto mudar (versão nova), o aceite antigo não vale
  const [aceitos, setAceitos] = useState<Record<string, boolean>>({})
  const documentos = consulta.data ?? []
  const todosAceitos = documentos.length > 0 && documentos.every((documento) => aceitos[chave(documento)])

  function criar() {
    onCriar(documentos.map((documento) => ({ tipo: documento.tipo, versao: documento.versao })))
  }

  return (
    <>
      <header className={styles.cabecalho}>
        <div className={styles.topoLinha}>
          <span className={styles.etapa}>Etapa 2 de 2</span>
          <Logo />
        </div>

        <div className={styles.progresso}>
          <BarraProgresso atual={etapaAtual} total={2} />
        </div>

        {/* Título compacto: o espaço da tela fica para o texto dos documentos */}
        <h1 className={styles.titulo}>Termos de uso e privacidade</h1>
        <p className={styles.subtitulo}>Leia os dois documentos e marque o aceite de cada um.</p>
      </header>

      <div className={styles.termos}>
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
          <label key={documento.tipo} className={styles.aceite}>
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

        {erro && <AvisoErro className={styles.erro}>{erro}</AvisoErro>}

        <div className={styles.acoes}>
          <Button
            variant="outline"
            className={styles.botaoCancelar}
            onClick={onVoltar}
            disabled={criando}
          >
            Cancelar
          </Button>
          <Button className={styles.botaoCriar} disabled={!todosAceitos || criando} onClick={criar}>
            {criando ? 'Criando conta…' : 'Aceitar e criar conta'}
          </Button>
        </div>
      </footer>
    </>
  )
}

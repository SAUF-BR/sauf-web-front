import { useId, useState, type ReactNode } from 'react'
import { Carregando } from '../../components/ui/Carregando/Carregando'
import { EstadoErro } from '../../components/ui/EstadoErro/EstadoErro'
import { useUsuarioAtual } from '../../features/auth'
import {
  useAlternarUniversidadeFavorita,
  useUniversidadesFavoritas,
  type UniversidadeFavoritaApi,
} from '../../features/favoritos'
import { cn } from '../../lib/utils'
import { ConviteLogin } from './components/ConviteLogin/ConviteLogin'
import { SeletorOrdenacao } from './components/SeletorOrdenacao/SeletorOrdenacao'
import { AbaCursos } from './Cursos/AbaCursos'
import {
  Comparadores_cursos,
  cursosFavoritosMock,
  cursosSelecionadosIniciaisMock,
  Opcoes_ordenacao_cursos,
  Ordenacao_padrao_cursos,
} from './Cursos/conteudo'
import { AbaUniversidades } from './Universidades/AbaUniversidades'
import {
  Comparadores_universidades,
  Opcoes_ordenacao_universidades,
  Ordenacao_padrao_universidades,
} from './Universidades/conteudo'
import type { AbaFavoritos } from './conteudo'
import { useFavoritos } from './useFavoritos'
import styles from './index.module.scss'

const Sem_universidades: UniversidadeFavoritaApi[] = []

function CabecalhoFavoritos({ acoes }: { acoes?: ReactNode }) {
  return (
    <header className={styles.cabecalho}>
      <div>
        <h1 className={styles.titulo}>Meus favoritos</h1>
        <p className={styles.subtitulo}>Salve, compare e acompanhe os prazos das suas opções</p>
      </div>

      {acoes && <div className={styles.acoes}>{acoes}</div>}
    </header>
  )
}

export default function Favoritos() {
  const { data: usuario, isPending, isError, error, isFetching, refetch } = useUsuarioAtual()

  if (isPending) {
    return (
      <main className={styles.pagina} aria-busy="true">
        <CabecalhoFavoritos />
        <Carregando mensagem="Carregando seus favoritos…" />
      </main>
    )
  }

  if (isError && usuario === undefined) {
    return (
      <main className={styles.pagina}>
        <EstadoErro
          titulo="Não foi possível carregar sua conta"
          descricao={error?.message}
          onTentarDeNovo={() => void refetch()}
          tentando={isFetching}
        />
      </main>
    )
  }

  if (!usuario) {
    return (
      <main className={styles.pagina}>
        <CabecalhoFavoritos />
        <ConviteLogin />
      </main>
    )
  }

  return <FavoritosLogado />
}

function FavoritosLogado() {
  const idBase = useId()
  const [aba, setAba] = useState<AbaFavoritos>('cursos')
  const [alertaCursosAtivo, setAlertaCursosAtivo] = useState(true)
  const [alertaUniversidadesAtivo, setAlertaUniversidadesAtivo] = useState(true)

  const cursos = useFavoritos({
    iniciais: cursosFavoritosMock,
    comparadores: Comparadores_cursos,
    ordenacaoPadrao: Ordenacao_padrao_cursos,
    selecionadosIniciais: cursosSelecionadosIniciaisMock,
  })

  const universidadesApi = useUniversidadesFavoritas()
  const alternarUniversidade = useAlternarUniversidadeFavorita()

  const universidades = useFavoritos({
    iniciais: universidadesApi.data ?? Sem_universidades,
    comparadores: Comparadores_universidades,
    ordenacaoPadrao: Ordenacao_padrao_universidades,
    aoRemover: (item) => alternarUniversidade.mutate({ universidadeId: item.id, favoritar: false }),
    aoDesfazerRemocao: (item) =>
      alternarUniversidade.mutate({ universidadeId: item.id, favoritar: true, universidade: item }),
  })

  const abas: { id: AbaFavoritos; rotulo: string; total: number }[] = [
    { id: 'cursos', rotulo: 'Cursos', total: cursos.total },
    { id: 'universidades', rotulo: 'Universidades', total: universidades.total },
  ]

  return (
    <main className={styles.pagina}>
      <CabecalhoFavoritos
        acoes={
          <>
            {aba === 'cursos' && cursos.total > 0 && (
              <SeletorOrdenacao
                valor={cursos.ordenacao}
                opcoes={Opcoes_ordenacao_cursos}
                onMudar={cursos.ordenar}
              />
            )}
            {aba === 'universidades' && universidades.total > 0 && (
              <SeletorOrdenacao
                valor={universidades.ordenacao}
                opcoes={Opcoes_ordenacao_universidades}
                onMudar={universidades.ordenar}
              />
            )}
          </>
        }
      />

      <div role="tablist" aria-label="Tipo de favorito" className={styles.abas}>
        {abas.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`${idBase}-aba-${item.id}`}
            aria-selected={aba === item.id}
            aria-controls={`${idBase}-painel`}
            className={cn(styles.aba, aba === item.id && styles.abaAtiva)}
            onClick={() => setAba(item.id)}
          >
            {item.rotulo} <span className={styles.abaTotal}>{item.total}</span>
          </button>
        ))}
      </div>

      <section
        role="tabpanel"
        id={`${idBase}-painel`}
        aria-labelledby={`${idBase}-aba-${aba}`}
        className={styles.conteudo}
      >
        {aba === 'cursos' ? (
          <AbaCursos
            favoritos={cursos}
            alertaAtivo={alertaCursosAtivo}
            onAlternarAlerta={() => setAlertaCursosAtivo((atual) => !atual)}
          />
        ) : (
          <AbaUniversidades
            favoritos={universidades}
            carregando={universidadesApi.isPending}
            erro={universidadesApi.isError && !universidadesApi.data}
            mensagemErro={universidadesApi.error?.message}
            tentando={universidadesApi.isFetching}
            onTentarDeNovo={() => void universidadesApi.refetch()}
            erroAlteracao={alternarUniversidade.isError ? alternarUniversidade.error.message : null}
            alertaAtivo={alertaUniversidadesAtivo}
            onAlternarAlerta={() => setAlertaUniversidadesAtivo((atual) => !atual)}
          />
        )}
      </section>
    </main>
  )
}
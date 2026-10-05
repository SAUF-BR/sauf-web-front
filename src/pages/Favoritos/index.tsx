import { useId, useState } from 'react'
import { cn } from '../../lib/utils'
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
  universidadesFavoritasMock,
  universidadesSelecionadasIniciaisMock,
} from './Universidades/conteudo'
import type { AbaFavoritos } from './conteudo'
import { useFavoritos } from './useFavoritos'
import styles from './index.module.scss'

export default function Favoritos() {
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

  const universidades = useFavoritos({
    iniciais: universidadesFavoritasMock,
    comparadores: Comparadores_universidades,
    ordenacaoPadrao: Ordenacao_padrao_universidades,
    selecionadosIniciais: universidadesSelecionadasIniciaisMock,
  })

  const abas: { id: AbaFavoritos; rotulo: string; total: number }[] = [
    { id: 'cursos', rotulo: 'Cursos', total: cursos.total },
    { id: 'universidades', rotulo: 'Universidades', total: universidades.total },
  ]

  return (
    <main className={styles.pagina}>
      <header className={styles.cabecalho}>
        <div>
          <h1 className={styles.titulo}>Meus favoritos</h1>
          <p className={styles.subtitulo}>Salve, compare e acompanhe os prazos das suas opções</p>
        </div>

        <div className={styles.acoes}>
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
        </div>
      </header>

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
            alertaAtivo={alertaUniversidadesAtivo}
            onAlternarAlerta={() => setAlertaUniversidadesAtivo((atual) => !atual)}
          />
        )}
      </section>
    </main>
  )
}
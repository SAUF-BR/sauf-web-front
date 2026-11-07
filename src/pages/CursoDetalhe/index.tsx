import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCurso } from '../../features/cursos/hooks'
import { CursoDetalheHeader } from './components/CursoDetalheHeader/CursoDetalheHeader'
import {
  NavegacaoAbas,
  type AbaCurso,
} from './components/NavegacaoAbas/NavegacaoAbas'
import { VisaoGeral } from './abas/VisaoGeral/VisaoGeral'
import { MercadoSalarios } from './abas/MercadoSalarios/MercadoSalarios'
import { CursosParecidos } from './abas/CursosParecidos/CursosParecidos'
import styles from './index.module.scss'

export default function CursoDetalhe() {
  const { cursoId } = useParams<{ cursoId: string }>()
  const [abaAtiva, setAbaAtiva] = useState<AbaCurso>('visao-geral')

  const { data: curso, isLoading, isError } = useCurso(cursoId)

  if (isLoading) {
    return (
      <main className={styles.page}>
        <p>Carregando curso...</p>
      </main>
    )
  }

  if (isError || !curso) {
    return (
      <main className={styles.page}>
        <h1>Curso não encontrado</h1>
        <p>Não encontramos um curso com esse identificador.</p>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <CursoDetalheHeader curso={curso}/>

      <div className={styles.container}>
        <NavegacaoAbas
          abaAtiva={abaAtiva}
          onChange={setAbaAtiva}
        />

        <section className={styles.conteudo}>
          {abaAtiva === 'visao-geral' && <VisaoGeral curso={curso} />}

          
          {abaAtiva === 'mercado-salarios' && (
            <MercadoSalarios curso={curso} />
          )}

          {abaAtiva === 'cursos-parecidos' && (
            <CursosParecidos curso={curso} />
          )}
         
        </section>
      </div>
    </main>
  )
}
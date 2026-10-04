import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Imagem } from '../../../../components/ui/Imagem/Imagem'
import { ROTULO_TIPO_UNIVERSIDADE } from '../../../../features/universidades'
import { ESTADOS_BR, formatarInteiro } from '../../../../lib/utils'
import { ROTAS } from '../../../../routes/paths'
import { Rotulo_modalidade_detalhe, type UniversidadeDetalhe } from '../../conteudo'
import styles from './CabecalhoUniversidade.module.scss'

type CabecalhoUniversidadeProps = {
  universidade: UniversidadeDetalhe
  favorito: boolean
  onAlternarFavorito: () => void
}

export function CabecalhoUniversidade({
  universidade,
  favorito,
  onAlternarFavorito,
}: CabecalhoUniversidadeProps) {
  const estado = ESTADOS_BR[universidade.uf]

  const gestao = universidade.esfera
    ? `${ROTULO_TIPO_UNIVERSIDADE[universidade.tipo]} ${universidade.esfera}`
    : ROTULO_TIPO_UNIVERSIDADE[universidade.tipo]

  const subtitulo = [
    `${universidade.cidade}, ${estado}`,
    universidade.anoFundacao && `fundada em ${universidade.anoFundacao}`,
    universidade.sigla && `sigla ${universidade.sigla}`,
  ]
    .filter(Boolean)
    .join(' · ')

  const modalidadesDisponiveis = universidade.modalidades.filter((m) => m.disponivel)

  const linkCursos = `${ROTAS.cursos}?${new URLSearchParams({ universidade: universidade.id })}`

  return (
    <header>
   
      <Imagem
        src={universidade.capaUrl}
        alt={`Foto do campus da ${universidade.nome}`}
        rotuloPlaceholder="foto do campus · 1200×150"
        className={styles.capa}
      />

      <div className={styles.faixa}>
        <div className={styles.conteudo}>
          <div className={styles.principal}>
          
            <nav aria-label="Trilha de navegação">
              <ol className={styles.trilha}>
                <li>
                  <Link to={ROTAS.universidades}>Universidades</Link>
                </li>
                <li>{estado}</li>
                <li aria-current="page">{universidade.sigla ?? universidade.nome}</li>
              </ol>
            </nav>

            <div className={styles.identificacao}>
              <Imagem
                src={universidade.logoUrl}
                alt={`Logo ${universidade.sigla ?? universidade.nome}`}
                rotuloPlaceholder="logo"
                className={styles.logo}
              />
              <div className={styles.textos}>
                <h1 className={styles.nome}>{universidade.nome}</h1>
                <p className={styles.subtitulo}>{subtitulo}</p>
              </div>
            </div>

            <ul className={styles.badges} aria-label="Características da universidade">
              <li className={`${styles.badge} ${styles.badgeGestao}`}>{gestao}</li>
              {universidade.notaMec !== null && (
                <li className={`${styles.badge} ${styles.badgeNotaMec}`}>
                  Nota MEC {universidade.notaMec}
                </li>
              )}
              {modalidadesDisponiveis.map((m) => (
                <li key={m.modalidade} className={styles.badge}>
                  {Rotulo_modalidade_detalhe[m.modalidade]}
                </li>
              ))}
              {universidade.gratuita && <li className={styles.badge}>Gratuita</li>}
            </ul>
          </div>

          <div className={styles.acoes}>
            <Link to={linkCursos} className={styles.botaoPrimario}>
              Ver os {formatarInteiro(universidade.totalCursos)} cursos
            </Link>

            <button
              type="button"
              aria-pressed={favorito}
              className={`${styles.botaoSecundario} ${favorito ? styles.salvo : ''}`}
              onClick={onAlternarFavorito}
            >
              <Heart size="1em" fill={favorito ? 'currentColor' : 'none'} aria-hidden="true" />
              {favorito ? 'Salvo' : 'Salvar universidade'}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
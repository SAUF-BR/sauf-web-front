import type { ReactNode } from 'react'
import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '../../../../components/ui/Card/Card'
import { Imagem } from '../../../../components/ui/Imagem/Imagem'
import { cn } from '../../../../lib/utils'
import { formatarStatus, type Metrica, type StatusFavorito } from '../../conteudo'
import styles from './CardFavorito.module.scss'

type CardFavoritoProps = {
  nome: string
  nomeAcessivel: string
  imagem: { src: string | null; alt: string; placeholder: string }
  tags: ReactNode
  detalhes: string
  status: StatusFavorito | null
  metricas: Metrica[]
  link: { para: string; rotulo: string }
  selecionado: boolean
  onAlternarSelecao: () => void
  onRemover: () => void
}

const Classe_status = {
  prazo: styles.statusPrazo,
  info: styles.statusInfo,
  neutro: styles.statusNeutro,
}

export function CardFavorito({
  nome,
  nomeAcessivel,
  imagem,
  tags,
  detalhes,
  status,
  metricas,
  link,
  selecionado,
  onAlternarSelecao,
  onRemover,
}: CardFavoritoProps) {
  return (
    <Card className={cn(styles.card, selecionado && styles.selecionado)}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={selecionado}
        onChange={onAlternarSelecao}
        aria-label={`Selecionar ${nomeAcessivel} para comparar`}
      />

      <Imagem
        src={imagem.src}
        alt={imagem.alt}
        rotuloPlaceholder={imagem.placeholder}
        className={styles.imagem}
      />

      <div className={styles.info}>
        <div className={styles.titulo}>
          <h3 className={styles.nome}>{nome}</h3>
          {tags}
        </div>

        <p className={styles.detalhes}>{detalhes}</p>

        {status && (
          <p className={cn(styles.status, Classe_status[status.tipo])}>{formatarStatus(status)}</p>
        )}
      </div>

      {metricas.length > 0 && (
        <dl className={styles.metricas}>
          {metricas.map((metrica) => (
            <div key={metrica.rotulo} className={styles.metrica}>
              <dt>{metrica.rotulo}</dt>
              <dd>{metrica.valor}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className={styles.acoes}>
        <Link to={link.para} className={styles.ver} aria-label={`${link.rotulo}: ${nomeAcessivel}`}>
          {link.rotulo}
        </Link>
        <button
          type="button"
          className={styles.remover}
          onClick={onRemover}
          aria-label={`Remover ${nomeAcessivel} dos favoritos`}
        >
          <Heart size="1em" fill="currentColor" aria-hidden="true" />
          Remover
        </button>
      </div>
    </Card>
  )
}
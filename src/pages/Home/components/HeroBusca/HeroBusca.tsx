import { Link, useNavigate } from 'react-router-dom'
import { BarraBusca } from '../../../../components/ui/BarraBusca/BarraBusca'
import { ROTAS } from '../../../../routes/paths'
import styles from './HeroBusca.module.scss'

type HeroBuscaProps = {
  primeiroNome?: string
  buscasPopulares: string[]
}

export function HeroBusca({ primeiroNome, buscasPopulares }: HeroBuscaProps) {
  const navigate = useNavigate()

  function handleBuscar(termo: string) {
    navigate(termo ? ROTAS.busca(termo) : ROTAS.cursos)
  }

  return (
    <div className={styles.hero}>
      {primeiroNome && <p className={styles.saudacao}>Olá, {primeiroNome}</p>}

      <h1 className={styles.titulo}>
        Escolha seu futuro com <em className={styles.destaque}>informação, não achismo.</em>
      </h1>

      <div className={styles.busca}>
        <BarraBusca
          rotulo="Buscar cursos, universidades ou formas de ingresso"
          placeholder="Busque um curso, universidade ou forma de ingresso"
          onBuscar={handleBuscar}
        />

        {buscasPopulares.length > 0 && (
          <div className={styles.populares}>
            <span id="buscas-populares">Populares:</span>
            <ul aria-labelledby="buscas-populares" className={styles.popularesLista}>
              {buscasPopulares.map((termo) => (
                <li key={termo}>
                  <Link to={ROTAS.busca(termo)} className={styles.popularLink}>
                    {termo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

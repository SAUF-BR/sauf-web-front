import { Link } from 'react-router-dom'
import { ROTAS } from '../../../../../routes/paths'
import { NOME_AREA, type FocoEstudo } from '../../../../../features/simulados'
import styles from './OndeFocarCard.module.scss'

interface OndeFocarCardProps {
  focos: FocoEstudo[]
}

export function OndeFocarCard({ focos }: OndeFocarCardProps) {
  const principal = focos.at(0)

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Onde focar agora</h3>

      {focos.length === 0 ? (
        <p className={styles.descricao}>Nenhum erro nos simulados do período. Continue praticando!</p>
      ) : (
        <ol className={styles.list}>
          {focos.map((foco) => (
            <li key={foco.ordem} className={styles.item}>
              <span className={styles.badgeNumber} aria-hidden="true">{foco.ordem}</span>
              <div>
                <strong className={styles.materiaTitle}>
                  {NOME_AREA[foco.area]}
                  {foco.habilidade && ` · Habilidade ${foco.habilidade}`}
                </strong>
                <p className={styles.descricao}>{foco.descricao}</p>
                <p className={styles.contagem}>
                  {foco.erros} {foco.erros === 1 ? 'erro' : 'erros'} em {foco.respondidas}{' '}
                  {foco.respondidas === 1 ? 'questão respondida' : 'questões respondidas'}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}

      <Link
        to={principal ? `${ROTAS.simuladosConfiguracao}?area=${principal.area}` : ROTAS.simuladosConfiguracao}
        className={styles.actionBtn}
      >
        {principal ? `Criar simulado de ${NOME_AREA[principal.area]}` : 'Criar simulado'}
      </Link>
    </div>
  )
}

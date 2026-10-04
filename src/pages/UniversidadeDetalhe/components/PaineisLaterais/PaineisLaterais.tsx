import { Check, Minus } from 'lucide-react'
import { Imagem } from '../../../../components/ui/Imagem/Imagem'
import type { FormaIngresso, ProximoPrazo, UniversidadeDetalhe } from '../../conteudo'
import styles from './PaineisLaterais.module.scss'

const Um_dia_ms = 24 * 60 * 60 * 1000

function diasAte(dataIso: string) {
  const agora = new Date()
  const hoje = Date.UTC(agora.getFullYear(), agora.getMonth(), agora.getDate())

  return Math.round((Date.parse(dataIso) - hoje) / Um_dia_ms)
}

function formatarDiaMesExtenso(dataIso: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  }).format(new Date(dataIso))
}

function textoContagem(dias: number) {
  if (dias === 0) return 'Encerra hoje'
  if (dias === 1) return 'Encerra amanhã'
  return `Encerra em ${dias} dias`
}

type PainelOndeFicaProps = Pick<UniversidadeDetalhe, 'nome' | 'cidade' | 'uf' | 'endereco' | 'distanciaKm'>

export function PainelOndeFica({ nome, cidade, uf, endereco, distanciaKm }: PainelOndeFicaProps) {
  const busca = [nome, endereco?.logradouro, `${cidade} - ${uf}`].filter(Boolean).join(', ')
  const linkMapa = `https://www.google.com/maps/search/?${new URLSearchParams({ api: '1', query: busca })}`

  return (
    <section className={styles.painel} aria-labelledby="painel-onde-fica">
      <Imagem src={null} alt="Mapa do campus" rotuloPlaceholder="mapa do campus" className={styles.mapa} />

      <div className={styles.corpo}>
        <h2 id="painel-onde-fica" className={styles.titulo}>
          Onde fica
        </h2>

        <address className={styles.endereco}>
          {endereco ? (
            <>
              {endereco.logradouro}
              <br />
              {cidade}, {uf} · CEP {endereco.cep}
            </>
          ) : (
            `${cidade}, ${uf}`
          )}
        </address>

        <div className={styles.rodape}>
          {distanciaKm !== null && (
            <p className={styles.distancia}>
              <span className={styles.ponto} aria-hidden="true" />A {distanciaKm} km de você
            </p>
          )}

          <a href={linkMapa} target="_blank" rel="noreferrer" className={styles.link}>
            Abrir no mapa ›
          </a>
        </div>
      </div>
    </section>
  )
}

type PainelFormasIngressoProps = {
  formas: FormaIngresso[]
  nota: string | null
}

export function PainelFormasIngresso({ formas, nota }: PainelFormasIngressoProps) {
  return (
    <section className={`${styles.painel} ${styles.corpo}`} aria-labelledby="painel-formas-ingresso">
      <h2 id="painel-formas-ingresso" className={styles.titulo}>
        Formas de ingresso aceitas
      </h2>

      {formas.length === 0 ? (
        <p className={styles.vazio}>As formas de ingresso ainda não foram informadas.</p>
      ) : (
        <ul className={styles.checklist}>
          {formas.map((forma) => (
            <li key={forma.nome} className={forma.aceita ? '' : styles.inativo}>
              <span className={styles.indicador} aria-hidden="true">
                {forma.aceita ? <Check size={12} strokeWidth={3} /> : <Minus size={12} />}
              </span>
              {forma.nome}
              {!forma.aceita && <span className={styles.somenteLeitor}> (não aceita)</span>}
            </li>
          ))}
        </ul>
      )}

      {nota && <p className={styles.nota}>{nota}</p>}
    </section>
  )
}

type PainelProximoPrazoProps = {
  prazo: ProximoPrazo | null
}

export function PainelProximoPrazo({ prazo }: PainelProximoPrazoProps) {
  const dias = prazo ? diasAte(prazo.data) : null
  const temPrazo = prazo !== null && dias !== null && dias >= 0

  return (
    <section
      className={`${styles.painel} ${styles.corpo} ${temPrazo ? styles.prazo : ''}`}
      aria-labelledby="painel-prazo"
    >
      <h2 id="painel-prazo" className={styles.titulo}>
        Próximo prazo
      </h2>

      {temPrazo ? (
        <>
          <p className={styles.texto}>
            {prazo.titulo} · inscrições até{' '}
            <time dateTime={prazo.data}>{formatarDiaMesExtenso(prazo.data)}</time>.
          </p>

          <p className={styles.contagem}>
            <span className={`${styles.ponto} ${styles.pontoAlerta}`} aria-hidden="true" />
            {textoContagem(dias)}
          </p>

          {prazo.editalUrl && (
            <a href={prazo.editalUrl} target="_blank" rel="noreferrer" className={styles.botao}>
              Ver edital
            </a>
          )}
        </>
      ) : (
        <p className={styles.vazio}>Nenhum prazo aberto no momento.</p>
      )}
    </section>
  )
}
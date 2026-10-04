import { Link, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { TamanhoCard, type TamanhoOpcao } from './components/TamanhoCard/TamanhoCard'
import { useState } from 'react'

export default function SimuladosConfiguracao() {

  const navigate = useNavigate()


  const mockTamanhos: TamanhoOpcao[] = [
    {
      id: 'rapida',
      titulo: 'Rápida',
      questoes: 10,
      tempoEstimadoMinutos: 25,
      descricaoTempo: 'Cerca de 25 minutos.',
      subtexto: 'Boa para treinar uma categoria só.',
    },
    {
      id: 'media',
      titulo: 'Média',
      questoes: 20,
      tempoEstimadoMinutos: 50,
      descricaoTempo: 'Cerca de 50 minutos.',
      subtexto: 'Equilibra tempo e variedade de conteúdo.',
      sugerida: true,
    },
    {
      id: 'longa',
      titulo: 'Longa',
      questoes: 30,
      tempoEstimadoMinutos: 75,
      descricaoTempo: 'Cerca de 1h15.',
      subtexto: 'Mais próxima do ritmo da prova real.',
    },
  ]

  const mockVestibulares = [
    { id: 'enem', label: 'ENEM' },
    { id: 'uem', label: 'Vestibular UEM' },
    { id: 'utfpr', label: 'Vestibular UTFPR' },
    { id: 'uel', label: 'Vestibular UEL' },
    { id: 'todos', label: 'Misturar todos' },
  ]

  const mockCategorias = [
    'Matemática',
    'Física',
    'Química',
    'Biologia',
    'Português',
    'História',
    'Geografia',
    'Redação',
  ]

  const [tamanhoSel, setTamanhoSel] = useState<TamanhoOpcao>(mockTamanhos[1]) // Padrão: Média
  const [vestibularSel, setVestibularSel] = useState<string>('ENEM')
  const [categoriasSel, setCategoriasSel] = useState<string[]>(['Matemática', 'Física'])
  const [cronometrar, setCronometrar] = useState<boolean>(true)

  const toggleCategoria = (categoria: string) => {
    setCategoriasSel((prev) =>
      prev.includes(categoria)
        ? prev.filter((c) => c !== categoria)
        : [...prev, categoria]
    )
  }

  const toggleSelecionarTodas = () => {
    if (categoriasSel.length === mockCategorias.length) {
      setCategoriasSel([])
    } else {
      setCategoriasSel([...mockCategorias])
    }
  }

  return (
    <main className={styles.pageWrapper}>
      <header className={styles.headerSection}>
        <div className={styles.headerContainer}>
          <div className={styles.breadcrumb}>
            <Link to="/simulados">Simulados</Link>
            <span>/</span>
            <span className={styles.currentBreadcrumb}>Novo simulado</span>
          </div>

          <h1 className={styles.title}>Configurar seu simulado</h1>

          <p className={styles.subtitle}>
            Escolha o tamanho, o vestibular e as categorias. Você pode pausar e retomar depois.
          </p>
        </div>
      </header>

      {/* Conteúdo Principal com Form e Resumo Lateral */}
      <section className={styles.contentSection}>
        <div className={styles.contentContainer}>
          {/* Lado Esquerdo: Opções de Configuração */}
          <div className={styles.configForm}>
            {/* Bloco 1: Tamanho do Simulado */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionTitleRow}>
                <h2>1 · TAMANHO DO SIMULADO</h2>
                <span className={styles.badgeObrigatorio}>obrigatório</span>
              </div>

              <div className={styles.tamanhosGrid}>
                {mockTamanhos.map((opcao) => (
                  <TamanhoCard
                    key={opcao.id}
                    opcao={opcao}
                    isSelecionado={tamanhoSel.id === opcao.id}
                    onSelect={() => setTamanhoSel(opcao)}
                  />
                ))}
              </div>
            </div>

            {/* Bloco 2: Vestibular */}
            <div className={styles.sectionBlock}>
              <h2>2 · VESTIBULAR</h2>
              <div className={styles.pillsRow}>
                {mockVestibulares.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    className={`${styles.pillBtn} ${vestibularSel === v.label ? styles.activePill : ''}`}
                    onClick={() => setVestibularSel(v.label)}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bloco 3: Categorias */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionHeaderFlex}>
                <h2>3 · CATEGORIAS</h2>
                <button
                  type="button"
                  className={styles.linkAction}
                  onClick={toggleSelecionarTodas}
                >
                  {categoriasSel.length === mockCategorias.length ? 'Desmarcar todas' : 'Selecionar todas'}
                </button>
              </div>

              <div className={styles.categoriasGrid}>
                {mockCategorias.map((cat) => {
                  const isChecked = categoriasSel.includes(cat)
                  return (
                    <button
                      key={cat}
                      type="button"
                      className={`${styles.checkboxCard} ${isChecked ? styles.checkedCard : ''}`}
                      onClick={() => toggleCategoria(cat)}
                    >
                      <div className={`${styles.checkIcon} ${isChecked ? styles.iconActive : ''}`}>
                        {isChecked && '✓'}
                      </div>
                      <span className={styles.catLabel}>{cat}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Bloco 4: Tempo */}
            <div className={styles.sectionBlock}>
              <h2>4 · TEMPO</h2>
              <div className={styles.toggleCard}>
                <div>
                  <strong>Cronometrar o simulado</strong>
                  <p>Limite de 2m30 por questão, como na prova real</p>
                </div>
                <button
                  type="button"
                  className={`${styles.switchBtn} ${cronometrar ? styles.switchOn : ''}`}
                  onClick={() => setCronometrar(!cronometrar)}
                >
                  <span className={styles.switchHandle} />
                </button>
              </div>
            </div>
          </div>

          {/* Lado Direito: Card de Resumo Flutuante */}
          <aside className={styles.summarySidebar}>
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Resumo</h3>

              <div className={styles.summaryList}>
                <div className={styles.summaryRow}>
                  <span className={styles.label}>Tamanho</span>
                  <strong className={styles.value}>
                    {tamanhoSel.titulo} · {tamanhoSel.questoes} questões
                  </strong>
                </div>

                <div className={styles.summaryRow}>
                  <span className={styles.label}>Vestibular</span>
                  <strong className={styles.value}>{vestibularSel}</strong>
                </div>

                <div className={styles.summaryRow}>
                  <span className={styles.label}>Categorias</span>
                  <strong className={styles.value}>
                    {categoriasSel.length > 0 ? categoriasSel.join(', ') : 'Nenhuma selecionada'}
                  </strong>
                </div>

                <div className={styles.summaryRow}>
                  <span className={styles.label}>Tempo estimado</span>
                  <strong className={styles.value}>{tamanhoSel.tempoEstimadoMinutos} minutos</strong>
                </div>
              </div>

              {/* Botão para iniciar simulado apontando para /simulados/questoes */}
              <button
                type="button"
                className={styles.startBtn}
                onClick={() => navigate('/simulados/questoes')}
              >
                Começar simulado
              </button>

              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => navigate('/simulados')}
              >
                Cancelar
              </button>

              <p className={styles.footerInfo}>
                ● Suas respostas ficam salvas a cada questão. Dá para sair e continuar depois de onde parou.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
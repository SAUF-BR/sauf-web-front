
import styles from './SliderFaixa.module.scss'

interface SliderFaixaProps {
  min: number
  max: number
  valor: number
  onChange: (valor: number) => void
}

export function SliderFaixa({
  min,
  max,
  valor,
  onChange,
}: SliderFaixaProps) {
  const progresso = ((valor - min) / (max - min)) * 100

  return (
    <div className={styles.sliderContainer}>
      <input
        className={styles.slider}
        type="range"
        min={min}
        max={max}
        value={valor}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{
          background: `linear-gradient(to right, #204B57 0%, #204B57 ${progresso}%, #E6E1D6 ${progresso}%, #E6E1D6 100%)`,
        }}
      />

      <div className={styles.sliderValores}>
        <span>{valor}</span>
        <span>até {max}</span>
      </div>
    </div>
  )
}

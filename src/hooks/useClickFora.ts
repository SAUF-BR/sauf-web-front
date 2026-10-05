import { useEffect, type RefObject } from 'react'

export function useClickFora(
  ref: RefObject<HTMLElement | null>,
  aoClicarFora: () => void,
  ativo = true,
) {
  useEffect(() => {
    if (!ativo) return

    function aoPressionar(evento: PointerEvent) {
      if (ref.current && !ref.current.contains(evento.target as Node)) aoClicarFora()
    }

    document.addEventListener('pointerdown', aoPressionar)
    return () => document.removeEventListener('pointerdown', aoPressionar)
  }, [ref, aoClicarFora, ativo])
}

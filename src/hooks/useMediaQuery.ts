import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (aoMudar) => {
      const lista = window.matchMedia(query)
      lista.addEventListener('change', aoMudar)
      return () => lista.removeEventListener('change', aoMudar)
    },
    () => window.matchMedia(query).matches,
  )
}

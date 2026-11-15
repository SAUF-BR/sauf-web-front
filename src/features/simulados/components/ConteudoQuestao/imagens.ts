// Só aceita imagens http(s); qualquer outro esquema (javascript:, data:) vira o texto alternativo
export function urlSegura(url: string | undefined): url is string {
  return url !== undefined && /^https?:\/\//i.test(url)
}

// URLs das imagens de um texto, para pré-carregar a próxima questão
export function urlsDeImagens(texto: string | null) {
  if (!texto) return []
  return [...texto.matchAll(/!\[[^\]]*\]\(\s*<?([^)\s>]+)/g)].map((m) => m[1]).filter(urlSegura)
}

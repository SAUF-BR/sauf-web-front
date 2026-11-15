// Avisa a tela de login que a pessoa caiu nela porque a sessão expirou (e não porque
// clicou em "Entrar"). Guardado só em memória: some ao recarregar a página.

let sessaoExpirada = false

export function marcarSessaoExpirada() {
  sessaoExpirada = true
}

export function sessaoAcabouDeExpirar(): boolean {
  return sessaoExpirada
}

/** O login já mostrou o aviso: apaga para não repetir na próxima visita. */
export function limparSessaoExpirada() {
  sessaoExpirada = false
}

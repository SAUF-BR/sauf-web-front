/**
 * Simula uma chamada à API devolvendo os dados mockados após um pequeno atraso.
 * Uso temporário dentro de `features/<dominio>/api.ts` enquanto o contrato com a
 * API Java não está definido — a troca pela chamada real acontece só no api.ts.
 */
export function simularRequisicao<T>(dados: T, atrasoMs = 300): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(dados)), atrasoMs)
  })
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // 'true' simula assinatura ativa (apenas desenvolvimento)
  readonly VITE_MOCK_ASSINATURA?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

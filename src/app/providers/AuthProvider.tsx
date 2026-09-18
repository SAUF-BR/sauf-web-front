import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

interface Usuario {
  id: string
  nome: string
  email: string
}

interface AuthContextValue {
  user: Usuario | null
  assinaturaAtiva: boolean
  login: (email: string, senha: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null)
  const [assinaturaAtiva, setAssinaturaAtiva] = useState(false)

  const login = async (_email: string, _senha: string) => {
    // TODO: integrar com a API de autenticação (POST /auth/login)
    setUser(null)
    setAssinaturaAtiva(false)
  }

  const logout = () => {
    setUser(null)
    setAssinaturaAtiva(false)
  }

  const value = useMemo<AuthContextValue>(
    () => ({ user, assinaturaAtiva, login, logout }),
    [user, assinaturaAtiva],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }

  return context
}

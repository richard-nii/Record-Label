import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('gds_admin')
    if (stored) {
      try {
        setAdmin(JSON.parse(stored))
      } catch {
        localStorage.removeItem('gds_admin')
      }
    }
    setLoading(false)
  }, [])

  const login = (adminData, token) => {
    const payload = { ...adminData, token }
    setAdmin(payload)
    localStorage.setItem('gds_admin', JSON.stringify(payload))
  }

  const logout = () => {
    setAdmin(null)
    localStorage.removeItem('gds_admin')
  }

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

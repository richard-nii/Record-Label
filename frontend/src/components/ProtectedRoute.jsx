import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <span className="font-bebas text-gold text-3xl tracking-widest animate-pulse">
          GDS RECORDS
        </span>
      </div>
    )
  }

  if (!admin) return <Navigate to="/admin" replace />
  return children
}

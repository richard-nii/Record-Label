import { Navigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/config'

export default function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth)
  if (loading) return <div className="min-h-screen bg-black text-gold flex items-center justify-center font-bebas text-4xl">Loading...</div>
  if (!user) return <Navigate to="/admin" />
  return children
}
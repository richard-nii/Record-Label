import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogin, adminRegister } from '../../services/api'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [mode, setMode] = useState('login') // 'login' | 'setup'
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      let data
      if (mode === 'setup') {
        data = await adminRegister(form.username, form.email, form.password)
      } else {
        data = await adminLogin(form.email, form.password)
      }
      login(data.admin, data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message || 'Authentication failed.')
    } finally {
      setLoading(false)
    }
  }

  const inputCls =
    'bg-white/5 border border-white/10 px-4 py-3 font-sans text-sm text-white placeholder-white/25 outline-none focus:border-gold/40 transition-colors w-full'

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-10">
          <p className="font-bebas text-gold text-3xl tracking-[0.3em]">GDS Records</p>
          <p className="font-mono text-[10px] text-white/25 tracking-widest uppercase mt-1">Admin Portal</p>
        </div>

        {/* Card */}
        <div className="border border-white/10 p-8">
          <h1 className="font-bebas text-2xl tracking-widest text-white mb-6">
            {mode === 'setup' ? 'Create Admin Account' : 'Sign In'}
          </h1>

          {error && (
            <div className="mb-5 border border-red-500/20 bg-red-500/5 px-4 py-3">
              <p className="font-mono text-xs text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'setup' && (
              <input
                type="text"
                value={form.username}
                onChange={set('username')}
                placeholder="Username"
                required
                minLength={3}
                className={inputCls}
              />
            )}
            <input
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="Email address"
              required
              className={inputCls}
            />
            <input
              type="password"
              value={form.password}
              onChange={set('password')}
              placeholder="Password"
              required
              minLength={8}
              className={inputCls}
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-2 font-mono text-xs tracking-widest uppercase bg-gold text-black py-3 hover:bg-gold-light transition-colors disabled:opacity-50"
            >
              {loading ? '...' : mode === 'setup' ? 'Create Account' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Toggle mode */}
        <div className="mt-5 text-center">
          <button
            onClick={() => { setMode(mode === 'login' ? 'setup' : 'login'); setError('') }}
            className="font-mono text-[10px] tracking-widest uppercase text-white/25 hover:text-white/50 transition-colors"
          >
            {mode === 'login' ? 'First time? Create admin account →' : '← Back to Sign In'}
          </button>
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { getSubscribers, deleteSubscriber } from '../../services/api'

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getSubscribers()
      .then(setSubscribers)
      .finally(() => setLoading(false))
  }, [])

  const notify = (msg, type = 'success') => {
    setFeedback({ msg, type })
    setTimeout(() => setFeedback(null), 3000)
  }

  const handleDelete = async (s) => {
    if (!confirm(`Remove subscriber ${s.email}?`)) return
    try {
      await deleteSubscriber(s._id)
      setSubscribers((prev) => prev.filter((x) => x._id !== s._id))
      notify('Subscriber removed.')
    } catch (e) {
      notify(e.message, 'error')
    }
  }

  const filtered = subscribers.filter(
    (s) =>
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.name && s.name.toLowerCase().includes(search.toLowerCase()))
  )

  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="mb-8">
          <h1 className="font-bebas text-4xl tracking-widest text-white">Subscribers</h1>
          <p className="font-mono text-xs text-white/30 mt-1">{subscribers.length} subscriber{subscribers.length !== 1 ? 's' : ''}</p>
        </div>

        {feedback && (
          <div className={`mb-5 px-4 py-3 font-mono text-xs ${feedback.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
            {feedback.msg}
          </div>
        )}

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by email or name..."
          className="w-full bg-white/5 border border-white/10 px-4 py-3 font-sans text-sm text-white placeholder-white/25 outline-none focus:border-gold/40 transition-colors mb-6"
        />

        {loading ? (
          <div className="flex flex-col gap-3">{[1, 2, 3, 4].map((i) => <div key={i} className="h-12 bg-dark2 animate-pulse" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 border border-white/5">
            <p className="font-bebas text-3xl text-white/20 tracking-widest">
              {search ? 'No Match Found' : 'No Subscribers Yet'}
            </p>
          </div>
        ) : (
          <div className="border border-white/5">
            {filtered.map((s) => (
              <div key={s._id} className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                {/* Icon */}
                <div className="w-8 h-8 flex-shrink-0 bg-dark3 flex items-center justify-center">
                  <span className="font-bebas text-gold/60 text-sm">{s.email.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm text-white truncate">{s.email}</p>
                  {s.name && <p className="font-mono text-[10px] text-white/30">{s.name}</p>}
                </div>
                <p className="font-mono text-[10px] text-white/25 hidden sm:block">{fmt(s.createdAt)}</p>
                <button
                  onClick={() => handleDelete(s)}
                  className="font-mono text-[10px] uppercase tracking-widest text-white/20 hover:text-red-400 transition-colors px-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { getContactMessages, markMessageRead, deleteContactMessage } from '../../services/api'

function MessagePanel({ msg, onClose, onMarkRead }) {
  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '—'

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-start justify-end">
      <div className="w-full max-w-lg h-full bg-[#111] border-l border-white/10 overflow-y-auto p-8 flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <h2 className="font-bebas text-2xl tracking-widest text-white leading-tight">{msg.subject}</h2>
          <button onClick={onClose} className="font-mono text-xs text-white/30 hover:text-white transition-colors mt-1">✕ Close</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[['From', msg.name], ['Email', msg.email], ['Sent', fmt(msg.createdAt)]].map(([l, v]) => (
            <div key={l}>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/25 mb-1">{l}</p>
              <p className="font-sans text-sm text-white/70">{v}</p>
            </div>
          ))}
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/25 mb-2">Message</p>
          <p className="font-sans text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
        </div>

        {!msg.isRead && (
          <button
            onClick={() => onMarkRead(msg._id)}
            className="self-start font-mono text-[10px] tracking-widest uppercase border border-gold/30 text-gold px-4 py-2 hover:bg-gold/10 transition-colors"
          >
            Mark as Read
          </button>
        )}
      </div>
    </div>
  )
}

export default function ManageContact() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    getContactMessages()
      .then(setMessages)
      .finally(() => setLoading(false))
  }, [])

  const notify = (msg, type = 'success') => {
    setFeedback({ msg, type })
    setTimeout(() => setFeedback(null), 3000)
  }

  const handleOpen = async (msg) => {
    setSelected(msg)
    if (!msg.isRead) {
      try {
        await markMessageRead(msg._id)
        setMessages((prev) => prev.map((m) => m._id === msg._id ? { ...m, isRead: true } : m))
        setSelected((s) => s ? { ...s, isRead: true } : s)
      } catch {}
    }
  }

  const handleMarkRead = async (id) => {
    try {
      await markMessageRead(id)
      setMessages((prev) => prev.map((m) => m._id === id ? { ...m, isRead: true } : m))
      setSelected((s) => s ? { ...s, isRead: true } : s)
    } catch {}
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    try {
      await deleteContactMessage(id)
      setMessages((prev) => prev.filter((m) => m._id !== id))
      if (selected?._id === id) setSelected(null)
      notify('Message deleted.')
    } catch (e) {
      notify(e.message, 'error')
    }
  }

  const filtered = messages.filter((m) => {
    if (filter === 'unread') return !m.isRead
    if (filter === 'read') return m.isRead
    return true
  })

  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'
  const unread = messages.filter((m) => !m.isRead).length

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <h1 className="font-bebas text-4xl tracking-widest text-white">Messages</h1>
            {unread > 0 && (
              <span className="font-mono text-xs text-gold bg-gold/10 border border-gold/20 px-2.5 py-1">
                {unread} unread
              </span>
            )}
          </div>
          <p className="font-mono text-xs text-white/30 mt-1">{messages.length} total</p>
        </div>

        {feedback && (
          <div className={`mb-5 px-4 py-3 font-mono text-xs ${feedback.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
            {feedback.msg}
          </div>
        )}

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          {['all', 'unread', 'read'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-[10px] tracking-widest uppercase px-4 py-2 transition-colors ${filter === f ? 'bg-gold text-black' : 'border border-white/10 text-white/40 hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col gap-3">{[1, 2, 3].map((i) => <div key={i} className="h-14 bg-dark2 animate-pulse" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 border border-white/5">
            <p className="font-bebas text-3xl text-white/20 tracking-widest">No Messages</p>
          </div>
        ) : (
          <div className="border border-white/5">
            {filtered.map((m) => (
              <div
                key={m._id}
                onClick={() => handleOpen(m)}
                className={`flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] cursor-pointer ${!m.isRead ? 'bg-gold/[0.02]' : ''}`}
              >
                {/* Unread dot */}
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${!m.isRead ? 'bg-gold' : 'bg-transparent'}`} />
                <div className="flex-1 min-w-0">
                  <p className={`font-sans text-sm truncate ${!m.isRead ? 'text-white font-medium' : 'text-white/60'}`}>
                    {m.subject}
                  </p>
                  <p className="font-mono text-[10px] text-white/30">{m.name} · {m.email}</p>
                </div>
                <p className="font-mono text-[10px] text-white/25 hidden sm:block flex-shrink-0">{fmt(m.createdAt)}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(m._id) }}
                  className="font-mono text-[10px] text-white/20 hover:text-red-400 transition-colors px-2 flex-shrink-0"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <MessagePanel
          msg={selected}
          onClose={() => setSelected(null)}
          onMarkRead={handleMarkRead}
        />
      )}
    </AdminLayout>
  )
}

import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { getBookings, updateBookingStatus, deleteBooking } from '../../services/api'

const STATUSES = ['pending', 'reviewed', 'approved', 'rejected']
const STATUS_STYLE = {
  pending: 'text-yellow-400 bg-yellow-500/10',
  reviewed: 'text-blue-400 bg-blue-500/10',
  approved: 'text-green-400 bg-green-500/10',
  rejected: 'text-red-400 bg-red-500/10',
}

function BookingDetail({ booking, onClose, onStatusChange }) {
  const [status, setStatus] = useState(booking.status)
  const [saving, setSaving] = useState(false)

  const handleStatus = async (s) => {
    setSaving(true)
    try {
      await onStatusChange(booking._id, s)
      setStatus(s)
    } finally {
      setSaving(false)
    }
  }

  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '—'

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-start justify-end">
      <div className="w-full max-w-lg h-full bg-[#111] border-l border-white/10 overflow-y-auto p-8 flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <h2 className="font-bebas text-2xl tracking-widest text-white">{booking.eventName}</h2>
          <button onClick={onClose} className="font-mono text-xs text-white/30 hover:text-white transition-colors mt-1">✕ Close</button>
        </div>

        {/* Status pills */}
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => handleStatus(s)}
              disabled={saving || status === s}
              className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 transition-colors ${status === s ? STATUS_STYLE[s] : 'border border-white/10 text-white/30 hover:text-white/60'} disabled:opacity-50`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Details */}
        {[
          ['Artist', booking.artistName],
          ['Organizer', booking.organizerName],
          ['Organization', booking.organization || '—'],
          ['Email', booking.organizerEmail],
          ['Phone', booking.organizerPhone],
          ['Event Type', booking.eventType],
          ['Event Date', fmt(booking.eventDate)],
          ['Venue', booking.eventVenue],
          ['City / Country', `${booking.eventCity}, ${booking.eventCountry}`],
          ['Budget', booking.estimatedBudget || '—'],
          ['Submitted', fmt(booking.createdAt)],
        ].map(([label, value]) => (
          <div key={label}>
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/25 mb-1">{label}</p>
            <p className="font-sans text-sm text-white/70">{value}</p>
          </div>
        ))}

        {booking.additionalInfo && (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/25 mb-1">Additional Info</p>
            <p className="font-sans text-sm text-white/60 leading-relaxed">{booking.additionalInfo}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ManageBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState(null)

  const load = () => {
    setLoading(true)
    const params = filter !== 'all' ? { status: filter } : {}
    getBookings(params)
      .then(setBookings)
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [filter])

  const notify = (msg, type = 'success') => {
    setFeedback({ msg, type })
    setTimeout(() => setFeedback(null), 3000)
  }

  const handleStatusChange = async (id, status) => {
    await updateBookingStatus(id, status)
    setBookings((prev) => prev.map((b) => b._id === id ? { ...b, status } : b))
    if (selected?._id === id) setSelected((s) => ({ ...s, status }))
    notify(`Booking marked as ${status}.`)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this booking request?')) return
    try {
      await deleteBooking(id)
      setBookings((prev) => prev.filter((b) => b._id !== id))
      if (selected?._id === id) setSelected(null)
      notify('Booking deleted.')
    } catch (e) {
      notify(e.message, 'error')
    }
  }

  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="mb-8">
          <h1 className="font-bebas text-4xl tracking-widest text-white">Bookings</h1>
          <p className="font-mono text-xs text-white/30 mt-1">{bookings.length} request{bookings.length !== 1 ? 's' : ''}</p>
        </div>

        {feedback && (
          <div className={`mb-5 px-4 py-3 font-mono text-xs ${feedback.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
            {feedback.msg}
          </div>
        )}

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['all', ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`font-mono text-[10px] tracking-widest uppercase px-4 py-2 transition-colors ${filter === s ? 'bg-gold text-black' : 'border border-white/10 text-white/40 hover:text-white'}`}
            >
              {s}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col gap-3">{[1, 2, 3, 4].map((i) => <div key={i} className="h-14 bg-dark2 animate-pulse" />)}</div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-16 border border-white/5">
            <p className="font-bebas text-3xl text-white/20 tracking-widest">No Bookings</p>
          </div>
        ) : (
          <div className="border border-white/5">
            {bookings.map((b) => (
              <div
                key={b._id}
                onClick={() => setSelected(b)}
                className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm text-white truncate">{b.organizerName}</p>
                  <p className="font-mono text-[10px] text-white/30">{b.artistName} · {b.eventName}</p>
                </div>
                <p className="font-mono text-[10px] text-white/25 hidden sm:block">{fmt(b.eventDate)}</p>
                <span className={`font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 flex-shrink-0 ${STATUS_STYLE[b.status]}`}>
                  {b.status}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(b._id) }}
                  className="font-mono text-[10px] text-white/20 hover:text-red-400 transition-colors px-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <BookingDetail
          booking={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </AdminLayout>
  )
}

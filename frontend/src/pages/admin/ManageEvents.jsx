import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../services/api'

const BLANK = { name: '', artistName: '', date: '', venue: '', city: '', ticketUrl: '' }
const inputCls = 'bg-white/5 border border-white/10 px-3 py-2.5 font-sans text-sm text-white placeholder-white/25 outline-none focus:border-gold/40 transition-colors w-full'

function EventForm({ initial, onSave, onCancel, saving }) {
  const [form, setForm] = useState(
    initial
      ? { ...initial, date: initial.date?.slice(0, 10) || '' }
      : BLANK
  )
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(form) }} className="flex flex-col gap-5 p-6 border border-white/10 bg-dark2/50">
      <h3 className="font-bebas text-xl tracking-widest text-white">{initial ? 'Edit Event' : 'Add New Event'}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-1.5">Event Name *</label>
          <input value={form.name} onChange={set('name')} required placeholder="e.g. Afro Nation Ghana 2025" className={inputCls} />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-1.5">Artist *</label>
          <input value={form.artistName} onChange={set('artistName')} required placeholder="e.g. Camidoh · Pbee" className={inputCls} />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-1.5">Date *</label>
          <input type="date" value={form.date} onChange={set('date')} required className={inputCls} />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-1.5">Venue *</label>
          <input value={form.venue} onChange={set('venue')} required placeholder="e.g. Labadi Beach Hotel" className={inputCls} />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-1.5">City *</label>
          <input value={form.city} onChange={set('city')} required placeholder="e.g. Accra, Ghana" className={inputCls} />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-1.5">Ticket URL</label>
          <input value={form.ticketUrl} onChange={set('ticketUrl')} placeholder="https://..." className={inputCls} />
        </div>
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="font-mono text-xs tracking-widest uppercase bg-gold text-black px-6 py-2.5 hover:bg-gold-light transition-colors disabled:opacity-50">
          {saving ? 'Saving...' : initial ? 'Update Event' : 'Add Event'}
        </button>
        <button type="button" onClick={onCancel} className="font-mono text-xs tracking-widest uppercase border border-white/15 text-white/40 px-6 py-2.5 hover:text-white/70 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  )
}

export default function ManageEvents() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const load = () => {
    setLoading(true)
    // ?all=true so admins can see past events too
    getEvents({ all: 'true' })
      .then(setEvents)
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const notify = (msg, type = 'success') => {
    setFeedback({ msg, type })
    setTimeout(() => setFeedback(null), 3500)
  }

  const handleSave = async (form) => {
    setSaving(true)
    try {
      if (editing) {
        await updateEvent(editing._id, form)
        notify('Event updated.')
      } else {
        await createEvent(form)
        notify('Event added.')
      }
      setShowForm(false); setEditing(null); load()
    } catch (e) {
      notify(e.message || 'Failed to save.', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (ev) => {
    if (!confirm(`Delete "${ev.name}"?`)) return
    try {
      await deleteEvent(ev._id)
      notify('Event deleted.')
      load()
    } catch (e) {
      notify(e.message, 'error')
    }
  }

  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'
  const isPast = (d) => d && new Date(d) < new Date()

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-bebas text-4xl tracking-widest text-white">Events</h1>
            <p className="font-mono text-xs text-white/30 mt-1">{events.length} total</p>
          </div>
          <button
            onClick={() => { setEditing(null); setShowForm(!showForm) }}
            className="font-mono text-xs tracking-widest uppercase bg-gold text-black px-5 py-2.5 hover:bg-gold-light transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add Event'}
          </button>
        </div>

        {feedback && (
          <div className={`mb-5 px-4 py-3 font-mono text-xs ${feedback.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
            {feedback.msg}
          </div>
        )}

        {(showForm || editing) && (
          <div className="mb-8">
            <EventForm
              initial={editing}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditing(null) }}
              saving={saving}
            />
          </div>
        )}

        {loading ? (
          <div className="flex flex-col gap-3">{[1, 2, 3].map((i) => <div key={i} className="h-16 bg-dark2 animate-pulse" />)}</div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 border border-white/5">
            <p className="font-bebas text-3xl text-white/20 tracking-widest">No Events Yet</p>
            <p className="font-mono text-xs text-white/25 mt-2">Add your first event above.</p>
          </div>
        ) : (
          <div className="border border-white/5">
            {events.map((ev) => (
              <div key={ev._id} className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                {/* Date */}
                <div className="flex-shrink-0 w-16 text-center">
                  <p className={`font-bebas text-2xl leading-none ${isPast(ev.date) ? 'text-white/25' : 'text-gold'}`}>
                    {new Date(ev.date).getDate()}
                  </p>
                  <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                    {new Date(ev.date).toLocaleString('en-GB', { month: 'short' })}
                  </p>
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className={`font-sans text-sm font-medium truncate ${isPast(ev.date) ? 'text-white/40' : 'text-white'}`}>{ev.name}</p>
                  <p className="font-mono text-[10px] text-white/30">{ev.artistName} · {ev.venue}, {ev.city}</p>
                </div>
                {/* Past badge */}
                {isPast(ev.date) && (
                  <span className="font-mono text-[9px] tracking-widest uppercase px-2 py-1 text-white/30 bg-white/5 hidden sm:block">Past</span>
                )}
                {/* Ticket link */}
                {ev.ticketUrl && (
                  <a
                    href={ev.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] uppercase tracking-widest text-gold/60 hover:text-gold transition-colors px-2 hidden md:block"
                  >
                    Tickets ↗
                  </a>
                )}
                {/* Actions */}
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(ev); setShowForm(false) }} className="font-mono text-[10px] tracking-widest uppercase text-white/40 hover:text-gold transition-colors px-2 py-1">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(ev)} className="font-mono text-[10px] tracking-widest uppercase text-white/20 hover:text-red-400 transition-colors px-2 py-1">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

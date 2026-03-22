import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { getReleases, getArtists, createRelease, updateRelease, deleteRelease } from '../../services/api'

const TYPES = ['Single', 'EP', 'Album', 'Mixtape']
const BLANK = {
  title: '', artistId: '', type: 'Single', releaseDate: '', coverUrl: '',
  description: '', isFeatured: false,
  streamingLinks: { spotify: '', apple: '', youtube: '', audiomack: '', boomplay: '' },
}

const inputCls = 'bg-white/5 border border-white/10 px-3 py-2.5 font-sans text-sm text-white placeholder-white/25 outline-none focus:border-gold/40 transition-colors w-full'

function ReleaseForm({ initial, artists, onSave, onCancel, saving }) {
  const [form, setForm] = useState(
    initial
      ? { ...initial, artistId: initial.artistId?._id || initial.artistId, releaseDate: initial.releaseDate?.slice(0, 10) || '' }
      : BLANK
  )
  const set = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [field]: val }))
  }
  const setStream = (field) => (e) =>
    setForm((f) => ({ ...f, streamingLinks: { ...f.streamingLinks, [field]: e.target.value } }))

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(form) }} className="flex flex-col gap-5 p-6 border border-white/10 bg-dark2/50">
      <h3 className="font-bebas text-xl tracking-widest text-white">{initial ? 'Edit Release' : 'Add New Release'}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-1.5">Title *</label>
          <input value={form.title} onChange={set('title')} required placeholder="Release title" className={inputCls} />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-1.5">Artist *</label>
          <select value={form.artistId} onChange={set('artistId')} required className={inputCls}>
            <option value="">Select artist</option>
            {artists.map((a) => <option key={a._id} value={a._id}>{a.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-1.5">Type *</label>
          <select value={form.type} onChange={set('type')} className={inputCls}>
            {TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-1.5">Release Date *</label>
          <input type="date" value={form.releaseDate} onChange={set('releaseDate')} required className={inputCls} />
        </div>
      </div>
      <div>
        <label className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-1.5">Cover Image URL</label>
        <input value={form.coverUrl} onChange={set('coverUrl')} placeholder="https://..." className={inputCls} />
      </div>
      <div>
        <label className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-1.5">Description</label>
        <textarea value={form.description} onChange={set('description')} rows={3} placeholder="Brief description..." className={`${inputCls} resize-none`} />
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-2">Streaming Links</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {['spotify', 'apple', 'youtube', 'audiomack', 'boomplay'].map((s) => (
            <input key={s} value={form.streamingLinks?.[s] || ''} onChange={setStream(s)} placeholder={s.charAt(0).toUpperCase() + s.slice(1) + ' URL'} className={inputCls} />
          ))}
        </div>
      </div>
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" checked={form.isFeatured} onChange={set('isFeatured')} className="accent-gold w-4 h-4" />
        <span className="font-mono text-xs text-white/50">Feature on homepage</span>
      </label>
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="font-mono text-xs tracking-widest uppercase bg-gold text-black px-6 py-2.5 hover:bg-gold-light transition-colors disabled:opacity-50">
          {saving ? 'Saving...' : initial ? 'Update Release' : 'Add Release'}
        </button>
        <button type="button" onClick={onCancel} className="font-mono text-xs tracking-widest uppercase border border-white/15 text-white/40 px-6 py-2.5 hover:text-white/70 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  )
}

export default function ManageReleases() {
  const [releases, setReleases] = useState([])
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const load = () => {
    setLoading(true)
    Promise.all([getReleases(), getArtists()])
      .then(([r, a]) => { setReleases(r); setArtists(a) })
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
        await updateRelease(editing._id, form)
        notify('Release updated.')
      } else {
        await createRelease(form)
        notify('Release added.')
      }
      setShowForm(false); setEditing(null); load()
    } catch (e) {
      notify(e.message || 'Failed to save.', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (r) => {
    if (!confirm(`Delete "${r.title}"?`)) return
    try {
      await deleteRelease(r._id)
      notify('Release deleted.')
      load()
    } catch (e) {
      notify(e.message, 'error')
    }
  }

  const TYPE_COLOR = { Single: 'text-gold', EP: 'text-blue-400', Album: 'text-purple-400', Mixtape: 'text-green-400' }

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-bebas text-4xl tracking-widest text-white">Releases</h1>
            <p className="font-mono text-xs text-white/30 mt-1">{releases.length} total</p>
          </div>
          <button
            onClick={() => { setEditing(null); setShowForm(!showForm) }}
            className="font-mono text-xs tracking-widest uppercase bg-gold text-black px-5 py-2.5 hover:bg-gold-light transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add Release'}
          </button>
        </div>

        {feedback && (
          <div className={`mb-5 px-4 py-3 font-mono text-xs ${feedback.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
            {feedback.msg}
          </div>
        )}

        {(showForm || editing) && (
          <div className="mb-8">
            <ReleaseForm
              initial={editing}
              artists={artists}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditing(null) }}
              saving={saving}
            />
          </div>
        )}

        {loading ? (
          <div className="flex flex-col gap-3">{[1, 2, 3].map((i) => <div key={i} className="h-16 bg-dark2 animate-pulse" />)}</div>
        ) : releases.length === 0 ? (
          <div className="text-center py-16 border border-white/5">
            <p className="font-bebas text-3xl text-white/20 tracking-widest">No Releases Yet</p>
          </div>
        ) : (
          <div className="border border-white/5">
            {releases.map((r) => (
              <div key={r._id} className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                <div className="w-10 h-10 flex-shrink-0 bg-dark3 overflow-hidden">
                  {r.coverUrl
                    ? <img src={r.coverUrl} alt={r.title} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center"><span className="text-white/20 text-xs">♪</span></div>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm text-white font-medium truncate">{r.title}</p>
                  <p className="font-mono text-[10px] text-white/30">{r.artistName}</p>
                </div>
                <span className={`font-mono text-[10px] tracking-widest uppercase hidden sm:block ${TYPE_COLOR[r.type] || 'text-white/40'}`}>{r.type}</span>
                <span className="font-mono text-[10px] text-white/25 hidden md:block">
                  {r.releaseDate ? new Date(r.releaseDate).getFullYear() : '—'}
                </span>
                {r.isFeatured && <span className="font-mono text-[9px] text-gold bg-gold/10 px-2 py-1 hidden lg:block">Featured</span>}
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(r); setShowForm(false) }} className="font-mono text-[10px] tracking-widest uppercase text-white/40 hover:text-gold transition-colors px-2 py-1">Edit</button>
                  <button onClick={() => handleDelete(r)} className="font-mono text-[10px] tracking-widest uppercase text-white/20 hover:text-red-400 transition-colors px-2 py-1">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

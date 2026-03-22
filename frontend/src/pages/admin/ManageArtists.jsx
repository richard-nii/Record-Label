import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { getArtists, createArtist, updateArtist, deleteArtist } from '../../services/api'

const BLANK = {
  name: '', genre: '', bio: '', imageUrl: '',
  socialLinks: { instagram: '', twitter: '', spotify: '', youtube: '', audiomack: '' },
}

const inputCls = 'bg-white/5 border border-white/10 px-3 py-2.5 font-sans text-sm text-white placeholder-white/25 outline-none focus:border-gold/40 transition-colors w-full'

function ArtistForm({ initial, onSave, onCancel, saving }) {
  const [form, setForm] = useState(initial || BLANK)

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  const setSocial = (field) => (e) =>
    setForm((f) => ({ ...f, socialLinks: { ...f.socialLinks, [field]: e.target.value } }))

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(form) }} className="flex flex-col gap-5 p-6 border border-white/10 bg-dark2/50">
      <h3 className="font-bebas text-xl tracking-widest text-white">{initial ? 'Edit Artist' : 'Add New Artist'}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-1.5">Name *</label>
          <input value={form.name} onChange={set('name')} required placeholder="Artist name" className={inputCls} />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-1.5">Genre *</label>
          <input value={form.genre} onChange={set('genre')} required placeholder="e.g. Afrobeats · R&B" className={inputCls} />
        </div>
      </div>
      <div>
        <label className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-1.5">Bio *</label>
        <textarea value={form.bio} onChange={set('bio')} required rows={4} placeholder="Artist biography..." className={`${inputCls} resize-none`} />
      </div>
      <div>
        <label className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-1.5">Image URL</label>
        <input value={form.imageUrl} onChange={set('imageUrl')} placeholder="https://..." className={inputCls} />
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-2">Social Links</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {['instagram', 'twitter', 'spotify', 'youtube', 'audiomack'].map((s) => (
            <input key={s} value={form.socialLinks?.[s] || ''} onChange={setSocial(s)} placeholder={s.charAt(0).toUpperCase() + s.slice(1) + ' URL'} className={inputCls} />
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="font-mono text-xs tracking-widest uppercase bg-gold text-black px-6 py-2.5 hover:bg-gold-light transition-colors disabled:opacity-50">
          {saving ? 'Saving...' : initial ? 'Update Artist' : 'Add Artist'}
        </button>
        <button type="button" onClick={onCancel} className="font-mono text-xs tracking-widest uppercase border border-white/15 text-white/40 px-6 py-2.5 hover:text-white/70 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  )
}

export default function ManageArtists() {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const load = () => {
    setLoading(true)
    getArtists()
      .then(setArtists)
      .catch((e) => setError(e.message))
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
        await updateArtist(editing._id, form)
        notify('Artist updated.')
      } else {
        await createArtist(form)
        notify('Artist added.')
      }
      setShowForm(false)
      setEditing(null)
      load()
    } catch (e) {
      notify(e.message || 'Failed to save.', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (artist) => {
    if (!confirm(`Delete "${artist.name}"? This cannot be undone.`)) return
    try {
      await deleteArtist(artist._id)
      notify('Artist deleted.')
      load()
    } catch (e) {
      notify(e.message || 'Delete failed.', 'error')
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-bebas text-4xl tracking-widest text-white">Artists</h1>
            <p className="font-mono text-xs text-white/30 mt-1">{artists.length} on the roster</p>
          </div>
          <button
            onClick={() => { setEditing(null); setShowForm(!showForm) }}
            className="font-mono text-xs tracking-widest uppercase bg-gold text-black px-5 py-2.5 hover:bg-gold-light transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add Artist'}
          </button>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`mb-5 px-4 py-3 font-mono text-xs ${feedback.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
            {feedback.msg}
          </div>
        )}

        {/* Form */}
        {(showForm || editing) && (
          <div className="mb-8">
            <ArtistForm
              initial={editing}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditing(null) }}
              saving={saving}
            />
          </div>
        )}

        {/* List */}
        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-dark2 animate-pulse" />)}
          </div>
        ) : error ? (
          <p className="font-mono text-sm text-red-400">{error}</p>
        ) : artists.length === 0 ? (
          <div className="text-center py-16 border border-white/5">
            <p className="font-bebas text-3xl text-white/20 tracking-widest">No Artists Yet</p>
            <p className="font-mono text-xs text-white/25 mt-2">Add your first artist above.</p>
          </div>
        ) : (
          <div className="border border-white/5">
            {artists.map((a) => (
              <div key={a._id} className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                {/* Avatar */}
                <div className="w-10 h-10 flex-shrink-0 bg-dark3 flex items-center justify-center overflow-hidden">
                  {a.imageUrl
                    ? <img src={a.imageUrl} alt={a.name} className="w-full h-full object-cover" />
                    : <span className="font-bebas text-gold text-lg">{a.name.charAt(0)}</span>
                  }
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm text-white font-medium truncate">{a.name}</p>
                  <p className="font-mono text-[10px] text-white/30">{a.genre}</p>
                </div>
                {/* Status badge */}
                <span className={`font-mono text-[9px] tracking-widest uppercase px-2 py-1 hidden sm:block ${a.isActive ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'}`}>
                  {a.isActive ? 'Active' : 'Inactive'}
                </span>
                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setEditing(a); setShowForm(false) }}
                    className="font-mono text-[10px] tracking-widest uppercase text-white/40 hover:text-gold transition-colors px-2 py-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(a)}
                    className="font-mono text-[10px] tracking-widest uppercase text-white/20 hover:text-red-400 transition-colors px-2 py-1"
                  >
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

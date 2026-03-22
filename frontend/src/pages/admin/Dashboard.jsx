import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import { getAdminStats } from '../../services/api'

const STATUS_STYLES = {
  pending: 'bg-yellow-500/10 text-yellow-400',
  reviewed: 'bg-blue-500/10 text-blue-400',
  approved: 'bg-green-500/10 text-green-400',
  rejected: 'bg-red-500/10 text-red-400',
}

function StatCard({ label, value, to, highlight }) {
  return (
    <Link to={to} className="block border border-white/5 p-6 hover:border-gold/20 transition-colors">
      <p className="font-mono text-[10px] tracking-widest uppercase text-white/30 mb-3">{label}</p>
      <p className={`font-bebas text-5xl tracking-wider ${highlight ? 'text-gold' : 'text-white'}`}>{value}</p>
    </Link>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getAdminStats()
      .then(setStats)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="mb-10">
          <h1 className="font-bebas text-4xl tracking-widest text-white">Dashboard</h1>
          <p className="font-mono text-xs text-white/30 mt-1">Overview of GDS Records activity</p>
        </div>

        {loading && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => <div key={i} className="h-28 bg-dark2 animate-pulse" />)}
          </div>
        )}

        {error && (
          <div className="border border-red-500/20 bg-red-500/5 p-5">
            <p className="font-mono text-sm text-red-400">{error}</p>
          </div>
        )}

        {stats && (
          <>
            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard label="Active Artists" value={stats.artists} to="/admin/artists" />
              <StatCard label="Releases" value={stats.releases} to="/admin/releases" />
              <StatCard label="Subscribers" value={stats.subscribers} to="/admin/subscribers" />
              <StatCard label="Total Bookings" value={stats.bookings} to="/admin/bookings" />
            </div>

            {/* Alert stats */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <StatCard label="Pending Bookings" value={stats.pendingBookings} to="/admin/bookings" highlight={stats.pendingBookings > 0} />
              <StatCard label="Unread Messages" value={stats.unreadMessages} to="/admin/contact" highlight={stats.unreadMessages > 0} />
            </div>

            {/* Recent bookings */}
            {stats.recentBookings?.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bebas text-2xl tracking-widest text-white">Recent Bookings</h2>
                  <Link to="/admin/bookings" className="font-mono text-[10px] tracking-widest uppercase text-white/30 hover:text-gold transition-colors">
                    View All →
                  </Link>
                </div>
                <div className="border border-white/5">
                  {stats.recentBookings.map((b, i) => (
                    <div key={b._id || i} className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0">
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-sm text-white truncate">{b.organizerName}</p>
                        <p className="font-mono text-[10px] text-white/30 mt-0.5">{b.artistName}</p>
                      </div>
                      <p className="font-mono text-[10px] text-white/30 hidden sm:block">
                        {b.eventDate ? new Date(b.eventDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                      </p>
                      <span className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1 ${STATUS_STYLES[b.status] || 'text-white/40'}`}>
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  )
}

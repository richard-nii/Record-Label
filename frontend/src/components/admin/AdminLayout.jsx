import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: '▣' },
  { to: '/admin/artists', label: 'Artists', icon: '♪' },
  { to: '/admin/releases', label: 'Releases', icon: '◉' },
  { to: '/admin/events', label: 'Events', icon: '◇' },
  { to: '/admin/bookings', label: 'Bookings', icon: '◈' },
  { to: '/admin/subscribers', label: 'Subscribers', icon: '◎' },
  { to: '/admin/contact', label: 'Messages', icon: '◆' },
]

export default function AdminLayout({ children }) {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 bg-[#111] border-r border-white/5 flex flex-col">
        {/* Brand */}
        <div className="px-6 py-7 border-b border-white/5">
          <p className="font-bebas text-gold text-xl tracking-[0.2em]">GDS Records</p>
          <p className="font-mono text-[10px] text-white/30 tracking-widest uppercase mt-0.5">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded transition-colors font-mono text-xs tracking-widest uppercase ${
                  isActive
                    ? 'bg-gold/10 text-gold'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                }`
              }
            >
              <span className="text-base">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User + logout */}
        <div className="px-6 py-5 border-t border-white/5">
          <p className="font-mono text-[10px] text-white/30 tracking-widest uppercase truncate">
            {admin?.username || 'Admin'}
          </p>
          <button
            onClick={handleLogout}
            className="mt-3 font-mono text-[10px] tracking-widest uppercase text-red-400/60 hover:text-red-400 transition-colors"
          >
            Sign Out →
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  )
}

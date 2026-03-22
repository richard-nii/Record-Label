import { motion } from 'framer-motion'
import { ease } from '../utils/motion'

const TYPE_COLORS = {
  Single: 'text-gold border-gold/40',
  EP: 'text-blue-400 border-blue-400/40',
  Album: 'text-purple-400 border-purple-400/40',
  Mixtape: 'text-green-400 border-green-400/40',
}

export default function ReleaseCard({ release }) {
  const { title, artistName, type, releaseDate, coverUrl } = release
  const year = releaseDate ? new Date(releaseDate).getFullYear() : '—'
  const typeStyle = TYPE_COLORS[type] || 'text-white/60 border-white/20'

  return (
    <motion.div
      className="group flex flex-col gap-3 cursor-pointer"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease }}
    >
      {/* Cover art */}
      <div className="relative aspect-square overflow-hidden bg-dark2">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark2 to-dark3">
            <svg className="w-10 h-10 text-white/10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" />
            </svg>
          </div>
        )}

        {/* Hover overlay with play icon */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center"
        >
          <div className="w-12 h-12 rounded-full border border-gold/50 bg-gold/10 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-5 h-5 text-gold ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </motion.div>

        {/* Type badge */}
        <span className={`absolute top-3 left-3 font-mono text-[10px] tracking-widest uppercase border px-2 py-1 bg-black/70 backdrop-blur-sm ${typeStyle}`}>
          {type}
        </span>
      </div>

      {/* Info */}
      <div>
        <p className="font-bebas text-lg tracking-wider text-white leading-tight truncate group-hover:text-gold transition-colors duration-300">
          {title}
        </p>
        <p className="font-mono text-xs text-white/40 tracking-wider">{artistName} · {year}</p>
      </div>
    </motion.div>
  )
}

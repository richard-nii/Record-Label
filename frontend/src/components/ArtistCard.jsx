import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ease } from '../utils/motion'

const GRADIENT_COLORS = [
  'from-amber-900/60 to-yellow-900/40',
  'from-indigo-900/60 to-purple-900/40',
  'from-emerald-900/60 to-teal-900/40',
  'from-rose-900/60 to-pink-900/40',
  'from-orange-900/60 to-red-900/40',
]

function getGradient(name) {
  const idx = name.charCodeAt(0) % GRADIENT_COLORS.length
  return GRADIENT_COLORS[idx]
}

export default function ArtistCard({ artist }) {
  const { _id, name, genre, imageUrl, slug } = artist
  const link = `/artists/${slug || _id}`

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.35, ease }}
      className="cursor-pointer"
    >
      <Link to={link} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden bg-dark2">
          {/* Image or gradient placeholder */}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
              style={{ transform: 'scale(1)' }}
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-b ${getGradient(name)} flex items-end pb-8 pl-6`}>
              <span className="font-bebas text-8xl text-white/10 leading-none select-none">
                {name.charAt(0)}
              </span>
            </div>
          )}

          {/* Base gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500" />

          {/* Gold hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gold/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Top-left genre tag */}
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
            <span className="font-mono text-[9px] tracking-widest uppercase text-gold/80 border border-gold/30 px-2 py-1 bg-black/60 backdrop-blur-sm">
              {genre}
            </span>
          </div>

          {/* Name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
            <p className="font-bebas text-2xl tracking-widest text-white leading-none">{name}</p>
            <p className="font-mono text-xs text-gold/70 tracking-widest uppercase mt-1 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
              View Profile →
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

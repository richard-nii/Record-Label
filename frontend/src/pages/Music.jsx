import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReleaseCard from '../components/ReleaseCard'
import FadeIn from '../components/FadeIn'
import { getReleases } from '../services/api'
import { stagger, cardReveal, ease } from '../utils/motion'

const TYPES = ['All', 'Single', 'EP', 'Album', 'Mixtape']

export default function Music() {
  const [releases, setReleases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeType, setActiveType] = useState('All')

  useEffect(() => {
    getReleases()
      .then(setReleases)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = activeType === 'All'
    ? releases
    : releases.filter((r) => r.type === activeType)

  return (
    <div className="bg-[#0A0A0A] pt-32 pb-24 px-6 lg:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeIn className="mb-12">
          <p className="font-mono text-xs text-gold/60 tracking-[0.3em] uppercase mb-3">Discography</p>
          <h1 className="font-bebas text-6xl md:text-9xl tracking-widest text-white leading-none">Music</h1>
        </FadeIn>

        {/* Filter tabs */}
        <FadeIn delay={0.1} className="flex flex-wrap gap-2 mb-14 border-b border-white/[0.04] pb-8">
          {TYPES.map((t) => (
            <motion.button
              key={t}
              onClick={() => setActiveType(t)}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={`font-mono text-xs tracking-widest uppercase px-4 py-2 transition-colors duration-200 cursor-pointer ${
                activeType === t
                  ? 'bg-gold text-black'
                  : 'border border-white/15 text-white/45 hover:border-gold/30 hover:text-white'
              }`}
            >
              {t}
            </motion.button>
          ))}
        </FadeIn>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square bg-dark2 animate-pulse" />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="border border-red-500/20 bg-red-500/5 p-6">
            <p className="font-mono text-sm text-red-400">Could not load releases: {error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-bebas text-4xl text-white/15 tracking-widest">
              {activeType === 'All' ? 'No Releases Yet' : `No ${activeType}s Yet`}
            </p>
          </div>
        )}

        {/* Grid */}
        <AnimatePresence mode="wait">
          {!loading && !error && filtered.length > 0 && (
            <motion.div
              key={activeType}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
              variants={stagger(0.06)}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              {filtered.map((r) => (
                <motion.div key={r._id} variants={cardReveal}>
                  <ReleaseCard release={r} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ArtistCard from '../components/ArtistCard'
import FadeIn from '../components/FadeIn'
import { getArtists } from '../services/api'
import { stagger, cardReveal } from '../utils/motion'

export default function Artists() {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getArtists()
      .then(setArtists)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-[#0A0A0A] pt-32 pb-24 px-6 lg:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-16">
          <p className="font-mono text-xs text-gold/60 tracking-[0.3em] uppercase mb-3">The Roster</p>
          <h1 className="font-bebas text-6xl md:text-9xl tracking-widest text-white leading-none">
            Our Artists
          </h1>
        </FadeIn>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[3/4] bg-dark2 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="border border-red-500/20 bg-red-500/5 p-6">
            <p className="font-mono text-sm text-red-400">Could not load artists: {error}</p>
          </div>
        )}

        {!loading && !error && artists.length === 0 && (
          <div className="text-center py-20">
            <p className="font-bebas text-4xl text-white/15 tracking-widest">No Artists Yet</p>
            <p className="font-mono text-xs text-white/25 mt-3">Check back soon.</p>
          </div>
        )}

        {!loading && !error && artists.length > 0 && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            variants={stagger(0.07)}
            initial="hidden"
            animate="visible"
          >
            {artists.map((a) => (
              <motion.div key={a._id} variants={cardReveal}>
                <ArtistCard artist={a} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReleaseCard from '../components/ReleaseCard'
import FadeIn from '../components/FadeIn'
import { getArtistById, getReleases } from '../services/api'
import { stagger, cardReveal, ease } from '../utils/motion'

const SOCIAL_LABELS = {
  instagram: 'Instagram',
  twitter: 'Twitter / X',
  spotify: 'Spotify',
  youtube: 'YouTube',
  audiomack: 'Audiomack',
}

export default function ArtistProfile() {
  const { id } = useParams()
  const [artist, setArtist] = useState(null)
  const [releases, setReleases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getArtistById(id)
      .then((data) => {
        setArtist(data)
        return getReleases({ artistId: data._id })
      })
      .then(setReleases)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="font-bebas text-gold text-3xl tracking-widest"
        >
          Loading...
        </motion.span>
      </div>
    )
  }

  if (error || !artist) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-4">
        <p className="font-bebas text-4xl text-white/25 tracking-widest">Artist Not Found</p>
        <Link to="/artists" className="font-mono text-xs text-gold tracking-widest hover:text-gold-light transition-colors cursor-pointer">
          ← Back to Artists
        </Link>
      </div>
    )
  }

  const socialEntries = Object.entries(artist.socialLinks || {}).filter(([, v]) => v)

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      {/* ── HERO ──────────────────────────────────────────── */}
      <div className="relative h-[65vh] overflow-hidden">
        {artist.imageUrl ? (
          <motion.img
            src={artist.imageUrl}
            alt={artist.name}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease }}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-dark2 to-[#0A0A0A]" />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/40 to-transparent" />

        {/* Name overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-12 pb-14 max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="font-mono text-xs text-gold/70 tracking-[0.3em] uppercase mb-2"
          >
            {artist.genre}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="font-bebas text-6xl md:text-[9rem] tracking-widest text-white leading-none"
          >
            {artist.name}
          </motion.h1>
        </div>
      </div>

      {/* ── CONTENT ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Bio */}
          <FadeIn className="lg:col-span-2">
            <h2 className="font-bebas text-3xl tracking-widest text-gold mb-6">Biography</h2>
            <p className="font-sans text-white/55 text-base leading-relaxed">{artist.bio}</p>

            {/* Social links */}
            {socialEntries.length > 0 && (
              <div className="mt-10">
                <h3 className="font-mono text-xs text-white/25 tracking-widest uppercase mb-4">
                  Find {artist.name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {socialEntries.map(([key, url]) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs tracking-widest uppercase border border-white/12 px-4 py-2 text-white/45 hover:border-gold/40 hover:text-gold transition-colors duration-200 cursor-pointer"
                    >
                      {SOCIAL_LABELS[key] || key}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </FadeIn>

          {/* Booking CTA */}
          <FadeIn delay={0.15}>
            <div className="border border-gold/15 p-8 h-fit relative overflow-hidden">
              <div className="absolute top-0 left-0 w-10 h-px bg-gold/50" />
              <div className="absolute top-0 left-0 w-px h-10 bg-gold/50" />
              <p className="font-mono text-xs text-gold/60 tracking-widest uppercase mb-3">Bookings</p>
              <h3 className="font-bebas text-3xl tracking-wider text-white mb-4">
                Book {artist.name.split(' ')[0]}
              </h3>
              <p className="font-sans text-white/35 text-sm leading-relaxed mb-6">
                Interested in booking {artist.name} for your event? Submit a request and our team will be in touch.
              </p>
              <Link
                to="/booking"
                state={{ artist: artist.name }}
                className="block text-center font-mono text-xs tracking-widest uppercase bg-gold text-black px-6 py-3 hover:bg-gold-light transition-colors duration-200 cursor-pointer"
              >
                Book This Artist
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* ── DISCOGRAPHY ──────────────────────────────── */}
        {releases.length > 0 && (
          <div className="mt-24">
            <FadeIn className="flex items-center justify-between mb-10">
              <h2 className="font-bebas text-4xl tracking-widest text-white">Discography</h2>
              <span className="font-mono text-xs text-white/25">
                {releases.length} release{releases.length !== 1 ? 's' : ''}
              </span>
            </FadeIn>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
              variants={stagger(0.07)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {releases.map((r) => (
                <motion.div key={r._id} variants={cardReveal}>
                  <ReleaseCard release={r} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

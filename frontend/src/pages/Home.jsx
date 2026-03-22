import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import ArtistCard from '../components/ArtistCard'
import ReleaseCard from '../components/ReleaseCard'
import FadeIn from '../components/FadeIn'
import { getArtists, getReleases, subscribe } from '../services/api'
import { ease, heroWord, stagger, cardReveal } from '../utils/motion'

// ── Subscribe section ─────────────────────────────────────────
function SubscribeSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    try {
      await subscribe(email)
      setStatus('success')
      setMessage('You\'re in. Stay tuned for updates from GDS Records.')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-28 px-6 lg:px-12 bg-[#080808] border-t border-white/5">
      <FadeIn className="max-w-2xl mx-auto text-center">
        <p className="font-mono text-xs text-gold/60 tracking-[0.3em] uppercase mb-4">Stay Connected</p>
        <h2 className="font-bebas text-5xl md:text-7xl tracking-widest text-white mb-4">
          Join the Insiders
        </h2>
        <p className="font-sans text-white/40 text-sm leading-relaxed mb-10">
          New releases, exclusive updates, and events — delivered straight to you.
        </p>

        {status === 'success' ? (
          <p className="font-mono text-sm text-gold tracking-wide">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/5 border border-white/10 px-4 py-3 font-mono text-sm text-white placeholder-white/25 outline-none focus:border-gold/40 transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gold text-black font-mono text-xs tracking-widest uppercase px-6 py-3 hover:bg-gold-light transition-colors duration-200 disabled:opacity-50 cursor-pointer"
            >
              {loading ? '...' : 'Subscribe'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="mt-3 font-mono text-xs text-red-400">{message}</p>
        )}
      </FadeIn>
    </section>
  )
}

// ── Main Home ─────────────────────────────────────────────────
export default function Home() {
  const [artists, setArtists] = useState([])
  const [releases, setReleases] = useState([])
  const [loadingArtists, setLoadingArtists] = useState(true)
  const [loadingReleases, setLoadingReleases] = useState(true)
  const reduced = useReducedMotion()

  useEffect(() => {
    getArtists()
      .then((data) => setArtists(data.slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoadingArtists(false))

    getReleases({ featured: 'true' })
      .then((data) => {
        if (data.length < 4) return getReleases()
        return data
      })
      .then((data) => setReleases(data.slice(0, 4)))
      .catch(() => {})
      .finally(() => setLoadingReleases(false))
  }, [])

  const heroWords = [
    { word: 'Grind', gold: false },
    { word: "Don't", gold: true },
    { word: 'Stop.', gold: false },
  ]

  return (
    <div className="bg-[#0A0A0A]">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center px-6 lg:px-12 overflow-hidden">
        {/* Background lines */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-white/[0.025]" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-white/[0.025]" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-white/[0.025]" />
        </div>

        {/* Gold radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
        />

        <motion.div
          className="relative z-10 max-w-7xl mx-auto w-full pt-28 pb-20"
          initial="hidden"
          animate="visible"
          variants={stagger(0.1, 0.15)}
        >
          {/* Location tag */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
            className="font-mono text-xs text-gold/50 tracking-[0.4em] uppercase mb-10"
          >
            East Legon, Accra · Ghana
          </motion.p>

          {/* Hero headline — word-by-word reveal */}
          <motion.h1
            variants={stagger(0.1)}
            className="font-bebas leading-[0.88] text-white max-w-5xl"
          >
            {heroWords.map(({ word, gold }) => (
              <div key={word} style={{ overflow: 'hidden', display: 'block' }}>
                <motion.span
                  variants={reduced ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : heroWord}
                  className={`block text-[clamp(4.5rem,13vw,12rem)] tracking-tight ${gold ? 'text-gold' : ''}`}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
            className="mt-10 font-sans text-white/45 text-base md:text-lg max-w-lg leading-relaxed"
          >
            An independent record label building Ghana's next generation of artists. Uncompromising sound. Relentless vision.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/artists"
              className="font-mono text-xs tracking-widest uppercase bg-gold text-black px-8 py-4 hover:bg-gold-light transition-colors duration-200 cursor-pointer"
            >
              Explore Artists
            </Link>
            <Link
              to="/music"
              className="font-mono text-xs tracking-widest uppercase border border-white/20 text-white px-8 py-4 hover:border-gold/40 hover:text-gold transition-colors duration-200 cursor-pointer"
            >
              Latest Music
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white">Scroll</span>
          <motion.div
            animate={{ scaleY: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-white/50 origin-top"
          />
        </motion.div>
      </section>

      {/* ── FEATURED ARTISTS ──────────────────────────────── */}
      <section className="py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="flex items-end justify-between mb-14">
            <div>
              <p className="font-mono text-xs text-gold/60 tracking-[0.3em] uppercase mb-3">The Roster</p>
              <h2 className="font-bebas text-5xl md:text-7xl tracking-widest text-white">Our Artists</h2>
            </div>
            <Link
              to="/artists"
              className="hidden sm:block font-mono text-xs tracking-widest uppercase text-white/30 hover:text-gold transition-colors duration-200 border-b border-white/15 hover:border-gold/40 pb-1 cursor-pointer"
            >
              View All →
            </Link>
          </FadeIn>

          {loadingArtists ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-dark2 animate-pulse" />
              ))}
            </div>
          ) : artists.length === 0 ? (
            <p className="font-mono text-sm text-white/25 tracking-widest">No artists added yet.</p>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {artists.map((a) => (
                <motion.div key={a._id} variants={cardReveal}>
                  <ArtistCard artist={a} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── LATEST RELEASES ───────────────────────────────── */}
      <section className="py-28 px-6 lg:px-12 bg-[#0D0D0D] border-t border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="flex items-end justify-between mb-14">
            <div>
              <p className="font-mono text-xs text-gold/60 tracking-[0.3em] uppercase mb-3">Discography</p>
              <h2 className="font-bebas text-5xl md:text-7xl tracking-widest text-white">Latest Releases</h2>
            </div>
            <Link
              to="/music"
              className="hidden sm:block font-mono text-xs tracking-widest uppercase text-white/30 hover:text-gold transition-colors duration-200 border-b border-white/15 hover:border-gold/40 pb-1 cursor-pointer"
            >
              View All →
            </Link>
          </FadeIn>

          {loadingReleases ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-dark2 animate-pulse" />
              ))}
            </div>
          ) : releases.length === 0 ? (
            <p className="font-mono text-sm text-white/25 tracking-widest">No releases yet.</p>
          ) : (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              variants={stagger(0.08)}
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
          )}
        </div>
      </section>

      {/* ── BOOKING CTA ───────────────────────────────────── */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="border border-gold/15 p-12 md:p-20 relative overflow-hidden">
              {/* Background watermark */}
              <span className="absolute -right-6 -bottom-10 font-bebas text-[12rem] text-white/[0.025] leading-none select-none pointer-events-none">
                BOOK
              </span>
              {/* Gold corner accent */}
              <div className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-gold/60 to-transparent" />
              <div className="absolute top-0 left-0 w-px h-16 bg-gradient-to-b from-gold/60 to-transparent" />

              <div className="relative z-10 max-w-2xl">
                <p className="font-mono text-xs text-gold/60 tracking-[0.3em] uppercase mb-4">Bookings</p>
                <h2 className="font-bebas text-5xl md:text-7xl tracking-widest text-white leading-none mb-6">
                  Book Our<br />Artists
                </h2>
                <p className="font-sans text-white/40 text-sm leading-relaxed mb-10 max-w-md">
                  Bringing GDS artists to your event — concerts, festivals, corporate events, and private shows. Submit your booking request and our team will respond promptly.
                </p>
                <Link
                  to="/booking"
                  className="inline-block font-mono text-xs tracking-widest uppercase bg-gold text-black px-10 py-4 hover:bg-gold-light transition-colors duration-200 cursor-pointer"
                >
                  Submit a Booking Request
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SUBSCRIBE ─────────────────────────────────────── */}
      <SubscribeSection />
    </div>
  )
}

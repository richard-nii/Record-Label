import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import EventRow from '../components/EventRow'
import FadeIn from '../components/FadeIn'
import { getEvents } from '../services/api'
import { ease } from '../utils/motion'

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const rows = events.map((e) => {
    const d = new Date(e.date)
    return {
      id: e._id,
      name: e.name,
      day: String(d.getDate()).padStart(2, '0'),
      month: d.toLocaleString('en-GB', { month: 'short' }),
      venue: e.venue,
      city: e.city,
      artist: e.artistName,
    }
  })

  return (
    <div className="bg-[#0A0A0A] pt-32 pb-24 px-6 lg:px-12 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-16">
          <p className="font-mono text-xs text-gold/60 tracking-[0.3em] uppercase mb-3">Live</p>
          <h1 className="font-bebas text-6xl md:text-9xl tracking-widest text-white leading-none">
            Upcoming<br />Events
          </h1>
          <p className="mt-6 font-sans text-white/40 text-sm max-w-md leading-relaxed">
            Catch our artists live. Check below for upcoming shows, festivals, and events.
          </p>
        </FadeIn>

        {loading && (
          <div className="flex flex-col gap-1 mb-16">
            {[1, 2, 3].map((i) => <div key={i} className="h-24 bg-dark2 animate-pulse mb-px" />)}
          </div>
        )}

        {!loading && error && (
          <div className="border border-red-500/20 bg-red-500/5 p-6 mb-16">
            <p className="font-mono text-sm text-red-400">Could not load events: {error}</p>
          </div>
        )}

        {!loading && !error && rows.length === 0 && (
          <div className="text-center py-20 mb-8">
            <p className="font-bebas text-4xl text-white/15 tracking-widest">No Upcoming Events</p>
            <p className="font-mono text-xs text-white/25 mt-3">Check back soon.</p>
          </div>
        )}

        {!loading && !error && rows.length > 0 && (
          <div className="mb-20">
            {rows.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.07, ease }}
              >
                <EventRow event={e} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Booking CTA */}
        <FadeIn>
          <div className="border border-gold/15 p-10 mt-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-10 h-px bg-gold/50" />
            <div className="absolute top-0 left-0 w-px h-10 bg-gold/50" />
            <p className="font-mono text-xs text-gold/60 tracking-widest uppercase mb-3">Organizers</p>
            <h2 className="font-bebas text-3xl tracking-widest text-white mb-3">
              Want to book a GDS artist?
            </h2>
            <p className="font-sans text-white/40 text-sm mb-6">
              Submit a booking request and our team will get back to you.
            </p>
            <Link
              to="/booking"
              className="inline-block font-mono text-xs tracking-widest uppercase bg-gold text-black px-8 py-3 hover:bg-gold-light transition-colors duration-200 cursor-pointer"
            >
              Submit Booking Request
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

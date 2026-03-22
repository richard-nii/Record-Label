import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import { getArtists, submitBooking } from '../services/api'

const EVENT_TYPES = ['Concert', 'Festival', 'Corporate', 'Private', 'TV/Radio', 'Other']

const INITIAL = {
  artistName: '',
  organizerName: '',
  organizerEmail: '',
  organizerPhone: '',
  organization: '',
  eventName: '',
  eventDate: '',
  eventVenue: '',
  eventCity: '',
  eventCountry: 'Ghana',
  eventType: 'Concert',
  estimatedBudget: '',
  additionalInfo: '',
}

function Field({ label, required, children, hint }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[10px] tracking-widest uppercase text-white/30">
        {label}{required && <span className="text-gold ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="font-mono text-[10px] text-white/20">{hint}</p>}
    </div>
  )
}

const inputCls =
  'bg-white/5 border border-white/10 px-4 py-3 font-sans text-sm text-white placeholder-white/25 outline-none focus:border-gold/40 transition-colors duration-200 w-full'

export default function Booking() {
  const { state } = useLocation()
  const [form, setForm] = useState({ ...INITIAL, artistName: state?.artist || '' })
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    getArtists().then(setArtists).catch(() => {})
  }, [])

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      await submitBooking(form)
      setStatus('success')
      setMessage('Your booking request has been submitted. Our team will contact you within 2–3 business days.')
      setForm(INITIAL)
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
        <FadeIn className="max-w-lg text-center">
          <div className="w-12 h-px bg-gold/40 mx-auto mb-8" />
          <p className="font-mono text-xs text-gold/60 tracking-[0.3em] uppercase mb-4">Request Received</p>
          <h1 className="font-bebas text-5xl tracking-widest text-white mb-6">We Got It!</h1>
          <p className="font-sans text-white/40 text-sm leading-relaxed">{message}</p>
          <button
            onClick={() => setStatus(null)}
            className="mt-8 font-mono text-xs tracking-widest uppercase border border-white/15 px-6 py-3 text-white/35 hover:border-gold/30 hover:text-gold transition-colors duration-200 cursor-pointer"
          >
            Submit Another Request
          </button>
        </FadeIn>
      </div>
    )
  }

  return (
    <div className="bg-[#0A0A0A] pt-32 pb-24 px-6 lg:px-12 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <FadeIn className="mb-14">
          <p className="font-mono text-xs text-gold/60 tracking-[0.3em] uppercase mb-3">Bookings</p>
          <h1 className="font-bebas text-6xl md:text-7xl tracking-widest text-white leading-none mb-4">
            Book an Artist
          </h1>
          <p className="font-sans text-white/35 text-sm leading-relaxed max-w-md">
            Fill in the details below and our bookings team will review your request and respond within 2–3 business days.
          </p>
        </FadeIn>

        {status === 'error' && (
          <FadeIn className="mb-8">
            <div className="border border-red-500/20 bg-red-500/5 px-5 py-4">
              <p className="font-mono text-sm text-red-400">{message}</p>
            </div>
          </FadeIn>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          {/* Artist */}
          <FadeIn delay={0.1}>
            <div className="border-b border-white/[0.04] pb-10">
              <p className="font-bebas text-2xl tracking-widest text-gold mb-6">Artist Details</p>
              <Field label="Artist to Book" required>
                <select value={form.artistName} onChange={set('artistName')} required className={inputCls}>
                  <option value="">Select an artist</option>
                  {artists.map((a) => <option key={a._id} value={a.name}>{a.name}</option>)}
                  <option value="Open / Undecided">Open / Undecided</option>
                </select>
              </Field>
            </div>
          </FadeIn>

          {/* Organizer */}
          <FadeIn delay={0.15}>
            <div className="border-b border-white/[0.04] pb-10">
              <p className="font-bebas text-2xl tracking-widest text-gold mb-6">Your Details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Full Name" required>
                  <input type="text" value={form.organizerName} onChange={set('organizerName')} required placeholder="Your full name" className={inputCls} />
                </Field>
                <Field label="Organization / Company">
                  <input type="text" value={form.organization} onChange={set('organization')} placeholder="Company or event brand" className={inputCls} />
                </Field>
                <Field label="Email Address" required>
                  <input type="email" value={form.organizerEmail} onChange={set('organizerEmail')} required placeholder="your@email.com" className={inputCls} />
                </Field>
                <Field label="Phone Number" required>
                  <input type="tel" value={form.organizerPhone} onChange={set('organizerPhone')} required placeholder="+233..." className={inputCls} />
                </Field>
              </div>
            </div>
          </FadeIn>

          {/* Event */}
          <FadeIn delay={0.2}>
            <div className="border-b border-white/[0.04] pb-10">
              <p className="font-bebas text-2xl tracking-widest text-gold mb-6">Event Details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Event Name" required>
                  <input type="text" value={form.eventName} onChange={set('eventName')} required placeholder="e.g. Afro Nation Ghana 2025" className={inputCls} />
                </Field>
                <Field label="Event Type" required>
                  <select value={form.eventType} onChange={set('eventType')} className={inputCls}>
                    {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Event Date" required>
                  <input type="date" value={form.eventDate} onChange={set('eventDate')} required className={inputCls} />
                </Field>
                <Field label="Estimated Budget" hint="Optional — helps us respond accurately">
                  <input type="text" value={form.estimatedBudget} onChange={set('estimatedBudget')} placeholder="e.g. GHS 5,000 – 10,000" className={inputCls} />
                </Field>
                <Field label="Venue Name" required>
                  <input type="text" value={form.eventVenue} onChange={set('eventVenue')} required placeholder="e.g. Labadi Beach Hotel" className={inputCls} />
                </Field>
                <Field label="City" required>
                  <input type="text" value={form.eventCity} onChange={set('eventCity')} required placeholder="e.g. Accra" className={inputCls} />
                </Field>
                <Field label="Country" required>
                  <input type="text" value={form.eventCountry} onChange={set('eventCountry')} required placeholder="e.g. Ghana" className={inputCls} />
                </Field>
              </div>
              <div className="mt-6">
                <Field label="Additional Information" hint="Anything else we should know about the event">
                  <textarea
                    value={form.additionalInfo}
                    onChange={set('additionalInfo')}
                    rows={4}
                    placeholder="Dress code, stage requirements, travel arrangements, etc."
                    className={`${inputCls} resize-none`}
                  />
                </Field>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="self-start font-mono text-xs tracking-widest uppercase bg-gold text-black px-10 py-4 hover:bg-gold-light transition-colors duration-200 disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Submitting...' : 'Submit Booking Request'}
            </motion.button>
          </FadeIn>
        </form>
      </div>
    </div>
  )
}

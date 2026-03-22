import { useState } from 'react'
import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import { submitContact } from '../services/api'
import { stagger, ease } from '../utils/motion'

const INITIAL = { name: '', email: '', subject: '', message: '' }
const inputCls =
  'bg-white/5 border border-white/10 px-4 py-3 font-sans text-sm text-white placeholder-white/25 outline-none focus:border-gold/40 transition-colors duration-200 w-full'

const contactInfo = [
  { label: 'Location', value: 'East Legon Nmai-Dzorn, Accra\nGreater Accra Region, Ghana' },
  { label: 'Business Enquiries', value: 'info@gdsrecords.com' },
  { label: 'Bookings', value: 'bookings@gdsrecords.com' },
]

export default function Contact() {
  const [form, setForm] = useState(INITIAL)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState('')

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      await submitContact(form)
      setStatus('success')
      setMessage("Your message has been received. We'll get back to you shortly.")
      setForm(INITIAL)
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'Failed to send. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#0A0A0A] pt-32 pb-24 px-6 lg:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left: Info */}
          <FadeIn>
            <p className="font-mono text-xs text-gold/60 tracking-[0.3em] uppercase mb-3">Reach Out</p>
            <h1 className="font-bebas text-6xl md:text-8xl tracking-widest text-white leading-none mb-10">
              Get In<br />Touch
            </h1>
            <p className="font-sans text-white/40 text-sm leading-relaxed max-w-md mb-14">
              Whether you're a fan, an industry partner, or a media outlet — we'd love to hear from you. Fill in the form and our team will respond as soon as possible.
            </p>

            <motion.div
              className="flex flex-col gap-8"
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {contactInfo.map(({ label, value }) => (
                <motion.div
                  key={label}
                  variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } } }}
                >
                  <p className="font-mono text-[10px] tracking-widest uppercase text-white/20 mb-1.5">{label}</p>
                  <p className="font-sans text-sm text-white/55 whitespace-pre-line leading-relaxed">{value}</p>
                </motion.div>
              ))}
            </motion.div>
          </FadeIn>

          {/* Right: Form */}
          <FadeIn delay={0.15}>
            {status === 'success' ? (
              <div className="border border-gold/20 p-12 text-center">
                <div className="w-12 h-px bg-gold/40 mx-auto mb-8" />
                <p className="font-bebas text-4xl tracking-widest text-gold mb-4">Message Sent</p>
                <p className="font-sans text-white/40 text-sm leading-relaxed mb-8">{message}</p>
                <button
                  onClick={() => setStatus(null)}
                  className="font-mono text-xs tracking-widest uppercase border border-white/15 px-6 py-3 text-white/35 hover:text-gold hover:border-gold/30 transition-colors duration-200 cursor-pointer"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {status === 'error' && (
                  <div className="border border-red-500/20 bg-red-500/5 px-4 py-3">
                    <p className="font-mono text-xs text-red-400">{message}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-white/25 mb-2">
                      Full Name <span className="text-gold">*</span>
                    </label>
                    <input type="text" value={form.name} onChange={set('name')} required placeholder="Your name" className={inputCls} />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-white/25 mb-2">
                      Email <span className="text-gold">*</span>
                    </label>
                    <input type="email" value={form.email} onChange={set('email')} required placeholder="your@email.com" className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-widest uppercase text-white/25 mb-2">
                    Subject <span className="text-gold">*</span>
                  </label>
                  <input type="text" value={form.subject} onChange={set('subject')} required placeholder="What is this regarding?" className={inputCls} />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-widest uppercase text-white/25 mb-2">
                    Message <span className="text-gold">*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={set('message')}
                    required
                    rows={6}
                    placeholder="Write your message here..."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="self-start font-mono text-xs tracking-widest uppercase bg-gold text-black px-10 py-4 hover:bg-gold-light transition-colors duration-200 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </div>
  )
}

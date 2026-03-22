import { Link } from 'react-router-dom'
import FadeIn from './FadeIn'

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Brand */}
            <div>
              <h3 className="font-bebas text-gold text-3xl tracking-[0.2em] mb-4">GDS Records</h3>
              <p className="font-sans text-sm text-white/40 leading-relaxed max-w-xs">
                Grind Don't Stop Records — an independent music label shaping Ghana's sound from East Legon, Accra.
              </p>
            </div>

            {/* Nav */}
            <div>
              <h4 className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/25 mb-6">Navigate</h4>
              <ul className="flex flex-col gap-3">
                {[
                  ['/', 'Home'],
                  ['/artists', 'Artists'],
                  ['/music', 'Music'],
                  ['/events', 'Events'],
                  ['/booking', 'Bookings'],
                  ['/contact', 'Contact'],
                ].map(([to, label]) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="font-sans text-sm text-white/40 hover:text-gold transition-colors duration-200 cursor-pointer"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/25 mb-6">Get In Touch</h4>
              <p className="font-sans text-sm text-white/40 leading-relaxed">
                East Legon Nmai-Dzorn<br />
                Accra, Greater Accra Region<br />
                Ghana
              </p>
              <Link
                to="/contact"
                className="inline-block mt-5 font-mono text-xs tracking-widest uppercase text-gold border border-gold/30 px-4 py-2 hover:bg-gold/10 transition-colors duration-200 cursor-pointer"
              >
                Send Us a Message
              </Link>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono text-xs tracking-widest text-white/20 uppercase">
              © {new Date().getFullYear()} Grind Don't Stop Records. All Rights Reserved.
            </p>
            <Link
              to="/admin"
              className="font-mono text-xs text-white/10 hover:text-white/30 transition-colors tracking-widest uppercase cursor-pointer"
            >
              Admin
            </Link>
          </div>
        </FadeIn>
      </div>
    </footer>
  )
}

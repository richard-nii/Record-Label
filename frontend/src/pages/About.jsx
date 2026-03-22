import FadeIn from '../components/FadeIn'

const stats = [
  { label: 'Founded', value: '2020' },
  { label: 'Location', value: 'Accra, Ghana' },
  { label: 'Genre Focus', value: 'Afrobeats · Hip-Hop · R&B' },
]

export default function About() {
  return (
    <div className="bg-[#0A0A0A] pt-32 pb-24 px-6 lg:px-12 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <FadeIn>
          <p className="font-mono text-xs text-gold/60 tracking-[0.3em] uppercase mb-4">Our Story</p>
          <h1 className="font-bebas text-6xl md:text-9xl tracking-widest text-white leading-none mb-20">
            About GDS<br />Records
          </h1>
        </FadeIn>

        {/* Lead quote */}
        <FadeIn delay={0.1} className="border-l-2 border-gold/40 pl-8 mb-20">
          <p className="font-sans text-white/65 text-xl md:text-2xl leading-relaxed font-light">
            Grind Don't Stop Records is an independent music label born and built in East Legon, Accra.
            We exist to amplify African voices, push creative boundaries, and build sustainable careers
            for artists who refuse to compromise their vision.
          </p>
        </FadeIn>

        {/* Mission + Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <FadeIn delay={0.1}>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-4">Mission</p>
            <h2 className="font-bebas text-4xl tracking-widest text-white mb-5">Our Mission</h2>
            <p className="font-sans text-white/45 text-sm leading-relaxed">
              To identify, develop, and promote exceptional musical talent from Ghana and across Africa.
              We provide our artists with the resources, creative freedom, and strategic direction to build
              lasting careers on their own terms.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-4">Vision</p>
            <h2 className="font-bebas text-4xl tracking-widest text-white mb-5">Our Vision</h2>
            <p className="font-sans text-white/45 text-sm leading-relaxed">
              To be Africa's most respected independent label — known not just for the music we release,
              but for the artists we build and the culture we help define for the next generation.
            </p>
          </FadeIn>
        </div>

        {/* Divider */}
        <FadeIn>
          <div className="w-full h-px bg-gradient-to-r from-gold/30 via-white/5 to-transparent mb-20" />
        </FadeIn>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map(({ label, value }, i) => (
            <FadeIn key={label} delay={i * 0.1}>
              <div className="border border-white/8 p-8 relative overflow-hidden group hover:border-gold/20 transition-colors duration-300 cursor-default">
                <div className="absolute top-0 left-0 w-8 h-px bg-gold/50" />
                <p className="font-mono text-xs text-white/25 tracking-widest uppercase mb-3">{label}</p>
                <p className="font-bebas text-3xl tracking-wider text-white group-hover:text-gold transition-colors duration-300">{value}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  )
}

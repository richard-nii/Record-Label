export default function EventRow({ event }) {
  const { name, day, month, venue, city, artist } = event

  return (
    <div className="group flex items-center gap-6 border-b border-white/5 py-6 hover:border-gold/20 transition-colors">
      {/* Date badge */}
      <div className="flex-shrink-0 w-14 text-center">
        <p className="font-bebas text-3xl text-gold leading-none">{day}</p>
        <p className="font-mono text-xs text-white/40 tracking-widest uppercase">{month}</p>
      </div>

      {/* Divider */}
      <div className="w-px h-10 bg-white/10 flex-shrink-0" />

      {/* Event info */}
      <div className="flex-1 min-w-0">
        <p className="font-bebas text-xl tracking-wider text-white truncate">{name}</p>
        <p className="font-mono text-xs text-white/40 tracking-wider mt-0.5">
          {venue} · {city}
        </p>
      </div>

      {/* Artist */}
      <div className="hidden sm:block text-right flex-shrink-0">
        <p className="font-mono text-xs text-gold/70 tracking-widest uppercase">{artist}</p>
      </div>
    </div>
  )
}

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { artists } from "../data/dummy";
import ArtistImage from "../components/ArtistImage";

const css = `
  @keyframes tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(2.2);opacity:0} }
  .scroll-reveal { opacity:0; transform:translateY(40px); transition:opacity 0.7s ease,transform 0.7s ease; }
  .scroll-reveal.visible { opacity:1; transform:translateY(0); }
  .btn-red:hover   { background:#E53935!important; transform:translateY(-2px); }
  .btn-ghost:hover { border-color:#D32F2F!important; color:#D32F2F!important; }
  .artist-card:hover .ac-image { transform:scale(1.05)!important; }
  .artist-card:hover .ac-topbar { transform:scaleX(1)!important; }
  .artist-card:hover .ac-info { transform:translateY(0)!important; }
  .artist-card:hover .ac-cta { opacity:1!important; transform:translateY(0)!important; }
  .artist-card:hover { border-color:rgba(211,47,47,0.3)!important; }
  .filter-btn:hover { border-color:rgba(211,47,47,0.4)!important; color:#F4EFE6!important; }
`;

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="scroll-reveal" style={{ transitionDelay:`${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

function Tag({ children, color = "#D32F2F" }) {
  return (
    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", letterSpacing:"4px", textTransform:"uppercase", color, display:"flex", alignItems:"center", gap:"14px", marginBottom:"16px" }}>
      <span style={{ width:"28px", height:"1px", background:color, flexShrink:0, display:"block" }} />
      {children}
    </div>
  );
}

const TICK = ["Camidoh","PBee","Afropop","R&B","Afrobeats","GDS Records","Accra Ghana","Artist Roster"];
function Ticker() {
  return (
    <div style={{ background:"#D32F2F", padding:"13px 0", overflow:"hidden", whiteSpace:"nowrap" }}>
      <div style={{ display:"inline-flex", animation:"tick 28s linear infinite" }}>
        {[...TICK,...TICK].map((t,i) => (
          <span key={i} style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"14px", letterSpacing:"4px", color:"#F4EFE6", padding:"0 32px", display:"inline-flex", alignItems:"center", gap:"32px" }}>
            {t}<span style={{ fontSize:"6px" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const FILTERS = ["All", "Afropop", "R&B", "Afrobeats"];

export default function Artists() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? artists
    : artists.filter(a => a.tags?.some(t => t === activeFilter));

  return (
    <div style={{ background:"#0A0A0A", color:"#F4EFE6", overflowX:"hidden" }}>
      <style>{css}</style>

      {/* ── PAGE HERO ─────────────────────────────────────────────────── */}
      <section style={{ padding:"160px 60px 80px", background:"#111", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"4px", background:"linear-gradient(90deg,#D32F2F,#C9A84C,#D32F2F)" }} />
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", fontFamily:"'Bebas Neue',sans-serif", fontSize:"220px", color:"rgba(211,47,47,0.025)", letterSpacing:"10px", pointerEvents:"none", userSelect:"none", whiteSpace:"nowrap", lineHeight:1 }}>ARTISTS</div>
        <div style={{ position:"relative", zIndex:2 }}>
          <div style={{ animation:"fadeUp 0.9s 0.1s both" }}><Tag>Our Roster</Tag></div>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(64px,10vw,140px)", lineHeight:0.88, margin:"0 0 28px", animation:"fadeUp 0.9s 0.25s both" }}>
            The <span style={{ WebkitTextStroke:"2px #D32F2F", color:"transparent" }}>Artists</span>
          </h1>
          <p style={{ fontSize:"15px", lineHeight:1.8, color:"#666", maxWidth:"520px", animation:"fadeUp 0.9s 0.4s both" }}>
            A collective of Ghanaian talent pushing Afropop, R&B, and Afrobeats onto the global stage. Each artist signed to GDS Records brings a unique sound and story.
          </p>
        </div>
      </section>

      <Ticker />

      {/* ── FEATURED ARTIST ───────────────────────────────────────────── */}
      <Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2px" }}>
          {/* Photo */}
          <div style={{ position:"relative", minHeight:"520px", overflow:"hidden" }}>
            <ArtistImage artist={artists[0]} mode={artists[0].images.length > 1 ? "slideshow" : "cover"} interval={4000} />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, transparent 60%, rgba(0,0,0,0.6))" }} />
            <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"#D32F2F" }} />
            <div style={{ position:"absolute", top:"28px", left:"28px", fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"3px", textTransform:"uppercase", color:"#D32F2F", display:"flex", alignItems:"center", gap:"10px" }}>
              <div style={{ position:"relative", width:"8px", height:"8px" }}>
                <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:"#D32F2F", animation:"pulse-ring 2s ease-out infinite" }} />
                <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#D32F2F" }} />
              </div>
              Featured Artist
            </div>
          </div>
          {/* Info */}
          <div style={{ padding:"72px 60px", background:"#181818", display:"flex", flexDirection:"column", justifyContent:"center" }}>
            <Tag>Spotlight</Tag>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(56px,7vw,96px)", lineHeight:0.9, margin:"0 0 16px" }}>
              {artists[0].name}
            </h2>
            <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"24px" }}>
              {artists[0].tags?.map(tag => (
                <span key={tag} style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"2px", textTransform:"uppercase", border:"1px solid rgba(211,47,47,0.4)", color:"#D32F2F", padding:"5px 14px" }}>{tag}</span>
              ))}
            </div>
            <p style={{ fontSize:"14.5px", lineHeight:1.82, color:"#666", marginBottom:"28px" }}>
              {artists[0].bio}
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginBottom:"36px" }}>
              {artists[0].accolades?.slice(0,3).map((a,i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"12px", fontSize:"13px", color:"#555" }}>
                  <span style={{ color:"#C9A84C", fontSize:"8px", marginTop:"4px", flexShrink:0 }}>◆</span>
                  {a}
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:"12px" }}>
              <Link to={`/artists/${artists[0].id}`} className="btn-red" style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", background:"#D32F2F", color:"#F4EFE6", padding:"14px 28px", textDecoration:"none", transition:"all 0.25s" }}>
                Full Profile
              </Link>
              <a href={`mailto:${artists[0].facts?.booking}`} className="btn-ghost" style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", border:"1px solid rgba(255,255,255,0.12)", color:"#777", padding:"14px 28px", textDecoration:"none", transition:"all 0.25s" }}>
                Book {artists[0].name}
              </a>
            </div>
            <div style={{ display:"flex", gap:"32px", marginTop:"40px", paddingTop:"28px", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
              {[
                { n: artists[0].streams,   l: "Streams" },
                { n: artists[0].shows,     l: "Shows" },
                { n: artists[0].countries, l: "Countries" },
              ].map(({ n, l }) => (
                <div key={l}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"32px", color:"#D32F2F", lineHeight:1 }}>{n}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"8px", letterSpacing:"2px", textTransform:"uppercase", color:"#555", marginTop:"4px" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── FULL ROSTER ───────────────────────────────────────────────── */}
      <section style={{ padding:"96px 60px", background:"#0A0A0A" }}>
        <Reveal>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"40px" }}>
            <div>
              <Tag>Full Roster</Tag>
              <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(48px,7vw,96px)", lineHeight:0.9, margin:0 }}>All Artists</h2>
            </div>
            <div style={{ display:"flex", gap:"4px" }}>
              {FILTERS.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)} className="filter-btn" style={{
                  fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"2px", textTransform:"uppercase",
                  background: f === activeFilter ? "#D32F2F" : "transparent",
                  border: f === activeFilter ? "1px solid #D32F2F" : "1px solid rgba(255,255,255,0.1)",
                  color: f === activeFilter ? "#F4EFE6" : "#555",
                  padding:"10px 20px", cursor:"pointer", transition:"all 0.25s",
                }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"2px" }}>
          {filtered.map((artist, i) => (
            <Reveal key={artist.id} delay={i * 80}>
              <Link to={`/artists/${artist.id}`} className="artist-card" style={{ textDecoration:"none", color:"inherit", display:"block", position:"relative", aspectRatio:"2/3", overflow:"hidden", border:"1px solid rgba(255,255,255,0.04)", transition:"border-color 0.3s", cursor:"pointer" }}>
                <div className="ac-image" style={{ position:"absolute", inset:0, transition:"transform 0.6s ease" }}>
                  <ArtistImage artist={artist} mode="cover" />
                </div>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)" }} />
                <div className="ac-topbar" style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"#D32F2F", transform:"scaleX(0)", transformOrigin:"left", transition:"transform 0.4s" }} />
                <div style={{ position:"absolute", top:"20px", right:"20px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"64px", color:"rgba(255,255,255,0.04)", lineHeight:1, userSelect:"none" }}>0{i+1}</div>
                <div className="ac-info" style={{ position:"absolute", bottom:0, left:0, right:0, padding:"28px 24px", transform:"translateY(8px)", transition:"transform 0.4s" }}>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"3px", textTransform:"uppercase", color:"#D32F2F", marginBottom:"8px" }}>{artist.genre}</div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(32px,4vw,52px)", letterSpacing:"1px", lineHeight:1, marginBottom:"6px" }}>{artist.name}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"2px", color:"#C9A84C", marginBottom:"14px" }}>{artist.streams} streams</div>
                  <div className="ac-cta" style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"2px", textTransform:"uppercase", color:"rgba(255,255,255,0.4)", display:"flex", alignItems:"center", gap:"6px", opacity:0, transform:"translateY(8px)", transition:"all 0.35s ease 0.05s" }}>
                    View Profile <span style={{ color:"#D32F2F" }}>→</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"80px 0", fontFamily:"'Space Mono',monospace", fontSize:"11px", letterSpacing:"3px", textTransform:"uppercase", color:"#444" }}>
            No artists found for this filter
          </div>
        )}
      </section>

      {/* ── BOOKING CTA ───────────────────────────────────────────────── */}
      <Reveal>
        <div style={{ background:"#D32F2F", padding:"80px 60px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"60px" }}>
          <div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(40px,5vw,72px)", color:"#F4EFE6", lineHeight:0.92, marginBottom:"12px" }}>
              Book an<br />Artist.
            </div>
            <p style={{ fontSize:"14px", color:"rgba(255,255,255,0.65)", maxWidth:"360px" }}>
              Want one of our artists at your event? Submit a booking request and our team will get back to you within 48 hours.
            </p>
          </div>
          <Link to="/booking" style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", background:"#C9A84C", color:"#0A0A0A", padding:"18px 44px", textDecoration:"none", transition:"background 0.3s", flexShrink:0, whiteSpace:"nowrap" }}>
            Submit Booking Request →
          </Link>
        </div>
      </Reveal>

    </div>
  );
}
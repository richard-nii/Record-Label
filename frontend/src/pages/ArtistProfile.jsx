import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { artists, releases } from "../data/dummy";
import ArtistImage from "../components/ArtistImage";

const css = `
  @keyframes fadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(2.2);opacity:0} }
  @keyframes tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .scroll-reveal { opacity:0; transform:translateY(40px); transition:opacity 0.7s ease,transform 0.7s ease; }
  .scroll-reveal.visible { opacity:1; transform:translateY(0); }
  .btn-red:hover    { background:#E53935!important; transform:translateY(-2px); }
  .btn-ghost:hover  { border-color:#D32F2F!important; color:#D32F2F!important; }
  .btn-gold:hover   { background:#E8C96A!important; transform:translateY(-2px); }
  .release-card:hover { border-color:rgba(211,47,47,0.3)!important; background:#1a1a1a!important; }
  .release-card:hover .rc-img { transform:scale(1.04)!important; }
  .soc-btn:hover { border-color:#D32F2F!important; color:#D32F2F!important; background:rgba(211,47,47,0.06)!important; }
  .stream-btn:hover { border-color:#C9A84C!important; color:#C9A84C!important; }
  .accolade-item:hover { background:rgba(211,47,47,0.04)!important; }
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

function Ticker({ name }) {
  const items = [name, "GDS Records", "Accra Ghana", "Afrobeats", "Book Now", "Streaming Now"];
  return (
    <div style={{ background:"#D32F2F", padding:"13px 0", overflow:"hidden", whiteSpace:"nowrap" }}>
      <div style={{ display:"inline-flex", animation:"tick 24s linear infinite" }}>
        {[...items,...items].map((t,i) => (
          <span key={i} style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"14px", letterSpacing:"4px", color:"#F4EFE6", padding:"0 32px", display:"inline-flex", alignItems:"center", gap:"32px" }}>
            {t}<span style={{ fontSize:"6px" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ArtistProfile() {
  const { id } = useParams();
  const artist = artists.find(a => a.id === id);
  const [activeImg, setActiveImg] = useState(0);

  // Artist's releases
  const artistReleases = releases.filter(r => r.artistId === id);

  if (!artist) {
    return (
      <div style={{ background:"#0A0A0A", color:"#F4EFE6", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"24px" }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"48px", color:"#D32F2F" }}>Artist Not Found</div>
        <Link to="/artists" style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", color:"#777", textDecoration:"none" }}>← Back to Artists</Link>
      </div>
    );
  }

  return (
    <div style={{ background:"#0A0A0A", color:"#F4EFE6", overflowX:"hidden" }}>
      <style>{css}</style>

      {/* ── PROFILE HERO ──────────────────────────────────────────────── */}
      <section style={{ minHeight:"100vh", display:"grid", gridTemplateColumns:"1fr 1fr", paddingTop:"72px" }}>

        {/* Left — photo */}
        <div style={{ position:"relative", overflow:"hidden" }}>
          {/* Top stripe */}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:"4px", background:"linear-gradient(90deg,#D32F2F,#C9A84C)", zIndex:3 }} />

          {/*
            Profile photo slideshow:
            Add more photos to artists[n].images in dummy.js
            They'll appear here automatically as a slideshow with dot controls
          */}
          <ArtistImage
            artist={artist}
            mode={artist.images.length > 1 ? "slideshow" : "cover"}
            interval={4000}
          />

          {/* Gradient overlay */}
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, transparent 55%, rgba(0,0,0,0.5))", zIndex:1 }} />

          {/* Artist name watermark */}
          <div style={{ position:"absolute", bottom:"20px", left:0, right:0, fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(48px,8vw,96px)", letterSpacing:"8px", color:"rgba(255,255,255,0.05)", textAlign:"center", userSelect:"none", zIndex:2 }}>
            {artist.name.toUpperCase()}
          </div>
        </div>

        {/* Right — info */}
        <div style={{ padding:"80px 60px", background:"#111", display:"flex", flexDirection:"column", justifyContent:"center", position:"relative" }}>
          {/* Back */}
          <Link to="/artists" style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"2px", textTransform:"uppercase", color:"#555", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:"8px", marginBottom:"36px", transition:"color 0.2s" }}
            onMouseEnter={e => e.target.style.color="#D32F2F"}
            onMouseLeave={e => e.target.style.color="#555"}
          >
            ← Back to Artists
          </Link>

          <div style={{ animation:"fadeUp 0.9s 0.1s both" }}>
            <Tag>GDS Records Artist</Tag>
          </div>

          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(56px,8vw,110px)", lineHeight:0.88, margin:"0 0 16px", animation:"fadeUp 0.9s 0.2s both" }}>
            {artist.name}
          </h1>

          {/* Real name */}
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", letterSpacing:"3px", textTransform:"uppercase", color:"#555", marginBottom:"20px", animation:"fadeUp 0.9s 0.3s both" }}>
            {artist.realName}
          </div>

          {/* Genre tags */}
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"28px", animation:"fadeUp 0.9s 0.35s both" }}>
            {artist.tags?.map(tag => (
              <span key={tag} style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"2px", textTransform:"uppercase", border:"1px solid rgba(211,47,47,0.4)", color:"#D32F2F", padding:"5px 14px" }}>{tag}</span>
            ))}
          </div>

          {/* Bio */}
          <p style={{ fontSize:"14.5px", lineHeight:1.82, color:"#666", marginBottom:"32px", animation:"fadeUp 0.9s 0.4s both" }}>
            {artist.bio}
          </p>

          {/* Stats */}
          <div style={{ display:"flex", gap:"0", marginBottom:"32px", borderTop:"1px solid rgba(255,255,255,0.07)", borderBottom:"1px solid rgba(255,255,255,0.07)", animation:"fadeUp 0.9s 0.45s both" }}>
            {[
              { n: artist.streams,   l: "Streams" },
              { n: artist.shows,     l: "Shows" },
              { n: artist.countries, l: "Countries" },
            ].map(({ n, l }, i) => (
              <div key={l} style={{ flex:1, padding:"20px 0", textAlign:"center", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"34px", color:"#D32F2F", lineHeight:1 }}>{n}</div>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"8px", letterSpacing:"2px", textTransform:"uppercase", color:"#555", marginTop:"4px" }}>{l}</div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display:"flex", gap:"10px", marginBottom:"32px", animation:"fadeUp 0.9s 0.5s both" }}>
            <a href={`mailto:${artist.facts?.booking}`} className="btn-red" style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", background:"#D32F2F", color:"#F4EFE6", padding:"14px 24px", textDecoration:"none", transition:"all 0.25s" }}>
              Book {artist.name}
            </a>
            <Link to="/booking" className="btn-ghost" style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", border:"1px solid rgba(255,255,255,0.12)", color:"#777", padding:"14px 24px", textDecoration:"none", transition:"all 0.25s" }}>
              Booking Info
            </Link>
          </div>

          {/* Streaming links */}
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", animation:"fadeUp 0.9s 0.55s both" }}>
            {Object.entries(artist.streamLinks || {}).map(([platform, url]) => (
              <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="stream-btn" style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"2px", textTransform:"uppercase", border:"1px solid rgba(255,255,255,0.1)", color:"#555", padding:"9px 16px", textDecoration:"none", transition:"all 0.25s", display:"inline-flex", alignItems:"center", gap:"6px" }}>
                ▶ {platform}
              </a>
            ))}
          </div>
        </div>
      </section>

      <Ticker name={artist.name} />

      {/* ── BIO + FACTS ───────────────────────────────────────────────── */}
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:"2px" }}>
        {/* Bio */}
        <Reveal style={{ padding:"80px 60px", background:"#111" }}>
          <Tag>Biography</Tag>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,4vw,56px)", lineHeight:0.9, marginBottom:"28px" }}>
            About {artist.name}
          </h2>
          <p style={{ fontSize:"14.5px", lineHeight:1.82, color:"#666", marginBottom:"18px" }}>{artist.bio}</p>
          <p style={{ fontSize:"14.5px", lineHeight:1.82, color:"#666" }}>
            Signed to Grind Don't Stop Records since {artist.facts?.activeSince}, {artist.name} continues to push the boundaries of African music on the global stage. Originally from {artist.facts?.origin}, the artist brings authentic cultural storytelling through every release.
          </p>
        </Reveal>

        {/* Facts sidebar */}
        <Reveal delay={100} style={{ padding:"80px 40px", background:"#181818", display:"flex", flexDirection:"column", gap:"0" }}>
          <Tag>Details</Tag>
          {[
            { l: "Real Name",     v: artist.facts?.realName },
            { l: "Origin",        v: artist.facts?.origin },
            { l: "Genre",         v: artist.genre },
            { l: "Label",         v: artist.facts?.label },
            { l: "Active Since",  v: artist.facts?.activeSince },
            { l: "Booking",       v: artist.facts?.booking },
          ].map(({ l, v }) => (
            <div key={l} style={{ padding:"16px 0", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"3px", textTransform:"uppercase", color:"#D32F2F", marginBottom:"6px" }}>{l}</div>
              <div style={{ fontSize:"14px", color:"#F4EFE6", wordBreak:"break-word" }}>{v || "—"}</div>
            </div>
          ))}

          {/* Socials */}
          <div style={{ marginTop:"28px" }}>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"3px", textTransform:"uppercase", color:"#D32F2F", marginBottom:"12px", display:"flex", alignItems:"center", gap:"10px" }}>
              <span style={{ width:"20px", height:"1px", background:"#D32F2F", display:"block" }} />
              Follow
            </div>
            <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
              {Object.entries(artist.socials || {}).map(([platform, url]) => (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="soc-btn" style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"2px", textTransform:"uppercase", border:"1px solid rgba(255,255,255,0.1)", color:"#555", padding:"9px 14px", textDecoration:"none", transition:"all 0.25s" }}>
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── ACCOLADES ─────────────────────────────────────────────────── */}
      {artist.accolades?.length > 0 && (
        <Reveal style={{ padding:"80px 60px", background:"#0A0A0A" }}>
          <Tag color="#C9A84C">Achievements</Tag>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(48px,6vw,80px)", lineHeight:0.9, marginBottom:"48px" }}>
            Accolades
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"2px" }}>
            {artist.accolades.map((a, i) => (
              <div key={i} className="accolade-item" style={{ display:"flex", alignItems:"flex-start", gap:"16px", padding:"20px 24px", background:"#111", border:"1px solid rgba(255,255,255,0.04)", transition:"background 0.3s" }}>
                <span style={{ color:"#C9A84C", fontSize:"10px", marginTop:"4px", flexShrink:0 }}>◆</span>
                <span style={{ fontSize:"14px", color:"#888", lineHeight:1.65 }}>{a}</span>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {/* ── RELEASES ──────────────────────────────────────────────────── */}
      {artistReleases.length > 0 && (
        <section style={{ padding:"80px 60px", background:"#111" }}>
          <Reveal>
            <Tag>Discography</Tag>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(48px,6vw,80px)", lineHeight:0.9, marginBottom:"48px" }}>
              Releases
            </h2>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"2px" }}>
            {artistReleases.map((release, i) => (
              <Reveal key={release.id} delay={i * 80}>
                <div className="release-card" style={{ background:"#181818", overflow:"hidden", border:"1px solid rgba(255,255,255,0.04)", transition:"all 0.3s", cursor:"pointer" }}>
                  {/* Cover */}
                  <div style={{ aspectRatio:"1", overflow:"hidden", position:"relative" }}>
                    <div className="rc-img" style={{ position:"absolute", inset:0, transition:"transform 0.5s ease" }}>
                      <ArtistImage artist={release} mode="cover" />
                    </div>
                    {/* Play overlay */}
                    <div style={{ position:"absolute", top:"12px", right:"12px", width:"32px", height:"32px", borderRadius:"50%", background:"#D32F2F", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", color:"#F4EFE6" }}>▶</div>
                  </div>
                  {/* Info */}
                  <div style={{ padding:"16px 18px" }}>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"8px", letterSpacing:"3px", textTransform:"uppercase", color:"#D32F2F", marginBottom:"6px" }}>
                      {release.type} · {release.year}
                    </div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"22px", letterSpacing:"0.5px", marginBottom:"3px", lineHeight:1 }}>
                      {release.title}
                    </div>
                    {release.featuring && (
                      <div style={{ fontSize:"12px", color:"#555" }}>ft. {release.featuring}</div>
                    )}
                    {release.streams && (
                      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"8px", letterSpacing:"2px", textTransform:"uppercase", color:"#C9A84C", marginTop:"8px" }}>
                        {release.streams} streams
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── GALLERY ───────────────────────────────────────────────────── */}
      {artist.images.length > 1 && (
        <Reveal style={{ padding:"80px 60px", background:"#0A0A0A" }}>
          <Tag>Photos</Tag>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(48px,6vw,80px)", lineHeight:0.9, marginBottom:"36px" }}>
            Gallery
          </h2>
          {/* Main large photo */}
          <div style={{ position:"relative", background:"#0d0d0d", border:"1px solid rgba(255,255,255,0.04)", marginBottom:"8px", display:"flex", alignItems:"center", justifyContent:"center", minHeight:"400px", maxHeight:"80vh" }}>
            <img
              src={artist.images[activeImg]}
              alt={`${artist.name} ${activeImg + 1}`}
              style={{ maxWidth:"100%", maxHeight:"80vh", width:"auto", height:"auto", display:"block", objectFit:"contain" }}
            />
          </div>
          {/* Thumbnail strip */}
          <ArtistImage
            artist={artist}
            mode="gallery"
            activeIndex={activeImg}
            onSelect={setActiveImg}
          />
        </Reveal>
      )}

      {/* ── BOOKING CTA ───────────────────────────────────────────────── */}
      <Reveal>
        <div style={{ background:"#D32F2F", padding:"80px 60px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"60px" }}>
          <div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(40px,5vw,72px)", color:"#F4EFE6", lineHeight:0.92, marginBottom:"12px" }}>
              Book {artist.name}<br />for Your Event.
            </div>
            <p style={{ fontSize:"14px", color:"rgba(255,255,255,0.65)", maxWidth:"380px" }}>
              For booking inquiries contact {artist.facts?.booking} or submit a request through our booking form.
            </p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"10px", flexShrink:0 }}>
            <Link to="/booking" className="btn-gold" style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", background:"#C9A84C", color:"#0A0A0A", padding:"16px 40px", textDecoration:"none", transition:"all 0.25s", textAlign:"center" }}>
              Submit Booking Request →
            </Link>
            <a href={`mailto:${artist.facts?.booking}`} style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"2px", textTransform:"uppercase", color:"rgba(255,255,255,0.5)", textAlign:"center", textDecoration:"none" }}>
              or email directly
            </a>
          </div>
        </div>
      </Reveal>

    </div>
  );
}
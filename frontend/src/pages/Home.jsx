import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { artists, releases, events } from "../data/dummy";
import ArtistImage from "../components/ArtistImage";

const css = `
  @keyframes tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(2.2);opacity:0} }
  .btn-red:hover   { background:#E53935!important; transform:translateY(-2px); }
  .btn-ghost:hover { border-color:#D32F2F!important; color:#D32F2F!important; }
  .stat-item:hover .stat-num { color:#F4EFE6!important; }
  .ev-row:hover  { background:#1c1c1c!important; border-color:rgba(211,47,47,0.2)!important; }
  .ev-row:hover .ev-bar { transform:scaleY(1)!important; }
  .ev-row:hover .ev-num { color:#F4EFE6!important; }
  .artist-panel:hover .artist-name { color:#D32F2F!important; }
  .artist-panel:hover .artist-arrow { color:#D32F2F!important; opacity:1!important; }
  .stream-pill:hover { border-color:#C9A84C!important; color:#C9A84C!important; }
  .sub-btn:hover { background:#E8C96A!important; }
  .card-link:hover .card-top-bar { transform:scaleX(1)!important; }
  .card-link:hover .card-overlay { opacity:1!important; }
  .scroll-reveal { opacity:0; transform:translateY(40px); transition:opacity 0.7s ease,transform 0.7s ease; }
  .scroll-reveal.visible { opacity:1; transform:translateY(0); }
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

function Tag({ children, color = "#D32F2F" }) {
  return (
    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", letterSpacing:"4px", textTransform:"uppercase", color, display:"flex", alignItems:"center", gap:"14px", marginBottom:"16px" }}>
      <span style={{ width:"28px", height:"1px", background:color, flexShrink:0, display:"block" }} />
      {children}
    </div>
  );
}

const TICK = ["Camidoh","Pbee","Afrobeats","GDS Records","Accra Ghana","Book Now","Grind Don't Stop","New Music"];
function Ticker({ bg="#D32F2F", color="#F4EFE6" }) {
  return (
    <div style={{ background:bg, padding:"13px 0", overflow:"hidden", whiteSpace:"nowrap" }}>
      <div style={{ display:"inline-flex", animation:"tick 28s linear infinite" }}>
        {[...TICK,...TICK].map((t,i) => (
          <span key={i} style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"14px", letterSpacing:"4px", color, padding:"0 32px", display:"inline-flex", alignItems:"center", gap:"32px" }}>
            {t}<span style={{ fontSize:"6px" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Reveal({ children, delay=0, style={} }) {
  const ref = useReveal();
  return <div ref={ref} className="scroll-reveal" style={{ transitionDelay:`${delay}ms`, ...style }}>{children}</div>;
}

export default function Home() {

  return (
    <div style={{ background:"#0A0A0A", color:"#F4EFE6", overflowX:"hidden" }}>
      <style>{css}</style>

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"0 60px 80px", position:"relative", overflow:"hidden", paddingTop:"72px" }}>
        {/* Top stripe */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"4px", background:"linear-gradient(90deg,#D32F2F,#C9A84C,#D32F2F)" }} />
        {/* Radial glow */}
        <div style={{ position:"absolute", inset:0, zIndex:0, background:"radial-gradient(ellipse 80% 60% at 65% 35%, rgba(211,47,47,0.07), transparent 62%)" }} />
        {/* Grid lines */}
        <div style={{ position:"absolute", inset:0, zIndex:0, backgroundImage:"linear-gradient(rgba(211,47,47,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(211,47,47,0.03) 1px,transparent 1px)", backgroundSize:"72px 72px", maskImage:"linear-gradient(to bottom,transparent,black 20%,black 78%,transparent)", WebkitMaskImage:"linear-gradient(to bottom,transparent,black 20%,black 78%,transparent)" }} />

        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ animation:"fadeUp 0.9s 0.15s both" }}><Tag>Est. 2018 · Accra, Ghana</Tag></div>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(60px,9vw,140px)", lineHeight:0.87, margin:"0 0 32px", animation:"fadeUp 0.9s 0.3s both" }}>
            Grind<br />
            <span style={{ WebkitTextStroke:"2px #D32F2F", color:"transparent" }}>Dont</span><br />
            Stop<br />
            <span style={{ color:"#D32F2F" }}>Records</span><span style={{ color:"#C9A84C" }}>.</span>
          </h1>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:"40px", animation:"fadeUp 0.9s 0.45s both" }}>
            <p style={{ fontSize:"15px", lineHeight:1.8, color:"#666", maxWidth:"420px", margin:0 }}>
              Independent label redefining African music. Home to Camidoh, PBee, and the artists shaping the sound of a continent.
            </p>
            <div style={{ display:"flex", gap:"12px", flexShrink:0 }}>
              <Link to="/artists" className="btn-red" style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", background:"#D32F2F", color:"#F4EFE6", padding:"14px 28px", textDecoration:"none", transition:"all 0.25s" }}>Meet the Artists</Link>
              <Link to="/music" className="btn-ghost" style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", border:"1px solid rgba(255,255,255,0.15)", color:"#777", padding:"14px 28px", textDecoration:"none", transition:"all 0.25s" }}>Latest Releases</Link>
            </div>
          </div>
        </div>
      </section>

      <Ticker />

      {/* ══ STATS ════════════════════════════════════════════════════════ */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", background:"#111", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        {[{n:"10+",l:"Artists Signed"},{n:"50+",l:"Releases"},{n:"100+",l:"Live Events"},{n:"5M+",l:"Total Streams"}].map(({n,l},i) => (
          <div key={l} className="stat-item" style={{ textAlign:"center", padding:"44px 20px", borderRight: i<3?"1px solid rgba(255,255,255,0.05)":"none" }}>
            <div className="stat-num" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"58px", color:"#D32F2F", lineHeight:1, transition:"color 0.3s" }}>{n}</div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"3px", textTransform:"uppercase", color:"#555", marginTop:"6px" }}>{l}</div>
          </div>
        ))}
      </div>

      {/* ══ FEATURED RELEASE ════════════════════════════════════════════ */}
      <Reveal style={{ padding:"96px 60px", background:"#111" }}>
        <Tag>Featured Release</Tag>
        <div style={{ display:"grid", gridTemplateColumns:"300px 1fr", gap:"64px", alignItems:"center" }}>
          {/*
            Release cover art:
            Add paths to releases[0].images in dummy.js
            e.g. images: ['/covers/sugarcane.jpg']
          */}
          <div style={{ position:"relative", width:"300px", height:"300px", flexShrink:0, border:"1px solid rgba(211,47,47,0.15)", overflow:"hidden" }}>
            <ArtistImage artist={releases[0]} mode="cover" />
            <div style={{ position:"absolute", top:"22px", right:"-30px", background:"#D32F2F", color:"#F4EFE6", fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"2px", padding:"6px 38px", transform:"rotate(45deg)" }}>NEW</div>
          </div>
          <div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", letterSpacing:"3px", textTransform:"uppercase", color:"#D32F2F", marginBottom:"10px" }}>
              {releases[0].type} · {releases[0].year}
            </div>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(56px,7vw,96px)", lineHeight:0.9, margin:"0 0 8px" }}>
              {releases[0].title}
            </h2>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"11px", letterSpacing:"2px", textTransform:"uppercase", color:"#555", marginBottom:"28px" }}>
              {releases[0].artist}{releases[0].featuring ? ` ft. ${releases[0].featuring}` : ""}
            </div>
            <p style={{ fontSize:"14.5px", lineHeight:1.8, color:"#666", maxWidth:"480px", marginBottom:"32px" }}>
              The breakout hit that took Camidoh global — a smooth Afrobeats love song blending Ghanaian rhythms with modern R&B production.
            </p>
            <div style={{ display:"flex", gap:"12px", marginBottom:"32px" }}>
              <Link to="/music" className="btn-red" style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", background:"#D32F2F", color:"#F4EFE6", padding:"13px 28px", textDecoration:"none", transition:"all 0.25s" }}>View All Releases</Link>
              <Link to="/artists/1" className="btn-ghost" style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", border:"1px solid rgba(255,255,255,0.12)", color:"#777", padding:"13px 28px", textDecoration:"none", transition:"all 0.25s" }}>Artist Profile</Link>
            </div>
            <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
              {Object.entries(releases[0].streamLinks || {}).map(([platform]) => (
                <span key={platform} className="stream-pill" style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"2px", textTransform:"uppercase", border:"1px solid rgba(255,255,255,0.1)", color:"#555", padding:"9px 16px", cursor:"pointer", transition:"all 0.25s" }}>▶ {platform}</span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ══ ARTISTS GRID ════════════════════════════════════════════════ */}
      <section style={{ background:"#0A0A0A", paddingBottom:"96px" }}>
        <Ticker bg="#111" color="rgba(244,239,230,0.08)" />
        <div style={{ padding:"80px 60px 0" }}>
          <Reveal>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"48px" }}>
              <div>
                <Tag>Our Roster</Tag>
                <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(48px,7vw,96px)", lineHeight:0.9, margin:0 }}>The Artists</h2>
              </div>
              <Link to="/artists" className="btn-ghost" style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", border:"1px solid rgba(255,255,255,0.12)", color:"#777", padding:"13px 28px", textDecoration:"none", transition:"all 0.25s" }}>Full Roster →</Link>
            </div>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"2px" }}>
            {artists.map((artist, i) => (
              <Reveal key={artist.id} delay={i * 100}>
                <Link to={`/artists/${artist.id}`} className="card-link" style={{ textDecoration:"none", color:"inherit", display:"block" }}>
                  <div style={{ position:"relative", aspectRatio:"3/4", overflow:"hidden", border:"1px solid rgba(255,255,255,0.04)", cursor:"pointer" }}>
                    {/*
                      Artist card photo:
                      - Has images → shows first photo
                      - No images  → styled gradient + emoji placeholder
                      Update dummy.js artists[i].images to add photos
                    */}
                    <ArtistImage artist={artist} mode="cover" />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.05) 55%,transparent)" }} />
                    <div className="card-top-bar" style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"#D32F2F", transformOrigin:"left", transform:"scaleX(0)", transition:"transform 0.4s" }} />
                    <div style={{ position:"absolute", top:"16px", right:"16px", fontFamily:"'Bebas Neue',sans-serif", fontSize:"72px", color:"rgba(255,255,255,0.04)", lineHeight:1, userSelect:"none" }}>0{i+1}</div>
                    <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"28px 24px" }}>
                      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"3px", textTransform:"uppercase", color:"#D32F2F", marginBottom:"7px" }}>{artist.genre}</div>
                      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"42px", letterSpacing:"1px", lineHeight:1, marginBottom:"4px" }}>{artist.name}</div>
                      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"2px", color:"#C9A84C" }}>{artist.streams} streams</div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EVENTS ══════════════════════════════════════════════════════ */}
      <Reveal style={{ padding:"96px 60px", background:"#111" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"52px" }}>
          <div>
            <Tag>Live</Tag>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(48px,7vw,96px)", lineHeight:0.9, margin:0 }}>Upcoming<br />Shows</h2>
          </div>
          <Link to="/events" className="btn-ghost" style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", border:"1px solid rgba(255,255,255,0.12)", color:"#777", padding:"13px 28px", textDecoration:"none", transition:"all 0.25s" }}>All Events →</Link>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:"2px" }}>
          {events.map((ev) => (
            <Link key={ev.id} to="/events" style={{ textDecoration:"none", color:"inherit" }}>
              <div className="ev-row" style={{ display:"flex", alignItems:"stretch", background:"#181818", border:"1px solid transparent", transition:"all 0.3s", position:"relative", overflow:"hidden" }}>
                <div className="ev-bar" style={{ position:"absolute", left:0, top:0, bottom:0, width:"3px", background:"#D32F2F", transform:"scaleY(0)", transition:"transform 0.3s", transformOrigin:"bottom" }} />
                <div style={{ minWidth:"100px", padding:"28px 24px", flexShrink:0, borderRight:"1px solid rgba(255,255,255,0.06)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.2)" }}>
                  <div className="ev-num" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"52px", color:"#D32F2F", lineHeight:1, transition:"color 0.3s" }}>{ev.day}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"3px", textTransform:"uppercase", color:"#555", marginTop:"3px" }}>{ev.month}</div>
                </div>
                <div style={{ flex:1, padding:"24px 36px", borderRight:"1px solid rgba(255,255,255,0.05)", display:"flex", flexDirection:"column", justifyContent:"center" }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"28px", letterSpacing:"1px", lineHeight:1, marginBottom:"8px" }}>{ev.name}</div>
                  <div style={{ fontSize:"13px", color:"#555", marginBottom:"10px" }}>📍 {ev.venue}, {ev.city}</div>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"8px", letterSpacing:"2px", textTransform:"uppercase", background:"rgba(211,47,47,0.12)", color:"#D32F2F", padding:"4px 12px", alignSelf:"flex-start" }}>{ev.artist}</span>
                </div>
                <div style={{ padding:"24px 36px", flexShrink:0, display:"flex", flexDirection:"column", alignItems:"flex-end", justifyContent:"center", gap:"10px" }}>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"11px", letterSpacing:"2px", color:"#C9A84C" }}>{ev.price}</div>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"2px", textTransform:"uppercase", background:"#D32F2F", color:"#F4EFE6", padding:"12px 22px" }}>Get Tickets</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>

      {/* ══ ABOUT TEASER ════════════════════════════════════════════════ */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
        <Reveal style={{ padding:"96px 60px", background:"#181818", display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <Tag>Who We Are</Tag>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(48px,6vw,88px)", lineHeight:0.9, margin:"0 0 24px" }}>
            Built on<br /><span style={{ WebkitTextStroke:"2px #D32F2F", color:"transparent" }}>The Grind.</span>
          </h2>
          <p style={{ fontSize:"14.5px", lineHeight:1.82, color:"#666", maxWidth:"400px", marginBottom:"36px" }}>
            Grind Don't Stop Records was founded in Accra with one mission — to give African artists the platform they deserve. We develop talent, manage careers, and connect artists with fans across the globe.
          </p>
          <Link to="/about" className="btn-red" style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", background:"#D32F2F", color:"#F4EFE6", padding:"14px 28px", textDecoration:"none", transition:"all 0.25s", alignSelf:"flex-start" }}>Our Story →</Link>
        </Reveal>
        <div style={{ background:"radial-gradient(ellipse 80% 60% at 50% 50%,rgba(211,47,47,0.06),transparent 70%),linear-gradient(160deg,#111,#180000)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", minHeight:"480px" }}>
          <img src="/logo.png" alt="" style={{ width:"280px", height:"280px", borderRadius:"50%", objectFit:"cover", opacity:0.1, position:"absolute" }} />
          <div style={{ position:"relative", zIndex:1, textAlign:"center" }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(80px,12vw,160px)", color:"rgba(211,47,47,0.07)", letterSpacing:"8px", lineHeight:1, userSelect:"none" }}>GDS</div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", letterSpacing:"4px", textTransform:"uppercase", color:"#D32F2F" }}>Since 2018 · Accra, Ghana</div>
          </div>
        </div>
      </div>

      {/* ══ SUBSCRIBE ════════════════════════════════════════════════════ */}
      <div style={{ background:"#D32F2F", padding:"80px 60px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"60px" }}>
        <div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(40px,5vw,72px)", color:"#F4EFE6", lineHeight:0.92, marginBottom:"12px" }}>Stay in<br />The Loop.</div>
          <p style={{ fontSize:"14px", color:"rgba(255,255,255,0.65)", maxWidth:"320px" }}>New releases, event alerts, and exclusive GDS Records updates — straight to your inbox.</p>
        </div>
        <div style={{ display:"flex", flex:1, maxWidth:"460px" }}>
          <input type="email" placeholder="Enter your email address" style={{ flex:1, background:"#0A0A0A", border:"none", color:"#F4EFE6", padding:"18px 22px", fontFamily:"'DM Sans',sans-serif", fontSize:"14px", outline:"none" }} />
          <button className="sub-btn" style={{ background:"#C9A84C", color:"#0A0A0A", border:"none", padding:"18px 28px", fontFamily:"'Space Mono',monospace", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", cursor:"pointer", transition:"background 0.3s", whiteSpace:"nowrap" }}>Subscribe</button>
        </div>
      </div>

    </div>
  );
}
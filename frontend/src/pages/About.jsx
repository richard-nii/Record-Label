import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// ─── Animations ──────────────────────────────────────────────────────────────
const css = `
  @keyframes tick {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .scroll-reveal {
    opacity: 0; transform: translateY(40px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .scroll-reveal.visible { opacity: 1; transform: translateY(0); }
  .btn-red:hover   { background: #E53935 !important; transform: translateY(-2px); }
  .btn-ghost:hover { border-color: #D32F2F !important; color: #D32F2F !important; }
  .team-card:hover { border-color: rgba(211,47,47,0.3) !important; background: #1a1a1a !important; }
  .team-card:hover .tc-bar { transform: scaleX(1) !important; }
  .ach-card:hover  { border-color: rgba(211,47,47,0.25) !important; }
  .ach-card:hover .ach-num { color: #F4EFE6 !important; }
  .tl-item:hover { background: rgba(211,47,47,0.04) !important; }
`;

// ─── Scroll reveal hook ──────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── Label tag ───────────────────────────────────────────────────────────────
function Tag({ children, color = "#D32F2F" }) {
  return (
    <div style={{
      fontFamily: "'Space Mono', monospace", fontSize: "10px",
      letterSpacing: "4px", textTransform: "uppercase", color,
      display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px",
    }}>
      <span style={{ width: "28px", height: "1px", background: color, flexShrink: 0, display: "block" }} />
      {children}
    </div>
  );
}

// ─── Ticker ──────────────────────────────────────────────────────────────────
const TICK = ["Our Story", "Founded in Accra", "African Music", "Grind Don't Stop", "Since 2018", "East Legon"];
function Ticker() {
  return (
    <div style={{ background: "#D32F2F", padding: "13px 0", overflow: "hidden", whiteSpace: "nowrap" }}>
      <div style={{ display: "inline-flex", animation: "tick 26s linear infinite" }}>
        {[...TICK, ...TICK].map((t, i) => (
          <span key={i} style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: "14px",
            letterSpacing: "4px", color: "#F4EFE6", padding: "0 32px",
            display: "inline-flex", alignItems: "center", gap: "32px",
          }}>
            {t}<span style={{ fontSize: "6px" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Reveal section ──────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="scroll-reveal"
      style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────
const timeline = [
  { year: "2018", title: "Label Founded", desc: "Grind Don't Stop Records officially incorporated in Nanakrom, Accra, Ghana with a focus on artist development, music production, and global distribution." },
  { year: "2019", title: "Camidoh Signs", desc: "Camidoh (Raphael Camidoh Kofi Attachie) officially signs to GDS Records, beginning a career that would reach international stages." },
  { year: "2022", title: "Sugarcane Goes Global", desc: "Camidoh's hit single Sugarcane charts internationally and gains massive traction on TikTok and major streaming platforms worldwide." },
  { year: "2024", title: "BET Nomination & Expansion", desc: "Camidoh earns a BET Awards nomination for Best New International Act. GDS expands its roster with the signing of PBee." },
];

const team = [
  { title: "Founder & CEO", role: "Executive Director", emoji: "👤", bg: "linear-gradient(135deg,#1c0000,#2d0000)", bio: "Visionary behind GDS Records. Over a decade in the Ghanaian music industry, building a label that competes on the global stage while staying rooted in authentic African storytelling." },
  { title: "Head of A&R", role: "Artist & Repertoire", emoji: "👤", bg: "linear-gradient(135deg,#1a0800,#2d1500)", bio: "Responsible for scouting and developing new talent across Ghana and West Africa. Known for identifying artists before they blow up on the continent and beyond." },
  { title: "Head of Marketing", role: "Brand & Digital Strategy", emoji: "👤", bg: "linear-gradient(135deg,#0d0000,#200000)", bio: "Drives the digital presence, campaign strategy, and brand partnerships that have taken GDS artists from Accra to international stages and global playlists." },
];

const achievements = [
  { icon: "🎵", num: "100M+", label: "Global Streams" },
  { icon: "🏆", num: "1+",    label: "BET Nomination" },
  { icon: "🌍", num: "15+",   label: "Countries Reached" },
  { icon: "🎤", num: "50+",   label: "Live Performances" },
];

// ════════════════════════════════════════════════════════════════════════════
export default function About() {
  return (
    <div style={{ background: "#0A0A0A", color: "#F4EFE6", overflowX: "hidden" }}>
      <style>{css}</style>

      {/* ══ PAGE HERO ═══════════════════════════════════════════════════════ */}
      <section style={{
        padding: "160px 60px 80px", background: "#111",
        position: "relative", overflow: "hidden",
      }}>
        {/* Top stripe */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "4px",
          background: "linear-gradient(90deg, #D32F2F, #C9A84C, #D32F2F)",
        }} />
        {/* Watermark */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Bebas Neue', sans-serif", fontSize: "220px",
          color: "rgba(211,47,47,0.025)", letterSpacing: "10px",
          pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap", lineHeight: 1,
        }}>ABOUT</div>

        <div style={{ position: "relative", zIndex: 2, animation: "fadeUp 0.9s 0.1s both" }}>
          <Tag>Our Story</Tag>
        </div>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(64px, 10vw, 140px)",
          lineHeight: 0.88, margin: "0 0 28px",
          position: "relative", zIndex: 2,
          animation: "fadeUp 0.9s 0.25s both",
        }}>
          About <span style={{ WebkitTextStroke: "2px #D32F2F", color: "transparent" }}>GDS</span><br />
          Records
        </h1>
        <p style={{
          fontSize: "15px", lineHeight: 1.8, color: "#666",
          maxWidth: "520px", position: "relative", zIndex: 2,
          animation: "fadeUp 0.9s 0.4s both",
        }}>
          Grind Don't Stop Records is an independent record label based in Accra, Ghana — dedicated to developing African talent and sharing our sound with the world.
        </p>
      </section>

      {/* ══ TICKER ══════════════════════════════════════════════════════════ */}
      <Ticker />

      {/* ══ STORY + TIMELINE ════════════════════════════════════════════════ */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>

        {/* Story left */}
        <Reveal style={{ background: "#181818", padding: "80px 60px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Tag>History</Tag>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(40px, 5vw, 72px)",
            lineHeight: 0.92, margin: "0 0 28px",
          }}>
            Where It All<br />
            <span style={{ WebkitTextStroke: "2px #D32F2F", color: "transparent" }}>Began.</span>
          </h2>
          <p style={{ fontSize: "14.5px", lineHeight: 1.82, color: "#666", marginBottom: "18px" }}>
            Grind Don't Stop Records was incorporated in 2018 in Nanakrom, Accra, Ghana — a bold independent label and creative agency with one mission: to develop and position African talent on the global stage.
          </p>
          <p style={{ fontSize: "14.5px", lineHeight: 1.82, color: "#666", marginBottom: "36px" }}>
            From humble beginnings in Accra, GDS has grown into a full-scale label operation offering artist development, music production, branding, marketing, and international distribution — playing a key role in launching the career of award-nominated artist Camidoh and investing in emerging talents pushing the boundaries of Afrobeats and contemporary African music.
          </p>
          <Link to="/artists" className="btn-red" style={{
            fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "2px",
            textTransform: "uppercase", background: "#D32F2F", color: "#F4EFE6",
            padding: "14px 28px", textDecoration: "none", transition: "all 0.25s",
            alignSelf: "flex-start",
          }}>
            Meet Our Artists →
          </Link>
        </Reveal>

        {/* Timeline right */}
        <Reveal delay={100} style={{ background: "#111", padding: "80px 60px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Tag>Timeline</Tag>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {timeline.map((item, i) => (
              <div key={item.year} className="tl-item" style={{
                display: "flex", gap: "24px", alignItems: "flex-start",
                padding: "22px 16px", borderBottom: i < timeline.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                transition: "background 0.3s", borderRadius: "2px",
              }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: "28px",
                  color: "#D32F2F", minWidth: "56px", lineHeight: 1, flexShrink: 0,
                }}>{item.year}</div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#F4EFE6", marginBottom: "5px" }}>{item.title}</div>
                  <div style={{ fontSize: "13px", color: "#555", lineHeight: 1.65 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ══ MISSION BANNER ══════════════════════════════════════════════════ */}
      <Reveal>
        <div style={{
          background: "#D32F2F", padding: "80px 60px",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center",
        }}>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(48px, 7vw, 96px)",
            color: "#F4EFE6", lineHeight: 0.9, margin: 0,
          }}>
            Our Mission<br />&amp; Vision
          </h2>
          <div>
            <p style={{ fontSize: "14.5px", lineHeight: 1.82, color: "rgba(255,255,255,0.75)", marginBottom: "20px" }}>
              Our mission is to develop and position African artists with professional resources, global distribution, and strategic industry connections — on their own terms, telling their own authentic stories.
            </p>
            {[
              { label: "Mission", text: "Develop world-class African talent and amplify their voices on the global stage." },
              { label: "Vision",  text: "To be the premier independent record label and creative agency in West Africa." },
              { label: "Values",  text: "Authenticity, creativity, cultural pride, community, and relentless hustle." },
            ].map(({ label, text }) => (
              <div key={label} style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginTop: "14px" }}>
                <span style={{ color: "#C9A84C", fontSize: "8px", marginTop: "5px", flexShrink: 0 }}>◆</span>
                <span style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.75)", lineHeight: 1.65 }}>
                  <strong style={{ color: "#F4EFE6" }}>{label}:</strong> {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ══ TEAM ════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "96px 60px", background: "#0A0A0A" }}>
        <Reveal>
          <Tag>Management</Tag>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "52px" }}>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(48px, 7vw, 96px)",
              lineHeight: 0.9, margin: 0,
            }}>The Team</h2>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: "9px",
              letterSpacing: "3px", textTransform: "uppercase", color: "#444",
            }}>Est. 2018 · Accra, Ghana</div>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2px" }}>
          {team.map((member, i) => (
            <Reveal key={member.title} delay={i * 120}>
              <div className="team-card" style={{
                background: "#111", padding: "40px 36px",
                border: "1px solid rgba(255,255,255,0.05)",
                transition: "all 0.3s", position: "relative", overflow: "hidden",
              }}>
                {/* Bottom bar */}
                <div className="tc-bar" style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: "3px",
                  background: "#D32F2F", transform: "scaleX(0)",
                  transition: "transform 0.3s", transformOrigin: "left",
                }} />
                {/* Avatar */}
                <div style={{
                  width: "72px", height: "72px", borderRadius: "50%",
                  background: member.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "28px", marginBottom: "22px",
                  border: "2px solid rgba(211,47,47,0.3)",
                }}>{member.emoji}</div>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: "26px",
                  letterSpacing: "1px", marginBottom: "4px",
                }}>{member.title}</div>
                <div style={{
                  fontFamily: "'Space Mono', monospace", fontSize: "9px",
                  letterSpacing: "3px", textTransform: "uppercase",
                  color: "#D32F2F", marginBottom: "16px",
                }}>{member.role}</div>
                <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.7 }}>{member.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ ACHIEVEMENTS ════════════════════════════════════════════════════ */}
      <section style={{ padding: "0 0 96px", background: "#0A0A0A" }}>
        <div style={{ padding: "0 60px", marginBottom: "52px" }}>
          <Reveal>
            <Tag>Milestones</Tag>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(48px, 7vw, 96px)",
              lineHeight: 0.9, margin: 0,
            }}>Achievements</h2>
          </Reveal>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2px", padding: "0 60px" }}>
          {achievements.map((a, i) => (
            <Reveal key={a.label} delay={i * 100}>
              <div className="ach-card" style={{
                background: "#111", padding: "44px 28px", textAlign: "center",
                border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.3s",
              }}>
                <span style={{ fontSize: "32px", marginBottom: "16px", display: "block" }}>{a.icon}</span>
                <div className="ach-num" style={{
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: "58px",
                  color: "#D32F2F", lineHeight: 1, marginBottom: "8px",
                  transition: "color 0.3s",
                }}>{a.num}</div>
                <div style={{
                  fontFamily: "'Space Mono', monospace", fontSize: "9px",
                  letterSpacing: "3px", textTransform: "uppercase", color: "#555",
                }}>{a.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ VISION QUOTE ════════════════════════════════════════════════════ */}
      <Reveal>
        <div style={{
          padding: "96px 60px", background: "#111",
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            fontFamily: "'Bebas Neue', sans-serif", fontSize: "200px",
            color: "rgba(211,47,47,0.03)", letterSpacing: "10px",
            userSelect: "none", whiteSpace: "nowrap",
          }}>GDS</div>
          <img src="/logo.png" alt="" style={{
            width: "80px", height: "80px", borderRadius: "50%",
            objectFit: "cover", opacity: 0.2, marginBottom: "32px",
          }} />
          <blockquote style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(32px, 5vw, 64px)",
            lineHeight: 1, color: "#F4EFE6",
            maxWidth: "800px", margin: "0 0 20px",
            position: "relative", zIndex: 1,
          }}>
            "Never Satisfied."
          </blockquote>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: "10px",
            letterSpacing: "4px", textTransform: "uppercase", color: "#D32F2F",
            position: "relative", zIndex: 1,
          }}>
            Grind Dont Stop Records · Nanakrom, Accra, Ghana
          </div>
          <div style={{ display: "flex", gap: "12px", marginTop: "40px", position: "relative", zIndex: 1 }}>
            <Link to="/artists" className="btn-red" style={{
              fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "2px",
              textTransform: "uppercase", background: "#D32F2F", color: "#F4EFE6",
              padding: "14px 28px", textDecoration: "none", transition: "all 0.25s",
            }}>Meet the Artists</Link>
            <Link to="/booking" className="btn-ghost" style={{
              fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "2px",
              textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.12)",
              color: "#777", padding: "14px 28px", textDecoration: "none", transition: "all 0.25s",
            }}>Book an Artist</Link>
          </div>
        </div>
      </Reveal>

    </div>
  );
}
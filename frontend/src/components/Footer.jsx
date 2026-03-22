import { Link } from "react-router-dom";
import { label } from "../data/dummy";

const footerLinks = {
  Label: [
    { label: "About Us",  to: "/about" },
    { label: "Artists",   to: "/artists" },
    { label: "Releases",  to: "/music" },
    { label: "Events",    to: "/events" },
  ],
  Services: [
    { label: "Artist Booking",  to: "/booking" },
    { label: "Press Kit",       to: "#" },
    { label: "Contact",         to: "/contact" },
  ],
  Follow: [
    { label: "Instagram", to: label.socials.instagram },
    { label: "TikTok",    to: label.socials.tiktok },
    { label: "YouTube",   to: label.socials.youtube },
    { label: "Twitter / X", to: label.socials.twitter },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background:"#0A0A0A", borderTop:"1px solid rgba(255,255,255,0.06)" }}>

      {/* ── TOP ROW ── */}
      <div style={{ display:"flex", justifyContent:"space-between", gap:"60px", padding:"72px 60px 56px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>

        {/* Brand */}
        <div style={{ flexShrink:0, maxWidth:"280px" }}>
          <Link to="/" style={{ display:"flex", alignItems:"center", gap:"12px", textDecoration:"none", marginBottom:"18px" }}>
            <img src="/logo.png" alt="GDS Records" style={{ width:"44px", height:"44px", borderRadius:"50%", objectFit:"cover", border:"2px solid #D32F2F", flexShrink:0 }} />
            <div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"18px", letterSpacing:"4px", color:"#F4EFE6", lineHeight:1 }}>GDS Records</div>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"7px", letterSpacing:"3px", textTransform:"uppercase", color:"#555", marginTop:"3px" }}>Grind Dont Stop</div>
            </div>
          </Link>
          <p style={{ fontSize:"13px", color:"#666", lineHeight:1.75, marginBottom:"14px" }}>
            An independent music label and creative agency dedicated to developing and positioning African talent on the global stage.
          </p>
          {/* Address */}
          <div style={{ display:"flex", flexDirection:"column", gap:"5px" }}>
            <div style={{ fontSize:"12px", color:"rgba(119,119,119,0.55)", display:"flex", alignItems:"flex-start", gap:"7px" }}>
              <span style={{ color:"#D32F2F", flexShrink:0 }}>📍</span>
              {label.location}
            </div>
            <a href={`mailto:${label.email}`} style={{ fontSize:"12px", color:"rgba(119,119,119,0.55)", textDecoration:"none", display:"flex", alignItems:"center", gap:"7px", transition:"color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color="#D32F2F"}
              onMouseLeave={e => e.currentTarget.style.color="rgba(119,119,119,0.55)"}
            >
              <span style={{ color:"#D32F2F" }}>✉</span>
              {label.email}
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div style={{ display:"flex", gap:"56px" }}>
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"3px", textTransform:"uppercase", color:"#D32F2F", marginBottom:"20px", margin:"0 0 20px" }}>
                {section}
              </h4>
              <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:"10px" }}>
                {links.map(({ label: lbl, to }) => (
                  <li key={lbl}>
                    {to.startsWith("http") ? (
                      <a href={to} target="_blank" rel="noopener noreferrer" style={{ fontSize:"13px", color:"#666", textDecoration:"none", transition:"color 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.color="#F4EFE6"}
                        onMouseLeave={e => e.currentTarget.style.color="#666"}
                      >{lbl}</a>
                    ) : (
                      <Link to={to} style={{ fontSize:"13px", color:"#666", textDecoration:"none", transition:"color 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.color="#F4EFE6"}
                        onMouseLeave={e => e.currentTarget.style.color="#666"}
                      >{lbl}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOOKING EMAILS ── */}
      <div style={{ padding:"28px 60px", borderBottom:"1px solid rgba(255,255,255,0.04)", display:"flex", gap:"40px", alignItems:"center" }}>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"3px", textTransform:"uppercase", color:"#D32F2F", flexShrink:0 }}>Booking</div>
        <div style={{ display:"flex", gap:"32px", flexWrap:"wrap" }}>
          {[
            { name:"Camidoh", email: label.bookingEmail.camidoh },
            { name:"PBee",    email: label.bookingEmail.pbee },
          ].map(({ name, email }) => (
            <div key={name} style={{ display:"flex", gap:"10px", alignItems:"center" }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"2px", textTransform:"uppercase", color:"#555" }}>{name}:</span>
              <a href={`mailto:${email}`} style={{ fontSize:"12px", color:"#666", textDecoration:"none", transition:"color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color="#D32F2F"}
                onMouseLeave={e => e.currentTarget.style.color="#666"}
              >{email}</a>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM ROW ── */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"24px 60px" }}>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"2px", color:"rgba(119,119,119,0.4)" }}>
          © {new Date().getFullYear()} Grind Dont Stop Records. All Rights Reserved.
        </span>
        <div style={{ display:"flex", gap:"24px" }}>
          {[
            { lbl:"IG", to: label.socials.instagram },
            { lbl:"TT", to: label.socials.tiktok },
            { lbl:"YT", to: label.socials.youtube },
            { lbl:"TW", to: label.socials.twitter },
          ].map(({ lbl, to }) => (
            <a key={lbl} href={to} target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"2px", textTransform:"uppercase", color:"#555", textDecoration:"none", transition:"color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color="#D32F2F"}
              onMouseLeave={e => e.currentTarget.style.color="#555"}
            >{lbl}</a>
          ))}
        </div>
      </div>

    </footer>
  );
}
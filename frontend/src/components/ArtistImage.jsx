import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ArtistImage — universal image component used across ALL pages
//
// MODES:
//   "cover"      → first image as static cover. Placeholder if no images.
//   "slideshow"  → auto-cycles through all images with dot indicators.
//   "single"     → shows one specific image by index.
//   "gallery"    → clickable thumbnail strip.
//
// USAGE:
//   <ArtistImage artist={artist} mode="cover" />
//   <ArtistImage artist={artist} mode="slideshow" interval={4000} />
//   <ArtistImage artist={release} mode="cover" />
//   <ArtistImage artist={event} mode="cover" />
//   <ArtistImage artist={artist} mode="gallery" activeIndex={i} onSelect={setI} />
//
// TO ADD PHOTOS: only edit dummy.js — no changes needed here.
// ─────────────────────────────────────────────────────────────────────────────

const base = { width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" };

function Placeholder({ item }) {
  return (
    <div style={{
      width:"100%", height:"100%",
      background: item.placeholderBg || "linear-gradient(135deg,#1a0000,#2d0000)",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:"80px", userSelect:"none", position:"relative", overflow:"hidden",
    }}>
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 70% at 50% 40%,rgba(211,47,47,0.07),transparent 70%)" }} />
      <span style={{ position:"relative", zIndex:1 }}>{item.placeholder || "🎵"}</span>
      {(item.name || item.title) && (
        <div style={{
          position:"absolute", bottom:"14px", left:0, right:0, textAlign:"center",
          fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(14px,3vw,32px)",
          letterSpacing:"6px", color:"rgba(255,255,255,0.05)", userSelect:"none",
        }}>
          {(item.name || item.title).toUpperCase()}
        </div>
      )}
    </div>
  );
}

function Cover({ item }) {
  const src = item.images?.[0];
  if (!src) return <Placeholder item={item} />;
  return <img src={src} alt={item.name || item.title || ""} style={base} loading="lazy" />;
}

function Slideshow({ item, interval = 4000 }) {
  const images = item.images || [];
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % images.length); setVisible(true); }, 350);
    }, interval);
    return () => clearInterval(t);
  }, [images.length, interval]);

  if (!images.length) return <Placeholder item={item} />;

  return (
    <div style={{ position:"relative", width:"100%", height:"100%", overflow:"hidden" }}>
      <img
        key={idx}
        src={images[idx]}
        alt={`${item.name || item.title || ""} ${idx + 1}`}
        style={{ ...base, opacity: visible ? 1 : 0, transition:"opacity 0.35s ease" }}
        loading="lazy"
      />
      {images.length > 1 && (
        <div style={{ position:"absolute", bottom:"16px", left:0, right:0, display:"flex", justifyContent:"center", gap:"6px", zIndex:2 }}>
          {images.map((_, i) => (
            <button key={i}
              onClick={() => { setVisible(false); setTimeout(() => { setIdx(i); setVisible(true); }, 300); }}
              style={{
                width: i === idx ? "20px" : "6px", height:"6px", borderRadius:"3px",
                border:"none", cursor:"pointer", padding:0,
                background: i === idx ? "#D32F2F" : "rgba(255,255,255,0.3)",
                transition:"all 0.3s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Single({ item, index = 0 }) {
  const src = item.images?.[index];
  if (!src) return <Placeholder item={item} />;
  return <img src={src} alt={`${item.name || item.title || ""} ${index + 1}`} style={base} loading="lazy" />;
}

function Gallery({ item, activeIndex = 0, onSelect }) {
  const images = item.images || [];
  if (!images.length) return (
    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", letterSpacing:"2px", textTransform:"uppercase", color:"#444" }}>
      No photos yet
    </div>
  );
  return (
    <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
      {images.map((src, i) => (
        <button key={i} onClick={() => onSelect?.(i)} style={{
          width:"72px", height:"72px", padding:0, border:"none",
          cursor:"pointer", overflow:"hidden", flexShrink:0,
          outline: i === activeIndex ? "2px solid #D32F2F" : "2px solid transparent",
          outlineOffset:"2px", transition:"outline 0.2s",
        }}>
          <img src={src} alt={`${item.name || ""} ${i + 1}`} style={{ ...base, objectPosition:"center center" }} loading="lazy" />
        </button>
      ))}
    </div>
  );
}

export default function ArtistImage({ artist, mode = "cover", index = 0, interval = 4000, activeIndex = 0, onSelect }) {
  switch (mode) {
    case "slideshow": return <Slideshow item={artist} interval={interval} />;
    case "single":    return <Single    item={artist} index={index} />;
    case "gallery":   return <Gallery   item={artist} activeIndex={activeIndex} onSelect={onSelect} />;
    default:          return <Cover     item={artist} />;
  }
}
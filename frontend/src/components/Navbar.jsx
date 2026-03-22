import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home",    to: "/" },
  { label: "About",   to: "/about" },
  { label: "Artists", to: "/artists" },
  { label: "Music",   to: "/music" },
  { label: "Events",  to: "/events" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detect scroll to add stronger background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    const timer = setTimeout(() => setMenuOpen(false), 0);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-15 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-black/98 border-b border-white/10 shadow-2xl"
            : "py-4 bg-black/97 border-b border-white/5"
        }`}
        style={{ backdropFilter: "blur(12px)", padding: "14px 60px" }}
      >
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 no-underline group">
          <div className="relative">
            <img
              src="/logo.png"
              alt="GDS Records"
              className="w-11 h-11 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
              style={{ border: "2px solid #D32F2F" }}
            />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="text-white tracking-widest uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px", letterSpacing: "4px" }}
            >
              GDS Records
            </span>
            <span
              className="text-gray-500 uppercase"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: "7px", letterSpacing: "3px" }}
            >
              Grind Dont Stop
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <ul className="hidden md:flex items-center gap-9 list-none m-0 p-0">
          {navLinks.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className="no-underline transition-all duration-200"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: isActive(to) ? "#D32F2F" : "rgba(244,239,230,0.55)",
                  position: "relative",
                }}
              >
                {label}
                {/* Active underline */}
                {isActive(to) && (
                  <span
                    className="absolute -bottom-1 left-0 right-0"
                    style={{ height: "1px", background: "#D32F2F", display: "block" }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* BOOK BUTTON + HAMBURGER */}
        <div className="flex items-center gap-4">
          <Link
            to="/booking"
            className="hidden md:inline-block no-underline transition-all duration-200 hover:bg-red-600"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              background: "#D32F2F",
              color: "#F4EFE6",
              padding: "11px 24px",
            }}
          >
            Book an Artist
          </Link>

          {/* HAMBURGER (mobile) */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1 bg-transparent border-none cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className="block transition-all duration-300"
              style={{
                width: "22px", height: "1.5px", background: "#F4EFE6",
                transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
              }}
            />
            <span
              className="block transition-all duration-300"
              style={{
                width: "22px", height: "1.5px", background: "#F4EFE6",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block transition-all duration-300"
              style={{
                width: "22px", height: "1.5px", background: "#F4EFE6",
                transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-300"
        style={{
          background: "rgba(10,10,10,0.98)",
          backdropFilter: "blur(16px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          paddingTop: "80px",
        }}
      >
        <ul className="list-none m-0 p-0 flex flex-col gap-1">
          {navLinks.map(({ label, to }, i) => (
            <li key={to}>
              <Link
                to={to}
                className="no-underline flex items-center justify-between px-8 py-5 transition-all duration-200"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "36px",
                  letterSpacing: "3px",
                  color: isActive(to) ? "#D32F2F" : "#F4EFE6",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  animationDelay: `${i * 60}ms`,
                }}
              >
                {label}
                <span style={{ fontSize: "16px", color: "#D32F2F" }}>→</span>
              </Link>
            </li>
          ))}
          <li className="px-8 pt-6">
            <Link
              to="/booking"
              className="no-underline block text-center"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                background: "#D32F2F",
                color: "#F4EFE6",
                padding: "16px",
              }}
            >
              Book an Artist
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
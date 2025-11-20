// src/Components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Quotation", path: "/quotation" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  // publish nav height to :root so pages can read it
  useEffect(() => {
    function setNavHeight() {
      const el = navRef.current;
      if (!el) return;
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--nav-height", `${Math.ceil(h)}px`);
    }
    setNavHeight();
    window.addEventListener("resize", setNavHeight);
    return () => window.removeEventListener("resize", setNavHeight);
  }, []);

  // switch between transparent (top) and soft-gold (scrolled)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const baseNavClasses =
    "w-full fixed top-0 left-0 z-[99999] transition-all duration-300";

  const scrolledClasses =
    "bg-[#C0A060]/95 shadow-lg backdrop-blur-sm"; // soft gold when scrolled

  const topClasses = "bg-transparent"; // fully transparent over hero

  return (
    <nav
      ref={navRef}
      className={`${baseNavClasses} ${isScrolled ? scrolledClasses : topClasses}`}
      style={{
        WebkitBackdropFilter: isScrolled ? "blur(10px)" : "none",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600,
              letterSpacing: "1px",
              fontSize: "1.4rem",
              color: "#FFFFFF",
              textShadow: "0 2px 6px rgba(0,0,0,0.55)",
              WebkitTextStroke: "0.25px rgba(0,0,0,0.35)",
            }}
          >
            SnapShoot
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              style={{
                color: "#FFFFFF",
                textShadow: "0 2px 6px rgba(0,0,0,0.55)",
                WebkitTextStroke: "0.25px rgba(0,0,0,0.28)",
                fontWeight: 500,
              }}
              className="hover:text-yellow-300 transition duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? <X size={26} color="#FFFFFF" /> : <Menu size={26} color="#FFFFFF" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 bg-black bg-opacity-95 backdrop-blur-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "#FFFFFF",
                textShadow: "0 2px 6px rgba(0,0,0,0.55)",
                WebkitTextStroke: "0.25px rgba(0,0,0,0.28)",
              }}
              className="hover:text-yellow-300 transition duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

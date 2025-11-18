import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

/*
  SERVICES LIST (REAL SERVICES INSTEAD OF COUPLE NAMES)
  – Replace images with your real service banners
  – Slugs will be used for filtering / navigation later
*/

const SERVICES = [
  {
    slug: "traditional-photography",
    title: "Traditional Photography",
    image: "/images/46.jpg",
  },
  {
    slug: "candid-photography",
    title: "Candid Photography",
    image: "/images/22.jpg",
  },
  {
    slug: "traditional-videography",
    title: "Traditional Videography",
    video: "/videos/tv.mp4",
   
  },
  {
    slug: "candid-videography",
    title: "Candid Videography",
     video: "/videos/candid.mp4",
   
  },
];


function ArrowButton({ dir = "left", onClick, offset = 28, size = 64 }) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  const baseStyle = {
    position: "absolute",
   top: "calc(50% - 30px)",
transform: "translateY(-50%)",
    zIndex: 40,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    outline: "none",
    WebkitTapHighlightColor: "transparent",
    transition: "background .18s ease, transform .12s ease, border .18s ease",
    boxShadow: "none",
    // ensure it sits above the image (no accidental clipping)
    overflow: "visible",
    padding: 0,
  };

  const background = pressed ? "#C0A060" : hover ? "#2F2A27" : "transparent";
  const border = hover || pressed ? "transparent" : "2px solid rgba(255,255,255,0.85)";

  const style = {
    ...baseStyle,
    left: dir === "left" ? `${offset}px` : undefined,
    right: dir === "right" ? `${offset}px` : undefined,
    background,
    border,
  };

  return (
    <button
      aria-label={dir === "left" ? "Scroll left" : "Scroll right"}
      onClick={onClick}
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setPressed(true);
      }}
      onKeyUp={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setPressed(false);
          onClick && onClick();
        }
      }}
    >
      {dir === "left" ? (
        <svg width={Math.round(size * 0.6)} height={Math.round(size * 0.6)} viewBox="0 0 24 24" fill="none" aria-hidden>
          <line x1="20" y1="12" x2="4" y2="12" stroke="white" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="10 6 4 12 10 18" stroke="white" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ) : (
        <svg width={Math.round(size * 0.6)} height={Math.round(size * 0.6)} viewBox="0 0 24 24" fill="none" aria-hidden>
          <line x1="4" y1="12" x2="20" y2="12" stroke="white" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="14 6 20 12 14 18" stroke="white" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      )}
    </button>
  );
}

export default function ServicesSection() {
  const rowRef = useRef(null);

  function scroll(delta) {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <section className="bg-[#FAF8F3] py-12">
      {/* Heading */}
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-[#1C1C1C] mb-10">Our Services</h2>
      </div>

      {/* Container that holds the row + arrows (relative) */}
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Smaller arrows positioned over the card area (offset measured from left/right inner edge) */}
        <ArrowButton dir="left" onClick={() => scroll(-420)} offset={20} size={56} />
        <ArrowButton dir="right" onClick={() => scroll(420)} offset={20} size={56} />

        {/* Horizontal poster row */}
        <div
          ref={rowRef}
          className="flex gap-8 overflow-x-auto no-scrollbar py-6 pb-10"
          style={{ scrollBehavior: "smooth" }}
        >
          {SERVICES.map((s) => (
            <div key={s.slug} className="flex-shrink-0 w-64 md:w-72">
              <article className="bg-white  shadow-md overflow-hidden relative">
               <Link to={`/gallery?service=${s.slug}`} className="block w-full h-[420px] relative group">

  {s.video ? (
     <video
      src={s.video}
          // thumbnail before loading
      preload="none"           // lazy load
      autoPlay                // 🔥 autoplay enabled
      muted                    // required for autoplay
      loop
      playsInline              // mobile-safe autoplay
      className="w-full h-full object-cover"
    />
  ) : (
    <img
      src={s.image}
      alt={s.title}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  )}

</Link>

                {/* Title below the image */}
                <div className="px-4 py-3 flex items-center justify-center">
                  <h3 className="font-serif text-lg text-[#1C1C1C]">{s.title}</h3>
                </div>
              </article>

              {/* Button below card */}
              <div className="mt-6 flex justify-center">
                <Link to={`/gallery?service=${s.slug}`} className="knot-btn" aria-label={`Explore ${s.title}`}>
                   Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* small CSS for button below cards + hide scrollbar */}
      <style>{`
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }

        .knot-btn {
          display: inline-block;
          background: #2f2a27;
          color: #fff;
          padding: 12px 28px;
          border-radius: 999px;
          font-family: "Playfair Display", "Georgia", serif;
          font-size: 16px;
          line-height: 1;
          letter-spacing: 0.2px;
          box-shadow:
            0 10px 20px rgba(31,25,22,0.14),
            inset 0 -6px 0 rgba(0,0,0,0.12);
          transition: transform .14s ease, box-shadow .14s ease, background .14s ease;
          text-decoration: none;
        }
        .knot-btn:hover { transform: translateY(-3px); background: #3a3430; }
        .knot-btn:active { transform: translateY(0); background: #C0A060; }

        @media (max-width: 640px) {
          .knot-btn { padding: 10px 20px; font-size: 15px; }
        }
      `}</style>
    </section>
  );
}
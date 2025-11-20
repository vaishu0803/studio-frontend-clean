// GallerySection.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer"

/**
 * Full-width premium gallery with updated chip styles to match Cinematic Red + Gold
 * - Fixed: selected chip background now fills 100% of the button area (no clipping)
 * - Active style: gold background + deep-red text
 * - Inactive style: glassy, semi-transparent dark
 *
 * Keep images in public/images/ with filenames already used in this project.
 */

export default function GallerySection() {
  // exact files you provided
  const imageFiles = [
    "1.jpg","2.jpg","3.jpeg","4.webp","5.png","6.webp","7.jpeg","8.jpeg","9.webp","10.webp",
    "11.jpg","12.webp","13.jpg","14.jpg","15.jpg","16.jpg","17.jpg","18.jpg","19.jpg","20.jpg",
    "21.jpg","22.jpg","23.jpg","24.jpg","25.jpg","26.jpg","27.jpg","28.jpg","29.jpg","30.jpg",
    "31.jpg","32.jpg","33.jpg","34.jpg","35.jpg","36.jpg","37.jpg","38.jpg","39.jpg","40.jpg",
    "41.jpg","42.jpg","43.jpg","44.jpg","45.jpg","46.jpg","47.jpg","48.jpg","49.jpg",
    "mar.JPG","meh.jpg","pre.jpg","rec.jpg","rituals.JPG","san.jpeg","vratham.jpg",
    "Eng.jpg","Haldi.JPG","hero.jpg"
  ];

  const allImages = useMemo(
    () =>
      imageFiles.map((file, idx) => ({
        id: idx,
        src: `/images/${file}`,
        filename: file,
        alt: file.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      })),
    []
  );

  // category keywords
  const CATEGORY_KEYWORDS = {
    All: [],
    Engagement: ["eng", "engagement"],
    Haldi: ["haldi"],
    Reception: ["rec", "reception"],
    Mehendi: ["meh", "mehendi"],
    Rituals: ["rituals", "vratham", "san"],
    "Pre-wedding": ["pre", "mar", "hero"],
    Candid: []
  };

  const categories = Object.keys(CATEGORY_KEYWORDS);

  // Multi-select
  const [activeCategories, setActiveCategories] = useState(new Set());
  const [query, setQuery] = useState("");
  const [images, setImages] = useState(allImages);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // toggle category (multi-select). 'All' clears selections.
  function toggleCategory(cat) {
    if (cat === "All") {
      setActiveCategories(new Set());
      return;
    }
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  // derive filtered images (OR across selected categories)
  useEffect(() => {
    const selected = Array.from(activeCategories);
    const filtered = allImages.filter((img) => {
      const fname = img.filename.toLowerCase();
      // text search
      if (query.trim()) {
        const q = query.toLowerCase();
        if (!(fname.includes(q) || (img.alt && img.alt.toLowerCase().includes(q)))) return false;
      }
      // no categories selected -> show all
      if (selected.length === 0) return true;
      // if any selected category keyword matches, include (OR)
      for (const cat of selected) {
        const keywords = CATEGORY_KEYWORDS[cat] ?? [];
        if (keywords.length === 0) continue;
        const matched = keywords.some((kw) => fname.includes(kw.toLowerCase()));
        if (matched) return true;
      }
      return false;
    });
    setImages(filtered);
    setLightboxIndex((i) => (filtered.length === 0 ? -1 : Math.min(i, filtered.length - 1)));
  }, [activeCategories, query, allImages]);

  // keyboard nav for lightbox
  useEffect(() => {
    function onKey(e) {
      if (lightboxIndex === -1) return;
      if (e.key === "Escape") setLightboxIndex(-1);
      if (e.key === "ArrowRight") setLightboxIndex((i) => Math.min(i + 1, images.length - 1));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => Math.max(i - 1, 0));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, images.length]);

  // lazy-load via IntersectionObserver
  useEffect(() => {
    const lazyImgs = Array.from(document.querySelectorAll("img[data-src]"));
    if (lazyImgs.length === 0) return;

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              const real = img.dataset.src;
              if (real) {
                img.src = real;
                img.removeAttribute("data-src");
                img.classList.add("loaded");
              }
              obs.unobserve(img);
            }
          });
        },
        { rootMargin: "250px" }
      );
      lazyImgs.forEach((img) => io.observe(img));
      return () => io.disconnect();
    } else {
      lazyImgs.forEach((img) => {
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
      });
    }
  }, [images]);

  const parentVariants = { visible: { transition: { staggerChildren: 0.06 } } };
  const itemVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.995 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
  };

  const niceText = (s) =>
    s ? s.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

  // palette tokens
  const DEEP_RED = "#8B0000";
  const HEADING_RED = "#B22222";
  const SOFT_GOLD = "#C0A060";
  const CREAM = "#FAF8F3";
  const TEXT = "#1C1C1C";

  return (
    <section className="w-full" style={{ background: CREAM }}>
      <Navbar />
      {/* Full-bleed header */}
      <div className="w-full px-6 py-10">
        <div className="w-full text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight" style={{ color: HEADING_RED }}>
            Captured Moments — Cinematic Storytelling
          </h1>

          <p className="mt-3 text-base md:text-lg" style={{ color: `${TEXT}cc` }}>
            Every wedding is a story — we capture the light, the smiles, and the in-between moments that become forever.
          </p>

          <div className="mt-5 flex items-center justify-center">
            <span style={{ background: SOFT_GOLD }} className="inline-block h-1 w-20 rounded-full shadow-sm" />
          </div>
        </div>

        {/* Filters row - full width */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Chips left */}
          <div className="flex flex-wrap items-center gap-3">
            {/* All chip */}
            <button
              onClick={() => toggleCategory("All")}
              className="relative inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none"
              aria-pressed={activeCategories.size === 0}
              style={{
                // when none selected (All active) show subtle gold tint, otherwise glassy transparent
                background: activeCategories.size === 0 ? "rgba(192,160,96,0.18)" : "rgba(20,20,20,0.06)",
                border: activeCategories.size === 0 ? "1px solid rgba(192,160,96,0.28)" : "1px solid rgba(255,255,255,0.06)",
                color: activeCategories.size === 0 ? TEXT : TEXT,
                boxShadow: activeCategories.size === 0 ? "0 8px 22px rgba(192,160,96,0.09)" : "0 6px 18px rgba(0,0,0,0.06)"
              }}
            >
              All
            </button>

            {categories.filter(c => c !== "All").map((cat) => {
              const isActive = activeCategories.has(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className="relative inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none"
                  aria-pressed={isActive}
                  style={{
                    background: isActive ? "rgba(192,160,96,0.18)" : "transparent",
                    border: isActive ? "1px solid rgba(192,160,96,0.28)" : "1px solid rgba(255,255,255,0.06)",
                    color: isActive ? DEEP_RED : TEXT,
                    boxShadow: isActive ? "0 10px 28px rgba(192,160,96,0.10)" : "0 6px 18px rgba(0,0,0,0.04)",
                    backdropFilter: "saturate(120%) blur(6px)"
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search right */}
          <div className="w-full md:w-64">
            <label htmlFor="gallery-search" className="sr-only">Search images</label>
            <div className="relative">
              <input
                id="gallery-search"
                placeholder="Search (optional)…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-full px-4 py-2 shadow-sm border border-white/8 bg-white/6 placeholder:text-[#cfcfcf] focus:outline-none"
                type="text"
                style={{ color: TEXT }}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "#999" }}>🔍</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery - full width container */}
      <div className="w-full px-6 pb-24">
        <motion.div variants={parentVariants} initial="hidden" animate="visible" className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {images.length === 0 ? (
            <div className="text-center col-span-full py-20 text-gray-600">No images found.</div>
          ) : (
            images.map((img, idx) => (
              <motion.article
                key={img.id + "-" + img.filename}
                variants={itemVariants}
                className="mb-4 break-inside-avoid rounded-lg overflow-hidden shadow-sm bg-white relative cursor-pointer group"
                onClick={() => setLightboxIndex(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") setLightboxIndex(idx); }}
              >
                <img
                  data-src={img.src}
                  src={`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'></svg>`}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full block transform transition-transform duration-300 ease-out group-hover:scale-105 object-cover h-auto"
                  style={{ display: "block" }}
                />

                <div className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="p-3 bg-gradient-to-t from-black/60 to-transparent text-white text-sm pointer-events-auto">
                    {niceText(img.filename)}
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== -1 && images[lightboxIndex] && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(-1)}
          >
            <div className="absolute inset-0 bg-black/70 pointer-events-auto" />

            <div className="relative z-20 max-w-[95vw] max-h-[95vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(-1); }}
                aria-label="Close"
                title="Close"
                role="button"
                tabIndex={0}
                className="absolute top-2 right-2 z-30 rounded-full bg-white p-2 shadow-lg hover:bg-gray-100 focus:outline-none"
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.stopPropagation(); setLightboxIndex(-1); } }}
              >
                ✕
              </button>

              <div className="flex items-center gap-4">
                <button onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => Math.max(i - 1, 0)); }} className="rounded-full bg-white/90 p-2 shadow" aria-label="Previous" disabled={lightboxIndex === 0}>◀</button>

                <img src={images[lightboxIndex].src} alt={images[lightboxIndex].alt} className="max-w-[80vw] max-h-[80vh] object-contain rounded" />

                <button onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => Math.min(i + 1, images.length - 1)); }} className="rounded-full bg-white/90 p-2 shadow" aria-label="Next" disabled={lightboxIndex === images.length - 1}>▶</button>
              </div>

              <div className="mt-3 text-sm text-white/90 text-center">{images[lightboxIndex].alt}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* small styles for lazy fade-in */}
      <style>{`
        img.loaded { 
          transition: opacity 350ms ease-out, transform 350ms ease-out; 
          opacity: 1 !important; 
          filter: none !important;
        }
        img[data-src] { 
          opacity: 0.65; 
          filter: blur(6px);
        }
        /* Ensure buttons render full background and avoid clipping on some browsers */
        button[aria-pressed] { 
          -webkit-appearance: none;
          appearance: none;
        }
      `}</style>
      <Footer />
    </section>
  );
}

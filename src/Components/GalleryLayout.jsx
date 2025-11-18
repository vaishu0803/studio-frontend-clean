// src/components/HomeGalleryPreview.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./ServiceCards.css";
/*
  HomeGalleryPreview
  - Auto-detects portrait images; when >=2 portraits found the first two become centered vertical anchors on md+.
  - If fewer than 2 portraits, layout uses CSS columns masonry (natural height).
  - Ending matches "services" style: heading + thin gold dividing line + CTA.
  - Replace galleryImages with your actual image paths (you said you will add 2 vertical pics).
*/

const galleryImages = [
  { src: "/images/Eng.jpg", alt: "Engagement" },
  { src: "/images/pre.jpg", alt: "Pre-Wedding" },
  { src: "/images/meh.jpg", alt: "Mehandi" },
  { src: "/images/Haldi.JPG", alt: "Haldi" },
  { src: "/images/mar.JPG", alt: "Wedding" },
  { src: "/images/san.jpeg", alt: "Sangeeth" },
  { src: "/images/rituals.JPG", alt: "Rituals" },
  { src: "/images/rec.jpg", alt: "Reception" },
  { src: "/images/vratham.jpg", alt: "Vratham" },
  { src: "/images/pre.jpg", alt: "Pre-Wedding Moments" },
  { src: "/images/mar.JPG", alt: "Wedding Highlights" },
  { src: "/images/Eng.jpg", alt: "Engagement Smiles" },
  // add your 2 vertical images here (example placeholders)
  { src: "/images/11.jpg", alt: "Portrait Vertical 1" },
  { src: "/images/13.jpg", alt: "Portrait Vertical 2" },
];

const OrnamentalDivider = () => (
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    style={{ transformOrigin: "left center" }}
    className="flex items-center justify-center"
    aria-hidden
  >
    <svg width="160" height="12" viewBox="0 0 160 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6 H60" stroke="#C0A060" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M100 6 H154" stroke="#C0A060" strokeWidth="1.6" strokeLinecap="round" />
      <g transform="translate(73,2)">
        <rect x="0" y="0" width="14" height="8" rx="1" transform="rotate(45 7 4)" fill="#C0A060" />
      </g>
    </svg>
  </motion.div>
);


export default function GalleryLayout() {
  // meta: array of {w,h,ratio,orientation} or null
  const [meta, setMeta] = useState(Array(galleryImages.length).fill(null));
  const [ready, setReady] = useState(false);

  // framer variants
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.03 } } };
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

  // update meta when each image loads (keeps robust for cache & network)
  function handleImageLoad(index, e) {
    const img = e.target;
    const w = img.naturalWidth || img.width || 1;
    const h = img.naturalHeight || img.height || 1;
    const ratio = w / h;
    const orientation = ratio < 0.9 ? "portrait" : ratio > 1.2 ? "landscape" : "square";
    setMeta((prev) => {
      const copy = prev.slice();
      copy[index] = { w, h, ratio, orientation };
      if (copy.every((c) => c !== null)) setReady(true);
      return copy;
    });
  }

  // small preload in case some images are cached and onLoad doesn't fire early
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const promises = galleryImages.map(
        (g, i) =>
          new Promise((res) => {
            const img = new Image();
            img.src = g.src;
            img.onload = () => {
              if (!cancelled) res({ i, w: img.naturalWidth, h: img.naturalHeight });
            };
            img.onerror = () => {
              if (!cancelled) res({ i, w: 16, h: 9 });
            };
          })
      );
      const results = await Promise.all(promises);
      if (cancelled) return;
      setMeta((prev) => {
        const copy = prev.slice();
        results.forEach(({ i, w, h }) => {
          const ratio = w / h;
          const orientation = ratio < 0.9 ? "portrait" : ratio > 1.2 ? "landscape" : "square";
          copy[i] = { w, h, ratio, orientation };
        });
        if (copy.every((c) => c !== null)) setReady(true);
        return copy;
      });
    })();
    return () => (cancelled = true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // compute portrait indexes when ready
  const portraitIndexes = ready
    ? meta
        .map((m, idx) => ({ idx, orientation: m.orientation }))
        .filter((x) => x.orientation === "portrait")
        .map((x) => x.idx)
    : [];

  // if at least 2 portraits exist, pick first two as center anchors
  const useAnchors = portraitIndexes.length >= 2;
  const centerAnchors = useAnchors ? [portraitIndexes[0], portraitIndexes[1]] : [];

  // helper: compute span class based on anchors (applies at md+)
  function spanClassForIndex(i) {
    if (!useAnchors) return ""; // no forced spans
    // place the two anchors side-by-side in the middle of a 6-col grid:
    // left anchor -> col-start-2 col-span-2 row-span-2
    // right anchor -> col-start-4 col-span-2 row-span-2
    if (i === centerAnchors[0]) return "md:col-start-2 md:col-span-2 md:row-span-2";
    if (i === centerAnchors[1]) return "md:col-start-4 md:col-span-2 md:row-span-2";
    return "";
  }

  return (
    <section className="px-6 md:px-12 py-16 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto">
        {/* Heading (same style as services heading) */}
        <div className="text-center mb-8">
          <h2  className='text-4xl md:text-5xl font-semibold text-[#B22222] font-[Playfair_Display] tracking-wide'>Your Moments, Our Storytelling</h2>
          <p  className="text-center text-[#1C1C1C]/80 italic text-lg mb-8">
            A glimpse of the stories we’ve framed , every celebration, every emotion.
          </p>
        </div>
        {/* Ornamental Divider */}
      <div className="flex justify-center mb-12">
        <OrnamentalDivider />
      </div>

        {/* Gallery:
            - if useAnchors (2+ portraits), we render grid with anchors placed center.
            - otherwise fall back to columns masonry for natural heights.
        */}
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }}>
          {useAnchors ? (
            // grid-based controlled layout (anchors present)
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4" style={{ gridAutoRows: "10rem", gridAutoFlow: "dense" }}>
              {galleryImages.map((img, idx) => (
                <motion.div key={idx} variants={item} className={`${spanClassForIndex(idx)} overflow-hidden relative`} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    onLoad={(e) => handleImageLoad(idx, e)}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    draggable={false}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            // columns masonry fallback (natural heights)
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {galleryImages.map((img, idx) => (
                <motion.div key={idx} variants={item} className="break-inside-avoid">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    onLoad={(e) => handleImageLoad(idx, e)}
                    className="w-full h-auto object-cover object-center hover:scale-105 transition-transform duration-500 rounded-none"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Divider like services + CTA */}
        <div className="mt-12">
          <div className="max-w-xl mx-auto">
            {/* gold divider line */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C0A060] to-transparent mx-auto mb-6" style={{ opacity: 0.85 }} />
            <div className="text-center">
              <h3 className='text-4xl md:text-5xl font-semibold text-[#B22222] font-[Playfair_Display] tracking-wide'>Loved What You See?</h3>
              <p  className="text-center text-[#1C1C1C]/80 italic text-lg mb-8">Explore our full portfolio and let us frame your story in cinematic color.</p>
              <a
                href="/gallery"
                className="inline-flex items-center gap-3 bg-[#8B0000] hover:bg-[#A31621] text-white font-semibold py-3 px-8 rounded-full transition-shadow shadow-lg"
              >
                Explore More
                <span className="w-2 h-2 block rounded-full bg-[#C0A060]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* tune base row height on larger screens for a cinematic feel */}
      <style>{`
        @media (min-width: 768px) {
          .grid { grid-auto-rows: 12rem !important; }
        }
        @media (min-width: 1200px) {
          .grid { grid-auto-rows: 14rem !important; }
        }
      `}</style>
    </section>
  );
}

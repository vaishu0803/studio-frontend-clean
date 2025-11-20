// src/Components/ServicesHeroWarm.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* local videos (same as your list) */
const DEFAULT_VIDEOS = [
  { id: 1, srcMp4: "/videos/hero.mp4",   srcWebm: "/videos/hero-1.webm", poster: "/images/hero-1-poster.jpg" },
  { id: 2, srcMp4: "/videos/hero1.mp4", srcWebm: "/videos/hero-2.webm", poster: "/images/hero-1-poster.jpg" },
  { id: 3, srcMp4: "/videos/hero2.mp4", srcWebm: "/videos/hero-3.webm", poster: "/images/hero-1-poster.jpg" },
  { id: 4, srcMp4: "/videos/hero3.mp4", srcWebm: "/videos/hero-4.webm", poster: "/images/hero-1-poster.jpg" },
];

const GOLD_OVERLAY = {
  color: "rgba(192,160,96,0.42)",
  mixBlendMode: "overlay",
};

const VIDEO_FILTER = "sepia(0.22) saturate(1.22) contrast(1.08) brightness(0.92)";

export default function ServicesHeroWarm({
  videos = DEFAULT_VIDEOS,
  title = "Award-Winning Wedding Films",
  subtitle = "Made with Love",
  paragraphs = [
    "Weddings are a celebration of love and a start of a new journey. Be the stars of your own story and let us tell it like no one else.",
    "We craft cinematic films that feel personal and timeless.",
  ],
  intervalMs = 8000,
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!videos || videos.length <= 1) return;
    timerRef.current = setInterval(() => setIndex(i => (i + 1) % videos.length), intervalMs);
    return () => clearInterval(timerRef.current);
  }, [videos, intervalMs]);

  return (
    // Full-bleed hero that still participates in layout (no fixed positioning)
    <header
      style={{
        position: "relative",
        width: "100vw",              // force viewport width
        left: "50%",                 // break out of parent container
        transform: "translateX(-50%)",
        minHeight: "100vh",          // full-screen height
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* Video crossfade layer (absolute inside container) */}
      <div style={{ position: "absolute", inset: 0 }}>
        <AnimatePresence initial={false}>
          {videos.map((v, i) =>
            i === index ? (
              <motion.div
                key={v.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{ position: "absolute", inset: 0 }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster={v.poster}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: VIDEO_FILTER,
                    transform: "scale(1.02)",
                  }}
                >
                  {v.srcWebm && <source src={v.srcWebm} type="video/webm" />}
                  <source src={v.srcMp4} type="video/mp4" />
                </video>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Gradient and gold overlays (absolute but inside container) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(20,18,16,0.45) 0%, rgba(240,236,230,0.15) 55%, rgba(10,8,6,0.55) 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: GOLD_OVERLAY.color,
          mixBlendMode: GOLD_OVERLAY.mixBlendMode,
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      {/* Text/content (relative, sits on top) */}
     <div
  style={{
    position: "absolute",
    inset: 0,
    zIndex: 5,
    display: "flex",
    alignItems: "center",     // vertically centers
    justifyContent: "center", // horizontally centers
    textAlign: "center",
    padding: "0 28px",
  }}
>

      
        <div style={{ maxWidth: 900 }}>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            style={{
              color: "white",
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(32px, 5vw, 64px)",
              lineHeight: 1.04,
              margin: 0,
            }}
          >
            {title}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.8 }}
            style={{
              marginTop: 12,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.95)",
              fontSize: "clamp(18px, 2vw, 24px)",
              marginBottom: 0,
            }}
          >
            {subtitle}
          </motion.h2>

          {paragraphs.map((p, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 + idx * 0.12, duration: 0.7 }}
              style={{
                marginTop: idx === 0 ? 18 : 10,
                color: "rgba(255,255,255,0.94)",
                fontSize: "clamp(14px, 1.2vw, 18px)",
                lineHeight: 1.6,
                marginBottom: 0,
              }}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </header>
  );
}

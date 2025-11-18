// src/components/CurvedHero.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * CurvedHero
 * Props:
 *  - slides: array of { id, title, subtitle, media: { type: 'image'|'video', src } }
 *  - poster: string (path for instant LCP paint)
 *  - className: extra wrapper classes
 * 
 * Notes:
 *  - The SVG clipPath below defines the curved shape (tweak path 'd' if needed).
 *  - Works with images or video; videos autoplay if `media.type === 'video'`.
 */

export default function CurvedHero({ slides = [], poster = "/images/1.jpg", className = "" }) {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [enableMedia, setEnableMedia] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);

    function enableAfterLoad() {
      setTimeout(() => setEnableMedia(true), 220);
    }
    if (document.readyState === "complete") enableAfterLoad();
    else window.addEventListener("load", enableAfterLoad);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", enableAfterLoad);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, isMobile ? 3000 : 4500);
    return () => clearInterval(interval);
  }, [isMobile, slides.length]);

  // prefetch next media
  useEffect(() => {
    if (!slides.length) return;
    const next = slides[(index + 1) % slides.length];
    if (!next) return;
    if (next.media.type === "image") {
      const img = new Image();
      img.src = next.media.src;
    } else {
      const v = document.createElement("video");
      v.src = next.media.src;
      v.preload = "metadata";
    }
  }, [index, slides]);

  const current = slides[index] || {};

  // clipPath id (unique per page to avoid collisions)
  const clipId = "curved-clip";

  // Motion variants
  const bgVariants = {
    enter: { opacity: 1, scale: 1.02, transition: { duration: 0.9 } },
    exit: { opacity: 0, scale: 1, transition: { duration: 0.9 } },
  };

  return (
    <section className={`relative w-full flex items-center justify-center ${className}`}>
      {/* Inline SVG defs with clipPath: the shape below is the curved swoop with center heart-dent.
          You can adjust the 'd' path to match any curvature or size. */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            {/* IMPORTANT: using objectBoundingBox requires normalized coordinates (0..1).
                We instead provide a path in user-space via clipPathUnits="userSpaceOnUse".
                But using userSpaceOnUse needs matching viewBox sizes when applied.
                To keep behavior stable, we'll also include a userSpaceOnUse path below via a second clipPath id.
            */}
          </clipPath>

          {/* Better: use userSpaceOnUse for exact control (we will reference this id in CSS) */}
          <clipPath id={`${clipId}-user`} clipPathUnits="userSpaceOnUse">
            {/* The path below is the curved container. Tweak coordinates if needed.
                Width used: 1440; Height used: 560 (hero height). */}
            <path
              d="M0,160 C220,140 360,170 480,145 C560,120 640,90 720,150 C800,210 880,120 960,145 C1080,170 1220,140 1440,160 L1440,560 L0,560 Z"
            />
            {/* Add heart cutout in center - we will mask it by layering top color below; for clipping, this just shapes the outer contour */}
          </clipPath>
        </defs>
      </svg>

      {/* Visual wrapper: we will clip this div using CSS clip-path that references the user-space clip path by id.
          To ensure cross-browser compatibility, we place an inline SVG clipPath and reference with `clip-path: url(#id)`.
          Some browsers may require the SVG defs to be inline in the DOM (we have them above).
      */}

      <div
        className="relative w-full"
        style={{
          height: "72vh",
          minHeight: 520,
          maxHeight: 960,
          overflow: "hidden",
        }}
      >
        {/* Poster layer - renders instantly (LCP) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${poster})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.5)",
            zIndex: 5,
            // apply clipPath to the poster container
            clipPath: `url(#${clipId}-user)`,
          }}
          aria-hidden="true"
        />

        {/* Animated media layer (images/videos) - will be clipped by same path */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            clipPath: `url(#${clipId}-user)`,
            WebkitClipPath: `url(#${clipId}-user)`,
            pointerEvents: "none",
          }}
        >
          <AnimatePresence>
            {enableMedia && !prefersReduced && current.media && (
              <motion.div
                key={current.id}
                initial="exit"
                animate="enter"
                exit="exit"
                variants={bgVariants}
                style={{ width: "100%", height: "100%" }}
              >
                {current.media.type === "video" ? (
                  <video
                    src={current.media.src}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    style={{ display: "block" }}
                  />
                ) : (
                  <img
                    src={current.media.src}
                    alt=""
                    aria-hidden="true"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                )}
              </motion.div>
            )}

            {enableMedia && prefersReduced && current.media && (
              // reduced motion: show static poster or current image without animation
              <div key={`static-${current.id}`} style={{ width: "100%", height: "100%" }}>
                {current.media.type === "video" ? (
                  <img src={poster} alt="" aria-hidden="true" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <img src={current.media.src} alt="" aria-hidden="true" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                )}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Overlay gradient and text container (also clipped to shape) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: "4rem",
            paddingRight: "4rem",
            color: "white",
            clipPath: `url(#${clipId}-user)`,
            WebkitClipPath: `url(#${clipId}-user)`,
            pointerEvents: "auto",
          }}
        >
          <div style={{ maxWidth: 980 }}>
            <h1 style={{ fontSize: "2.25rem", lineHeight: 1.02, fontWeight: 800, margin: 0 }}>
              {current.title || "Snapshoot"}
            </h1>
            <p style={{ marginTop: 12, fontSize: "1.125rem", color: "rgba(255,255,255,0.9)" }}>
              {current.subtitle || "Cinematic wedding photography"}
            </p>

            <div style={{ marginTop: 18 }}>
              <a
                href="#quotation"
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  borderRadius: 9999,
                  background: "white",
                  color: "black",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Quotation
              </a>
            </div>
          </div>
        </div>

        {/* Bottom fill that meets the rest of the page - ensures the curve looks like a container
            We draw an SVG fill that sits below the clipped media so the curve edge matches the page below.
        */}
        <svg
          viewBox="0 0 1440 560"
          preserveAspectRatio="none"
          className="absolute left-0 right-0 bottom-0"
          style={{ width: "100%", height: "auto", zIndex: 30, pointerEvents: "none" }}
        >
          {/* This path fills the area below the curved clip so the curve appears as the top edge of the next section */}
          <path
            d="M0,160 C220,140 360,170 480,145 C560,120 640,90 720,150 C800,210 880,120 960,145 C1080,170 1220,140 1440,160 L1440,560 L0,560 Z"
            fill="#f8f9fa"
          />
          {/* Optional small center heart cutout — we draw the heart in the fill color to visually 'dent' the wave.
              Use a slightly different approach if you want a true hole (mask) — this is simpler visually.
          */}
          <path
            d="M720 148 c-20 -34 -56 -34 -76 0 c-20 34 -6 70 38 90 c44 -20 58 -56 38 -90 z"
            fill="#f8f9fa"
          />
        </svg>
      </div>
    </section>
  );
}

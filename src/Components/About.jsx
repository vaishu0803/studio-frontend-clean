// src/components/PolaroidFirstHeroParallax.jsx
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";

/**
 * PolaroidFirstHeroParallax.jsx
 *
 * Adds a scroll-based parallax to the Polaroid-first hero:
 * - Polaroid background moves slowly (slower than scroll)
 * - Intro card moves slightly in opposite direction (subtle counter-parallax)
 * - Respect prefers-reduced-motion (parallax disabled)
 *
 * Usage:
 * - Put images in /public/images:
 *    polaroid-grid.jpg
 *    intro-card.png
 *
 * - Import and use:
 *    <PolaroidFirstHeroParallax />
 *
 * Notes:
 * - Tweak parallax strengths: POLAROID_STRENGTH, INTRO_STRENGTH below.
 * - Works on desktop & mobile; movement is reduced on small screens for readability.
 */

const LOCAL = {
  polaroid: "/images/polaroid_grid.png",
  intro: "/images/intro_card.png",
};

const PH = {
  polaroid: "https://via.placeholder.com/1600x900.png?text=Polaroid+Grid",
  intro: "https://via.placeholder.com/1200x480.png?text=Intro+Card",
};

const src = (local, fallback) => local || fallback;

export default function About({
  polaroidDuration = 1100, // ms
  introDelayAfterPolaroid = 450, // ms
  introPopDuration = 700, // ms
  ctaDelayAfterIntro = 300, // ms
}) {
  const polaroidControls = useAnimation();
  const introControls = useAnimation();
  const ctaControls = useAnimation();
  const reduceMotion = useReducedMotion();

  const polaroidRef = useRef(null);
  const introRef = useRef(null);
  const rafRef = useRef(null);
  const lastScrollY = useRef(0);

  const polaroidSrc = src(LOCAL.polaroid, PH.polaroid);
  const introSrc = src(LOCAL.intro, PH.intro);

  // Parallax strength (positive: moves slower than scroll; negative: countermove)
  // Adjust these for stronger/weaker parallax.
  const POLAROID_STRENGTH = 0.18; // small fraction of scroll (slower)
  const INTRO_STRENGTH = -0.06; // slight counter movement for depth

  useEffect(() => {
    let alive = true;

    async function run() {
      if (!alive) return;

      if (reduceMotion) {
        // Reduced motion: simple sequential fades (no parallax)
        await polaroidControls.start({ opacity: 1, scale: 1 }, { duration: 0.5 });
        await new Promise((r) => setTimeout(r, introDelayAfterPolaroid));
        await introControls.start({ opacity: 1, scale: 1 }, { duration: 0.4 });
        await new Promise((r) => setTimeout(r, ctaDelayAfterIntro));
        await ctaControls.start({ opacity: 1, y: 0, transition: { duration: 0.3 } });
        return;
      }

      // 1) polaroid reveal from top-left using clip-path
      await polaroidControls.start({
        clipPath: ["circle(0% at 0% 0%)", "circle(140% at 0% 0%)"],
        WebkitClipPath: ["circle(0% at 0% 0%)", "circle(140% at 0% 0%)"],
        opacity: 1,
        scale: [1.03, 1],
        transition: { duration: polaroidDuration / 1000, ease: [0.22, 0.9, 0.35, 1] },
      });

      // small pause then intro
      await new Promise((r) => setTimeout(r, introDelayAfterPolaroid));

      // 2) intro pop
      await introControls.start({
        opacity: 1,
        scale: [0.96, 1.04, 1],
        transition: { duration: introPopDuration / 1000, ease: [0.22, 0.9, 0.35, 1] },
      });

      // 3) CTA after a short delay
      await new Promise((r) => setTimeout(r, ctaDelayAfterIntro));
      await ctaControls.start({ opacity: 1, y: 0, transition: { duration: 0.36 } });
    }

    run();
    return () => {
      alive = false;
    };
  }, [
    polaroidControls,
    introControls,
    ctaControls,
    reduceMotion,
    polaroidDuration,
    introDelayAfterPolaroid,
    introPopDuration,
    ctaDelayAfterIntro,
  ]);

  useEffect(() => {
    if (reduceMotion) return; // don't attach parallax if user prefers reduced motion

    const polaroidEl = polaroidRef.current;
    const introEl = introRef.current;
    if (!polaroidEl && !introEl) return;

    // Ensure small screens have reduced parallax strength
    const isSmall = window.matchMedia("(max-width: 768px)").matches;
    const polaroidStrength = isSmall ? POLAROID_STRENGTH * 0.6 : POLAROID_STRENGTH;
    const introStrength = isSmall ? INTRO_STRENGTH * 0.6 : INTRO_STRENGTH;

    function onFrame() {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const delta = scrollY - lastScrollY.current;
      lastScrollY.current = scrollY;

      // target transforms based on scrollY (not delta) for stability
      const polaroidTranslate = Math.round(scrollY * polaroidStrength);
      const introTranslate = Math.round(scrollY * introStrength);

      if (polaroidEl) {
        polaroidEl.style.transform = `translate3d(0, ${polaroidTranslate}px, 0) scale(1)`;
      }
      if (introEl) {
        introEl.style.transform = `translate3d(0, ${introTranslate}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(onFrame);
    }

    // kick off RAF loop
    rafRef.current = requestAnimationFrame(onFrame);

    // cleanup
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [reduceMotion]);

  return (
    
    <header
      aria-label="Polaroid-first hero with parallax"
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#FAF8F3",
      }}
    >
      {/* Polaroid background (full-bleed) */}
      <motion.div
        ref={polaroidRef}
        initial={{
          opacity: 0,
          clipPath: `circle(0% at 0% 0%)`,
          WebkitClipPath: `circle(0% at 0% 0%)`,
          scale: 1.03,
        }}
        animate={polaroidControls}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          backgroundImage: `url(${polaroidSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          willChange: "clip-path, transform, opacity",
        }}
        onError={(e) => (e.currentTarget.style.backgroundImage = `url(${PH.polaroid})`)}
      />

      {/* subtle overlay for contrast */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.06) 0%, rgba(250,245,240,0.04) 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Centered intro card (hidden until polaroid reveals). This is the element that will slightly parallax */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          pointerEvents: "none",
        }}
      >
        <motion.div
          ref={introRef}
          initial={{ opacity:0, scale: 0.96 }}
          animate={introControls}
          style={{
            background: "rgba(250,245,240,0.96)",
            padding: "18px",
            borderRadius: 12,
            boxShadow: "0 20px 48px rgba(0,0,0,0.18)",
            display: "inline-block",
            pointerEvents: "auto",
            maxWidth: "92vw",
            width: "min(1100px, 92vw)",
            willChange: "transform",
            transform: "translate3d(0,0,0)",
          }}
        >
          <img
            src={introSrc}
            alt="Intro card"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "contain",
            }}
            onError={(e) => (e.currentTarget.src = PH.intro)}
            loading="eager"
          />
        </motion.div>
      </div>

      {/* CTA buttons (appear after intro) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={ctaControls}
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: 44,
          zIndex: 50,
          display: "flex",
          gap: 12,
          pointerEvents: "auto",
        }}
      >
        <a
          href="/quotation"
          style={{
            background: "#C0A060",
            color: "#111",
            padding: "10px 18px",
            borderRadius: 999,
            fontWeight: 600,
            boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
            textDecoration: "none",
          }}
        >
          Build Your Quotation
        </a>

        <a
          href="/gallery"
          style={{
            background: "#fff",
            color: "#111",
            padding: "10px 18px",
            borderRadius: 999,
            fontWeight: 600,
            boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
            textDecoration: "none",
          }}
        >
          Explore Gallery
        </a>
      </motion.div>
      

      {/* Reduced-motion safety */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>
    </header>
    



  );
}

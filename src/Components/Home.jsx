// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import Navbar from "./Navbar";
import ServicesSection from "./ServicesSection";
import QuotationCTA from "./QuotationCTA";
import QuotationForm from "./QuotationForm";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import AboutPreview from "./AboutPreview";
import GalleryLayout from "./GalleryLayout";
import ContactUs from "./ContactUs";

/*
  NOTE:
  - All your assets are inside public/images/
  - For example: public/images/1.jpg → accessible at /images/1.jpg
  - So all paths below are correct: /images/1.jpg, /images/2.jpg, etc.
*/

const slides = [
  {
    id: 1,
    title: "We See You",
    subtitle: "The little glances, the tiny smiles , we capture what matters.",
    media: { type: "image", src: "/images/10.webp" },
    overlay: 0.35, // darker overlay for bright image
    duration: 4000,
  },
  {
    id: 2,
    title: "Unscripted, Not Unplanned",
    subtitle: "No stiff poses. Just real laughter and honest moments.",
    media: { type: "image", src: "/images/4.webp" },
    overlay: 0.25,
    duration: 4000,
  },
  {
    id: 3,
    title: "Invisible, Always There",
    subtitle: "We blend in so the day can breathe , you stay present.",
    media: { type: "image", src: "/images/5.png" },
    overlay: 0.4,
    duration: 5000,
  },
  {
    id: 4,
    title: "We Chase Light",
    subtitle: "Golden-hour silhouettes, shadows that feel like memory.",
    media: { type: "image", src: "/images/8.jpeg" },
    overlay: 0.2, // less overlay for moody lighting
    duration: 5000,
  },
  {
    id: 5,
    title: "This Becomes Your Legacy",
    subtitle: "Frames for the next generation , images that last.",
    media: { type: "image", src: "/images/7.jpeg" },
    overlay: 0.3,
    duration: 5000,
  },
];

export default function Home() {
  return (
  <div className="min-h-screen w-screen bg-[#f8f9fa] flex flex-col items-center text-center">

      <Navbar />

      <Hero />

      {/* Below sections remain unchanged */}
      <ServicesSection />
      <br /> <br />
      <AboutPreview />
      <br /> <br />
      <GalleryLayout />
      <br /> <br />
    <div id="quotation" className="w-full">
  <QuotationCTA />
</div>

      <br /> <br />
      <Testimonials />
      <br /> <br />
      <ContactUs />
      <br/> <br />
      <Footer />
    </div>
  );
}
function Hero() {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [enableMedia, setEnableMedia] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // refs for parallax targets
  const bgRef = React.useRef(null);      // background image wrapper
  const textRef = React.useRef(null);    // text + CTA wrapper

  useEffect(() => {
    setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);

    function enableAfterLoad() {
      setTimeout(() => setEnableMedia(true), 200);
    }
    if (document.readyState === "complete") enableAfterLoad();
    else window.addEventListener("load", enableAfterLoad);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", enableAfterLoad);
    };
  }, []);

  // slide rotation
  useEffect(() => {
  const timeout = setTimeout(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, slides[index].duration);
  return () => clearTimeout(timeout);
}, [index, isMobile]);


  // prefetch next image
  useEffect(() => {
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
  }, [index]);

  // Parallax + fade on scroll
  useEffect(() => {
    if (prefersReduced) return; // respect reduced motion
    let rafId = null;

    function onScroll() {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrollY = window.scrollY || window.pageYOffset;
        const heroRect = bgRef.current?.parentElement?.getBoundingClientRect();
        if (!heroRect) return;

        // how far the hero is scrolled off-screen (0..1)
        const offset = Math.min(Math.max(-heroRect.top / heroRect.height, 0), 1);

        // background parallax: move slightly (range -20px .. +20px)
        const parallax = Math.round((offset * 40) - 20); // centered on 0
        if (bgRef.current) {
          bgRef.current.style.transform = `translateY(${parallax}px) scale(1.02)`;
        }

        // text fade + small translate upwards as user scrolls down (0..1)
        if (textRef.current) {
          const fade = Math.max(1 - offset * 1.25, 0.2); // keep minimal visibility
          const translateY = Math.round(offset * -24); // move up to -24px
          textRef.current.style.opacity = String(fade);
          textRef.current.style.transform = `translateY(${translateY}px)`;
        }
      });
    }

    // run once to set initial place
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReduced]);

  const current = slides[index];

  return (
    <section className="relative w-full h-[86vh] min-h-[660px] overflow-hidden flex items-center justify-center">
      {/* Background & slides wrapper */}
      <div className="absolute inset-0 overflow-hidden">
        {/* poster / immediate LCP */}
        <div
          ref={bgRef}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("/images/1.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.48)",
            transform: "translateY(0px) scale(1.02)",
            transition: "transform 300ms linear",
          }}
          aria-hidden="true"
        />

       {/* Animated slide crossfade + cinematic blur */}
<AnimatePresence>
  {enableMedia && (
    <motion.div
      key={current.id}
      initial={{ opacity: 0, filter: "blur(4px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(4px)" }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="absolute inset-0"
    >
      <img
        src={current.media.src}
        alt=""
        className="w-full h-full object-cover"
        style={{ willChange: "opacity, filter" }}
      />
      {/* Dynamic overlay based on slide brightness */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,${current.overlay}), rgba(0,0,0,${current.overlay + 0.1}))`,
        }}
      />
    </motion.div>
  )}
</AnimatePresence>


        {/* overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/36 via-black/20 to-black/60" />
      </div>

      {/* TEXT & CTA — wrapped so we can fade/translate it on scroll */}
      <div
        ref={textRef}
        className="relative z-10 text-left text-white px-8 sm:px-12 md:px-16 max-w-5xl"
        style={{ transition: "opacity 220ms linear, transform 220ms linear" }}
      >
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            {current.title}
          </h1>
          <p className="mt-3 md:mt-4 text-lg md:text-xl max-w-2xl text-white/90">
            {current.subtitle}
          </p>

          <div className="mt-6">
            <a
              href="/quotation"
               className="inline-block border border-white/40 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10 hover:scale-105 transition"
            >
              Quotation
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom curve (medium-deep) with gradient fade — keep your final version */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 480" preserveAspectRatio="none" className="w-full h-56">
          <defs>
            <linearGradient id="fadeWhite" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#f8f9fa" stopOpacity="0" />
              <stop offset="70%" stopColor="#f8f9fa" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f8f9fa" stopOpacity="1" />
            </linearGradient>
          </defs>

          <path
            d="M0,160 C360,380 640,440 720,430 C800,420 1080,380 1440,160 L1440,480 L0,480 Z"
            fill="url(#fadeWhite)"
          />
        </svg>
      </div>

      {/* small foot labels */}
      <div className="absolute bottom-6 left-6 text-white/80 text-sm">Snapshoot</div>
      <div className="absolute bottom-6 right-6 text-white/80 text-sm">↓ Explore</div>
    </section>
  );
}

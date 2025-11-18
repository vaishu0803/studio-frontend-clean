import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import founderImg from "/images/11.jpg";
import { Link } from "react-router-dom";

export default function AboutPreview() {
  // Typewriter setup
  const fullText = "We protect a legacy. We craft cinematic stories.";
  const [typed, setTyped] = useState("");
  const idxRef = useRef(0);
  const timerRef = useRef(null);

  // Intersection observer to start typing when section is visible
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // start when at least 30% of the section is visible
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            if (!started) setStarted(true);
          }
        });
      },
      { threshold: [0.3] }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Typing effect — runs once when `started` becomes true
  useEffect(() => {
    if (!started) return;

    // reset
    idxRef.current = 0;
    setTyped("");

    function tick() {
      setTyped((prev) => fullText.slice(0, idxRef.current + 1));
      idxRef.current += 1;
      if (idxRef.current < fullText.length) {
        const speed = 18 + (idxRef.current % 4) * 6;
        timerRef.current = window.setTimeout(tick, speed);
      }
    }

    // small initial delay for dramatic timing
    timerRef.current = window.setTimeout(tick, 300);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
    // only run when started changes to true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  // cleanup on unmount just in case
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      {/* Inline CSS */}
      <style>
        {`
        .about-hype { position: relative; background: #FAF8F3; color: #1C1C1C; overflow: hidden; }

  /* FIX BUTTON TEXT */
  .cta {
    color: white !important;
  }
        .about-headline {
          background: linear-gradient(90deg, rgba(139,0,0,1) 0%, rgba(178,34,34,1) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .typewriter { font-weight: 500; }
        .typed { display: inline-block; min-height: 1.1em; }
        .cursor { display: inline-block; margin-left: 6px; color: #8B0000; animation: blink 1s steps(2, start) infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        .cta-pulse { box-shadow: 0 6px 18px rgba(139,0,0,0.12); transition: all 0.3s ease; }
        .cta-pulse:hover { transform: translateY(-3px) scale(1.02); }
        .about-figure { width: min(520px, 100%); height: 420px; position: relative; border-radius: 12px; overflow: hidden; }
        .photo-viewport { position: relative; width: 100%; height: 100%; overflow: hidden; }
        .photo { width: 100%; height: 100%; object-fit: cover; transform-origin: center; transform: scale(1.06); transition: transform 12s linear; }
        .about-figure:hover .photo { transform: scale(1); transition-duration: 9s; }
        .gold-frame { position: absolute; inset: -8px; border-radius: 14px; border: 3px solid rgba(192,160,96,0.95); pointer-events: none; box-shadow: 0 18px 50px rgba(0,0,0,0.22); }
        .glint { position: absolute; inset: 0; background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.0) 60%);
                 transform: translateX(-110%) rotate(10deg); filter: blur(6px); transition: transform 1.6s ease-out 0.6s; pointer-events: none; }
        .about-figure:hover .glint { transform: translateX(110%) rotate(10deg); transition-duration: 1.2s; }
        .vignette { position: absolute; inset: 0; background: radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.28) 100%); pointer-events: none; }
        .film-grain { position: absolute; inset: 0; pointer-events: none;
                      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='g'><feTurbulence baseFrequency='0.9' numOctaves='1' stitchTiles='stitch' seed='2'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23g)' opacity='0.06'/></svg>");
                      mix-blend-mode: overlay; opacity: 0.55; animation: grainShift 6s linear infinite; }
        @keyframes grainShift { 0% { transform: translate(0,0); } 50% { transform: translate(2px,-2px); } 100% { transform: translate(0,0); } }
        @media (max-width:768px){ .about-headline{font-size:2rem;} .about-figure{height:320px;} }
        `}
      </style>

      <section ref={sectionRef} className="about-hype py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE */}
          <div className="pl-2">
            <motion.span
              className="text-sm tracking-[4px] uppercase text-[#C0A060] block mb-3"
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              About Us
            </motion.span>

            <motion.h1
              className="font-[Playfair_Display] text-4xl md:text-6xl leading-tight md:leading-tight text-[#8B0000] tracking-tight mb-4 about-headline"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              A Legacy Reimagined
            </motion.h1>

            <motion.div
              className="typewriter text-lg md:text-2xl text-[#1C1C1C]/90 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
            >
              <span className="typed">{typed}</span>
              <span className="cursor">▌</span>
            </motion.div>

            <motion.blockquote
              className="italic text-[#8B0000] border-l-4 border-[#C0A060] pl-5 pb-2 mb-6 text-lg"
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.28 }}
            >
              “Someone picked up the camera and protected everything.” 
            </motion.blockquote>

            <motion.p
              className="text-[17px] text-[#2a2a2a] leading-relaxed mb-8"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.36 }}
            >
              We capture the small, true moments — candid, cinematic and utterly human. Each frame honors a promise: to preserve memory with craft and heart.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.44 }}
            >
              <Link
                to="/about"
                className="cta inline-block bg-[#8B0000] hover:bg-[#A31621] text-white font-semibold py-3 px-8 rounded-full transition transform-gpu cta-pulse"
              >
                Know The Full Story
              </Link>
            </motion.div>
          </div>

          {/* RIGHT SIDE */}
          <motion.figure
            className="about-figure mx-auto shadow-2xl"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            aria-hidden
          >
            <div className="gold-frame" aria-hidden />
            <div className="photo-viewport">
              <img src={founderImg} alt="Founder" className="photo" loading="lazy" />
            </div>
            <div className="glint" aria-hidden />
            <div className="vignette" aria-hidden />
            <div className="film-grain" aria-hidden />
          </motion.figure>
        </div>
      </section>
    </>
  );
}

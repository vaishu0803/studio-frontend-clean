// src/components/QuotationCTA.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function ContactUs() {
  const reduceMotion = useReducedMotion();

  const COLORS = {
    creamGold: "#FAF8F3",
    softGold: "#C0A060",
    deepRed: "#8B0000",
    text: "#1C1C1C",
    offWhite: "#FFFDFC",
  };

  const textVariant = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

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

  return (
    <div className="w-full">
      {/* HERO IMAGE */}
      <motion.section
  aria-hidden="true"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.2, ease: "easeOut" }}
  className="w-full min-h-screen bg-center bg-cover bg-no-repeat"
  style={{
    backgroundImage: "url(/images/12.webp)",
  }}
>

     
        <style>{`
          @media (min-width: 1024px) {
            section[aria-hidden="true"] { background-attachment: fixed; }
          }
          @media (max-width: 1023px) {
            section[aria-hidden="true"] { background-attachment: scroll; }
          }
        `}</style>
        <div
  aria-hidden="true"
  className="absolute inset-0 pointer-events-none"
  style={{
    background:
      "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%)",
    mixBlendMode: "multiply",
  }}
></div>

      </motion.section>

      {/* CREAM-GOLD SECTION */}
      <section className="w-full py-12 md:py-16" style={{ backgroundColor: COLORS.creamGold }}>
        <div className="max-w-7xl mx-auto px-6">
                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* LEFT — IMAGE */}
            <div className="lg:col-span-5 flex justify-start lg:pl-6">
              <div
                className="relative w-full max-w-[280px] md:max-w-sm lg:max-w-[340px] overflow-hidden rounded-lg shadow-lg"
                style={{
                  background: COLORS.offWhite,
                  border: "4px solid rgba(255,255,255,0.9)",
                  boxShadow: "0 20px 45px rgba(0,0,0,0.25)",
                }}
              >
                <img
                  src="/images/27.jpg"
                  alt="Quotation preview"
                  loading="lazy"
                  className="w-full h-auto object-cover block"
                  draggable={false}
                  style={{ objectPosition: "center" }}
                />
              </div>
            </div>

            {/* RIGHT — TEXT BLOCK (Option 3 copy, subtle motion) */}
            <div className="lg:col-span-7 flex justify-end">
              <motion.div
                initial={reduceMotion ? "show" : "hidden"}
                whileInView="show"
                viewport={{ once: true, amount: 0.28 }}
                variants={textVariant}
                className="w-full max-w-2xl rounded-xl shadow-xl p-8 md:p-12"
                style={{
                  background: COLORS.offWhite,
                  borderLeft: `6px solid ${COLORS.softGold}`,
                  color: COLORS.text,
                }}
              >
                <h2
                  id="quotation-heading"
                  className='text-3xl md:text-4xl font-semibold text-[#B22222] font-[Playfair_Display] tracking-wide leading-tight'
                >
                  Get us to shoot you!
                </h2>
                
                {/* Ornamental Divider */}
                <div className="flex justify-center mb-12">
                  <OrnamentalDivider />
                </div>

                <p className="text-center text-[#1C1C1C]/80 italic text-base md:text-lg mb-6">
                  Welcome to the first step in getting us on onboard. Fill this form and get one step closer to making the best decision of your life! Not kidding. 
                </p>

                <div className="mt-8">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-3 bg-[#8B0000] hover:bg-[#A31621] text-white font-semibold py-3 px-8 rounded-full transition-shadow shadow-lg"
                  >
                    Contact Us
                    <span className="w-2 h-2 block rounded-full bg-[#C0A060]" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* Spacer below */}
      <div style={{ height: 40 }} />
    </div>
  );
}

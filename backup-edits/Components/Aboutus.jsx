import React from 'react';
import { motion } from 'framer-motion';
import About from './About';
import MeetTheTeam from './MeetTheTeam';
import Navbar from './Navbar';
import Footer from './Footer';
import StatsCounters from './StatsCounters';
import AboutExtras from './AboutExtras';

// Decorative SVG Divider (Keep this the same)
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
      <circle cx="80" cy="6" r="4" fill="#C0A060" />
    </svg>
  </motion.div>
);

export default function Aboutus() {
  return (
    // STEP 1: CRITICAL FIX FOR HORIZONTAL SCROLL
    // This tells the browser to hide any content that exceeds the viewport width.
    <div className='w-full min-h-screen bg-[#FAF8F3] overflow-x-hidden'>
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <About />
      
      {/* 2. ABOUT COMPANY INTRO SECTION (The Founder Image/Text Section) */}
      <section className="w-full py-16 md:py-32 bg-white">
        {/* The inner grid container ensures content is contained and centered */}
        <div 
          className="max-w-7xl mx-auto px-6 md:px-12 
          grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 
          items-center"
        >
          {/* LEFT TEXT CONTENT (order-2 on mobile, order-1 on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            // Fix: Added max-w-xl and mx-auto for better mobile containment
            className="order-2 md:order-1 text-center md:text-left mx-auto md:mx-0 max-w-xl" 
          >
            <p className="tracking-[0.3em] text-sm text-gray-500 mb-3">
              THE STUDIO
            </p>
            
            <h2 className="font-[Playfair_Display] text-4xl md:text-5xl leading-tight text-[#8B0000] tracking-tight mb-6">
              Capturing moments, crafting memories.
            </h2>
            
            <div className="flex justify-center md:justify-start mb-6">
                <OrnamentalDivider />
            </div>
            
            <p className="text-[#1C1C1C]/80 text-base md:text-lg mt-6 mb-4">
              We've been shooting weddings, portraits, and corporate functions
              across Hyderabad and beyond, chasing natural light, candid expression, and the small in-between moments
              that become memory.
            </p>

            <p className="text-[#1C1C1C]/80 italic text-base md:text-lg mb-6">
              My aim is simple: images that feel timeless, alive and true to the moment. If you like photographs that
              feel like lived memory warm, honest, and joyful . I’d love to tell a part of your story.
            </p>
          </motion.div>

          {/* RIGHT IMAGE (order-1 on mobile, order-2 on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            // Fix: Added max-w-lg and mx-auto for better mobile containment and to prevent stretching
            className="w-full h-64 md:h-[420px] rounded-2xl overflow-hidden shadow-lg order-1 md:order-2 max-w-lg mx-auto"
          >
            <img
              src="/images/cap.webp" 
              alt="About our photography"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. MEET THE TEAM SECTION */}
      <section className="w-full">
        <MeetTheTeam />
      </section>

      {/* 4. STATS COUNTERS SECTION */}
      <section className="w-full py-16">
        <StatsCounters />
      </section>

      {/* 5. ABOUT EXTRAS SECTION (Values, Travel Strip) */}
      <section className="w-full">
        <AboutExtras />
      </section>

      <Footer />
    </div>
  );
}
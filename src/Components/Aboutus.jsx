import React from 'react';
import { motion } from 'framer-motion';
import About from './About';
import MeetTheTeam from './MeetTheTeam';
import Navbar from './Navbar';
import Footer from './Footer';
import StatsCounters from './StatsCounters';
import AboutExtras from './AboutExtras';
/**
 * AboutCompanySection.jsx
 *
 * Layout:
 * LEFT  — a paragraph about the company (animated)
 * RIGHT — an image placeholder (animated)
 *
 * Use anywhere below the hero.
 * Replace the placeholder image with your final asset.
 */
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

export default function Aboutus() {
  return (
    <section className="w-full">
         <div className="w-full">
      <Navbar />
    </div>
          <div className="w-full">
      <About />
    </div>
 
  <section className="w-full bg-white py-16 md:py-24">
  <div
    className="
      w-full 
      px-4 sm:px-6 md:px-10 lg:px-16
      grid grid-cols-1 md:grid-cols-2
      gap-10 items-center
    "
  >
    {/* LEFT TEXT */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
      className="space-y-4"
    >
        
      <h2  className='text-3xl text-center mb-12 px-4  md:text-4xl font-semibold text-[#B22222] font-[Playfair_Display] tracking-wide leading-tight'>
                              Thanks for stopping by!
      </h2>
       
        {/* Ornamental Divider */}
      <div className="flex justify-center mb-12">
        <OrnamentalDivider />
      </div>

     
      <p className="text-center text-[#1C1C1C]/80 italic text-base md:text-lg mb-6">
        I’m Vaishnavi , Snapshoot Photographer based in Hyderabad. I take a documentary-first approach, keeping
    direction minimal and letting honest moments lead. I shoot weddings, families and intimate celebrations
    across Hyderabad and beyond, chasing natural light, candid expression, and the small in-between moments
    that become memory.
      </p>

      <p className="text-center text-[#1C1C1C]/80 italic text-base md:text-lg mb-6">
         My aim is simple: images that feel timeless, alive and true to the moment. If you like photographs that
    feel like lived memory warm, honest, and joyful . I’d love to tell a part of your story.
      </p>
    </motion.div>

    {/* RIGHT IMAGE (ACTUAL IMG TAG ADDED HERE!) */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="w-full h-64 md:h-[420px] rounded-2xl overflow-hidden shadow-lg"
    >
      <img
        src="/images/cap.webp"  // ← change this path
        alt="About our photography"
        className="w-full h-full object-cover"
      />
    </motion.div>
  </div>

</section>

 <section className="w-full">
          <div className="w-full">
      <MeetTheTeam />
    </div>
</section>

<section className="w-full">
    <div className='w-full'>
      <StatsCounters />
    </div>
</section>

<section className="w-full">
          <div className="w-full">
      <AboutExtras />
    </div>
</section>

<section className="w-full">
          <div className="w-full">
      <Footer />
    </div>
</section>


   </section>

  );
}

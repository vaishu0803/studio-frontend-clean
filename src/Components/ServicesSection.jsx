// src/components/ServiceCards.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import cpImage from "../assets/cp.jpg";
import tpImage from "../assets/tp.jpg";
import tvVideo from "../assets/tv.mp4";
import "./ServiceCards.css";

const services = [
  { id: "candid", title: "Candid Photography", type: "image", image: cpImage, popular: true },
  { id: "traditional", title: "Traditional Photography", type: "image", image: tpImage },
  { id: "video", title: "Traditional Video", type: "video", video: tvVideo },
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

export default function ServiceCards() {
  return (
    <section className="bg-[#FAF8F3] py-16 px-6 overflow-visible" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }} className="text-center mb-3">
          <h2 id="services-heading" className='text-4xl md:text-5xl font-semibold text-[#B22222] font-[Playfair_Display] tracking-wide'>
            Our Services
          </h2>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="text-center text-[#1C1C1C]/80 italic text-lg mb-8">
          "Every frame we shoot is a heartbeat frozen in time."
        </motion.p>

        <div className="flex justify-center mb-12">
          <OrnamentalDivider />
        </div>

        {/* Cards Grid - note added pb to create room below cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 pb-8 md:pb-12 service-cards-grid">
          {services.map((service, index) => (
            <motion.article
              key={service.id || index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: index * 0.12, ease: "easeOut" }}
              whileHover={{ translateY: -6 }}
              className="relative z-10" // ensure cards are lower than the button
            >
              <Link to="/services" className="group block focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8B0000]/40 rounded-xl">
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl shadow-lg bg-[#FFFDFC] cursor-pointer transition-transform duration-500 group-hover:scale-[1.02] shimmer-hover">
                  <div className="absolute inset-0 shimmer-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {service.popular && (
                    <motion.span initial={{ y: -6, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="absolute top-3 right-3 bg-[#C0A060] text-[#1C1C1C] text-xs font-medium px-2 py-1 rounded-full shadow-sm z-20">
                      Popular
                    </motion.span>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>

                  {service.type === "image" && (
                    <img src={service.image} alt={service.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  )}
                  {service.type === "video" && (
                    <video src={service.video} autoPlay muted loop playsInline className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  )}

                  <div className="absolute inset-0 flex items-center justify-center px-4">
                    <motion.span className="text-white text-xl md:text-2xl font-semibold text-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#C0A060] after:transition-all after:duration-300 group-hover:after:w-full" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} whileHover={{ scale: 1.03 }}>
                      {service.title}
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

       
        {/* Explore Button */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 1, delay: 0.5 }}
  className="text-center mt-20 pb-10 explore-wrapper relative z-40"
>
  <Link
    to="/services"
    className="inline-block bg-[#8B0000] hover:bg-[#A31621] text-white font-semibold py-3 px-8 rounded-full transition duration-300 focus-visible:ring-4 focus-visible:ring-[#8B0000]/30"
  >
    Explore →
  </Link>
</motion.div>

      </div>
    </section>
  );
}

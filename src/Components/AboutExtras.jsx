// src/components/AboutExtras.jsx
import React from "react";

/**
 * AboutExtras.jsx
 *
 * Contains:
 *  - Why Choose Us (4 items with SVG icons)
 *  - Values (4 short value tiles)
 *  - Photo strip (horizontal scroll) + small CTA links (Contact / Quotation)
 *
 * Usage:
 *  import AboutExtras from "./components/AboutExtras";
 *  <AboutExtras />
 *
 * Replace the TRAVEL_IMAGES array with your images in /public/images/
 */

const WHY = [
  {
    title: "Cinematic Storytelling",
    desc: "We craft sequences that feel like memory — light, motion and emotion in every frame.",
    icon: "camera",
  },
  {
    title: "Fast Delivery",
    desc: "Finished albums & highlights delivered quickly — professionally edited and colour-graded.",
    icon: "clock",
  },
  {
    title: "Trusted Across India",
    desc: "Hundreds of weddings and events — repeat clients and referrals speak for us.",
    icon: "shield",
  },
  {
    title: "Care & Backup",
    desc: "Multiple backups and secure delivery so your memories are safe for generations.",
    icon: "cloud",
  },
];

const VALUES = [
  { title: "Honesty", desc: "Real moments > forced poses." },
  { title: "Warmth", desc: "Images that feel like home." },
  { title: "Detail", desc: "We notice the small things that matter." },
  { title: "Trust", desc: "You enjoy your day — we handle the rest." },
];

// replace these with your travel photos in /public/images/
const TRAVEL_IMAGES = [
  {
    src: "/images/travel-5.webp",
    title: "Paris at dusk — where every street feels like a film scene.",
    subtitle: "Timeless light and endless stories.",
  },
  {
    src: "/images/travel-2.webp",
    title: "Quiet mornings by the river — nature’s calm before the day begins.",
    subtitle: "A reminder to slow down and breathe.",
  },
  {
    src: "/images/travel-3.webp",
    title: "Hidden villages — where life moves slowly and beauty hides in details.",
    subtitle: "Places that feel untouched by time.",
  },

   {
    src: "/images/travel-1.jpg",
    title: "Hidden villages — where life moves slowly and beauty hides in details.",
    subtitle: "Places that feel untouched by time.",
  },

   {
    src: "/images/travel-4.jpg",
    title: "Hidden villages — where life moves slowly and beauty hides in details.",
    subtitle: "Places that feel untouched by time.",
  },
];


function Icon({ name, className = "w-6 h-6" }) {
  // tiny inline SVG icons
  switch (name) {
    case "camera":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 7h3l1-2h8l1 2h3v12H4V7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "clock":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.2" />
          <path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "shield":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3l7 4v5c0 5-4 9-7 9s-7-4-7-9V7l7-4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "cloud":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M20 16.5A4.5 4.5 0 0 0 15.5 12H9.7A3.7 3.7 0 0 0 6 15.7 3.7 3.7 0 0 0 9.7 19H18a2.5 2.5 0 0 0 2-2.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function AboutExtras() {
  return (
    <div className="w-full bg-white">
      {/* WHY CHOOSE US */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-10">
          <h3 className="font-[Playfair_Display] text-4xl md:text-6xl leading-tight md:leading-tight text-[#8B0000] tracking-tight mb-4 about-headline">Why choose Snapshoot</h3>
          <p className="mt-2 text-gray-600">A few reasons couples trust us to tell their story.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY.map((w) => (
            <div key={w.title} className="bg-[#FAF8F3] rounded-xl p-6 shadow-sm flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#fff] inline-flex items-center justify-center text-[#8B0000]">
                <Icon name={w.icon} className="w-6 h-6" />
              </div>

              <div>
                <h4 className="font-semibold text-lg  text-[#8B0000]">{w.title}</h4>
                <p className="mt-2 text-gray-600 text-sm">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#FAF8F3] py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <h4 className="font-[Playfair_Display] text-4xl md:text-6xl leading-tight md:leading-tight text-[#8B0000] tracking-tight mb-4 about-headline">Our values</h4>
            <p className="text-gray-600 mt-2">What guides our work and how we show up for you.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-start gap-3">
                <div className=" text-[#8B0000] font-bold text-lg">{v.title}</div>
                <p className="text-gray-700 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO STRIP */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-[Playfair_Display] text-4xl md:text-6xl leading-tight md:leading-tight text-[#8B0000] tracking-tight mb-4 about-headline">Travel & Explorations</h4>
              <p className="text-gray-600 mt-1">A selection from our travels — little windows into the places we loved photographing.</p>
            </div>

            <div className="flex gap-3 items-center">
              <a href="/contact" className="text-sm text-[#8B0000] underline">Contact</a>
            </div>
          </div>

          <div
            className="photo-strip relative overflow-x-auto no-scrollbar rounded-xl"
            style={{ WebkitOverflowScrolling: "touch" }}
            aria-label="Travel photos"
          >
            <div className="flex gap-4 py-4">
  {TRAVEL_IMAGES.map((img, idx) => (
    <div
      key={idx}
      className="min-w-[280px] md:min-w-[340px] rounded-xl overflow-hidden shadow-md bg-gray-100"
      style={{ flexShrink: 0 }}
    >
      <img
        src={img.src}
        alt={img.title}
        className="w-full h-[220px] md:h-[280px] object-cover block"
        onError={(e) =>
          (e.currentTarget.src = `https://via.placeholder.com/800x600?text=Travel+${idx + 1}`)
        }
      />

      <div className="p-3">
        <div className="text-sm font-semibold text-gray-800">
          {img.title}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {img.subtitle}
        </div>
      </div>
    </div>
  ))}
</div>

          </div>

          {/* small CTA row for contact & quotation */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-sm text-gray-700">Like what you see? Let’s create your story.</div>
              <div className="mt-2 text-sm text-gray-500">Available for weddings across Hyderabad and beyond.</div>
            </div>

            <div className="flex gap-3">
              <a href="/quotation" className="inline-block px-5 py-3 rounded-full bg-[#8B0000] text-white font-semibold shadow">Build Quotation</a>
              <a href="/contact" className="inline-block px-5 py-3 rounded-full bg-[#8B0000] text-white font-semibold shadow">Let's Connect</a>
            </div>
          </div>
        </div>
      </section>

      {/* small helper styles */}
      <style>{`
        /* hide default scrollbar on webkit but keep scroll functionality */
        .no-scrollbar::-webkit-scrollbar { height: 10px; }
        .no-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); border-radius: 10px; }
        @media (prefers-reduced-motion: reduce) {
          .photo-strip { scroll-behavior: auto; }
        }
      `}</style>
    </div>
  );
}

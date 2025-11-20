// src/components/AboutExtras.jsx
import React from "react";

/**
 * Values grid + travel/photo grid.
 * Completely removes horizontal scroll (Option 3).
 */

const VALUES = [
  {
    id: 1,
    title: "Cinematic Storytelling",
    desc: "We craft sequences that feel like memory — light, motion and emotion in every frame.",
  },
  {
    id: 2,
    title: "Fast Delivery",
    desc: "Finished albums & highlights delivered quickly — professionally edited and colour-graded.",
  },
  {
    id: 3,
    title: "Tailored Packages",
    desc: "Every wedding & shoot is unique — we tailor coverage to match your needs.",
  },
  {
    id: 4,
    title: "Friendly Team",
    desc: "A relaxed crew who put you at ease and capture natural moments.",
  },
];

const TRAVEL_IMAGES = [
  "/images/travel-1.jpg",
  "/images/travel-4.jpg",
  "/images/travel-5.webp",
  "/images/travel-2.webp",
  "/images/travel-3.webp",
  "/images/travel-5.webp",
  "/images/travel-2.webp",
  "/images/travel-3.webp",
];

export default function AboutExtras() {
  return (
    <section className="w-full px-4 md:px-8 lg:px-16 py-12 bg-transparent">
  {/* Core values heading */}
  <div className="max-w-6xl mx-auto text-center mb-8">
    <h2 className="text-3xl md:text-4xl font-serif text-[#B22222]">
      Our Core Values
    </h2>
    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
      We believe in storytelling, quality and a fuss-free experience.
    </p>
  </div>

  {/* Values grid */}
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
    {VALUES.map((v) => (
      <article
        key={v.id}
        className="bg-white rounded-xl p-6 shadow-md border border-[#FAF8F3]"
      >
        <h3 className="font-semibold text-lg text-gray-800">{v.title}</h3>
        <p className="mt-3 text-gray-600 text-sm">{v.desc}</p>
      </article>
    ))}
  </div>

  {/* Space between values and images */}
 <div className="h-10 md:h-14"></div>

  {/* Travel/photo section */}
  <div className="max-w-6xl mx-auto mt-4">
    <h3 className="text-xl font-semibold mb-6 text-gray-800">
      Places we loved photographing
    </h3>

    {/* Responsive image grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
      {TRAVEL_IMAGES.map((src, idx) => (
        <div
          key={idx}
          className="rounded-xl overflow-hidden shadow-lg bg-white border border-[#FAF8F3] group"
        >
          <img
            src={src}
            alt={`travel-${idx}`}
            className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  </div>
</section>

  );
}

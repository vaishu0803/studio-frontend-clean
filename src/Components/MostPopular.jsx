// src/Components/MostPopular.jsx
import React from "react";
import { Link } from "react-router-dom";

const ITEMS = [
  { id: 1, poster: "/images/1.jpg", slug: "popular-1" },
  { id: 2, poster: "/images/40.jpg", slug: "popular-2" },
  { id: 3, poster: "/images/48.jpg", slug: "popular-3" },
  { id: 4, poster: "/images/4.webp", slug: "popular-4" },
  { id: 5, poster: "/images/5.png", slug: "popular-5" },
  { id: 6, poster: "/images/6.webp", slug: "popular-6" },
];

export default function MostPopular() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* small cream top bar — much shorter so no big gap */}
      <div
        style={{
          height: "56px",
          background: "#FAF8F3",
          width: "100%",
        }}
      />

      {/* slanted tan background (reduced height) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "45vh",            // reduced from 85vh -> 45vh
          transform: "skewY(-6deg)",
          transformOrigin: "top left",
          backgroundColor: "#C1AA92",
          zIndex: -1,
        }}
      />

      {/* behind slanted (flat) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#C1AA92",
          zIndex: -2,
        }}
      />

      {/* REAL CONTENT: remove large marginTop and big bottom padding */}
      <div className="w-full px-6 md:px-12 lg:px-20 py-12 md:py-20">
        {/* Heading */}
        <h2 className="text-center font-serif text-4xl text-[#3C2F28] mb-12">
          Most Popular
        </h2>

        {/* GRID — responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ITEMS.map((it) => (
            <article key={it.id} className="relative">
              <Link
                to={`/gallery?video=${it.slug}`}
                className="block w-full bg-black rounded-md overflow-hidden"
                style={{
                  aspectRatio: "16/9",
                }}
              >
                {it.poster ? (
                  <img
                    src={it.poster}
                    alt={it.slug}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-[#171717]" />
                )}
              </Link>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: 999,
                    background: "white",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#1C1C1C">
                    <path d="M8 5v14l11-7-11-7z" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

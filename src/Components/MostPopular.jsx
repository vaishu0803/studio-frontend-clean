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

      {/* Cream top */}
      <div
        style={{
          height: "130px",
          background: "#FAF8F3",
          width: "100%",
        }}
      />

      {/* Slanted tan background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "85vh",
          transform: "skewY(-6deg)",
          transformOrigin: "top left",
          backgroundColor: "#C1AA92",
          zIndex: -1,
        }}
      />

      {/* Behind slanted (flat) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#C1AA92",
          zIndex: -2,
        }}
      />

      {/* REAL CONTENT */}
      <div
  className="w-full px-10 md:px-20 pb-[150px]"
  style={{ marginTop: "80px" }}
>

        
        {/* Heading */}
        <h2 className="text-center font-serif text-4xl text-[#3C2F28] mb-14">
          Most Popular
        </h2>

        {/* GRID — Always 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {ITEMS.map((it) => (
            <article key={it.id} className="relative">

              {/* Square Thumbnail */}
              <Link
                to={`/gallery?video=${it.slug}`}
                className="block w-full bg-black"
                style={{
                  aspectRatio: "16/9",
                  borderRadius: "0px",
                  overflow: "hidden",
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
                    width: "58px",
                    height: "58px",
                    borderRadius: "999px",
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

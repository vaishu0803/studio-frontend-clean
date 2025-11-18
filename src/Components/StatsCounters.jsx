// src/components/StatsCounters.jsx
import React, { useEffect, useRef, useState } from "react";

/* ----------- CONFIG (edit these) ----------- */
const ITEMS = [
  { id: 1, label: "Weddings completed", value: 265, suffix: "+" },
  { id: 2, label: "Years experience", value: 8, suffix: "" },
  { id: 3, label: "Happy clients", value: 420, suffix: "+" },
  { id: 4, label: "Countries / Cities", value: 12, suffix: "+" },
];

/* Detect reduced motion */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/* Smooth number animation */
function animateValue(el, start, end, duration) {
  if (!el) return;
  const startTime = performance.now();
  function step(now) {
    const t = Math.min(1, (now - startTime) / duration);
    const eased = 1 - Math.pow(1 - t, 4); // easeOutQuart
    el.textContent = Math.floor(start + (end - start) * eased);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export default function StatsCounters({ items = ITEMS, duration = 1400 }) {
  const rootRef = useRef(null);
  const refs = useRef({});
  const started = useRef(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const section = rootRef.current;
    if (!section) return;

    if (reduced) {
      items.forEach((it) => {
        refs.current[it.id].textContent = it.value;
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;

          items.forEach((it) => {
            animateValue(refs.current[it.id], 0, it.value, duration);
          });

          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    io.observe(section);
    return () => io.disconnect();
  }, [items, duration, reduced]);

  return (
    <section
      ref={rootRef}
      className="w-full py-20 bg-white"
      aria-label="Photography stats"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2  className="font-[Playfair_Display] text-4xl md:text-6xl leading-tight md:leading-tight text-[#8B0000] tracking-tight mb-4 about-headline">
          Numbers That Matter
        </h2>

        <p className="mt-2 text-gray-600">
          Weddings captured, happy clients, and years of storytelling.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it) => (
            <div
              key={it.id}
              className="bg-[#FAF8F3] shadow-md rounded-xl p-6 flex flex-col items-center"
            >
              {/* BIG NUMBER */}
              <div className="flex items-baseline gap-1">
                <span
                  ref={(node) => (refs.current[it.id] = node)}
                  className="text-4xl md:text-5xl font-extrabold  text-[#8B0000]"
                >
                  0
                </span>
                <span className="text-2xl font-semibold text-[#1C1C1C]">
                  {it.suffix}
                </span>
              </div>

              {/* LABEL */}
              <p className="mt-3 text-gray-700 text-sm md:text-base">
                {it.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

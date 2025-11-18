import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const testimonials = [
  {
    name: "Anjali & Rohan",
    feedback:
      "Abhiman Photography made our big day unforgettable. The attention to detail and emotion in every shot was just perfect!",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?fit=crop&w=400&h=400&q=80",
  },
  {
    name: "Sneha & Karthik",
    feedback:
      "Incredible experience! They were professional and friendly, and we loved the final album.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fit=crop&w=400&h=400&q=80",
  },
  {
    name: "Priya & Arjun",
    feedback:
      "They captured all the beautiful moments of our engagement beautifully. Highly recommend them!",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?fit=crop&w=400&h=400&q=80",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="Client testimonials"
      style={{
        width: "100%",
        background: "#FAF8F3",
        position: "relative",
        zIndex: 30,
        paddingTop: "2.25rem",
        paddingBottom: "2.5rem",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        /* ensure swiper occupies its container and slides center */
        .testimonials-safe-wrapper { display:flex; justify-content:center; width:100%; box-sizing:border-box; }
        .testimonials-inner { width: 100%; max-width: 1200px; box-sizing: border-box; padding: 0 16px; }

        /* Force swiper to center slides and not overflow */
        .swiper { width: 100% !important; overflow: visible !important; box-sizing: border-box; }
        .swiper-wrapper { align-items: stretch; box-sizing: border-box; }
        .swiper-slide { display:flex !important; justify-content:center !important; align-items: stretch !important; box-sizing: border-box !important; width: 100% !important; min-width: 0 !important; }

        /* card sizing: small gutters on mobile */
        .testimonial-card {
          width: calc(100% - 48px);
          max-width: 640px;
          background: #fff;
          border-radius: 14px;
          padding: 16px;
          box-shadow: 0 10px 28px rgba(0,0,0,0.08);
          box-sizing: border-box;
          display:flex;
          flex-direction:column;
          margin: 0 auto;
          transition: transform 220ms ease, box-shadow 220ms ease;
          will-change: transform;
        }

        .testimonial-card:hover{ transform: translateY(-6px) scale(1.01); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }

        .testimonial-top { display:flex; gap:12px; align-items:center; }
        .testimonial-avatar { width:56px; height:56px; border-radius:9999px; object-fit:cover; flex-shrink:0; }
        .testimonial-title { margin:0; font-size:1.05rem; color:#B22222; font-weight:600; }
        .testimonial-feedback { margin-top:12px; font-size:0.98rem; color:#374151; line-height:1.45; }

        /* pagination centered under the card */
        .swiper-pagination { bottom: -18px !important; left: 50% !important; transform: translateX(-50%) !important; }

        /* tablet and up: two per view (Swiper breakpoints handle view change) */
        @media (min-width: 768px) {
          .testimonial-card { max-width: 520px; padding:18px; }
          .testimonial-avatar { width:72px; height:72px; }
        }

        /* desktop: show 3 cards per row, larger avatars, show share, adjust spacing */
        @media (min-width: 1024px) {
          /* expand card more on desktop — only 2 big cards per view */
          .testimonial-card {
            width: calc((100% - 48px) / 2);
            max-width: 680px;
            padding: 26px;
            border-radius: 18px;
          }
          .testimonial-avatar { width:96px; height:96px; }
          .testimonial-feedback { font-size:1.08rem; line-height:1.55; }
          .swiper-pagination { bottom: -32px !important; }
          .sm\:flex { display: flex !important; }
          .swiper-slide { justify-content:center !important; }
        }
          .testimonial-avatar { width:84px; height:84px; }
          .testimonial-feedback { font-size:1rem; }
          .swiper-pagination { bottom: -28px !important; }

          /* surface a simple metadata row and share button on desktop */
          .sm\\:flex { display: flex !important; }

          /* keep slides aligned to start on larger screens */
          .swiper-slide { justify-content:flex-start !important; }
        }

        /* safety: prevent horizontal scrolling from other elements */
        html, body, #root { overflow-x: hidden; }
      `}</style>

      {/* heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center px-4 mb-8"
        style={{ paddingLeft: 16, paddingRight: 16 }}
      >
        <h2 style={{ color: "#B22222", fontSize: 28, fontWeight: 700, margin: 0 }}>
          What Our Clients Say
        </h2>
        <div style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <span style={{ width: 56, height: 4, background: "#C0A060", borderRadius: 999, display: "inline-block" }} />
          <p style={{ margin: 0, color: "#6B7280", maxWidth: 520, fontSize: 14 }}>
            Real experiences shared by our happy couples.
          </p>
          <span style={{ width: 56, height: 4, background: "#C0A060", borderRadius: 999, display: "inline-block" }} />
        </div>
      </motion.div>

      {/* defensive wrappers */}
      <div className="testimonials-safe-wrapper" aria-hidden="false">
        <div className="testimonials-inner">
          <Swiper
            slidesPerView={1}          // 1 on mobile — guaranteed
            centeredSlides={true}
            spaceBetween={20}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4200, disableOnInteraction: false }}
            modules={[Pagination, Autoplay]}
            breakpoints={{
              768: { slidesPerView: 2, centeredSlides: false, spaceBetween: 28 },
              1024: { slidesPerView: 3, centeredSlides: false, spaceBetween: 32 },
            }}
            className="py-4"
          >
            {testimonials.map((t, idx) => (
              <SwiperSlide key={idx}>
                <article className="testimonial-card" aria-label={`testimonial ${t.name}`}>
                  <div className="testimonial-top">
                    <img src={t.image} alt={`${t.name} avatar`} className="testimonial-avatar" loading="lazy" />
                    <div style={{ minWidth: 0 }}>
                      <h3 className="testimonial-title">{t.name}</h3>
                      <div style={{ marginTop: 6, display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ width: 8, height: 8, borderRadius: 8, background: "#C0A060", display: "inline-block" }} />
                        <span style={{ fontSize: 13, color: "#6B7280" }}>Verified client</span>
                      </div>
                    </div>

                    <svg style={{ marginLeft: 12, flexShrink: 0 }} className="w-7 h-7 text-[#C0A060]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M7.17 6A4 4 0 0 0 4 10v4a2 2 0 0 0 2 2h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17.17 6A4 4 0 0 0 14 10v4a2 2 0 0 0 2 2h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <p className="testimonial-feedback">“{t.feedback}”</p>

                  <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid #F3EAD2", background: "#FFFDFC", fontSize: 12, color: "#4B5563" }}>Wedding</span>
                      <span style={{ color: "#9CA3AF", fontSize: 12 }}>•</span>
                      <span style={{ color: "#9CA3AF", fontSize: 12 }}>2025</span>
                    </div>
                    <div style={{ display: "none" }} className="sm:flex items-center gap-2">
                      <button aria-label="share testimonial" style={{ padding: "8px 10px", borderRadius: 8, background: "#FFFDFC", border: "1px solid #F3EAD2", fontSize: 13, cursor: 'pointer' }}>Share</button>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

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
    <section className="w-full py-16 md:py-24 bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className='text-4xl md:text-6xl font-semibold text-[#8B0000] font-[Playfair_Display] tracking-tight leading-tight'>
            Hear From Our Couples
          </h2>
          <p className="mt-2 text-gray-600">Real stories from the beautiful celebrations we’ve captured.</p>
        </div>

        {/* SWIPER CONTAINER */}
        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            // Responsive Swiper settings: 1 slide on mobile, 2 slides on tablet/desktop
            breakpoints={{
              768: { // md breakpoint and above
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: { // lg breakpoint and above
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            className="testimonial-swiper py-10" // Padding for pagination dots
          >
            {testimonials.map((t, index) => (
              <SwiperSlide key={index} className="px-1 pt-1 pb-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-xl flex flex-col h-full hover:shadow-2xl transition-shadow"
                >
                  
                  {/* Image and Name */}
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-16 h-16 rounded-full object-cover shadow-md"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-[#8B0000]">{t.name}</h3>
                      <p className="text-xs text-gray-500">Happy Couple</p>
                    </div>
                  </div>
                  
                  {/* Quote Icon */}
                  <div className="mb-4 text-[#C0A060] flex-shrink-0">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M7.83 6A4 4 0 0 0 4 10v4a2 2 0 0 0 2 2h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17.17 6A4 4 0 0 0 14 10v4a2 2 0 0 0 2 2h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  {/* Feedback Text */}
                  {/* Increased text size for better readability */}
                  <p className="text-gray-700 italic text-base md:text-lg mb-6 flex-grow">
                    “{t.feedback}”
                  </p>

                  {/* Details and Share Buttons */}
                  <div className="mt-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-3 border-t border-gray-100">
                    
                    {/* Tags & Date */}
                    <div className="flex gap-3 items-center text-sm">
                      <span className="px-3 py-1 rounded-full border border-[#F3EAD2] bg-[#FFFDFC] text-gray-600 font-medium">
                        Wedding
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-400">2025</span>
                    </div>
                    
                    {/* Share Button (hidden on mobile, shown on tablet/desktop) */}
                    <div className="hidden sm:flex items-center gap-2">
                      <button aria-label="share testimonial" className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition text-gray-500 text-sm">
                        Share Story
                      </button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      
      {/* Custom Styles for Swiper Pagination */}
      <style>{`
        .testimonial-swiper .swiper-pagination-bullet {
          background: #C0A060 !important;
          opacity: 0.4;
          transition: opacity 0.3s;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
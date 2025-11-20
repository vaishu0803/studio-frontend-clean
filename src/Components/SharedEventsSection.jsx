// src/components/SharedEventsSection.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ICON IMPORTS */
import droneIcon from "/images/Drone.png";
import candidVideoIcon from "/images/candid-cam.png";
import candidPhotoIcon from "/images/candid-video.png";
import traditionalVideoIcon from "/images/tradional-cam.png";
import traditionalPhotoIcon from "/images/tradiontal-video.png";

/* SERVICE DATA */
const serviceOptions = [
  { key: "Traditional Photography", short: "Traditional Photo", price: 5000, img: traditionalPhotoIcon },
  { key: "Traditional Videography", short: "Traditional Video", price: 6000, img: traditionalVideoIcon },
  { key: "Candid Photography", short: "Candid Photo", price: 7000, img: candidPhotoIcon },
  { key: "Candid Videography", short: "Candid Video", price: 8000, img: candidVideoIcon },
  { key: "Drone", short: "Drone", price: 3000, img: droneIcon },
];

export default function SharedEventsSection({ globalSelections, setGlobalSelections, onNext }) {
  const sharedEventsList = ["Engagement", "Reception", "Wedding"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "" });
  const toastTimerRef = useRef(null);

  const currentEvent = sharedEventsList[currentIndex];

  useEffect(() => {
    setShowOptions(false);
    const t = setTimeout(() => setShowOptions(true), 500);
    return () => clearTimeout(t);
  }, [currentIndex]);

  // ---------- selection logic ----------
  const toggleService = (event, serviceKey) => {
    const current = globalSelections[event] || {};
    const updated = { ...current };
    if (updated[serviceKey]) delete updated[serviceKey];
    else updated[serviceKey] = 1;
    setGlobalSelections(prev => ({ ...prev, [event]: updated }));
  };

  const updateQuantity = (event, serviceKey, delta) => {
    const currentQty = globalSelections[event]?.[serviceKey] || 0;
    const newQty = currentQty + delta;
    const updated = { ...(globalSelections[event] || {}) };
    if (newQty <= 0) delete updated[serviceKey];
    else updated[serviceKey] = newQty;
    setGlobalSelections(prev => ({ ...prev, [event]: updated }));
  };

  const getQty = (serviceKey) => (globalSelections[currentEvent]?.[serviceKey] || 0);

  // check if at least one service selected for current event
  const isAnySelected = () => {
    const sel = globalSelections[currentEvent] || {};
    return Object.values(sel).some(v => Number(v) > 0);
  };

  // toast helpers
  const showToast = (msg, ms = 2500) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setToast({ show: true, msg });
    toastTimerRef.current = setTimeout(() => setToast({ show: false, msg: "" }), ms);
  };

  // navigation handlers with validation
  const handleNext = () => {
    if (!isAnySelected()) {
      showToast("Please choose at least one service");
      return;
    }
    setCurrentIndex(i => Math.min(i + 1, sharedEventsList.length - 1));
  };

  const handlePrevious = () => {
    setCurrentIndex(i => Math.max(i - 1, 0));
  };

  const handleContinue = () => {
    if (!isAnySelected()) {
      showToast("Please choose at least one service");
      return;
    }
    // final continue: call onNext prop
    if (typeof onNext === "function") onNext();
  };

  return (
    <div className="shared-icons-section w-full min-h-screen text-[#1C1C1C] bg-[#FAF8F3] p-6 flex flex-col items-center">
      {/* Title — updated to match individual question positioning/size */}
      <div className="w-full max-w-4xl text-center mt-20">
        <h2 className="font-heading text-4xl" style={{ color: "#B22222" }}>
          {currentEvent.toUpperCase()}
        </h2>
        <p className="mt-3 text-gray-600">Choose services — you can select more than one</p>
      </div>

      {/* Embedded styles for qty buttons & responsive sizing */}
      <style>{`
        .qty-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #ffffff;
          color: #8B0000;
          border: 2px solid #8B0000;
          font-size: 22px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .qty-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 0 12px rgba(139, 0, 0, 0.55);
          background: #ffffff;
          color: #8B0000;
        }
        .qty-btn:active { transform: scale(0.94); }

        /* icon container & image */
        .shared-icons-section .icon-wrap { width: 120px; height: 120px; display:flex; align-items:center; justify-content:center; background:transparent; }
        .shared-icons-section .shared-icon-img { width:100%; height:100%; object-fit:contain; display:block; background:transparent; }

        /* tile sizing */
        .shared-icons-section .service-tile { width: 140px; }

        /* mobile tweaks */
        @media (max-width: 640px) {
          .qty-btn { width: 34px; height: 34px; font-size: 18px; border-width: 2px; }
          .shared-icons-section .icon-wrap { width: 88px; height: 88px; }
          .shared-icons-section .service-tile { width: 110px; margin-bottom: 6px; }
          .shared-icons-section .service-label { font-size: 13px; }
          .shared-icons-section .quantity-value { font-size: 16px; }
          .shared-icons-section .flex-gap { gap: 12px; }
        }

        /* toast styling */
        .shared-toast {
          position: fixed;
          top: 22px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(20,20,20,0.95);
          color: #fff;
          padding: 10px 16px;
          border-radius: 8px;
          font-weight: 600;
          z-index: 9999;
          box-shadow: 0 6px 24px rgba(0,0,0,0.25);
          pointer-events: none;
        }
        .shared-toast.fade-in { animation: shared-toast-in .18s ease forwards; }
        .shared-toast.fade-out { animation: shared-toast-out .18s ease forwards; }
        @keyframes shared-toast-in { from { opacity: 0; transform: translateX(-50%) translateY(-6px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        @keyframes shared-toast-out { from { opacity: 1; transform: translateX(-50%) translateY(0); } to { opacity: 0; transform: translateX(-50%) translateY(-6px); } }
      `}</style>

      {/* Toast */}
      {toast.show && (
        <div className={`shared-toast ${toast.show ? "fade-in" : "fade-out"}`} role="status" aria-live="polite">
          {toast.msg}
        </div>
      )}

      <AnimatePresence>
        {showOptions && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-6xl mt-8 px-4">
            {/* FLOATING ICONS */}
            <div className="flex flex-wrap justify-center items-start gap-x-12 gap-y-10">
              {serviceOptions.map((service) => {
                const qty = getQty(service.key);

                return (
                  <div key={service.key} className="relative flex flex-col items-center service-tile">
                    {/* Icon Button */}
                    <button
                      onClick={() => toggleService(currentEvent, service.key)}
                      className="group flex flex-col items-center bg-transparent p-0 cursor-pointer select-none"
                      style={{ background: "transparent", boxShadow: "none" }}
                    >
                      <div className="icon-wrap">
                        <img src={service.img} alt={service.key} className="shared-icon-img" />
                      </div>

                      {/* Label */}
                      <div className="mt-3 service-label text-sm" style={{ color: "#1C1C1C" }}>
                        {service.short}
                      </div>

                      {/* Tick + Qty */}
                      <div className="mt-2">
                        {qty > 0 ? (
                          <div className="flex items-center gap-2">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" style={{ color: "#8B0000" }}>
                              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="text-sm font-semibold quantity-value">{qty}</div>
                          </div>
                        ) : (
                          <div className="text-xs text-gray-400">Tap to select</div>
                        )}
                      </div>

                      {/* Price bubble */}
                      <div className="pointer-events-none absolute -top-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <div className="rounded-full bg-white px-3 py-1 text-sm font-medium shadow">
                          <span style={{ color: "#1C1C1C" }}>₹{service.price}</span>
                        </div>
                        <div style={{ width: 0, height: 0, borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: "7px solid white", margin: "0 auto" }} />
                      </div>
                    </button>

                    {/* Quantity Controls */}
                    {qty > 0 && (
                      <div className="flex items-center gap-4 mt-4 flex-gap">
                        <button onClick={() => updateQuantity(currentEvent, service.key, -1)} className="qty-btn">−</button>
                        <div className="text-center font-semibold text-[#1C1C1C] text-lg quantity-value">{qty}</div>
                        <button onClick={() => updateQuantity(currentEvent, service.key, 1)} className="qty-btn">+</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Navigation */}
           
                        {/* Bottom Navigation */}
            <div
              className="shared-bottom-nav"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 36,
                padding: "18px 24px",
                boxSizing: "border-box",
                position: "sticky",      // sticky keeps it inside the flow but above content when needed
                bottom: 8,
                left: 0,
                zIndex: 9999,           // ensure it's above most elements (badge, shadows)
                background: "transparent"
              }}
            >
              <div style={{ color: "#4b5563", fontSize: 15 }}>
                You can select multiple services. Hover or tap to see prices.
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {currentIndex > 0 && (
                  <button
                    onClick={handlePrevious}
                    style={{
                      padding: "10px 18px",
                      borderRadius: 24,
                      background: "#1C1C1C",
                      color: "#fff",
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 6px 18px rgba(0,0,0,0.12)"
                    }}
                  >
                    ← Previous
                  </button>
                )}

                {currentIndex < sharedEventsList.length - 1 ? (
                  <button
                    onClick={handleNext}
                    style={{
                      padding: "10px 18px",
                      borderRadius: 24,
                      background: "#8B0000",
                      color: "#1C1C1C",
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 6px 18px rgba(139,0,0,0.16)"
                    }}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={handleContinue}
                    style={{
                      padding: "10px 18px",
                      borderRadius: 24,
                      background: "#8B0000",
                      color: "#1C1C1C",
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 6px 18px rgba(139,0,0,0.16)"
                    }}
                  >
                    Continue →
                  </button>
                )}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

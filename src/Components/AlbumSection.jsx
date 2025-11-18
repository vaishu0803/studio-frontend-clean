// src/components/AlbumSection.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
  ✅ Replace the sample img paths below with your real image paths.
  Example: img: "/assets/albums/traditional-pressbook.jpg"
*/
const albumOptions = {
  "Traditional Album": [
    { label: "Pressbook", img: "/images/pressbook.jpg" }, // <- replace
    { label: "Magnum", img: "/images/magnum.jpg" },       // <- replace
  ],
  "Candid Album": [
    { label: "Pressbook", img: "/images/pressbook.jpg" },      // <- replace
    { label: "Magnum", img: "/images/magnum.jpg" },           // <- replace
  ],
};

const prices = {
  "Traditional Album - Pressbook": 5000,
  "Traditional Album - Magnum": 7000,
  "Candid Album - Pressbook": 6000,
  "Candid Album - Magnum": 8000,
};

export default function AlbumSection({ globalSelections = {}, setGlobalSelections, onBack, onNext }) {
  const [step, setStep] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowOptions(true), 420);
    return () => clearTimeout(t);
  }, []);

  const toggleAlbum = (key) => {
    const currentQty = globalSelections.Album?.[key] || 0;
    const newQty = currentQty > 0 ? 0 : 1;
    setGlobalSelections((prev) => ({
      ...prev,
      Album: {
        ...(prev.Album || {}),
        [key]: newQty,
      },
    }));
  };

  const updateQty = (key, delta) => {
    const currentQty = globalSelections.Album?.[key] || 0;
    const newQty = Math.max(0, currentQty + delta);
    setGlobalSelections((prev) => ({
      ...prev,
      Album: {
        ...(prev.Album || {}),
        [key]: newQty,
      },
    }));
  };

  const getQty = (key) => globalSelections.Album?.[key] || 0;

  const clearAlbumSelections = () => {
    setGlobalSelections((prev) => {
      const updated = { ...prev };
      delete updated.Album;
      return updated;
    });
  };

  // NOTE: original flow used step 0 -> 1 (Traditional) -> 3 (Candid) to preserve your nav logic.
  const currentAlbumKey = step === 1 ? "Traditional Album" : "Candid Album";

  const stepVariants = {
    enterFromBottom: { opacity: 0, y: 60 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.35 } },
    exitToTop: { opacity: 0, y: -50, transition: { duration: 0.25 } },
  };

  const tileHover = { scale: 1.045 };
  const btnTap = { scale: 0.97 };

  return (
    <div className="min-h-screen w-full bg-[#FAF8F3] text-[#1C1C1C] p-6 flex flex-col items-center relative overflow-hidden">
      <style>{`
        .yn-wrap { display:flex; gap:18px; align-items:center; }
        .yn-btn { padding: 14px 32px; border-radius:999px; font-weight:700; letter-spacing:0.5px; border:none; cursor:pointer; }
        .yn-yes { background:linear-gradient(180deg,#FFDFAF,#C0A060); color:#1C1C1C; }
        .yn-no { background:linear-gradient(180deg,#B22222,#8B0000); color:white; }
        .album-row { display:flex; flex-wrap:wrap; gap:32px; justify-content:center; align-items:flex-start; margin-top:28px; }
        .album-tile { width:210px; display:flex; flex-direction:column; align-items:center; position:relative; cursor:pointer; padding:6px; }
        .album-img { width:180px; height:180px; background:#f1f1f1; border-radius:12px; display:flex; align-items:center; justify-content:center; font-weight:600; overflow:hidden; }
        .album-img img { width:100%; height:100%; object-fit:cover; display:block; }
        .price-badge { position:absolute; top:-8px; right:6px; background:white; padding:6px 10px; border-radius:999px; box-shadow:0 6px 18px rgba(0,0,0,0.12); font-weight:700; pointer-events:none; opacity:0; transform: translateY(6px) scale(.95); transition: all 160ms ease; }
        /* show badge on tile hover (and on keyboard focus) */
        .album-tile:hover .price-badge,
        .album-tile:focus-within .price-badge {
          opacity:1;
          transform: translateY(0) scale(1);
        }
        .qty-controls { display:flex; align-items:center; gap:12px; margin-top:10px; }
        .qty-btn { width:40px; height:40px; border-radius:999px; border:2px solid #8B0000; background:white; color:#8B0000; font-size:20px; font-weight:700; display:inline-flex; align-items:center; justify-content:center; }
        .nav-row { display:flex; justify-content:space-between; align-items:center; width:100%; max-width:900px; margin-top:32px; gap:12px; }
        .btn-main { padding:14px 32px; border-radius:12px; font-weight:700; border:none; cursor:pointer; }
        @media (max-width: 600px) {
          .album-img { width:130px; height:130px; }
          .album-tile { width:150px; }
          .nav-row { flex-direction:column; gap:12px; }
          .btn-main { width:auto; min-width:140px; }
        }
      `}</style>

      {/* HEADING */}
      <div className="w-full max-w-4xl text-center mt-20">
        {step === 0 ? (
          <>
            <h2 className="font-heading text-4xl" style={{ color: "#B22222" }}>
              Do You Really Need Albums?
            </h2>
            <p className="mt-3 text-gray-600">Each album includes 25 sheets</p>
          </>
        ) : (
          <h2 className="font-heading text-3xl md:text-4xl">{currentAlbumKey}</h2>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 0 – YES/NO */}
        {step === 0 && showOptions && (
          <motion.div
            key="step0"
            variants={stepVariants}
            initial="enterFromBottom"
            animate="enter"
            exit="exitToTop"
            className="flex flex-col items-center mt-12"
          >
            <div className="yn-wrap">
              <motion.button whileTap={btnTap} className="yn-btn yn-yes" onClick={() => setStep(1)}>
                YES
              </motion.button>

              <motion.button
                whileTap={btnTap}
                className="yn-btn yn-no"
                onClick={() => {
                  clearAlbumSelections();
                  if (typeof onNext === "function") onNext();
                }}
              >
                NO
              </motion.button>
            </div>
<motion.button
  whileTap={{ scale: 0.97 }}
  onClick={onBack}
  className="mt-6 font-semibold text-[#8B0000]"
  style={{ background: "none", border: "none" }}
>
  ← Previous step
</motion.button>


          </motion.div>
        )}

        {/* STEP 1 – TRADITIONAL ALBUM */}
        {step === 1 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="enterFromBottom"
            animate="enter"
            exit="exitToTop"
            className="mt-10 w-full max-w-5xl"
          >
            <div className="album-row">
              {albumOptions["Traditional Album"].map((variant) => {
                const key = `Traditional Album - ${variant.label}`;
                const qty = getQty(key);

                return (
                  <motion.div
                    key={key}
                    className="album-tile"
                    whileHover={tileHover}
                    transition={{ type: "spring", stiffness: 240 }}
                    tabIndex={0}
                  >
                    <div
                      className="album-img"
                      onClick={() => toggleAlbum(key)}
                      role="button"
                      aria-pressed={qty > 0}
                    >
                      <img src={variant.img} alt={variant.label} />
                    </div>

                    <div className="price-badge">₹{prices[key]?.toLocaleString()}</div>

                    <p className="mt-2 font-semibold">{variant.label}</p>

                    {qty > 0 && (
                      <div className="qty-controls" onClick={(e) => e.stopPropagation()}>
                        <motion.button whileTap={btnTap} className="qty-btn" onClick={() => updateQty(key, -1)}>
                          −
                        </motion.button>
                        <span className="font-semibold">{qty}</span>
                        <motion.button whileTap={btnTap} className="qty-btn" onClick={() => updateQty(key, 1)}>
                          +
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="nav-row">
              <motion.button whileTap={btnTap} onClick={() => setStep(0)} className="btn-main bg-black text-white">
                ← Previous
              </motion.button>

              <motion.button
                whileTap={btnTap}
                onClick={() => setStep(3)}
                className="btn-main"
                style={{ background: "#8B0000", color: "white" }}
              >
                Next →
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 3 – CANDID ALBUM */}
        {step === 3 && (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="enterFromBottom"
            animate="enter"
            exit="exitToTop"
            className="mt-10 w-full max-w-5xl"
          >
            <div className="album-row">
              {albumOptions["Candid Album"].map((variant) => {
                const key = `Candid Album - ${variant.label}`;
                const qty = getQty(key);

                return (
                  <motion.div key={key} className="album-tile" whileHover={tileHover} transition={{ type: "spring", stiffness: 240 }} tabIndex={0}>
                    <div
                      className="album-img"
                      onClick={() => toggleAlbum(key)}
                      role="button"
                      aria-pressed={qty > 0}
                    >
                      <img src={variant.img} alt={variant.label} />
                    </div>

                    <div className="price-badge">₹{prices[key]?.toLocaleString()}</div>

                    <p className="mt-2 font-semibold">{variant.label}</p>

                    {qty > 0 && (
                      <div className="qty-controls" onClick={(e) => e.stopPropagation()}>
                        <motion.button whileTap={btnTap} className="qty-btn" onClick={() => updateQty(key, -1)}>
                          −
                        </motion.button>
                        <span className="font-semibold">{qty}</span>
                        <motion.button whileTap={btnTap} className="qty-btn" onClick={() => updateQty(key, 1)}>
                          +
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="nav-row">
              <motion.button whileTap={btnTap} onClick={() => setStep(1)} className="btn-main bg-black text-white">
                ← Previous
              </motion.button>

              <motion.button
                whileTap={btnTap}
                onClick={() => {
                  if (typeof onNext === "function") onNext();
                }}
                className="btn-main"
                style={{ background: "#8B0000", color: "white" }}
              >
                Finish →
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

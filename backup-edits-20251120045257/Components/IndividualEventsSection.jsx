import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Events (your list) */
const eventsList = ['Haldi', 'Mehendi', 'Groom / Bride Rituals', 'Sangeeth'];

/* Service options + icon imports — update paths if necessary */
import droneIcon from '/images/Drone.png';
import candidVideoIcon from '/images/candid-cam.png';
import candidPhotoIcon from '/images/candid-video.png';
import traditionalVideoIcon from '/images/tradional-cam.png';
import traditionalPhotoIcon from '/images/tradiontal-video.png';

const serviceOptions = [
  { key: 'Traditional Photography', short: 'Traditional Photo', price: 5000, img: traditionalPhotoIcon },
  { key: 'Traditional Videography', short: 'Traditional Video', price: 6000, img: traditionalVideoIcon },
  { key: 'Candid Photography', short: 'Candid Photo', price: 7000, img: candidPhotoIcon },
  { key: 'Candid Videography', short: 'Candid Video', price: 8000, img: candidVideoIcon },
  { key: 'Drone', short: 'Drone', price: 3000, img: droneIcon },
];

export default function IndividualEventsSection({ globalSelections, setGlobalSelections, onBack, onNext }) {
  const persons = ['Bride', 'Groom'];
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0); // 0 => Bride, 1 => Groom
  const [confirmedEvents, setConfirmedEvents] = useState({});
  const [questionMovedUp, setQuestionMovedUp] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '' });
  const toastTimerRef = useRef(null);

  const currentEvent = eventsList[currentEventIndex];
  const currentPerson = persons[currentPersonIndex];

  useEffect(() => {
    setQuestionMovedUp(false);
    setShowButtons(false);
    setShowOptions(false);
    setCurrentPersonIndex(0);

    const floatTimer = setTimeout(() => {
      setQuestionMovedUp(true);

      const btnTimer = setTimeout(() => {
        const eventName = eventsList[currentEventIndex];
        const alreadySelected =
          globalSelections[eventName] &&
          Object.keys(globalSelections[eventName]).length > 0 &&
          Object.values(globalSelections[eventName]).some(personObj =>
            typeof personObj === 'object' && Object.keys(personObj).length > 0
          );

        if (confirmedEvents[eventName] || alreadySelected) {
          setConfirmedEvents(prev => ({ ...prev, [eventName]: true }));
          setShowOptions(true);
        } else {
          setShowButtons(true);
        }
      }, 450);

      return () => clearTimeout(btnTimer);
    }, 450);

    return () => clearTimeout(floatTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEventIndex]);

  // ensure person object exists when options open (so qty controls render correctly)
  useEffect(() => {
    if (showOptions) ensurePersonObject(currentEvent, persons[currentPersonIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showOptions, currentPersonIndex]);

  // toast helper
  const showToast = (msg, ms = 2500) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setToast({ show: true, msg });
    toastTimerRef.current = setTimeout(() => setToast({ show: false, msg: '' }), ms);
  };

  // selection helpers (structure: globalSelections[event][person][service] = qty)
  const ensurePersonObject = (event, person) => {
    setGlobalSelections(prev => ({
      ...prev,
      [event]: {
        ...(prev[event] || {}),
        [person]: { ...(prev[event]?.[person] || {}) }
      }
    }));
  };

  const toggleService = (event, person, serviceKey) => {
    const current = globalSelections[event]?.[person] || {};
    const updated = { ...current };
    if (updated[serviceKey]) delete updated[serviceKey];
    else updated[serviceKey] = 1;

    setGlobalSelections(prev => ({
      ...prev,
      [event]: { ...(prev[event] || {}), [person]: updated }
    }));
  };

  const updateQuantity = (event, person, serviceKey, delta) => {
    const currentQty = globalSelections[event]?.[person]?.[serviceKey] || 0;
    const newQty = currentQty + delta;
    const updated = { ...(globalSelections[event]?.[person] || {}) };
    if (newQty <= 0) delete updated[serviceKey];
    else updated[serviceKey] = newQty;

    setGlobalSelections(prev => ({
      ...prev,
      [event]: { ...(prev[event] || {}), [person]: updated }
    }));
  };

  const getQty = (event, person, serviceKey) => (globalSelections[event]?.[person]?.[serviceKey] || 0);

  const isAnySelectedForEvent = (eventName) => {
    const ev = globalSelections[eventName] || {};
    return Object.values(ev).some(personObj => {
      if (!personObj || typeof personObj !== 'object') return false;
      return Object.values(personObj).some(v => Number(v) > 0);
    });
  };

  // wedding-validation rule (same logic as before)
  const requiresWeddingValidation = (eventName) => {
    if (!eventName) return false;
    const lower = eventName.toLowerCase();
    return lower.includes('wedding') || eventName === 'Groom / Bride Rituals';
  };

  // event YES/NO
  const handleEventYes = () => {
    setConfirmedEvents(prev => ({ ...prev, [currentEvent]: true }));
    setGlobalSelections(prev => ({ ...prev, [currentEvent]: {} }));
    setShowOptions(true);
    setShowButtons(false);
    setCurrentPersonIndex(0);
    ensurePersonObject(currentEvent, persons[0]);
  };

  const handleEventNo = () => {
    setShowButtons(false);
    setQuestionMovedUp(false);
    setShowOptions(false);

    setConfirmedEvents(prev => {
      const updated = { ...prev };
      delete updated[eventsList[currentEventIndex]];
      return updated;
    });

    // Next event (or finish)
    setTimeout(() => {
      if (currentEventIndex === eventsList.length - 1) {
        if (typeof onNext === 'function') onNext();
      } else {
        setCurrentEventIndex(prev => prev + 1);
      }
    }, 120);
  };

  // nav handlers
  const handleNextClick = () => {
    if (showOptions) {
      // validate only if wedding rule applies
      if (requiresWeddingValidation(currentEvent) && !isAnySelectedForEvent(currentEvent)) {
        showToast('Please choose at least one service for the wedding event');
        return;
      }
      // move to next event
      if (currentEventIndex < eventsList.length - 1) {
        setCurrentEventIndex(prev => prev + 1);
        setShowOptions(false);
        setQuestionMovedUp(false);
      } else {
        // last event -> continue
        if (typeof onNext === 'function') onNext();
      }
      return;
    }
    // otherwise, just advance
    setCurrentEventIndex(prev => Math.min(prev + 1, eventsList.length - 1));
  };

  const handlePrevClick = () => {
    if (currentEventIndex === 0) {
      // User asked that Previous on first individual event goes to last shared event
      if (typeof onBack === 'function') {
        // pass a signal; parent should navigate to shared events and set active to last
        onBack('shared-last');
      }
      return;
    }
    // go to previous individual event
    setShowOptions(false);
    setQuestionMovedUp(false);
    setShowButtons(false);

    setConfirmedEvents(prev => {
      const updated = { ...prev };
      delete updated[eventsList[currentEventIndex]];
      return updated;
    });

    setTimeout(() => setCurrentEventIndex(prev => Math.max(0, prev - 1)), 80);
  };

  // person pill click
  const handleSelectPerson = (idx) => {
    setCurrentPersonIndex(idx);
    ensurePersonObject(currentEvent, persons[idx]);
  };

  return (
    <div className="individual-icons-section w-full min-h-screen text-[#1C1C1C] bg-[#FAF8F3] pt-24 p-6 flex flex-col items-center relative overflow-hidden">

      {/* Title */}
      <div className="w-full max-w-6xl text-center mt-6">
        <h2 className="font-heading text-4xl md:text-5xl" style={{ color: '#B22222' }}>
          {currentEvent.toUpperCase()} — {currentPerson}
        </h2>
        <p className="mt-2 text-gray-600">Select services for {currentPerson} (you can pick more than one)</p>
      </div>

      {/* Embedded styles (qty-btn, responsive, prev style) */}
      <style>{`
        .qty-btn {
          width: 42px; height: 42px; border-radius: 50%;
          background: #ffffff; color: #8B0000; border: 2px solid #8B0000;
          font-size: 22px; font-weight: 700; display:flex; align-items:center; justify-content:center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.12); transition: all .22s; cursor: pointer;
        }
        .qty-btn:hover { transform: scale(1.08); box-shadow: 0 0 12px rgba(139,0,0,0.25); }
        .qty-btn:active { transform: scale(.95); }

        .service-tile { width: 140px; display:flex; flex-direction:column; align-items:center; position: relative; }
        .icon-wrap { width:120px; height:120px; display:flex; align-items:center; justify-content:center; background: transparent; border-radius: 16px; overflow: hidden; }
        .shared-icon-img { width:100%; height:100%; object-fit: contain; display:block; background:transparent; filter: grayscale(20%) brightness(0.98); }

        .price-badge { position: absolute; top: -10px; right: -10px; background: white; padding: 6px 8px; border-radius: 999px; font-weight: 700; box-shadow: 0 8px 20px rgba(0,0,0,0.12); border: 1px solid rgba(0,0,0,0.06); opacity: 0; transform: translateY(4px); transition: all .18s ease; pointer-events: none; }
        .group:hover .price-badge { opacity: 1; transform: translateY(0); }

        .price-small { font-size: 12px; color: #1C1C1C; }

        .service-tile .group { display:flex; flex-direction:column; align-items:center; }

        .person-pill { padding: 8px 14px; border-radius: 999px; cursor: pointer; font-weight: 600; margin: 10px; transition: all .18s; }
        .person-pill.active { background: #8B0000; color: #fff; box-shadow: 0 6px 18px rgba(139,0,0,0.12); }
        .person-pill.inactive { background: transparent; color: #1C1C1C; border: 1px solid rgba(0,0,0,0.06); }

        @media (max-width: 640px) {
          .qty-btn { width: 34px; height: 34px; font-size: 18px; }
          .icon-wrap { width: 88px; height: 88px; }
          .service-tile { width: 110px; }
        }

        /* toast */
        .shared-toast { position: fixed; top: 22px; left: 50%; transform: translateX(-50%); background: rgba(20,20,20,0.95); color: #fff; padding: 10px 16px; border-radius: 8px; font-weight: 600; z-index: 9999; box-shadow: 0 6px 24px rgba(0,0,0,0.25); pointer-events: none; }
        .shared-toast.fade-in { animation: shared-toast-in .18s ease forwards; } .shared-toast.fade-out { animation: shared-toast-out .18s ease forwards; }
        @keyframes shared-toast-in { from { opacity: 0; transform: translateX(-50%) translateY(-6px);} to { opacity:1; transform: translateX(-50%) translateY(0);} }
        @keyframes shared-toast-out { from { opacity: 1; transform: translateX(-50%) translateY(0);} to { opacity: 0; transform: translateX(-50%) translateY(-6px);} }

        /* YES/NO redesigned */
        .yn-wrap { display:flex; gap:18px; align-items:center; }
        .yn-btn { padding: 12px 28px; border-radius: 999px; font-weight: 700; letter-spacing: .6px; box-shadow: 0 8px 30px rgba(11,11,11,0.06); transition: transform .14s ease, box-shadow .14s ease; border: none; cursor: pointer; }
        .yn-btn:active { transform: translateY(1px) scale(.995); }
        .yn-yes { background: linear-gradient(180deg, #FFDFAF, #C0A060); color: #1C1C1C; }
        .yn-no  { background: linear-gradient(180deg, #B22222, #8B0000); color: #fff; }

        /* Big arrow Previous style like your screenshot */
        .yn-prev {
          font-size: 30px;
          font-weight: 700;
          color: #B22222;
          background: transparent;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 18px;
          cursor: pointer;
          padding: 8px 12px;
        }
        .yn-prev .arrow {
          font-size: 30px;
          line-height: 0.8;
        }
        .yn-prev .label {
          font-size: 20px;
          line-height: 0.9;
        }

        /* Smaller screens fallback */
        @media (max-width: 640px) {
          .yn-prev { font-size: 32px; gap: 12px; }
          .yn-prev .arrow { font-size: 20px; }
          .yn-prev .label { font-size: 10px; }
        }
      `}</style>

      {/* Toast */}
      {toast.show && <div className={`shared-toast ${toast.show ? 'fade-in' : 'fade-out'}`}>{toast.msg}</div>}

      {/* YES / NO floating question behaviour */}
      <AnimatePresence>
        {!confirmedEvents[currentEvent] && showButtons && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-8 flex flex-col items-center w-full max-w-3xl"
          >
            <div className="flex justify-center mb-6">
              <div className="yn-wrap">
                <button onClick={handleEventYes} className="yn-btn yn-yes">YES</button>
                <button onClick={handleEventNo} className="yn-btn yn-no">NO</button>
              </div>
            </div>

            {/* Bottom-styled previous control (big arrow + label) */}
            <div className="mt-8">
              <button onClick={handlePrevClick} className="yn-prev" aria-label="Previous step">
                <span className="arrow">←</span>
                <span className="label">Previous step</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Person pills */}
      {showOptions && (
        <div className="flex items-center justify-center mt-6">
          {persons.map((p, idx) => (
            <div key={p} onClick={() => handleSelectPerson(idx)} className={`person-pill ${idx === currentPersonIndex ? 'active' : 'inactive'}`}>
              {p}
            </div>
          ))}
        </div>
      )}

      {/* Floating icon options */}
      <AnimatePresence>
        {confirmedEvents[currentEvent] && showOptions && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="w-full max-w-6xl mt-10 px-4">
            <div className="flex flex-wrap justify-center items-start gap-x-12 gap-y-8">
              {serviceOptions.map(service => {
                const qty = getQty(currentEvent, currentPerson, service.key);
                return (
                  <div key={service.key} className="service-tile">
                    <button
                      type="button"
                      onClick={() => toggleService(currentEvent, currentPerson, service.key)}
                      className="group flex flex-col items-center bg-transparent p-0 cursor-pointer select-none"
                      style={{ background: 'transparent', boxShadow: 'none' }}
                    >
                      <div className="icon-wrap">
                        <img src={service.img} alt={service.key} className="shared-icon-img" />
                      </div>

                      <div className="mt-3 text-sm" style={{ color: '#1C1C1C' }}>{service.short}</div>

                      {/* tick + qty */}
                      <div className="mt-2">
                        {qty > 0 ? (
                          <div className="flex items-center gap-2">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" style={{ color: '#8B0000' }}>
                              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="text-sm font-semibold">{qty}</div>
                          </div>
                        ) : (
                          <div className="text-xs text-gray-400">Tap to select</div>
                        )}
                      </div>

                      {/* price bubble (hidden until hover) */}
                      <div className="price-badge">
                        <div className="price-small">₹{service.price}</div>
                      </div>
                    </button>

                    {/* qty controls */}
                    {qty > 0 && (
                      <div className="flex items-center gap-3 mt-4">
                        <button onClick={() => updateQuantity(currentEvent, currentPerson, service.key, -1)} className="qty-btn">−</button>
                        <div className="min-w-[28px] text-center font-semibold">{qty}</div>
                        <button onClick={() => updateQuantity(currentEvent, currentPerson, service.key, 1)} className="qty-btn">+</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* bottom text + nav */}
            <div className="flex items-center justify-between mt-12 px-6 w-full">
              <div className="text-sm text-gray-600">Select services for each person. At least one per wedding event is required to continue.</div>
              <div className="flex items-center gap-4">
                <button onClick={handlePrevClick} className="px-6 py-3 rounded-2xl bg-black text-white">← Previous</button>

                {currentEventIndex < eventsList.length - 1 ? (
                  <button onClick={handleNextClick} className="px-6 py-3 rounded-2xl" style={{ background: '#8B0000', color: '#fff' }}>Next →</button>
                ) : (
                  <button onClick={handleNextClick} className="px-6 py-3 rounded-2xl" style={{ background: '#8B0000', color: '#fff' }}>Finish →</button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

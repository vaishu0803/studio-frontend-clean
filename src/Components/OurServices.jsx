import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion"; 

/*
  SERVICES LIST - ADD YOUR FULL LIST OF SERVICES HERE
  (Added more to demonstrate the horizontal scroll)
*/
const ALL_SERVICES = [
  { slug: "traditional-photography", title: "Traditional Photography", image: "/images/46.jpg", type: "photo" },
  { slug: "candid-photography", title: "Candid Photography", image: "/images/48.jpg", type: "photo" },
  { slug: "traditional-videography", title: "Traditional Videography", video: "/videos/tv.mp4", type: "video" },
  { slug: "candid-videography", title: "Candid Videography", image: "/images/26.jpg", type: "photo" },
  { slug: "pre-wedding-shoot", title: "Pre-Wedding Shoot", image: "/images/37.jpg", type: "photo" },
  { slug: "drone-coverage", title: "Drone & Aerial Coverage", image: "/images/44.jpg", type: "photo" },
  { slug: "live-streaming", title: "Live Streaming", image: "/images/32.jpg", type: "photo" },
  { slug: "photo-booth", title: "Photo Booth", image: "/images/36.jpg", type: "photo" },
];


function ArrowButton({ dir = "left", onClick, offset = 28, size = 64, disabled }) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  const baseStyle = {
    position: "absolute",
    top: "calc(50% - 30px)",
    transform: "translateY(-50%)",
    zIndex: 40,
    width: size,
    height: size,
    borderRadius: "50%",
    background: "#fff",
    boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform .2s ease, box-shadow .2s ease, opacity .3s ease", // Added opacity transition
    opacity: disabled ? 0.5 : 1, // Dim when disabled
    pointerEvents: disabled ? "none" : "auto", // Disable clicks when disabled
  };

  const style = {
    ...baseStyle,
    left: dir === "left" ? offset : "auto",
    right: dir === "right" ? offset : "auto",
    transform: `translateY(-50%) scale(${pressed ? 0.95 : (hover ? 1.05 : 1)})`,
  };

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      onTapStart={() => setPressed(true)}
      onTap={() => setPressed(false)}
      style={style}
      aria-label={dir === "left" ? "Previous Service" : "Next Service"}
      disabled={disabled}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `translateX(${dir === "left" ? "-1px" : "1px"})` }}
      >
        <path
          d={dir === "left" ? "M15 18L9 12L15 6" : "M9 6L15 12L9 18"}
          stroke="#111827"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}


export default function OurServices() {
  const containerRef = useRef(null); // The clipping container
  const contentRef = useRef(null); // The div that gets transformed
  const prefersReduced = useReducedMotion();
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const CARD_WIDTH = 300 + 32; // 300px card width + 32px space-x-8 gap

  // Checks screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(typeof window !== "undefined" && window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Calculate max scrollable distance
  const calculateMaxScroll = useCallback(() => {
    if (containerRef.current && contentRef.current) {
      const contentWidth = contentRef.current.scrollWidth;
      const containerWidth = containerRef.current.clientWidth;
      
      // Calculate the maximum negative translation allowed before content hits the right edge.
      // We also account for the side padding (mx-auto) of the container.
      const paddingX = 24 * 2; // mx-6 => 24px left/right
      const maxScrollDistance = contentWidth - containerWidth + paddingX;

      // maxScroll must be positive or zero
      setMaxScroll(Math.max(0, maxScrollDistance));
      
      // Prevent scrolling past the maximum on resize
      setScrollOffset(prevOffset => Math.min(prevOffset, maxScrollDistance));
    }
  }, []);
  
  // Recalculate max scroll on mount, resize, or when content is ready
  useEffect(() => {
    calculateMaxScroll();
    window.addEventListener('resize', calculateMaxScroll);
    return () => window.removeEventListener('resize', calculateMaxScroll);
  }, [calculateMaxScroll]);


  const scroll = (direction) => {
    if (!isLargeScreen || prefersReduced || maxScroll === 0) return;
    
    let newOffset;
    if (direction === 'left') {
      newOffset = scrollOffset - CARD_WIDTH;
    } else {
      newOffset = scrollOffset + CARD_WIDTH;
    }
    
    // Clamp the offset to stay within bounds [0, maxScroll]
    const clampedOffset = Math.max(0, Math.min(newOffset, maxScroll));
    
    setScrollOffset(clampedOffset);
  };

  // Set the transform style based on the state
  const contentStyle = isLargeScreen ? {
    transform: `translateX(-${scrollOffset}px)`,
    transition: prefersReduced ? 'none' : 'transform 0.5s ease-out',
  } : {};


  return (
    <section className="w-full py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="tracking-[0.3em] text-xs text-gray-500">OUR SERVICES</p>
          <h2 className="font-[Playfair_Display] text-4xl md:text-6xl leading-tight md:leading-tight text-[#8B0000] tracking-tight mb-4 about-headline">
            What We Do
          </h2>
        </div>
      </div>
      
      {/* Scrollable Container (Clips the content) */}
      <div className="relative"> 
          
        {/* ARROW BUTTONS: Visible only on large screens (desktop) */}
        {isLargeScreen && maxScroll > 0 && (
            <>
                <ArrowButton dir="left" onClick={() => scroll('left')} disabled={scrollOffset === 0} />
                <ArrowButton dir="right" onClick={() => scroll('right')} disabled={scrollOffset >= maxScroll - 1} />
            </>
        )}
        
        {/* CLIPPER CONTAINER: Prevents any user-initiated horizontal scroll */}
        <div 
          ref={containerRef} 
          className="lg:overflow-x-hidden mx-6 lg:mx-auto lg:max-w-7xl pb-8"
        >
          {/* CONTENT TRACK: This is the element that now moves via transform */}
          <div
            ref={contentRef}
            style={contentStyle}
            className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row lg:space-x-8 gap-8"
          >
            {ALL_SERVICES.map((s, index) => (
              <div 
                key={s.slug} 
                className="w-full lg:min-w-[300px] lg:max-w-[300px] flex flex-col items-center" // Card dimensions for horizontal scroll
              >
                <motion.article 
                  className="relative bg-white rounded-xl overflow-hidden shadow-xl group cursor-pointer w-full"
                  style={{ aspectRatio: "4/5" }}
                >
                  {/* Media (Image or Video) */}
                  {s.type === 'video' ? (
                    <video 
                      src={s.video} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <img 
                      src={s.image} 
                      alt={s.title} 
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  )}

                  {/* Overlay Content */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6"
                    aria-hidden
                  >
                    <h3 className="text-white text-2xl font-semibold relative z-10">{s.title}</h3>
                  </div>
                </motion.article>

                {/* Button below card */}
                <div className="mt-6 flex justify-center">
                  <Link to={`/gallery?service=${s.slug}`} className="knot-btn" aria-label={`Explore ${s.title}`}>
                     Explore
                  </Link>
                </div>
              </div>
            ))}
            
            {/* Add an empty div for spacing at the end of the horizontal row */}
            <div className="lg:min-w-[40px] lg:max-w-[40px] h-1" aria-hidden />

          </div>
        </div>
      </div>


      {/* Custom Styles to Hide Scrollbar and define Knot Button */}
      <style>{`
        /* 1. HIDES THE SCROLLBAR FOR ALL BROWSERS (for non-desktop views only) */
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }

        /* 2. Knot Button Styles */
        .knot-btn {
          display: inline-block;
          background: #2f2a27;
          color: #fff;
          padding: 12px 28px;
          border-radius: 999px;
          font-family: "Playfair Display", "Georgia", serif;
          font-size: 16px;
          line-height: 1;
          letter-spacing: 0.2px;
          box-shadow:
            0 10px 20px rgba(31,25,22,0.14),
            inset 0 -6px 0 rgba(0,0,0,0.12);
          transition: transform .14s ease, box-shadow .14s ease, background .14s ease;
          text-decoration: none;
        }
        .knot-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(31,25,22,0.2), inset 0 -6px 0 rgba(0,0,0,0.12);
          background: #3c3532;
        }
        .knot-btn:active {
          transform: translateY(1px);
          box-shadow: 0 4px 10px rgba(31,25,22,0.1), inset 0 -4px 0 rgba(0,0,0,0.12);
        }
      `}</style>
    </section>
  );
}
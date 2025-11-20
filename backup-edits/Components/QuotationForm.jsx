// src/components/QuotationForm.jsx
import React, { useState, useEffect, useCallback } from "react";
import SharedEventsSection from "./SharedEventsSection";
import IndividualEventsSection from "./IndividualEventsSection";
import AlbumSection from "./AlbumSection";
import Summary from "./Summary";
import UserDetails from "./UserDetails";
import ContactUs from "./ContactUs";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import download from "/images/10.webp";
import Testimonials from "./Testimonials";
import Footer from "./Footer";

const QuotationForm = () => {
  const [step, setStep] = useState("start");
  const [history, setHistory] = useState([]);
  const [globalSelections, setGlobalSelections] = useState({});
  const [total, setTotal] = useState(0);

  // price map — MAKE SURE KEYS MATCH the keys used in your IndividualEventsSection & AlbumSection
  const prices = {
    "Traditional Photography": 5000,
    "Traditional Videography": 6000,
    "Candid Photography": 7000,
    "Candid Videography": 8000,
    Drone: 3000,
    "LED Screen": 4000,
    "Candid Album - Pressbook": 6000,
    "Candid Album - Magnum": 8000,
    "Traditional Album - Pressbook": 5000,
    "Traditional Album - Magnum": 7000,
  };

  const calculateTotal = useCallback(() => {
    let calcTotal = 0;
    for (const section in globalSelections) {
      const data = globalSelections[section];
      if (!data) continue;

      if (section === "Album") {
        for (const key in data) {
          const qty = Number(data[key] || 0);
          const price = prices[key] || 0;
          calcTotal += qty * price;
        }
      } else {
        for (const key in data) {
          const entry = data[key];
          if (typeof entry === "number") {
            const qty = Number(entry || 0);
            const price = prices[key] || 0;
            calcTotal += qty * price;
          } else if (typeof entry === "object" && entry !== null) {
            for (const service in entry) {
              const qty = Number(entry[service] || 0);
              const price = prices[service] || 0;
              calcTotal += qty * price;
            }
          }
        }
      }
    }
    setTotal(calcTotal);
    return calcTotal;
  }, [globalSelections, prices]);

  useEffect(() => {
    calculateTotal();
  }, [globalSelections, calculateTotal]);

  const goTo = (nextStep) => {
    setHistory((h) => {
      if (h.length && h[h.length - 1] === step) return h;
      return [...h, step];
    });
    setStep(nextStep);
  };

  const goBack = (signal) => {
    if (signal === "shared-last") {
      setHistory((h) => {
        if (!h.length) {
          setStep("shared");
          return [];
        }
        const copy = [...h];
        const last = copy.pop();
        setStep(last);
        return copy;
      });
      return;
    }
    setHistory((h) => {
      if (!h.length) {
        setStep("start");
        return [];
      }
      const copy = [...h];
      const last = copy.pop();
      setStep(last);
      return copy;
    });
  };

  const resetForm = () => {
    setGlobalSelections({});
    setTotal(0);
    setStep("start");
    setHistory([]);
  };

  const clearAlbumSelections = () => {
    setGlobalSelections((prev) => {
      const copy = { ...prev };
      delete copy.Album;
      return copy;
    });
  };

  // intro text shown below navbar once user leaves start
  const introLines = [
    "Let's estimate the cost by selecting the Events, Albums & Output duration!",
    "Pick what fits your day — you can always go back and change selections."
  ];

  const showBadge = !["start", "summary", "userdetails"].includes(step);

  return (
    <div className="min-h-screen w-screen bg-white text-center flex flex-col items-center relative">
      <Navbar />

      {/* Intro block (appears after start) */}
      {step !== "start" && (
        <div style={{ width: "100%", maxWidth: 1200, padding: "18px 20px", boxSizing: "border-box" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
            {introLines.map((t, i) => (
              <p key={i} style={{ margin: 6, color: "#3b4451", fontSize: i === 0 ? 18 : 14 }}>
                {t}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Circular badge — moved down so it doesn't overlap navbar; white outer bg + red inner circle */}
      {showBadge && (
        <div
          aria-hidden
          style={{
            position: "fixed",
            top: 86,
            left: 18,
            zIndex: 1200,
            width: 96,
            height: 96,
            borderRadius: 999,
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            padding: 8,
          }}
        >
          <div style={{
            width: "100%",
            height: "100%",
            borderRadius: 999,
            background: "linear-gradient(180deg,#e63a5a,#b22222)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 800,
            boxShadow: "0 6px 12px rgba(178,34,34,0.12)"
          }}>
            <div style={{ textAlign: "center", fontSize: 12 }}>
              <div style={{ fontSize: 16 }}>₹{total.toLocaleString()}</div>
              <div style={{ fontSize: 10, opacity: 0.95 }}>Estimated</div>
            </div>
          </div>
        </div>
      )}

      {/* main content */}
      <div style={{ width: "100%", maxWidth: 1200, paddingTop: 0 }}>

        {step === "start" && (
          <>
            {/* ====== FULL-BLEED HERO (breakout wrapper) ======
                This wrapper uses vw and translateX to escape any centered max-width parent.
                No change required in HeroSection.jsx.
            */}
           <div
  aria-hidden
  style={{
    width: "100vw",
    marginLeft: "50%",
    transform: "translateX(-50%)",
    boxSizing: "border-box",
    overflow: "hidden",
    marginTop: 0,         // explicit no-gap
    paddingTop: 0,
    position: "relative", // ensure it's positioned normally (not creating stacking issues)
    top: 0,               // explicit top
    left: 0
  }}
>
            
              <HeroSection
                backgroundImage={download}
                title="Build Your Quotation"
                subtitle="Want to see our photography style? Check our gallery highlights before continuing."
                buttonText="BUILD MY QUOTATION"
                onButtonClick={() => goTo("shared")}
                showButton={false}
              />
            </div>

            {/* The centered content that follows */}
            <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "28px 20px", boxSizing: "border-box" }}>
              {/* Gold-ish section with heading and 3 columns */}
              <section
                style={{
                  background: "rgba(192,160,96,0.06)",
                  padding: "36px 18px",
                  borderRadius: 8,
                }}
              >
                <h2 style={{ color: "#B22222", fontSize: 32, marginBottom: 18 }}>How Much To Shoot My Wedding?</h2>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
                  {/* responsive: switch to 3-col via media query class if using Tailwind; here simple responsive inline */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 12 }}>
                    <h3 style={{ color: "#B22222", fontSize: 18, marginBottom: 8 }}>Watch Our Quick Video</h3>
                    <p style={{ maxWidth: 420, color: "#3b4451", lineHeight: 1.6 }}>
                      Discover our services, including candid photography, traditional photography, albums, and more.
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 12 }}>
                    <h3 style={{ color: "#B22222", fontSize: 18, marginBottom: 8 }}>Build Your Quote</h3>
                    <p style={{ maxWidth: 420, color: "#3b4451", lineHeight: 1.6 }}>
                      Select what you love and see instant pricing with a real-time quote that updates as you make your selections.
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 12 }}>
                    <h3 style={{ color: "#B22222", fontSize: 18, marginBottom: 8 }}>Seal The Deal And Save The Date</h3>
                    <p style={{ maxWidth: 420, color: "#3b4451", lineHeight: 1.6 }}>
                      Enter your details to receive a personalized quote via email, connect with our team to finalize the details, and reserve your spot with a deposit.
                    </p>
                  </div>

                </div>

                {/* CTA button centered */}
                <div style={{ marginTop: 22, display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={() => goTo("shared")}
                    style={{
                      padding: "12px 26px",
                      borderRadius: 999,
                      background: "linear-gradient(180deg,#e63a5a,#b22222)",
                      color: "#fff",
                      fontWeight: 700,
                      boxShadow: "0 8px 20px rgba(0,0,0,0.12)"
                    }}
                  >
                    BUILD MY QUOTATION
                  </button>
                </div>
              </section>

               <div id="Testimonials" style={{ marginTop: 28 }}>
                <Testimonials />
              </div>
            

              <div id="contact" style={{ marginTop: 28 }}>
                <ContactUs />
              </div>
<div id="Footer" style={{ marginTop: 28 }}>
                <Footer />
              </div>

            </div>
          </>
        )}

        {step === "shared" && (
          <SharedEventsSection
            globalSelections={globalSelections}
            setGlobalSelections={setGlobalSelections}
            onNext={() => goTo("individual")}
          />
        )}

        {step === "individual" && (
          <IndividualEventsSection
            globalSelections={globalSelections}
            setGlobalSelections={setGlobalSelections}
            onBack={() => goBack()}
            onNext={() => goTo("album")}
          />
        )}

        {step === "album" && (
          <AlbumSection
            globalSelections={globalSelections}
            setGlobalSelections={setGlobalSelections}
            onBack={() => goBack()}
            onNext={() => goTo("summary")}
          />
        )}

        {step === "summary" && (
          <Summary
            globalSelections={globalSelections}
            setGlobalSelections={setGlobalSelections}
            onBack={() => goBack()}
            onNext={() => goTo("userdetails")}
          />
        )}

        {step === "userdetails" && (
          <UserDetails
            globalSelections={globalSelections}
            calculateTotal={calculateTotal}
            onBack={() => goBack()}
            onHome={resetForm}
          />
        )}
      </div>
    </div>
  );
};

export default QuotationForm;

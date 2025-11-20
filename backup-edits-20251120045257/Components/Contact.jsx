import React, { useState, useCallback } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const instaImages = ["22.jpg", "23.jpg", "24.jpg", "35.jpg", "40.jpg"];
const EVENT_OPTIONS = [
  "Ceremony",
  "Reception",
  "Pre-wedding",
  "Sangeet",
  "Engagement",
  "Cinematic Short",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    events: [],
    startDate: "",
    endDate: "",
    note: "",
    callTime: "",
    quotationSubmitted: false,
  });
  const [status, setStatus] = useState({ submitting: false, success: null, error: null });

  const toggleEvent = useCallback((ev) => {
    setForm((s) => {
      const has = s.events.includes(ev);
      return { ...s, events: has ? s.events.filter((e) => e !== ev) : [...s.events, ev] };
    });
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "quotationSubmitted") {
      setForm((s) => ({ ...s, quotationSubmitted: checked }));
      return;
    }
    setForm((s) => ({ ...s, [name]: value }));
  }, []);

  const validate = useCallback(() => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) return "Please enter a valid email.";
    if (!form.phone.trim()) return "Please enter your phone number.";
    if (form.events.length === 0) return "Please choose at least one event to cover.";
    if (!form.startDate) return "Please choose an event start date.";
    if (!form.endDate) return "Please choose an event end date.";
    if (!form.quotationSubmitted) return "Please confirm you've submitted the quotation before sending this form.";
    return null;
  }, [form]);

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) return setStatus({ submitting: false, success: false, error: err });

    setStatus({ submitting: true, success: null, error: null });
    try {
      // replace with your API call
      await new Promise((r) => setTimeout(r, 700));
      setStatus({ submitting: false, success: true, error: null });
      setForm({
        name: "",
        email: "",
        countryCode: "+91",
        phone: "",
        events: [],
        startDate: "",
        endDate: "",
        note: "",
        callTime: "",
        quotationSubmitted: false,
      });
    } catch (err) {
      setStatus({ submitting: false, success: false, error: "Failed to send. Try again later." });
      console.error(err);
    }
  }

  return (
    // paddingTop set to 0 so navbar overlaps the hero (we pull hero up below)
    <div className="min-h-screen text-[#1C1C1C] bg-[color:var(--bg,#FAF8F3)]" style={{ paddingTop: 0 }}>
      <Navbar />

      {/* HERO — pulled up so navbar overlaps it */}
      <section
        className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden"
        style={{
          // extend hero height by nav height and pull it up by nav height so nav overlaps
          height: "calc(100vh + var(--nav-height, 64px))",
          marginTop: `calc(var(--nav-height, 64px) * -1)`,
          zIndex: 0, // ensure navbar (higher z-index) sits above hero
        }}
      >
        <img
          src="/images/9.webp"
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
        <div className="absolute inset-0 bg-black/30" style={{ zIndex: 1 }} />
      </section>

      {/* Image + Form */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT: image — stacks on small, stretches on lg */}
          <div className="order-1 flex flex-col">
            <div className="rounded-xl shadow-lg overflow-hidden flex-1">
              <img
                src="/images/36.jpg"
                alt="studio"
                className="w-full h-[420px] md:h-[520px] lg:h-full object-cover block"
              />
            </div>
          </div>

          {/* RIGHT: form */}
          <div className="order-2 bg-white rounded-2xl p-8 shadow-lg" id="contact-form">
            <h2 className="text-2xl font-semibold">Get a tailored quote</h2>
            <p className="text-sm text-gray-600 mt-2">Fill basic details and we'll reach out with availability and a quote.</p>

            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input name="name" value={form.name} onChange={handleChange} className="mt-1 block w-full rounded-md border px-3 py-2" />
                </div>

                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} className="mt-1 block w-full rounded-md border px-3 py-2" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block text-sm font-medium">Code</label>
                  <select name="countryCode" value={form.countryCode} onChange={handleChange} className="mt-1 block w-full rounded-md border px-3 py-2">
                    <option>+91</option>
                    <option>+1</option>
                    <option>+44</option>
                    <option>+61</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium">Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border px-3 py-2" />
                </div>
              </div>

              <fieldset className="border rounded-md p-3">
                <legend className="text-sm font-medium px-1">What events to be covered</legend>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {EVENT_OPTIONS.map((ev) => (
                    <label key={ev} className="inline-flex items-center gap-2 text-sm">
                      <input type="checkbox" value={ev} checked={form.events.includes(ev)} onChange={() => toggleEvent(ev)} />
                      <span>{ev}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Event starts</label>
                  <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="mt-1 block w-full rounded-md border px-3 py-2" />
                </div>

                <div>
                  <label className="block text-sm font-medium">Event ends</label>
                  <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="mt-1 block w-full rounded-md border px-3 py-2" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Note (optional)</label>
                <textarea name="note" value={form.note} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium">Schedule time to call</label>
                <input type="time" name="callTime" value={form.callTime} onChange={handleChange} className="mt-1 block w-40 rounded-md border px-3 py-2" />
              </div>

              <div className="flex items-center gap-3">
                <input id="quote-sub" name="quotationSubmitted" type="checkbox" checked={form.quotationSubmitted} onChange={handleChange} />
                <label htmlFor="quote-sub" className="text-sm">I have submitted the quotation request (required to submit)</label>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {status.error ? <span className="text-red-600">{status.error}</span> : (status.success ? <span className="text-green-600">Thanks — we'll be in touch!</span> : <span>We usually reply within two business days.</span>)}
                </div>

                <button type="submit" disabled={status.submitting} className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#8B0000] text-white">
                  {status.submitting ? 'Sending...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* VIDEO BANNER */}
      <section className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden" style={{ height: "60vh" }}>
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/videos/drone.webm" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex items-center px-10 md:px-20">
          <div className="text-left text-white max-w-xl">
            <p className="tracking-widest text-sm mb-2">READY TO</p>
            <h2 className="text-4xl md:text-5xl font-serif italic leading-tight">Tie the knot?</h2>

            <div className="mt-6 flex gap-8 items-center">
              <a href="/quotation" className="inline-block text-white tracking-widest text-sm font-medium uppercase border-b border-white pb-1 hover:opacity-80 transition" style={{ background: "transparent", padding: 0, boxShadow: "none", borderRadius: 0 }}>
                BUILD YOUR QUOTATION
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="w-full mt-24" style={{ backgroundColor: "#C0A060" }}>
        <div className="pt-24 pb-12">
          <div className="text-center mb-16">
            <p className="tracking-[0.3em] text-xs text-white/90">SOCIAL MEDIA</p>
            <h2 className="font-[Playfair_Display] text-4xl md:text-6xl leading-tight md:leading-tight text-[#8B0000] tracking-tight mb-4 about-headline">INSTAGRAM</h2>
          </div>

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {instaImages.map((img, index) => (
              <div key={index} className="relative group">
                <img src={`/images/${img}`} alt={`insta-${index}`} className="w-full h-[260px] object-cover rounded-md shadow-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

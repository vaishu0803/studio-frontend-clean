// src/components/MeetTheTeam.jsx
import React, { useState } from "react";

/**
 * Reliable MeetTheTeam component — replacement.
 * Overwrite your current file with this and hard-refresh the browser.
 *
 * Notes:
 * - Put real images in /public/images/
 * - If text still appears mirrored after this, check for global CSS that
 *   sets `transform`, `scaleX(-1)`, or `direction: rtl` on ancestor elements.
 */

const TEAM = [
  {
    id: 1,
    name: "Vaishnavi",
    role: "Founder & Lead Photographer",
    img: "/images/team_1.webp",
    bio: "Documentary-first wedding photographer based in Hyderabad. I chase light, candid smiles and honest moments.",
    email: "hello@snapshoot.com",
    instagram: "https://instagram.com/yourprofile",
    whatsapp: "919000000000",
  },
  {
    id: 2,
    name: "Arjun",
    role: "Cinematographer",
    img: "/images/team_1.webp",
    bio: "Cinematographer who loves motion and quiet storytelling — films that feel like memory.",
    email: "arjun@snapshoot.com",
    instagram: "https://instagram.com/arjun",
    whatsapp: "919111111111",
  },
  {
    id: 3,
    name: "Meera",
    role: "Studio Coordinator",
    img: "/images/team_1.webp",
    bio: "Keeps shoots running smooth and clients happy — planning, scheduling and little kindnesses.",
    email: "meera@snapshoot.com",
    instagram: "https://instagram.com/meera",
    whatsapp: "919222222222",
  },
];

export default function MeetTheTeam() {
  const [flipped, setFlipped] = useState({});

  const toggle = (id) => setFlipped((s) => ({ ...s, [id]: !s[id] }));

  return (
    <section aria-label="Meet the team" className="meet-team-root" style={{ background: "#F6EBD8" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 20px" }}>
        <h3 style={{ textAlign: "center", color: "#8B0000", fontSize: 32, marginBottom: 8, fontWeight: 800 }}>
          Meet the team
        </h3>

        <p style={{ textAlign: "center", color: "#5b5b5b", marginBottom: 28, maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
          A small group of storytellers who love light, laughter, and lasting memories.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {TEAM.map((m) => {
            const isFlipped = Boolean(flipped[m.id]);
            return (
              <div
                key={m.id}
                className="team-card-wrapper"
                role="button"
                tabIndex={0}
                aria-pressed={isFlipped}
                onClick={() => toggle(m.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(m.id);
                  }
                }}
                style={{ outline: "none", perspective: 1400 }}
              >
                {/* card-inner rotates 0 -> 180 */}
                <div className={`card-inner ${isFlipped ? "is-flipped" : ""}`}>

                  {/* FRONT (normal orientation) */}
                  <div className="card-face card-front">
                    <div className="card-media">
                      <img
                        src={m.img}
                        alt={`${m.name} — ${m.role}`}
                        onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/800x800?text=Profile")}
                      />
                    </div>

                    <div className="card-meta">
                      <div className="card-name">{m.name}</div>
                      <div className="card-role">{m.role}</div>
                    </div>
                  </div>

                  {/* BACK (pre-rotated 180 so when card-inner rotates, back faces viewer upright) */}
                  <div className="card-face card-back">
                    <div className="card-back-inner">
                      <p className="card-bio">{m.bio}</p>

                      <div className="card-links">
                        {m.instagram && (
                          <a href={m.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} Instagram`} className="icon">
                            {/* Instagram SVG */}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zM18.2 6.3a.9.9 0 1 1 .9-.9.9.9 0 0 1-.9.9z"/></svg>
                          </a>
                        )}

                        {m.whatsapp && (
                          <a href={`https://wa.me/${m.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} WhatsApp`} className="icon">
                            {/* WhatsApp SVG */}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.7 13.9c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.8.1-.3.2-1 1-1.2 1.2-.2.3-.4.3-.7.1-1-.6-1.8-1.6-2.4-2.7-.2-.4 0-.6.1-.8.1-.2.3-.5.4-.8.1-.3 0-.5-.1-.7-.1-.2-1.1-2.6-1.5-3.5-.4-.9-.8-.7-1-.7-.2 0-.5 0-.8 0-.3 0-.7.1-1 .5-.3.4-1 1.1-1 2.8 0 1.7 1 3.4 1.2 3.6.2.2 2 3.4 4.9 4.6 1.2.5 2.1.8 2.9.8 1.2 0 1.9-.5 2.4-.9.5-.4 1.3-1.2 1.5-2 .2-.8.2-1.5.2-1.6 0-.2-.2-.3-.5-.4zM12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/></svg>
                          </a>
                        )}

                        <a href={`mailto:${m.email}`} className="email-link">{m.email}</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* scoped styles */}
                <style>{`
                  /* base reset for wrapper */
                  .team-card-wrapper { -webkit-tap-highlight-color: transparent; }

                  /* card-inner: the rotating element */
                  .card-inner {
                    width: 100%;
                    height: 380px;
                    position: relative;
                    -webkit-transform-style: preserve-3d;
                    transform-style: preserve-3d;
                    -webkit-transition: -webkit-transform 700ms cubic-bezier(.2,.9,.2,1);
                    transition: transform 700ms cubic-bezier(.2,.9,.2,1);
                    transform-origin: 50% 50%;
                  }

                  /* when toggled or hovered, rotate the inner */
                  @media (hover: hover) and (pointer: fine) {
                    .team-card-wrapper:hover .card-inner { -webkit-transform: rotateY(180deg); transform: rotateY(180deg); }
                  }
                  .card-inner.is-flipped { -webkit-transform: rotateY(180deg) !important; transform: rotateY(180deg) !important; }

                  /* faces */
                  .card-face {
                    position: absolute;
                    inset: 0;
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                    border-radius: 14px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    box-shadow: 0 10px 30px rgba(28,28,28,0.08);
                    background: #fff;
                  }

                  .card-front { z-index: 2; -webkit-transform: rotateY(0deg); transform: rotateY(0deg); }

                  /* back is pre-rotated; when card-inner rotates, it faces forward upright */
                  .card-back { transform: rotateY(180deg); -webkit-transform: rotateY(180deg); }

                  /* Front media */
                 .card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

                  .card-meta {
                    position: relative;
                    padding: 16px;
                    background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.95));
                  }
                  .card-name { font-size: 16px; font-weight: 700; color: #111; }
                  .card-role { font-size: 13px; color: #6b6b6b; margin-top: 6px; }

                  /* Back inner content (no extra rotate here) */
                  .card-back-inner {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 12px;
                    padding: 12px;
                    color: #333;
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                  }
                  .card-bio { margin: 0; font-size: 14px; line-height: 1.5; }
                  .card-links { display:flex; gap:12px; align-items:center; margin-top:6px; }

                  .icon { display:inline-flex; width:36px; height:36px; align-items:center; justify-content:center; border-radius:10px; background: rgba(139,0,0,0.04); color: #8B0000; text-decoration:none; }
                  .email-link { margin-left:6px; font-size:13px; color:#8B0000; text-decoration:underline; }

                  /* reduce motion support */
                  @media (prefers-reduced-motion: reduce) {
                    .card-inner { -webkit-transition: none !important; transition: none !important; }
                  }

                  /* responsive */
                  @media (min-width:1024px) {
                    .card-inner { height: 420px; }
                  }
                `}</style>
              </div>
            );
          })}
        </div>
      </div>

      {/* Extra debugging helper: show if page direction is RTL or transforms exist (only visible in dev) */}
      <style>{`
        /* If you still see mirrored text, check the console for 'page-transform-debug' printed message. */
      `}</style>
    </section>
  );
}

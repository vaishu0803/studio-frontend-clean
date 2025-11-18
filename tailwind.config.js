// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "cinema-deep": "#8B0000",       // Primary Deep Red
        "cinema-heading": "#B22222",   // Rich Heading Red
        "cinema-gold": "#C0A060",      // Soft Gold
        "cinema-cream": "#FAF8F3",     // Background Cream
        "card-bg": "#FFFDFC",          // Off-white card background
        "text-dark": "#1C1C1C",        // Default dark text
      },
      boxShadow: {
        "gold-soft": "0 12px 30px rgba(192,160,96,0.08)",
      },
      fontFamily: {
        heading: ['"Playfair Display"', "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
      },

      // your existing disco animation
      animation: {
        backgroundDisco: "disco 3s linear infinite",
      },
      keyframes: {
        disco: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

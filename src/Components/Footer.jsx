import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[ #C0A060] text-[#1C1C1C] py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold text-[#8B0000]">Snapshoot</h2>
            <p className="text-sm mt-3">
              Capturing emotions with cinematic vision and stunning storytelling.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold text-[#8B0000] mb-3">Quick Links</h3>
            <ul className="space-y-2 font-medium">
              <li><Link to="/" className="hover:text-[#8B0000]">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#8B0000]">About</Link></li>
              <li><Link to="/services" className="hover:text-[#8B0000]">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-[#8B0000]">Gallery</Link></li>
              <li><Link to="/quotation" className="hover:text-[#8B0000]">Quotation</Link></li>
              <li><Link to="/contact" className="hover:text-[#8B0000]">Contact</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold text-[#8B0000] mb-3">Contact Us</h3>
            <p className="text-sm">📍 Bengaluru, Karnataka</p>
            <p className="text-sm">📞 +91 98765 43210</p>
            <p className="text-sm">✉️ snapshootstudio@gmail.com</p>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-[#8B0000] mt-10 pt-4 text-center text-sm font-medium">
          © {new Date().getFullYear()} Snapshoot — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

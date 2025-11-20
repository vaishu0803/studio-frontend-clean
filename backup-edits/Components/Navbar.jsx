import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Quotation', path: '/quotation' },
    { name: 'Services', path: '/Services' },
    { name: 'Contact', path: '/Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // start after slight scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
  className={`w-full fixed top-0 left-0 z-50 transition-colors duration-300 ${
    isScrolled ? 'bg-black w-full bg-opacity-90 backdrop-blur-md shadow-md' : 'bg-transparent'
  }`}
>
  <div className="max-w-[1440px] mx-auto px-4 flex justify-between items-center h-16">
        <a
        href="/"
        className="flex items-center space-x-2 transition-all duration-300 hover:opacity-90"
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 600,
            letterSpacing: "1px",
            fontSize: "1.75rem",
          }}
          className="text-white"
        >
          SnapShoot
        </span>
      </a>


        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-white">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-yellow-400 transition duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-white">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-white bg-black bg-opacity-90">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-yellow-400 transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

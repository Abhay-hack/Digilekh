import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/Digi.png';
import Button from '../components/Button'; 

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#82C0CC] text-gray-800 shadow-md w-full border-b-2 border-black">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-xl font-semibold">
          <img src={logo} alt="Digilekh Logo" className="w-10 h-10 rounded-full" />
          <span className="hidden sm:inline">Digilekh</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 text-lg">
          <Link to="/" className="hover:text-white transition duration-200">Home</Link>
          <Link to="/about" className="hover:text-white transition duration-200">About Us</Link>
          <Link to="/contact" className="hover:text-white transition duration-200">Contact Us</Link>
          <Link to="/user/signup"><Button /></Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="text-black focus:outline-none focus:ring-2 focus:ring-white rounded"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#82C0CC] px-4 pt-2 pb-4 space-y-2">
          <Link to="/" className="block hover:text-white transition duration-200" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/about" className="block hover:text-white transition duration-200" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link to="/contact" className="block hover:text-white transition duration-200" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
          <Link to="/user/signup" onClick={() => setIsMobileMenuOpen(false)}><Button /></Link>
        </div>
      )}
    </header>
  );
};

export default Header;
